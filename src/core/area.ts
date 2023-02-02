import * as vscode from 'vscode';
import { currentFileName } from "../extension";
import { LEVEL, SPECIAL_MARK } from "../index";
import { cacheMap } from "./cache";
import { getMd5 } from './util';

export const addArea = (): Promise<void> => {
    return new Promise(resolve => {
        // vscode弹出输入框
        vscode.window.showInputBox({
            prompt: `Please enter the name of the Area (If you want to distinguish the level please add #1 | #2 | #3 after the title)`,
            placeHolder: 'Example: Add a new input box for a product',
        }).then((value) => {
            if (value) {
                // 查看value末尾中是否包含#1 | #2 | #3
                const reg = /#1|#2|#3$/;
                // 默认为2级
                let areaLevel = LEVEL['l2'];
                if (reg.test(value)) {
                    areaLevel = Number(value.substring(value.length - 1));
                    value = value.substring(0, value.length - 2);
                }
                // 获取当前文件的ast拿到script标签的末尾行数
                const end = cacheMap.value.get(currentFileName.value as string)?.scriptTagLine.end;
                // 给当前vscode的end行数之前添加代码, 添加之后将光标定位到添加的代码中间
                vscode.window.activeTextEditor?.edit(editBuilder => {
                    editBuilder.insert(new vscode.Position((end as number - 1), 0), `\n// ${SPECIAL_MARK}#${value}#${areaLevel}\n\n// ${SPECIAL_MARK}\n`);
                }
                ).then(async () => {
                    // 更新缓存
                    const currentCache = cacheMap.value.get(currentFileName.value as string);
                    if (cacheMap.value.get(currentFileName.value as string)) {
                        const hash = getMd5(currentFileName.value as string);
                        cacheMap.value.set(currentFileName.value as string, {
                            ...currentCache,
                            scriptTagLine: {
                                ...currentCache?.scriptTagLine,
                                end: end as number + 4
                            },
                            hash,
                            list: [...currentCache?.list as any, {
                                title: value,
                                start: end! + 1,
                                end: end! + 3,
                                level: areaLevel
                            }],
                        });
                    }
                }).then(() => {
                    // 将光标定位指定行数
                    // @ts-ignore
                    vscode.window.activeTextEditor.selection = new vscode.Selection(new vscode.Position((end as number + 1), 0), new vscode.Position((end as number + 1), 0));
                    resolve();
                });
            }
        });
    });
};