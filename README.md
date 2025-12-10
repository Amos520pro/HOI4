# 钢铁雄心4玩家指南 - 网站使用与维护指南

## 项目概述

这是一个为《钢铁雄心4》玩家打造的资源导航、攻略索引与社区交流平台。网站提供游戏资源信息、详细攻略、社区推荐等功能，帮助玩家更好地体验游戏。

## 技术栈

- **前端框架**: React 18+
- **编程语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由管理**: React Router
- **状态管理**: 本地状态 + Context API
- **动画效果**: Framer Motion
- **图标库**: Font Awesome
- **通知组件**: Sonner

## 部署指南

### 前提条件

在部署网站之前，确保您已安装以下软件：

- [Node.js](https://nodejs.org/) (v16 或更高版本)
- [npm](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/)

### 本地开发

1. 克隆或下载项目代码
2. 在项目根目录运行以下命令安装依赖：

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

3. 启动本地开发服务器：

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

4. 打开浏览器访问 `http://localhost:3000`

### 构建与部署

1. 在项目根目录运行以下命令构建生产版本：

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

2. 构建完成后，`dist` 目录中包含了所有可以直接部署的静态文件

3. 您可以选择以下方式部署：

   - 使用 [Netlify](https://www.netlify.com/)、[Vercel](https://vercel.com/)、[GitHub Pages](https://pages.github.com/) 等平台一键部署
   - 将 `dist` 目录中的文件上传到您自己的 Web 服务器
   - 使用容器化技术（如 Docker）部署

## 网站维护与更新

### 如何保存现有代码

1. 建议使用版本控制系统如 Git 管理代码：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到远程仓库（如 GitHub、GitLab 等）
git remote add origin <your-repository-url>
git push -u origin main
```

2. 定期备份代码，特别是在进行重大修改之前

### 如何返回获取帮助进行修改

当您需要修改网站时，可以：

1. 保存当前代码的状态（使用 Git 提交或创建备份）
2. 保留项目的结构和关键文件，以便于理解现有功能
3. 提供具体的修改需求，包括：
   - 需要修改的页面或功能
   - 期望的新功能描述
   - 设计或布局的具体变化

### 重新部署更新后的网站

修改完成后，按照以下步骤重新部署：

1. 确保所有修改已保存
2. 运行构建命令生成最新的生产版本：

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

3. 将最新的构建文件部署到您的托管平台

## 自定义内容

### 修改游戏攻略

网站的攻略内容存储在 `src/pages/Guides.tsx` 文件中，您可以直接编辑此文件添加或修改攻略。

### 更新DLC信息

DLC信息存储在 `src/pages/Resources.tsx` 文件中，您可以根据游戏的更新情况修改此文件中的DLC列表。

### 更改主题

网站支持明暗两种主题，用户可以通过导航栏上的主题切换按钮切换。主题设置会保存在浏览器的本地存储中。

## 常见问题解决

### 页面加载缓慢

- 优化图片大小和格式
- 考虑使用CDN加速静态资源
- 检查是否有不必要的大型依赖

### 部署后某些功能不正常

- 检查浏览器控制台是否有错误信息
- 确保API调用正确配置（如果使用了外部API）
- 验证路由配置是否正确

## 注意事项

- 本网站仅提供游戏资源的导航和参考信息，不提供游戏下载
- 网站内容仅供学习和参考，所有商标和版权归其各自所有者所有
- 定期更新内容以保持信息的准确性和时效性

---

祝您使用愉快！如有任何问题，请随时寻求帮助。