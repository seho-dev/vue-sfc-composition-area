export type List = { title: string, start: number, end: number, level: LEVEL }[];

// 定义注释特殊标记
export const SPECIAL_MARK = 'vue-sfc-composition-area';
// area等级
export enum LEVEL {
    l1 = 1,
    l2 = 2,
    l3 = 3,
}