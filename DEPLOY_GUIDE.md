# 部署指南：将钢铁雄心4玩家指南部署到GitHub Pages

## 完整部署流程

> **注意**：不能直接上传代码到GitHub，需要按照以下步骤进行配置和部署！

### 1. 准备工作

在开始部署之前，请确保您已经完成以下准备工作：

- **GitHub账号**：如果没有，请先注册一个GitHub账号
- **Git安装**：确保您的电脑上已安装Git版本控制系统
- **Node.js环境**：确保已安装Node.js（推荐16.x或更高版本）
- **pnpm包管理器**：项目使用pnpm，确保已安装（可通过`npm install -g pnpm`安装）
- **项目代码**：确保您已经下载了完整的项目代码

### 2. 创建GitHub仓库

1. 登录GitHub并点击右上角的"+"按钮，选择"New repository"
2. 填写仓库信息：
   - Repository name: 输入您的仓库名称（例如 `hoi4-guide`）
   - Description: 可选，添加简短描述
   - 设置仓库为公开或私有
   - **不要**勾选"Initialize this repository with a README"
   - 点击"Create repository"

### 3. 配置本地项目（关键步骤）

打开命令行工具，导航到您的项目根目录，执行以下命令：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加远程仓库连接（替换为您的实际GitHub用户名和仓库名称）
git remote add origin https://github.com/您的用户名/您的仓库名称.git

# 手动修改package.json中的homepage字段
# 打开package.json文件，将"homepage": "https://用户名.github.io/仓库名"
# 替换为"homepage": "https://您的用户名.github.io/您的仓库名称"

# 将代码添加到暂存区
git add .

# 提交代码
git commit -m "Initial commit"

# 推送到GitHub
git push -u origin main
```

### 4. 执行部署命令（关键步骤）

完成上述配置后，执行以下命令进行部署：

```bash
# 安装所有依赖（这一步很重要，不能省略）
pnpm install

# 执行部署命令
pnpm run deploy
```

这个命令会自动：
1. 构建项目（生成优化后的静态文件到`dist`目录）
2. 将构建后的文件部署到GitHub Pages的`gh-pages`分支

### 5. 验证部署结果

部署完成后，通常需要等待几分钟让GitHub Pages生效。然后可以：

1. 在浏览器中访问 `https://您的用户名.github.io/您的仓库名称`
2. 检查网站是否正常加载和运行

### 6. 后续更新部署

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

## 重要说明

- **不能省略安装依赖**：`pnpm install` 命令是部署前的必要步骤，确保所有依赖正确安装
- **必须修改homepage**：package.json中的homepage字段必须设置为您的GitHub Pages实际地址
- **自动路由适配**：项目已配置自动检测GitHub Pages环境并使用HashRouter，确保路由正常工作
- **等待生效时间**：部署后可能需要等待5-10分钟，GitHub Pages才能完全生效

## 常见问题解决

- **部署后页面显示空白**：检查 `package.json` 中的 `homepage` 配置是否正确
- **资源路径错误**：项目使用相对路径引用资源，避免了绝对路径问题
- **构建失败**：尝试删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装依赖

如果您在部署过程中遇到任何问题，可以随时参考GitHub Pages的官方文档或寻求进一步帮助。