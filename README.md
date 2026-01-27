# 东京行程 - 库洛米风格 🌸

一个基于React 19 + TypeScript + Tailwind CSS 4的东京旅行行程规划网页应用，采用库洛米（Kuromi）粉紫色主题风格，为情侣提供详细的东京旅行攻略。

## ✨ 主要功能

### 1. 完整的6天行程

- **Day 1**: 抵达日 - 成田机场 → 上野 → 秋叶原

- **Day 2**: 浅草 → 横滨 → 晴空塔（20+个景点，200+拍照姿势）

- **Day 3**: 新宿 → 原宿 → 涩谷（时尚购物线）

- **Day 4**: 银座 → 东京站 → 皇居（高端文化线）

- **Day 5**: 台场 → 六本木（现代艺术线）

- **Day 6**: 秋叶原 → 上野 → 离开（动漫文化线）

### 2. 模块化行程规划器 🗺️

- **Step 1**: 选择住宿区域（上野、新宿、涩谷、银座、浅草）

- **Step 2**: 选择景点（50+个景点，支持标签筛选）

- **Step 3**: 自动生成最优路线（TSP算法优化）

### 3. 智能路线规划 🚇

- 使用TSP（旅行商问题）算法自动计算最优路线

- 贪心算法 + 2-opt优化，确保路线最短

- 自动判断交通方式（步行、地铁、电车）

- 预估交通时间和距离

- 集成Google Maps导航

### 4. 丰富的景点数据库 📍

- **50+个精选景点**，覆盖13个区域

- 每个景点包含：
  - 详细历史背景和文化介绍
  - 5个女生拍照姿势
  - 5个情侣互动姿势
  - 专业拍照技巧
  - 周边美食推荐
  - GPS坐标和导航

- 支持标签筛选：文化、购物、美食、自然、动漫等

### 5. 其他特色功能

- ✅ PWA离线功能

- ✅ 日文语音播报

- ✅ 可视化路线图

- ✅ 地铁线路图

- ✅ 进度追踪（打卡功能）

- ✅ Google Maps集成

## 🎨 设计风格

**主题**: 库洛米（Kuromi）粉紫色风格

- 主色：粉色（#ec4899）、紫色（#a855f7）

- 背景：渐变粉紫色

- 装饰元素：星星、爱心、蝴蝶结图标

- 字体：可爱圆润风格

## 🛠️ 技术栈

- **前端框架**: React 19

- **类型系统**: TypeScript

- **样式**: Tailwind CSS 4

- **UI组件**: shadcn/ui

- **路由**: Wouter

- **地图**: Google Maps API

- **PWA**: Service Worker + manifest.json

- **语音**: Web Speech API

- **构建工具**: Vite

## 📂 项目结构

```
tokyo-itinerary-kuromi/
├── client/
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/           # 页面组件
│   │   │   ├── Home.tsx     # 首页
│   │   │   ├── Day2-6.tsx   # 各天详细页面
│   │   │   └── Planner.tsx  # 模块化规划器
│   │   ├── data/
│   │   │   └── spots.ts     # 景点数据库
│   │   ├── utils/
│   │   │   └── tsp.ts       # TSP路线规划算法
│   │   └── App.tsx          # 路由配置
│   └── public/
│       ├── images/          # 图片资源
│       ├── manifest.json    # PWA配置
│       └── sw.js            # Service Worker
├── HANDOVER.md              # 项目交接文档
└── README.md                # 本文件
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 📝 使用说明

### 查看固定行程

1. 访问首页查看6天行程概览

1. 点击任意天数卡片查看详细行程

1. 每个景点都有详细的拍照姿势和美食推荐

### 使用模块化规划器

1. 点击首页的"开始规划"按钮

1. **Step 1**: 选择你的住宿区域

1. **Step 2**: 选择想去的景点（可使用标签筛选）

1. **Step 3**: 查看自动生成的最优路线

1. 点击"在Google Maps中查看"进行导航

### 景点筛选

- 使用标签筛选：文化、购物、美食、自然、动漫等

- 支持多选景点

- 实时显示已选景点数量

## 🔧 核心算法

### TSP路线规划算法

```typescript
// 1. 贪心算法：从起点开始，每次选择最近的未访问点
function greedyTSP(start, locations)

// 2. 2-opt优化：尝试交换路线中的两条边，减少总距离
function twoOptOptimization(route)

// 3. 距离计算：使用Haversine公式计算两点间距离
function calculateDistance(lat1, lng1, lat2, lng2)

// 4. 交通方式判断：根据距离自动选择步行、地铁或电车
function determineTransportMode(distance)
```

## 📊 数据统计

- **景点总数**: 50+

- **覆盖区域**: 13个（浅草、新宿、涩谷、原宿、银座、台场、上野、秋叶原、六本木、池袋、东京站、横滨、镰仓）

- **拍照姿势**: 200+（每个景点5个女生姿势 + 5个情侣姿势）

- **美食推荐**: 100+

- **住宿选项**: 5个区域

## 🌐 在线访问

- **开发服务器**: [https://3000-irz0hv97cxae64f57tn5a-3cfd92ec.sg1.manus.computer](https://3000-irz0hv97cxae64f57tn5a-3cfd92ec.sg1.manus.computer)

- **GitHub仓库**: [https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi](https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi)

## 📚 文档

- [HANDOVER.md](./HANDOVER.md) - 详细的项目交接文档

- [modular_system_architecture.md](../modular_system_architecture.md) - 系统架构设计（如果存在）

## 🔄 Git工作流

### 分支策略

- `main` - 稳定版本，已完成的功能

- `modular-system` - 模块化系统开发（当前分支）

### 提交规范

```bash
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复bug"
git commit -m "docs: 更新文档"
git commit -m "style: 样式调整"
```

## 🐛 已知问题

1. **WebSocket警告**: Vite HMR在代理环境中会显示WebSocket连接失败警告，这是正常现象，不影响功能

1. **Service Worker缓存**: 开发时如果遇到缓存问题，使用Ctrl+Shift+R强制刷新

## 🎯 未来计划

### 短期目标

- [ ] 添加详细交通步骤显示（地铁线路、换乘站、步行时间）

- [ ] 优化移动端体验

- [ ] 添加更多景点照片

### 中期目标

- [ ] 实现用户账户系统

- [ ] 支持自定义行程保存和分享

- [ ] 集成实时天气和交通信息

### 长期目标

- [ ] 添加照片上传和社交功能

- [ ] 支持多语言（日语、英语）

- [ ] 开发移动App版本

## 📄 许可证

本项目为私有项目，仅供内部使用。

## 👥 贡献者

- 项目创建者：[Tsaojason-cao](https://github.com/Tsaojason-cao)

- AI助手：Manus

---

**最后更新**: 2026-01-27**版本**: 2.0**项目状态**: ✅ 核心功能已完成

💜 祝你的东京之旅愉快！💜

