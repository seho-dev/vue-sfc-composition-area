import { reactive } from "@vue/reactivity";
import type { List } from "../index";


export const astMap = reactive<Map<string, { ast: any, list: List }>>(new Map());