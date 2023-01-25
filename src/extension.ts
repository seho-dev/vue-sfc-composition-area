import * as vscode from 'vscode';
import * as path from "path";
import { addArea } from './core/area';
import { checkScriptTag, parseCommentsToList } from "./core/parseSfc";
import { cacheMap } from "./core/cache";
import { ref, computed } from "@vue/reactivity";
import { LEVEL } from "./index";
import type { List } from "./index";

export const currentFileName = ref<string>();

const scriptLine = computed(() => {
	const { scriptTagLine } = cacheMap.get(currentFileName.value as string) as { scriptTagLine: { start?: number, end?: number } };
	return scriptTagLine;
});

/**
 * 更新树形结构
 * @param fileName 
 */
const updateTree = (fileName = vscode.window.activeTextEditor?.document.fileName) => {
	if (fileName) {
		const { list } = cacheMap.get(fileName) as { list: List };
		// 更新树形结构
		vscode.window.registerTreeDataProvider('vue-sfc-composition-area', {
			getChildren: () => {
				// 根据不同的level，设置不同的icon
				const map: Record<LEVEL, string> = {
					[LEVEL.l1]: 'red.png',
					[LEVEL.l2]: 'blue.png',
					[LEVEL.l3]: 'black.png'
				};
				return list.map(item => {
					return {
						label: item.title,
						iconPath: path.join(__filename, '..', '..', 'media', map[item.level] || 'blue.png'),
						command: {
							// 点击树形结构中的节点，跳转到对应的代码行
							command: 'revealLine',
							arguments: [{ lineNumber: (scriptLine.value.start || 0) + item.start, at: "center" }],
						}
					};
				});
			},

			getTreeItem: (element: any) => {
				return element;
			}
		});
	}
};

/**
 * 处理vscode当前文档
 * @param e 
 */
export const handleDocument = (e?: vscode.TextEditor) => {
	if (e) {
		const document = e.document;
		if (document.languageId === 'vue') {
			const fileName = document.fileName;
			// 更新当前vue文件名
			currentFileName.value = fileName;
			// 判断cacheMap中是否存在该文件的ast
			if (cacheMap.has(fileName)) {
				updateTree(fileName);
			} else {
				checkScriptTag(fileName).then(res => {
					if (res) {
						cacheMap.set(fileName, {
							list: parseCommentsToList(res.ast['__paths'][0].value['tokens']),
							// 存储每个vue文件的script标签节点信息
							scriptTagLine: {
								start: res.startLine,
								end: res.endLine
							}
						});
						updateTree(fileName);
					}
				});
			}
		}
	}
};


export function activate(context: vscode.ExtensionContext) {
	// 监听所有的vue文件变化
	const watcher = vscode.workspace.createFileSystemWatcher('**/*.vue');
	handleDocument(vscode.window.activeTextEditor);
	// 监听vscode窗口变化
	vscode.window.onDidChangeActiveTextEditor(handleDocument);
	// 绑定命令
	vscode.commands.registerCommand('vue-sfc-composition-area.refresh', () => {
		// 清空当前缓存
		if (currentFileName.value) {
			cacheMap.get(currentFileName.value) && cacheMap.delete(currentFileName.value);
		}
		// 重新解析处理当前文档
		handleDocument(vscode.window.activeTextEditor);
	});
	vscode.commands.registerCommand('vue-sfc-composition-area.add', () => addArea().then(() => updateTree()));
}

// This method is called when your extension is deactivated
export function deactivate() { }
