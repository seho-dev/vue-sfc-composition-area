import { ref } from "@vue/reactivity";
import type { List } from "../index";

export const GLOBAL_STATE_CACHE_KEY = "cacheMap";

export const cacheMap = ref<Map<string, {
    list: List,
    hash: string,
    scriptTagLine: {
        start?: number,
        end?: number
    }
}>>(new Map());