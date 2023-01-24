import { vueSfcAstParser } from "@originjs/vue-sfc-ast-parser";
import { readFile } from "fs";

export const checkScriptTag = (fileName: string) => {
    return new Promise((resolve, reject) => {
        readFile(fileName, (error, data) => {
            if (error) {
                reject(error);
            } else {
                const { scriptAST } = vueSfcAstParser({
                    path: fileName,
                    source: data.toString()
                });
                if (scriptAST !== null) {
                    resolve(scriptAST);
                } else {
                    resolve(false);
                }
            }
        });
    });
};