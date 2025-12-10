# 部署指南：将钢铁雄心4玩家指南部署到GitHub Pages

## 1. 准备工作

在开始部署之前，请确保您已经完成以下准备工作：

- **GitHub账号**：如果没有，请先注册一个GitHub账号
- **Git安装**：确保您的电脑上已安装Git版本控制系统
- **Node.js环境**：确保已安装Node.js（推荐16.x或更高版本）
- **pnpm包管理器**：项目使用pnpm，确保已安装（可通过`npm install -g pnpm`安装）
- **项目代码**：确保您已经有完整的项目代码

## 2. 创建GitHub仓库

1. 登录GitHub并点击右上角的"+"按钮，选择"New repository"
2. 填写仓库信息：
   - Repository name: 输入您的仓库名称（例如 `hoi4-guide`）
   - Description: 可选，添加简短描述
   - 设置仓库为公开或私有
   - 不要勾选"Initialize this repository with a README"
   - 点击"Create repository"

## 3. 配置本地项目

打开命令行工具，导航到您的项目根目录，执行以下命令：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加远程仓库连接
git remote add origin https://github.com/您的用户名/您的仓库名称.git

# 将代码添加到暂存区
git add .

# 提交代码
git commit -m "Initial commit"

# 推送到GitHub
git push -u origin main
```

## 4. 配置项目以支持GitHub Pages

1. 首先修改 `package.json` 文件，添加 `homepage` 字段：

```json
{
  "name": "project_template_react",
  "private": true,
  "version": "0.0.1",
  "homepage": "https://您的用户名.github.io/您的仓库名称",
  // 其他配置保持不变
}
```

2. 安装 `gh-pages` 包用于部署：

```bash
pnpm add -D gh-pages
```

3. 在 `package.json` 中的 `scripts` 部分添加部署脚本：

```json
"scripts": {
  "dev:client": "vite --host --port 3000",
  "dev": "pnpm dev:client",
  "build:client": "vite build --outDir dist/static",
  "build": "rm -rf dist && pnpm build:client && cp package.json dist && touch dist/build.flag",
  "predeploy": "pnpm build",
  "deploy": "gh-pages -d dist/static"
}
```

## 5. 执行部署

执行以下命令进行部署：

```bash
# 安装所有依赖
pnpm install

# 执行部署命令
pnpm run deploy
```

这个命令会：
1. 首先构建项目（`predeploy` 脚本会自动运行）
2. 然后将构建后的文件（位于 `dist/static` 目录）部署到GitHub Pages

## 6. 配置GitHub Pages设置

1. 登录GitHub，进入您的仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧菜单中选择 "Pages"
4. 在 "Build and deployment" 部分：
   - Source: 确保选择了 "Deploy from a branch"
   - Branch: 选择 `gh-pages` 分支和 `/ (root)` 目录
   - 点击 "Save" 按钮

## 7. 验证部署

部署完成后，通常需要等待几分钟让GitHub Pages生效。然后可以通过以下步骤验证：

1. 在浏览器中访问 `https://您的用户名.github.io/您的仓库名称`
2. 检查网站是否正常加载和运行

## 8. 后续更新部署

每当您对项目进行修改并希望更新网站时，只需执行以下步骤：

1. 将更改提交到本地Git仓库：

```bash
git add .
git commit -m "描述您的更改"
git push origin main
```

2. 执行部署命令：

```bash
pnpm run deploy
```

## 9. 常见问题解决

- **部署后页面显示空白**：检查 `package.json` 中的 `homepage` 配置是否正确
- **资源路径错误**：确保使用相对路径引用资源，而不是绝对路径
- **GitHub Pages设置未生效**：尝试等待几分钟或刷新设置页面后再次保存
- **构建失败**：检查是否有依赖问题，尝试删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装依赖

如果您在部署过程中遇到任何问题，可以随时参考GitHub Pages的官方文档或寻求进一步帮助。