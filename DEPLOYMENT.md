# 部署指南

本项目已配置好所有部署文件，可以轻松部署到Vercel。

## 🚀 快速部署到Vercel

### 方式1: 一键部署（推荐）

点击下面的按钮一键部署到Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi)

### 方式2: 通过Vercel网站部署

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "Add New..." → "Project"
4. 导入 `Tsaojason-cao/tokyo-itinerary-kuromi` 仓库
5. Vercel会自动检测配置并开始部署
6. 等待部署完成（约2-3分钟）
7. 获得永久访问URL

### 方式3: 使用Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署到生产环境
vercel --prod
```

## 📋 部署配置

项目已包含以下配置文件：

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 构建设置
- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`
- **Node Version**: 22.x

## 🔧 环境变量

本项目不需要额外的环境变量即可运行。

如果需要添加分析工具，可以在Vercel项目设置中添加：
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

## 📦 构建产物

运行 `pnpm build` 后，构建产物位于：
- 前端静态文件: `dist/public/`
- 后端服务: `dist/index.js`

## 🌐 自定义域名

部署完成后，您可以在Vercel项目设置中添加自定义域名：

1. 进入项目设置 → Domains
2. 添加您的域名
3. 按照提示配置DNS记录
4. 等待DNS生效（通常几分钟到几小时）

## 🔄 自动部署

连接GitHub后，每次推送代码到 `modular-system` 分支都会自动触发部署：

- **Push to main/modular-system** → 自动部署到生产环境
- **Pull Request** → 自动创建预览部署

## 📊 部署状态

部署完成后，您可以在Vercel仪表板查看：
- 部署历史
- 构建日志
- 访问统计
- 性能指标

## 🐛 故障排除

### 构建失败
1. 检查 `pnpm build` 在本地是否成功
2. 查看Vercel构建日志
3. 确认Node版本兼容性

### 页面404
1. 检查 `vercel.json` 中的rewrites配置
2. 确认outputDirectory设置正确

### 样式丢失
1. 检查CSS文件是否正确打包
2. 确认Tailwind CSS配置正确

## 📞 获取帮助

- [Vercel文档](https://vercel.com/docs)
- [Vite部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Issues](https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi/issues)

---

**注意**: 本项目已配置好所有必要的部署文件，您只需要导入到Vercel即可完成部署。
