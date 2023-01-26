# vue-sfc-composition-area

<div align=center>
  <img width="30%" height="30%" alt="Group 4" src="https://user-images.githubusercontent.com/35763284/214764870-7a7c3947-1436-403b-96a2-a4a9f5952794.png">

</div>


This is a Vscode plugin that assists Vue developers in writing better **Composition API** business logic with a **Regional Mindset**

<div align=center>
  <img src="https://static.yinzhuoei.com/typecho/2023/01/25/578581116537861/1635527518options-vs-composition-api.png"></img>
</div>


## How to use

After searching for `vue-sfc-composition-area` (*comming soon*) in the vscode extension and installing it; you will see the window in the lower left corner of the vscode explorer, which you can use to create your **Composition API** logic


## Features

No matter how long your vue file is, you can **quickly** find your business logic, and you can give each area a corresponding level of importance so that it can be categorized, and the different levels will be displayed differently in the small window


## Quick Preview

https://user-images.githubusercontent.com/35763284/214604500-11ffd85c-aa15-44c0-9f9f-5a00f3adabf4.mp4


## Unfinished Business

- Add smart cache mode for unnecessary AST analysis
- Support drag and drop area window for code order adjustment
- Nested support

## Principle

Script AST for Vue files to calculate the start and end positions of special tags, using the Vue responsive core inside the source code
