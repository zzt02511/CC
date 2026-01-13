# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

这是一个基于 Next.js 15.4.2 和 React 19 的现代 Web 应用程序，使用 TypeScript 5 和 Tailwind CSS 4 构建。项目采用 Next.js App Router 架构，支持服务端组件和响应式设计。

## 核心技术栈

- **Next.js**: 15.4.2 (App Router + Turbopack)
- **React**: 19.1.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4
- **ESLint**: ^9

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
src/
├── app/              # Next.js App Router 核心目录
│   ├── layout.tsx   # 根布局组件
│   ├── page.tsx     # 首页组件
│   ├── globals.css  # 全局样式
│   └── outline/     # 产品轮廓图测试页面
├── components/       # 可复用组件
│   └── ProductOutline.tsx  # 产品轮廓图生成组件
└── public/           # 静态资源目录
    └── products/     # 产品图片目录
```

### 关键配置

#### TypeScript 路径映射
- `@/*` 指向 `./src/*`
- 严格模式已启用

#### Tailwind CSS 4 集成
- 使用 `@tailwindcss/postcss` 插件
- 支持暗色模式

### 开发特点

- 使用 Turbopack 作为开发服务器
- 热重载支持
- 严格的 TypeScript 和 ESLint 检查

## 产品轮廓图功能

### 访问测试页面
访问 `/outline` 路由测试产品轮廓图生成功能。

### 组件使用
```tsx
import ProductOutline from '@/components/ProductOutline';

<ProductOutline
  src="/products/your-image.png"
  threshold={100}
  color="#000000"
  thickness={2}
  smooth={true}
/>
```
