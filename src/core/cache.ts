import { reactive } from "@vue/reactivity";
import type { List } from "../index";


export const cacheMap = reactive<Map<string, {
    list: List,
    scriptTagLine: {
        start?: number,
        end?: number
    }
}>>(new Map());