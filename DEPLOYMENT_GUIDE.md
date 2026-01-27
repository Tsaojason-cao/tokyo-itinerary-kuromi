# 🚀 东京行程项目 - 永久部署指南

本文档提供多种免费的永久部署方案，您可以根据需求选择最适合的方式。

---

## 📋 目录

1. [GitHub Pages部署（推荐）](#1-github-pages部署推荐)
2. [Netlify部署](#2-netlify部署)
3. [Cloudflare Pages部署](#3-cloudflare-pages部署)
4. [Vercel部署](#4-vercel部署)

---

## 1. GitHub Pages部署（推荐）

### ✨ 优势
- ✅ 完全免费
- ✅ 自动部署（推送代码即部署）
- ✅ 稳定可靠
- ✅ 支持自定义域名
- ✅ 已配置好GitHub Actions

### 📝 部署步骤

#### 步骤1: 启用GitHub Pages

1. 访问GitHub仓库：https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下选择：
   - Source: **GitHub Actions**
5. 保存设置

#### 步骤2: 推送代码触发部署

```bash
git add .
git commit -m "Enable GitHub Pages deployment"
git push origin modular-system
```

#### 步骤3: 等待部署完成

1. 访问 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待构建完成（约2-3分钟）
4. 部署成功后，访问：

**🌐 网站地址**: https://tsaojason-cao.github.io/tokyo-itinerary-kuromi/

### 🔧 自定义域名（可选）

1. 在仓库Settings → Pages中
2. 在 **Custom domain** 输入您的域名
3. 在域名DNS设置中添加CNAME记录：
   ```
   CNAME记录: www → tsaojason-cao.github.io
   ```

---

## 2. Netlify部署

### ✨ 优势
- ✅ 免费额度充足
- ✅ 部署速度快
- ✅ 自动HTTPS
- ✅ 表单处理和无服务器函数

### 📝 部署步骤

#### 方式1: 一键部署

点击按钮一键部署：

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi)

#### 方式2: 手动导入

1. 访问 [Netlify](https://www.netlify.com/)
2. 使用GitHub账号登录
3. 点击 **Add new site** → **Import an existing project**
4. 选择GitHub，授权访问
5. 选择 `tokyo-itinerary-kuromi` 仓库
6. 配置构建设置：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`
   - **Branch**: `modular-system`
7. 点击 **Deploy site**

#### 方式3: 使用Netlify CLI

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

### 📋 netlify.toml配置

项目已包含配置文件：

```toml
[build]
  command = "pnpm build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 3. Cloudflare Pages部署

### ✨ 优势
- ✅ 全球CDN加速
- ✅ 无限带宽
- ✅ 快速部署
- ✅ 免费SSL证书

### 📝 部署步骤

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 使用GitHub账号登录
3. 点击 **Create a project**
4. 选择 `tokyo-itinerary-kuromi` 仓库
5. 配置构建设置：
   - **Framework preset**: Vite
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist/public`
   - **Root directory**: `/`
   - **Environment variables**: 无需配置
6. 点击 **Save and Deploy**

### 🌐 访问地址

部署成功后，您将获得：
- **Cloudflare域名**: `tokyo-itinerary-kuromi.pages.dev`
- 支持绑定自定义域名

---

## 4. Vercel部署

### ✨ 优势
- ✅ 部署速度极快
- ✅ 自动预览部署
- ✅ 边缘网络优化
- ✅ 无服务器函数支持

### 📝 部署步骤

#### 方式1: 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi)

#### 方式2: 手动导入

1. 访问 [Vercel](https://vercel.com/)
2. 使用GitHub账号登录
3. 点击 **Add New...** → **Project**
4. 导入 `tokyo-itinerary-kuromi` 仓库
5. 配置会自动检测，直接点击 **Deploy**

#### 方式3: 使用Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

## 📊 部署方案对比

| 特性 | GitHub Pages | Netlify | Cloudflare Pages | Vercel |
|------|--------------|---------|------------------|--------|
| **免费额度** | 无限 | 100GB/月 | 无限 | 100GB/月 |
| **构建时间** | 中等 | 快 | 快 | 最快 |
| **自动部署** | ✅ | ✅ | ✅ | ✅ |
| **自定义域名** | ✅ | ✅ | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ | ✅ | ✅ |
| **CDN** | ✅ | ✅ | ✅（最快） | ✅ |
| **无服务器函数** | ❌ | ✅ | ✅ | ✅ |
| **推荐指数** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🔧 构建配置

所有平台都使用相同的构建配置：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install",
  "nodeVersion": "22"
}
```

---

## 🌐 访问地址汇总

部署完成后，您将获得以下地址：

- **GitHub Pages**: https://tsaojason-cao.github.io/tokyo-itinerary-kuromi/
- **Netlify**: https://tokyo-itinerary-kuromi.netlify.app
- **Cloudflare Pages**: https://tokyo-itinerary-kuromi.pages.dev
- **Vercel**: https://tokyo-itinerary-kuromi.vercel.app

---

## 🔄 自动部署

所有平台都支持自动部署：

- **推送到 `modular-system` 分支** → 自动部署到生产环境
- **创建 Pull Request** → 自动创建预览部署
- **合并 PR** → 自动部署到生产环境

---

## 🐛 故障排除

### 构建失败

1. 检查 `pnpm build` 在本地是否成功
2. 查看构建日志
3. 确认Node版本为22.x
4. 确认所有依赖已安装

### 页面404

1. 检查路由配置
2. 确认SPA重定向规则已配置
3. 检查base路径配置

### 样式丢失

1. 检查CSS文件路径
2. 确认Tailwind CSS配置正确
3. 清除缓存重新构建

---

## 📞 获取帮助

- [GitHub Pages文档](https://docs.github.com/pages)
- [Netlify文档](https://docs.netlify.com/)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [Vercel文档](https://vercel.com/docs)
- [项目Issues](https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi/issues)

---

## 🎯 推荐方案

**对于本项目，我推荐使用 GitHub Pages**，原因：

1. ✅ 完全免费，无流量限制
2. ✅ 已配置好GitHub Actions，推送即部署
3. ✅ 与GitHub仓库深度集成
4. ✅ 稳定可靠，由GitHub维护
5. ✅ 支持自定义域名

**如果需要更快的全球访问速度，推荐使用 Cloudflare Pages**。

---

**注意**: 本项目已配置好所有必要的部署文件，您只需要选择一个平台并按照步骤操作即可完成部署。

💜 祝部署顺利！💜
