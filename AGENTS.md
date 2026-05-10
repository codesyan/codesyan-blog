<!-- BEGIN:nextjs-agent-rules -->
# 注意：这不是你记忆里的 Next.js

本项目使用 Next.js 16.2.6。这个版本的 API、约定和文件结构可能和旧经验不同。
在修改 Next.js 相关代码前，必须先阅读 `node_modules/next/dist/docs/` 中对应主题的本地文档，并遵守其中的废弃提示。
<!-- END:nextjs-agent-rules -->

# 项目维护说明

这是一个基于 Next.js App Router 的中文个人博客，内容主题是 AI Coding。修改时优先保持当前项目的简洁、克制和静态内容站定位。

## 技术栈

- Next.js 16.2.6，App Router 位于 `src/app/`
- React 19
- TypeScript，开启 `strict`
- Tailwind CSS 4，样式入口为 `src/app/globals.css`
- MDX 内容位于 `src/content/posts/`
- 文章读取逻辑位于 `src/lib/posts.ts`
- 评论组件使用 Giscus，位于 `src/components/giscus.tsx`

## 常用命令

- `npm run dev`：启动本地开发服务器
- `npm run build`：生产构建检查
- `npm run lint`：ESLint 检查

提交前至少运行 `npm run lint`。涉及路由、构建、MDX 或元数据逻辑时，同时运行 `npm run build`。

## 编码约定

- 默认使用 Server Component。只有需要浏览器 API、事件、状态或副作用时才添加 `"use client"`。
- 路由、页面和元数据逻辑遵循 Next.js 16 本地文档，不根据旧版 Next.js 经验猜测 API。
- 使用 `@/*` 路径别名引用 `src/` 下模块。
- 保持 TypeScript 类型明确，不引入 `any` 作为绕过类型检查的手段。
- 文件系统读取、MDX frontmatter 解析等服务端逻辑集中放在 `src/lib/`。
- 页面文案以中文为主，语气保持个人博客风格：简洁、自然、偏实践。
- UI 风格保持当前的极简排版，不新增重装饰、营销页式 hero 或复杂动效。

## 内容规范

- 新文章放在 `src/content/posts/{slug}.mdx`。
- MDX frontmatter 至少包含：
  - `title`
  - `date`
  - `description`
  - `tags`
- `date` 使用 `YYYY-MM-DD` 格式。
- `slug` 来自文件名，应使用小写英文、数字和连字符，避免中文文件名和空格。
- 文章列表按 `date` 倒序展示。修改排序逻辑时要确认首页和文章上下篇导航都仍然一致。

## 组件与样式

- 公共布局组件放在 `src/components/`。
- 全局颜色、字体和 prose 样式维护在 `src/app/globals.css`。
- 优先复用当前 CSS 变量：`--background`、`--foreground`、`--muted`、`--border`。
- 注意浅色和深色模式都要可读。
- 不要把全局样式散落到页面组件中；局部布局可直接使用 Tailwind utility class。

## 需要特别小心的地方

- `params` 在当前动态路由中按 Promise 处理，修改 `src/app/posts/[slug]/page.tsx` 前先核对 Next.js 16 文档。
- `Giscus` 依赖浏览器 DOM，因此必须保持为 Client Component。
- `src/lib/posts.ts` 使用 Node.js `fs` 和 `path`，只能在服务端路径中使用，不要导入到 Client Component。
- 当前站点元数据在 `src/app/layout.tsx` 和文章页 `generateMetadata` 中维护，新增 SEO 字段时保持两处职责清晰。
