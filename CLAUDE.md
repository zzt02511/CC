# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Remotion 4.0 的视频项目，用于创建程序化视频内容。项目使用 React + TypeScript + Tailwind CSS v4 技术栈。

## 开发命令

### 基础开发流程
```bash
# 安装依赖
npm i

# 启动开发预览服务器（Remotion Studio）
npm run dev

# 构建项目（打包为Web应用）
npm run build

# 代码检查和类型检查
npm run lint

# 升级 Remotion 版本
npm run upgrade
```

### 视频渲染
```bash
# 渲染默认视频（HelloWorld 组件）
npx remotion render

# 渲染特定组件
npx remotion render HelloWorld
npx remotion render OnlyLogo

# 指定输出文件和格式
npx remotion render HelloWorld out/video.mp4
```

## 项目架构

### 核心结构
- **src/Root.tsx**: 定义所有视频组合（Composition）的入口点，每个 Composition 对应 Remotion Studio 侧边栏中的一个可渲染项
- **src/HelloWorld.tsx**: 主要视频组件，包含完整的动画逻辑和时间轴控制
- **src/HelloWorld/**: 子组件目录，包含可复用的视觉元素（Logo、Title、Subtitle 等）

### 组件化设计理念
- **Composition**: Remotion 的核心概念，每个 Composition 定义一个可独立渲染的视频，包含特定的帧率、分辨率、时长参数
- **Sequence**: 时间轴偏移容器，让子组件在指定帧数开始显示
- **AbsoluteFill**: 全屏绝对定位容器，相当于 `position: absolute; top: 0; left: 0; width: 100%; height: 100%`

### 动画系统
- 使用 `spring()` 和 `interpolate()` 创建平滑动画
- `useCurrentFrame()` 获取当前播放帧数
- `useVideoConfig()` 获取视频配置（总帧数、帧率等）

### 参数化渲染
- 使用 Zod schema 定义组件 props，支持运行时类型验证
- 通过 `defaultProps` 设置默认参数
- 可在渲染时通过 CLI 参数覆盖 props 值

### 样式系统
- 集成 Tailwind CSS v4 通过 `@remotion/tailwind-v4` 插件
- 支持内联样式和 CSS 类名混合使用
- `zColor()` 类型用于颜色值的类型安全

## Remotion 特性配置

### 输出配置 (remotion.config.ts)
- 视频图像格式：JPEG
- 覆盖已存在文件：启用
- Tailwind CSS v4 集成：启用

### 代码质量
- ESLint 配置：使用 `@remotion/eslint-config-flat` 预设（.eslint.config.mjs）
- TypeScript 严格模式（tsconfig.json）
- Prettier 代码格式化（.prettierrc）
- Tailwind CSS v4 完全集成（remotion.config.ts 中启用）

## 开发注意事项

### 帧数计算
- 默认帧率：30 FPS（1920x1080 分辨率）
- 动画时间点计算：使用帧数而非秒数（例如 25 帧 = 0.83 秒）
- 淡入淡出效果：通常在结束前 15-25 帧开始

### 组件组合策略
- 使用 `Sequence` 组件控制元素出现时机
- 复杂动画分解为多个子组件
- 逻辑和样式分离：动画逻辑在父组件，视觉样式在子组件
- 每个SVG必须使用唯一gradient ID，避免冲突

### 核心组件说明
- **HelloWorld**: 主要视频组合（10秒时长），包含Logo、Title、Subtitle的复杂动画序列
- **OnlyLogo**: 独立的Logo动画组合，展示原子结构样式的Logo动画
- **Logo**: 使用Arc和Atom组件组合的旋转、缩放、呼吸效果
- **Title**: 支持波浪动画、透明度闪烁、发光效果的文字组件
- **Subtitle**: 支持打字机效果、分段显示的副标题组件
- **Arc**: 椭圆弧线组件，使用strokeDashoffset创建绘制动画
- **Atom**: 中心圆形组件，配合Arc形成原子结构视觉效果

### 性能优化
- 避免在 `useCurrentFrame()` 中进行复杂计算
- 静态内容提取为常量
- 合理使用 `interpolate()` 的 extrapolate 配置
- 使用 `@remotion/tailwind-v4` 进行样式处理