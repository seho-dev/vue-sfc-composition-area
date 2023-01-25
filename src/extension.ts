import * as vscode from 'vscode';
import { checkScriptTag, parseCommentsToList } from "./core/parseSfc";
import { astMap } from "./core/cache";
import { ref } from "@vue/reactivity";

import type { List } from "./index";

// script标签节点在vue中的行数
export const scriptLine = ref<number>();

/**
 * 更新树形结构
 * @param fileName 
 */
const updateTree = (fileName: string) => {
	const { list } = astMap.get(fileName) as { list: List };
	// 更新树形结构
	vscode.window.registerTreeDataProvider('vue-sfc-composition-area', {
		getChildren: () => {
			return list.map(item => {
				return {
					label: item.title,
					command: {
						// 点击树形结构中的节点，跳转到对应的代码行
						command: 'revealLine',
						arguments: [{ lineNumber: (scriptLine.value || 0) + item.start, at: "center" }],
					}
				};
			});
		},

		getTreeItem: (element: any) => {
			return element;
		}
	});
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
			// 判断astMap中是否存在该文件的ast
			if (astMap.has(fileName)) {
				updateTree(fileName);
			} else {
				checkScriptTag(fileName).then(res => {
					if (res) {
						scriptLine.value = res.line;
						astMap.set(fileName, { ast: res, list: parseCommentsToList(res.ast['__paths'][0].value['tokens']) });
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
}

// This method is called when your extension is deactivated
export function deactivate() { }
