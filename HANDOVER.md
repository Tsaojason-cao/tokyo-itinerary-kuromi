# 东京行程库洛米风格项目交接文档

## 📋 项目概述

这是一个基于React 19 + Tailwind CSS 4的东京旅行行程规划网页应用，采用库洛米（Kuromi）粉紫色主题风格，为情侣提供详细的东京旅行攻略，包含景点信息、拍照姿势、美食推荐、地铁导航等功能。

**项目名称**：tokyo-itinerary-kuromi  
**GitHub仓库**：https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi  
**当前分支**：
- `main` - 主分支，包含Day1和Day2完整页面
- `modular-system` - 模块化系统开发分支（进行中）

## 🎯 项目目标

创建一个**模块化的东京行程规划系统**，支持：
1. 自由选择住宿地点（上野、新宿、涩谷、银座等）
2. 自由选择景点并自动规划最优路线
3. 详细的地铁导航（包含换乘步骤、车厢位置、出口信息）
4. 每个景点包含：历史故事、特别说明、拍照姿势（女生+情侣）、美食推荐
5. 离线可用（PWA）、语音播报、多语言支持

## 📁 项目结构

```
tokyo-itinerary-kuromi/
├── client/                          # 前端代码
│   ├── public/                      # 静态资源
│   │   ├── images/                  # 图片资源
│   │   │   └── tokyo-metro-map.jpg  # 东京地铁线路图
│   │   ├── manifest.json            # PWA配置
│   │   └── sw.js                    # Service Worker（离线功能）
│   ├── src/
│   │   ├── components/              # 可复用组件
│   │   │   ├── ui/                  # shadcn/ui组件
│   │   │   ├── Map.tsx              # Google Maps组件
│   │   │   └── VisualRouteMap.tsx   # 可视化路线图组件
│   │   ├── pages/                   # 页面组件
│   │   │   ├── Home.tsx             # 首页（6天行程概览）
│   │   │   ├── Day2.tsx             # 第2天详细页面（浅草→横滨→晴空塔）
│   │   │   └── Day3.tsx             # 第3天页面框架（待完成）
│   │   ├── App.tsx                  # 路由配置
│   │   ├── main.tsx                 # 入口文件
│   │   └── index.css                # 全局样式（库洛米主题）
│   └── index.html                   # HTML模板
├── server/                          # 服务端（占位符）
├── shared/                          # 共享代码
└── package.json                     # 依赖配置
```

## ✅ 已完成功能

### Day1页面（Home.tsx）
- 6天行程概览卡片
- 每天的主要景点和亮点
- 导航到各天详细页面

### Day2页面（Day2.tsx）- **完整示例**
- ✅ **20个详细景点**，每个包含：
  - 历史故事和文化背景
  - 特别说明（冷知识）
  - 5个女生拍照姿势（重点）
  - 5个情侣互动姿势
  - 4-5个专业拍照技巧
  - 周边美食推荐
  - GPS坐标和Google Maps导航
  - 日文语音播报
- ✅ **可视化路线图**（9个步骤）
- ✅ **地铁指引**（包含东京地铁线路图）
- ✅ **进度追踪**（可勾选已完成的打卡点）
- ✅ **PWA离线功能**

### 核心组件
- **VisualRouteMap.tsx** - 可视化路线图组件，显示每个步骤的交通方式和时间
- **Map.tsx** - Google Maps集成，支持导航功能

## 🚧 进行中的工作

### 模块化系统架构（modular-system分支）
正在开发一个完全模块化的系统，允许用户自由组合行程。详见 `/home/ubuntu/modular_system_architecture.md`

**核心模块**：
1. **住宿模块** - 支持多个区域选择
2. **景点模块** - 包含所有景点的详细信息
3. **路线规划模块** - 自动计算最优路线
4. **地铁导航模块** - 实时显示换乘路线

**待完成任务**：详见 `/home/ubuntu/todo.md`

## 📊 数据文件

### 已准备的数据
- `/home/ubuntu/day3_spots.json` - Day3（2/8）的7个景点数据
- `/home/ubuntu/detailed_poses.json` - 详细的拍照姿势数据
- `/home/ubuntu/photo_tips.md` - 浅草和横滨的拍照技巧
- `/home/ubuntu/Tokyo_Itinerary_Final_Complete.md` - 完整的6天行程原始文档

