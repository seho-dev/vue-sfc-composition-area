import { vueSfcAstParser } from "@originjs/vue-sfc-ast-parser";
import { readFile } from "fs";
import { SPECIAL_MARK } from "../index";
import type { List } from "../index";


export const checkScriptTag = (fileName: string): Promise<false | { ast: any, startLine?: number, endLine?: number }> => {
    return new Promise((resolve, reject) => {
        readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                const { scriptAST, descriptor } = vueSfcAstParser({
                    path: fileName,
                    source: data.toString()
                });
                if (scriptAST !== null) {
                    resolve({
                        ast: scriptAST,
                        startLine: descriptor?.script?.loc.start.line,
                        endLine: descriptor?.script?.loc.end.line
                    });
                } else {
                    resolve(false);
                }
            }
        });
    });
};

export const parseCommentsToList = (ast: any[]): List => {
    ast = ast.filter((item: any, index: number) => {
        if (item.type === 'CommentLine' && item.value.includes(SPECIAL_MARK)) {
            if (index % 2 === 0) {
                return true;
            } else {
                return item.value.trimStart() === SPECIAL_MARK;
            }
        }
    });
    const list: List = [];
    // ast每2个循环一次 (一对标签视为一个block)
    for (let i = 0; i < ast.length; i += 2) {
        // 获取开始标签和结束标签的line行数
        list.push({
            level: ast[i].value.split('#')[2],
            title: ast[i].value.split('#')[1],
            start: ast[i]['loc']['end']['line'],
            end: ast[i + 1]['loc']['end']['line']
        });
    }
    return list;
};