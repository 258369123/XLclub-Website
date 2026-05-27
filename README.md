# XLclub Website

XLclub Website 是一个纯前端、静态生成的团队展示站点。项目采用固定舞台式单页交互：页面四周导航和信息栏保持固定，中间内容区域在首页、成员、荣誉、关于之间切换，

## 技术栈

- Astro 6：静态站点生成和页面入口。
- React 19：承载核心交互组件。
- Motion for React：页面切换和列表动效。
- Tailwind CSS 4：原子化样式和主题变量。
- TypeScript：数据结构约束和组件类型检查。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

```txt
http://127.0.0.1:4321/
```

常用命令：

```bash
npm run check
npm run build
npm run preview
```

## 内容维护

### 站点基础信息

修改 `src/data/site.ts`：

```ts
const siteName = "湘岚实验室";
const siteEmail = "hello@xlclub.dev";
```

首页打字机文案在这里维护：

```ts
typewriterLines: [
  "一个专注信息安全、工程实践与技术表达的小型团队。",
  "我们重视高密度训练、可复用工具和经得起复盘的成果。",
  "把竞赛复盘、工具建设和公开表达沉淀成长期资产。",
],
```

### 成员数据

修改 `src/data/members.ts`：

```ts
{
  id: "x-01",
  name: "星野",
  grade: "2026 级",
  track: "竞赛",
  role: "网站安全",
  avatar: "/avatars/member.jpg",
  intro: "关注网站漏洞利用、源码审计和题目复盘。",
  links: [{ label: "博客", href: "https://example.com" }],
}
```

成员头像支持三种展示方式：

- 本地图片：`avatar: "/avatars/member.jpg"`
- 远程图片：`avatar: "https://example.com/avatar.jpg"`
- 默认文字：`avatar: "星"`

如果图片加载失败，页面会自动回退到文字头像。头像有有效链接时，点击头像会跳转到成员的第一个有效链接。


### 荣誉数据

修改 `src/data/honors.ts`：

```ts
{
  year: "2026",
  title: "春季建设周",
  result: "完成 12 个演示项目",
  tag: "内部训练",
}
```

荣誉页面保留表格样式，适合展示竞赛成绩、项目记录、活动、复盘成果等结构化内容。

### 关于页面

修改 `src/data/about.ts`。每个 section 可以包含段落或列表：

```ts
{
  title: "研究领域",
  items: [
    "web安全与漏洞利用",
    "逆向工程与二进制安全",
  ],
}
```

关于页正文区域支持内部滚动，标题固定在顶部。

## 维护建议

- 优先修改 `src/data` 中的数据文件，不要直接在组件里写死内容。
- 新增成员时确保 `id` 唯一。
- 新增图片资源时放到 `public`，引用路径从 `/` 开始。
- 改动页面结构后运行 `npm run check` 和 `npm run build`。
- 如果改动移动端布局，至少检查一个窄屏视口，确认固定舞台没有偏移到左上角。