### 数据结构示例
```typescript
interface Spot {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  coords: string;  // GPS坐标 "lat,lng"
  history: string;  // 历史故事
  special: string;  // 特别说明
  photoTips: string[];  // 拍照技巧
  food: string[];  // 美食推荐
  femalePoses: string[];  // 女生拍照姿势（5个）
  couplePoses: string[];  // 情侣互动姿势（5个）
}
```

## 🛠️ 技术栈

- **前端框架**：React 19
- **路由**：Wouter
- **样式**：Tailwind CSS 4
- **UI组件**：shadcn/ui
- **地图**：Google Maps API（通过Manus代理）
- **PWA**：Service Worker + manifest.json
- **语音**：Web Speech API
- **构建工具**：Vite

## 🎨 设计风格

**主题**：库洛米（Kuromi）粉紫色风格
- 主色：粉色（#ec4899）、紫色（#a855f7）
- 背景：渐变粉紫色
- 装饰元素：星星、爱心、蝴蝶结图标
- 字体：可爱圆润风格

**设计原则**：
- 可爱但不失专业
- 信息密度高但易读
- 适合情侣使用
- 强调拍照和打卡功能

## 📝 开发指南

### 本地开发
```bash
cd /home/ubuntu/tokyo-itinerary-kuromi
pnpm install
pnpm dev
# 访问 https://3000-xxx.manus.computer
```

### 创建新的Day页面
1. 复制 `Day2.tsx` 作为模板
2. 更新日期、标题、景点数据
3. 在 `App.tsx` 添加路由
4. 在 `Home.tsx` 添加导航链接

### 添加新景点
参考Day2的`spots`数组结构，确保包含所有必需字段：
- 基本信息：id, title, subtitle, icon, coords
- 详细内容：history, special, photoTips, food
- 拍照姿势：femalePoses (5个), couplePoses (5个)

### 保存检查点
```bash
# 使用webdev工具保存检查点
# 在Manus界面中会自动调用
```

## 🔄 Git工作流

### 分支策略
- `main` - 稳定版本，已完成的功能
- `modular-system` - 模块化系统开发
- 其他功能分支根据需要创建

### 提交规范
```bash
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复bug"
git commit -m "docs: 更新文档"
git commit -m "style: 样式调整"
```

### 同步到GitHub
```bash
git push github <branch-name>
```

## 📚 重要文档

1. **系统架构设计**：`/home/ubuntu/modular_system_architecture.md`
2. **待办事项清单**：`/home/ubuntu/todo.md`
3. **原始行程文档**：`/home/ubuntu/Tokyo_Itinerary_Final_Complete.md`
4. **项目README**：`/home/ubuntu/tokyo-itinerary-kuromi/README.md`（待创建）

## 🐛 已知问题

1. **WebSocket警告**：Vite HMR在Manus代理环境中会显示WebSocket连接失败警告，这是正常现象，不影响功能
2. **Service Worker缓存**：开发时如果遇到缓存问题，使用Ctrl+Shift+R强制刷新
3. **Day3-6页面**：尚未完成，需要继续开发

## 🚀 下一步计划

### 短期目标（1-2周）
1. 完成模块化系统的核心框架
2. 搜索并整理所有主要景点的详细数据
3. 创建住宿选择和景点选择界面

### 中期目标（1个月）
1. 完成Day3-6页面
2. 实现路线自动规划功能
3. 完善地铁导航模块

### 长期目标（2-3个月）
1. 添加用户账户系统
2. 支持自定义行程保存和分享
3. 集成实时天气和交通信息
4. 添加照片上传和社交功能

## 📞 联系方式

如有问题或需要协助，请通过以下方式联系：
- GitHub Issues: https://github.com/Tsaojason-cao/tokyo-itinerary-kuromi/issues
- 项目文档：本文件

## 📄 许可证

本项目为私有项目，仅供内部使用。

---

**最后更新**：2026-01-27  
**文档版本**：1.0  
**项目状态**：开发中
