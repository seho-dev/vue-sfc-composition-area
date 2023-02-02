# vue-sfc-composition-area

<div align=center>
  <img width="30%" height="30%" alt="Group 4" src="https://user-images.githubusercontent.com/35763284/214764870-7a7c3947-1436-403b-96a2-a4a9f5952794.png">
</div>


[EN-DOC](https://github.com/1018715564/vue-sfc-composition-area/blob/main/README.md)

这是一个Vscode插件, 主要帮助Vue3开发者编写更好的Composition API, 插件整体使用区域思想, 将区域和代码业务逻辑相关联, 无论你的代码有多长多复杂, 可以根据业务区域准确定位对应的代码


<div align=center>
  <img src="https://static.yinzhuoei.com/typecho/2023/01/25/578581116537861/1635527518options-vs-composition-api.png"></img>
</div>

## 使用

在Vscode插件市场中搜索 [vue-sfc-composition-area](https://marketplace.visualstudio.com/items?itemName=swordjs.vue-sfc-composition-area) 之后进行下载, 会在你的编辑器的左下角区域显示小窗口, 在窗口中提供了一些逻辑操作比如新增,刷新等; 当我们新增一个区域之后, 会在对应的Vue文件的script末尾添加一段**注释**, 你就可以把你的业务逻辑写到这个注释块中.


## 特性

无论你的vue文件有多长，你都可以快速找到你的业务逻辑，你可以给每个区域一个相应的重要性级别，这样就可以进行分类，不同的级别在小窗口中会有不同的显示。


## 快速预览

[<!-- mp4 -->
`[![Video Name](https://user-images.githubusercontent.com/35763284/214598686-39e94e17-047b-4b57-8978-1a722984dc44.mp4)]`](https://user-images.githubusercontent.com/35763284/214604500-11ffd85c-aa15-44c0-9f9f-5a00f3adabf4.mp4
)


## 未完成的特性

- 为不必要的AST分析增加智能缓存模式
- 支持拖放区域窗口进行代码顺序调整
- 多级嵌套区域

## 原理

Vue文件的AST脚本，用于计算特殊标签的开始和结束位置，源代码内部使用了Vue响应式核心库。
