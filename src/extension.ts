import * as vscode from 'vscode';
import { checkScriptTag } from "./core/checker";

export function activate(context: vscode.ExtensionContext) {
	// 获取当前打开的vue文件路径
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		if (document.languageId === 'vue') {
			// // 查看git仓库下的history记录, 最近的一次hash值
			// const git = require('simple-git/promise')(document.uri.fsPath);
			// git.log({ file: document.fileName }).then((log: any) => {
			// 	const hash = log.latest.hash;
			// 	// 获取当前文件在git仓库中的路径
			// 	const path = document.uri.fsPath.replace(document.fileName, '');
			// 	// 获取当前文件在git仓库中的路径
			// 	const fileName = document.fileName.replace(path, '');
			// 	// 获取当前文件在git仓库中的历史版本
			// 	git.show([`${hash}:${fileName}`]).then((data: any) => {
			// 		// 检查script标签是否存在
			// 		checkScriptTag(data).then((scriptAST: any) => {
			// 			if (scriptAST) {
			// 				vscode.window.showInformationMessage('script标签存在');
			// 			} else {
			// 				vscode.window.showInformationMessage('script标签不存在');
			// 			}
			// 		});
			// 	});
			// }
			// );
			const fileName = document.fileName;
			checkScriptTag(fileName).then(res => {
				// 如果有script标签
				if (res) {
					console.log(res);
				}
			});
		}
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
