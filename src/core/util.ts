import { createHash } from 'crypto';
import { readFileSync } from "fs";

export const debounce = (fn: Function, delay = 1000) => {
    let timer: any = null;
    return function (...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(args);
        }, delay);
    };
};

// 在vscode插件中获取当前文件的md5值, 通过md5命令在终端获取
export const getMd5 = (filePath: string) => {
    return createHash("md5").update(readFileSync(filePath, 'utf8')).digest('hex');
};