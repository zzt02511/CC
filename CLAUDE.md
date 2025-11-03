# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个基于 Next.js 15.4.2 和 React 19 的现代 Web 应用程序，使用 TypeScript 5 和 Tailwind CSS 4 构建。项目采用 Next.js App Router 架构，支持服务端组件和响应式设计。

## 核心技术栈

- **Next.js**: 15.4.2 (App Router)
- **React**: 19.1.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4 (通过 PostCSS 插件集成)
- **ESLint**: ^9 (使用新的 flat config 格式)

## 常用开发命令

```bash
# 开发服务器（使用 Turbopack 加速）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 项目架构

### 目录结构
```
src/app/                # Next.js App Router 核心目录
├── layout.tsx         # 根布局组件，定义全局页面结构
├── page.tsx          # 首页组件
├── globals.css       # 全局样式，包含 Tailwind CSS 和主题变量
└── favicon.ico       # 网站图标

public/               # 静态资源目录
```

### 关键配置

#### TypeScript 路径映射
- `@/*` 指向 `./src/*`，便于模块导入
- 严格模式已启用，要求所有代码通过类型检查

#### Tailwind CSS 4 集成
- 使用 `@theme inline` 语法定义主题变量
- 字体使用 Geist Sans 和 Geist Mono (Vercel 设计字体)
- 支持系统级暗色模式 (`prefers-color-scheme: dark`)

#### App Router 架构
- 基于文件系统的路由结构
- 支持服务端组件 (RSC) 和客户端组件混合
- 布局系统支持共享 UI 组件

### 样式系统

**主题变量**：通过 CSS 变量定义色彩系统，位于 `globals.css`
**响应式设计**：使用 Tailwind 的响应式断点，移动优先
**暗色模式**：自动检测系统偏好，无需手动切换

### 开发特点

- 使用 Turbopack 作为开发服务器，提供更快的构建速度
- 热重载支持，实时预览代码更改
- 严格的 TypeScript 类型检查和 ESLint 规则
- Next.js 内置性能优化（图片优化、代码分割、字体优化）

### 代码组织建议

未来扩展时建议使用以下目录结构：
```
src/
├── components/        # 可复用组件
├── lib/             # 工具函数和配置
├── types/           # TypeScript 类型定义
└── app/             # App Router 页面和 API 路由
```

### 注意事项

- 项目使用 ESLint 9 的新配置格式 (eslint.config.mjs)
- Tailwind CSS 4 通过 PostCSS 插件集成，无需单独的 tailwind.config.js
- 所有组件默认为服务端组件，需要客户端交互时添加 "use client"
- 使用绝对路径导入组件和工具函数 (`@/components/...`)