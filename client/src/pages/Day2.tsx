import { useState } from "react";
import { JapaneseText } from "@/components/JapaneseText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, 
  Train, 
  Camera, 
  Cloud, 
  Navigation, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Heart,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

export default function Day2() {
  const [checkedSpots, setCheckedSpots] = useState<Set<string>>(new Set());
  
  const toggleSpot = (id: string) => {
    const newSet = new Set(checkedSpots);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedSpots(newSet);
  };

  const progress = (checkedSpots.size / 12) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                <Heart className="w-8 h-8 fill-pink-400 text-pink-400" />
                东京浪漫之旅
              </h1>
              <p className="text-sm text-purple-600/70 mt-1">2/6 - 2/11 · 库洛米风格行程</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Star className="w-3 h-3 mr-1 fill-purple-400" />
                第2天
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Progress Card */}
        <Card className="mb-6 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              今日完成度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>已完成 {checkedSpots.size} / 12 个打卡点</span>
                <span className="text-purple-600 font-semibold">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="mb-6 border-purple-200 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-500" />
              2月7日天气
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-blue-600">13°C</div>
                <div className="text-sm text-gray-600 mt-1">晴天</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>💧 湿度: 55%</div>
                <div>🌬️ 风速: 2m/s</div>
                <div className="mt-2 text-purple-600 font-medium">建议穿搭：和服+羽织外套</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Reminders */}
        <Card className="mb-6 border-orange-200 bg-orange-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              重要提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
              <p className="text-sm text-orange-800">
                <strong>和服租赁</strong> - 建议提前预约，20:00前归还
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
              <p className="text-sm text-orange-800">
                <strong>横滨烟火大会</strong> - 19:00-19:05，18:30前占位
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Highlight Card for Fireworks */}
        <Card className="mb-6 border-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <Sparkles className="w-6 h-6" />
              今日亮点：横滨烟火大会
            </CardTitle>
            <CardDescription className="text-pink-700">
              19:00-19:05 · 约3,000发烟火 · 山下公园最佳观赏点
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">最佳观赏点</h4>
                <p className="text-sm text-gray-700">
                  <strong>山下公园</strong>（推荐★★★★★）- 正对发射点，可拍摄烟火+海面倒影+横滨地标塔同框
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">占位策略</h4>
                <p className="text-sm text-gray-700">
                  18:00-18:30抵达，选择玫瑰园区域，既能拍到烟火，又能以横滨地标塔为背景
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="route" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-purple-100">
            <TabsTrigger value="route" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Navigation className="w-4 h-4 mr-2" />
              路线导航
            </TabsTrigger>
            <TabsTrigger value="subway" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Train className="w-4 h-4 mr-2" />
              地铁指引
            </TabsTrigger>
            <TabsTrigger value="photo" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              拍照打卡
            </TabsTrigger>
          </TabsList>

          {/* Route Tab */}
          <TabsContent value="route" className="space-y-4">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  上午：浅草和服体验
                </CardTitle>
                <CardDescription>和服租赁 → 浅草寺 → 传统艺能馆</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="浅草駅" chinese="浅草站" /> 1号出口
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从上野APA酒店出发，乘坐银座线到浅草站，1号出口出站步行1分钟到和服租赁店
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="浅草寺" chinese="浅草寺" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        雷门 → 仲见世大道 → 浅草寺本堂 → 五重塔，步行约2分钟
                      </p>
                      <Badge className="mt-2 bg-blue-100 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        建议游览时间：1.5小时
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="浅草伝統芸能館" chinese="浅草传统艺能馆" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从浅草寺步行8分钟，观赏落语/日本舞蹈表演
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  下午-傍晚：横滨港浪漫之旅
                </CardTitle>
                <CardDescription>红砖仓库 → 山下公园 → 烟火大会 → 中华街</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <img 
                    src="/images/cute_kuromi_map_2_7.png" 
                    alt="2月7日路线图 - 中日英三语对照" 
                    className="w-full rounded-lg border-2 border-purple-200 shadow-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    路线图包含中文、日文和英文说明，方便在日本使用
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                    <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      ★
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-pink-900">
                        <JapaneseText japanese="山下公園" chinese="山下公园" /> - 烟火最佳观赏点
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>18:00-18:30抵达占位</strong>，选择玫瑰园区域，19:00-19:05烟火表演
                      </p>
                      <div className="mt-2 p-2 bg-white rounded">
                        <p className="text-xs text-gray-600">
                          📸 拍摄技巧：烟火占画面2/3，海面倒影占1/3，可将横滨地标塔放在画面下方
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="赤レンガ倉庫" chinese="红砖仓库" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从元町·中华街站A1出口步行10分钟，复古建筑+购物+美食
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="中華街" chinese="中华街" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        烟火后可在中华街享用晚餐，推荐萬珍楼（粤菜）或聘珍楼（点心）
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  晚上：归还和服 + 晴空塔夜景
                </CardTitle>
                <CardDescription>确保20:00前归还和服，然后前往晴空塔</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      6
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        归还和服
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从横滨返回浅草，乘坐港未来线→新桥站→换乘都营浅草线→浅草站1号出口，约45分钟
                      </p>
                      <Badge className="mt-2 bg-orange-100 text-orange-700">
                        <Clock className="w-3 h-3 mr-1" />
                        确保20:00前抵达
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      7
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="東京スカイツリー" chinese="东京晴空塔" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从浅草站乘坐东武晴空塔线1站到东京晴空塔站，A出口步行3分钟
                      </p>
                      <p className="text-sm text-purple-600 mt-2">
                        🌟 19:00后有3D灯光秀，可在SKYTREE CAFE用餐
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subway Tab */}
          <TabsContent value="subway" className="space-y-4">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-purple-600" />
                  上野 → 浅草（银座线）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">线路信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">出发站：</span>
                        <span className="font-medium">上野站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">到达站：</span>
                        <span className="font-medium">浅草站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">方向：</span>
                        <span className="font-medium text-orange-600">浅草方向</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">站数：</span>
                        <span className="font-medium text-orange-600">5站</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">乘车要点</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>银座线是橙色线路</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>从1号出口出站最近</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>车程约8分钟</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-blue-600" />
                  浅草 → 横滨（都营浅草线+港未来线）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">线路信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">出发站：</span>
                        <span className="font-medium">浅草站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">换乘站：</span>
                        <span className="font-medium">新桥站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">到达站：</span>
                        <span className="font-medium">元町·中华街站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">总时间：</span>
                        <span className="font-medium text-blue-600">约50分钟</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">换乘指引</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>浅草站乘都营浅草线往西马込方向</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>新桥站站内换乘港未来线</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>元町·中华街站A1出口出站</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    温馨提示
                  </h4>
                  <p className="text-sm text-yellow-800">
                    新桥站换乘时跟随"港未来线"指示牌，换乘通道约5分钟步行距离
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photo Tab */}
          <TabsContent value="photo" className="space-y-4">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  今日拍照打卡清单
                </CardTitle>
                <CardDescription>
                  点击勾选已完成的打卡点，追踪您的拍照进度
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    id: "kaminarimon",
                    title: "雷门",
                    location: "浅草寺入口",
                    tip: "穿和服站在雷门下方，从正面拍摄完整的雷门和大灯笼",
                    time: "上午9:30-11:00光线最佳",
                    icon: "⛩️"
                  },
                  {
                    id: "nakamise",
                    title: "仲见世大道",
                    location: "浅草寺参道",
                    tip: "在传统商店街拍摄和服背影，营造穿越感",
                    time: "上午人少时最佳",
                    icon: "🏮"
                  },
                  {
                    id: "sensoji",
                    title: "浅草寺本堂",
                    location: "浅草寺",
                    tip: "在本堂前拍摄祈福照片，可以拍摄抽签或参拜的瞬间",
                    time: "全天开放",
                    icon: "🏯"
                  },
                  {
                    id: "five-story-pagoda",
                    title: "五重塔",
                    location: "浅草寺",
                    tip: "从低角度仰拍五重塔，穿和服的人物站在塔前",
                    time: "上午侧光最佳",
                    icon: "🗼"
                  },
                  {
                    id: "rickshaw",
                    title: "人力车体验",
                    location: "浅草寺门口",
                    tip: "情侣同坐人力车，车夫会帮拍专业情侣照",
                    time: "预约时间",
                    icon: "🛺"
                  },
                  {
                    id: "red-brick",
                    title: "横滨红砖仓库",
                    location: "横滨港",
                    tip: "拍摄复古红砖建筑外观，傍晚时分光线柔和",
                    time: "16:00-18:00最佳",
                    icon: "🏛️"
                  },
                  {
                    id: "yamashita-park",
                    title: "山下公园",
                    location: "横滨港",
                    tip: "拍摄海滨长廊和横滨地标塔，夕阳时分最美",
                    time: "傍晚夕阳时分",
                    icon: "🌅"
                  },
                  {
                    id: "fireworks-1",
                    title: "烟火大会 - 全景",
                    location: "山下公园",
                    tip: "烟火占画面2/3，海面倒影占1/3，使用三脚架长曝光",
                    time: "19:00-19:05",
                    icon: "🎆"
                  },
                  {
                    id: "fireworks-2",
                    title: "烟火大会 - 建筑同框",
                    location: "山下公园",
                    tip: "将横滨地标塔放在画面下方1/3处，烟火在上方绽放",
                    time: "19:00-19:05",
                    icon: "🎇"
                  },
                  {
                    id: "fireworks-3",
                    title: "烟火大会 - 情侣剪影",
                    location: "山下公园",
                    tip: "让情侣站在前景，背对镜头，拍摄烟火下的剪影",
                    time: "19:00-19:05",
                    icon: "💑"
                  },
                  {
                    id: "chinatown",
                    title: "横滨中华街",
                    location: "横滨",
                    tip: "拍摄中华街牌楼和彩灯，夜晚灯光全开最美",
                    time: "晚上最佳",
                    icon: "🏮"
                  },
                  {
                    id: "skytree",
                    title: "东京晴空塔夜景",
                    location: "晴空塔",
                    tip: "登塔俯瞰东京夜景，19:00后有3D灯光秀",
                    time: "19:00后最佳",
                    icon: "🌃"
                  }
                ].map((spot) => (
                  <div
                    key={spot.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      checkedSpots.has(spot.id)
                        ? "bg-green-50 border-green-300"
                        : "bg-white border-purple-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={spot.id}
                        checked={checkedSpots.has(spot.id)}
                        onCheckedChange={() => toggleSpot(spot.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={spot.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span className="text-2xl">{spot.icon}</span>
                          <div>
                            <h4 className="font-semibold text-purple-900">
                              {spot.title}
                            </h4>
                            <p className="text-sm text-gray-600">{spot.location}</p>
                          </div>
                        </label>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-start gap-2">
                            <Camera className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{spot.tip}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <p className="text-sm text-blue-600">{spot.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center p-4 bg-white rounded-lg border-2 border-purple-200 shadow-lg">
          <Link href="/">
            <Button variant="outline">
              ← 上一天
            </Button>
          </Link>
          <span className="text-sm text-gray-600">第2天 / 共6天</span>
          <Button className="bg-purple-600 hover:bg-purple-700" disabled>
            下一天 →
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-200 mt-12">
        <div className="container py-6 text-center text-sm text-gray-600">
          <p>💜 东京浪漫之旅 · 库洛米风格行程 (2/6-2/11) 💜</p>
          <p className="mt-1">祝两位旅途愉快！</p>
        </div>
      </footer>
    </div>
  );
}
