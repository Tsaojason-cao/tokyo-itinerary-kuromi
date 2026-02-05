import { useState } from "react";
// Updated: 2026-02-05 06:59
import { Link } from "wouter";
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
  Sparkles,
  Volume2
} from "lucide-react";

export default function Home() {
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

  const speakJapanese = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(v => v.lang.startsWith('ja'));
    if (japaneseVoice) utterance.voice = japaneseVoice;
    window.speechSynthesis.speak(utterance);
  };

  const progress = (checkedSpots.size / 8) * 100;

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
                第1天
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
                <span>已完成 {checkedSpots.size} / 8 个打卡点</span>
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
              2月6日天气
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-blue-600">12°C</div>
                <div className="text-sm text-gray-600 mt-1">多云转晴</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>💧 湿度: 65%</div>
                <div>🌬️ 风速: 3m/s</div>
                <div className="mt-2 text-purple-600 font-medium">建议穿搭：厚外套+围巾</div>
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
                <strong>15:55抵达成田机场</strong> - 请提前确认航班信息
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
              <p className="text-sm text-orange-800">
                <strong>今晚必须预约AKB48门票</strong> - 用于2/9下午的演出
              </p>
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
                <span>路线1:</span>
                <JapaneseText japanese="成田空港" chinese="成田机场" />
                <span>→</span>
                <JapaneseText japanese="上野APAホテル" chinese="上野APA酒店" />
              </CardTitle>
                <CardDescription>京成Skyliner直达，约41分钟</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <img 
                    src="/images/route_map_2_6_clear.png" 
                    alt="2月6日路线图 - 中日英三语对照" 
                    className="w-full rounded-lg border-2 border-purple-200 shadow-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    路线图包含中文、日文和英文说明，方便在日本使用
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="成田空港 ターミナル1・2" chinese="成田机场 T1/T2" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        前往B1层京成电铁售票处，购买Skyliner车票（约2,520日元）
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">乘坐Skyliner</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        开往<strong><JapaneseText japanese="京成上野" chinese="京成上野" showTranslation={false} /></strong>方向，车程约41分钟直达
                      </p>
                      <Badge className="mt-2 bg-blue-100 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        约41分钟
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="京成上野駅" chinese="京成上野站" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从<strong><JapaneseText japanese="池之端口" chinese="池之端口" showTranslation={false} /></strong>出站
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900">抵达APA酒店</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        步行约3分钟即可到达酒店，办理入住
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <span>路线2:</span>
                <JapaneseText japanese="上野" chinese="上野" />
                <span>→</span>
                <JapaneseText japanese="秋葉原" chinese="秋叶原" />
                <span>夜逛</span>
              </CardTitle>
                <CardDescription>JR山手线，仅需2站</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="JR上野駅" chinese="JR上野站" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从酒店步行3分钟到JR上野站（不忍口）
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">乘坐JR山手线</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        开往<strong>东京/品川</strong>方向的内环线列车（女声播报）
                      </p>
                      <div className="mt-2 space-y-1">
                        <Badge className="bg-green-100 text-green-700">
                          <Train className="w-3 h-3 mr-1" />
                          建议车厢：车头1-3节
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">方便到达秋叶原站电器街口</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex-1">                      <h4 className="font-semibold text-purple-900">
                        <JapaneseText japanese="秋葉原駅" chinese="秋叶原站" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        从<strong><JapaneseText japanese="電気街口" chinese="电器街口" showTranslation={false} /></strong>出站，开始探索二次元圣地
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
                  京成Skyliner详细指引
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">线路信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">出发站：</span>
                        <span className="font-medium">成田机场</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">终点站：</span>
                        <span className="font-medium">京成上野</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">车程：</span>
                        <span className="font-medium text-blue-600">约41分钟</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">票价：</span>
                        <span className="font-medium text-blue-600">2,520日元</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">乘车要点</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                                <span>在B1层京成电铁售票处购票</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>可提前在网上预订节省时间</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>按照指示牌前往Skyliner站台</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>从池之端口出站最近</span>
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
                    Skyliner是特快列车，座位舒适且有行李架。如果行李较多，建议选择靠近车门的座位方便上下车。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-green-600" />
                  JR山手线详细指引
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">线路信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">出发站：</span>
                        <span className="font-medium">上野站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">到达站：</span>
                        <span className="font-medium">秋叶原站</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">方向：</span>
                        <span className="font-medium text-green-600">东京/品川方向</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">站数：</span>
                        <span className="font-medium text-green-600">仅需2站</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">识别技巧</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span><strong>内环线</strong>使用女声播报</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>外环线使用男声播报</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>车头1-3节方便出站</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>从电器街口出站最方便</span>
                      </li>
                    </ul>
                  </div>
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
                  秋叶原拍照打卡清单
                </CardTitle>
                <CardDescription>
                  点击勾选已完成的打卡点，追踪您的拍照进度
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    id: "akb48",
                    title: "AKB48剧场门口",
                    location: "秋叶原Don Quijote 8楼",
                    tip: "免费拍照，建议从正面拍摄招牌",
                    time: "全天开放",
                    icon: "🎭"
                  },
                  {
                    id: "radio-kaikan",
                    title: "Radio会馆",
                    location: "《命运石之门》圣地",
                    tip: "模仿主角打电话的姿势，从低角度仰拍",
                    time: "傍晚光线最佳",
                    icon: "📻"
                  },
                  {
                    id: "chuo-dori",
                    title: "秋叶原中央通",
                    location: "主干道",
                    tip: "周末下午变成步行天国，可以站在马路中央拍摄",
                    time: "周末下午最佳",
                    icon: "🛣️"
                  },
                  {
                    id: "maid-cafe",
                    title: "女仆咖啡厅门口",
                    location: "中央通沿线",
                    tip: "拍摄可爱的门面装饰和招牌",
                    time: "营业时间内",
                    icon: "☕"
                  },
                  {
                    id: "super-potato",
                    title: "Super Potato",
                    location: "复古游戏店",
                    tip: "店内可以拍摄复古游戏机和卡带墙",
                    time: "11:00-20:00",
                    icon: "🎮"
                  },
                  {
                    id: "mandarake",
                    title: "Mandarake",
                    location: "8层御宅圣地",
                    tip: "每层主题不同，推荐拍摄手办展示区",
                    time: "12:00-20:00",
                    icon: "🎨"
                  },
                  {
                    id: "gundam-cafe",
                    title: "高达咖啡厅",
                    location: "秋叶原站旁",
                    tip: "拍摄店外的高达模型",
                    time: "10:00-22:00",
                    icon: "🤖"
                  },
                  {
                    id: "night-view",
                    title: "秋叶原夜景",
                    location: "中央通十字路口",
                    tip: "夜晚霓虹灯全开，拍摄赛博朋克风格",
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

        {/* Planner Link */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 fill-purple-600 text-purple-600" />
                模块化行程规划器
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                自定义你的东京之旅 · 智能路线规划 · 50+个景点可选
              </p>
            </div>
            <Link href="/planner">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                开始规划 →
              </Button>
            </Link>
          </div>
        </div>

        {/* Days Navigation */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/day1">
            <Card className="border-purple-300 bg-purple-50 hover:border-purple-500 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 1</CardTitle>
                <CardDescription>抵达日 · 上野</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">成田机场 → 上野 → 阿美横丁 → 业务超市</p>
                <Button variant="outline" className="w-full">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/day2">
            <Card className="border-purple-200 hover:border-purple-400 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 2</CardTitle>
                <CardDescription>浅草 · 横滨</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">浅草寺 → 横滨 → 晴空塔</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/day3">
            <Card className="border-purple-200 hover:border-purple-400 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 3</CardTitle>
                <CardDescription>富士山一日游</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">富士山五合目 · 忍野八海 · 河口湖</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/day4">
            <Card className="border-purple-200 hover:border-purple-400 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 4</CardTitle>
                <CardDescription>镰仓一日游</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">镰仓高校前 · 长谷寺 · 镰仓大佛</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/day5">
            <Card className="border-purple-200 hover:border-purple-400 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 5</CardTitle>
                <CardDescription>东京市区精华游</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">秋叶原 · 银座 · 东京塔 · 六本木</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/day6">
            <Card className="border-purple-200 hover:border-purple-400 cursor-pointer transition-all">
              <CardHeader>
                <CardTitle className="text-lg">Day 6</CardTitle>
                <CardDescription>Live演出 & 新宿涩谷</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">须贺神社 · LIVE · 原宿 · 涩谷</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/phrases">
            <Card className="border-pink-200 hover:border-pink-400 cursor-pointer transition-all bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  日语常用语
                </CardTitle>
                <CardDescription>旅行必备 · 点击发音</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">问候 · 餐厅 · 交通 · 购物 · 紧急</p>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  查看详情 →
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex justify-between items-center p-4 bg-white rounded-lg border-2 border-purple-200 shadow-lg">
          <Button variant="outline" disabled className="opacity-50">
            ← 上一天
          </Button>
          <span className="text-sm text-gray-600">第1天 / 共6天</span>
          <Link href="/day2">
            <Button className="bg-purple-600 hover:bg-purple-700">
              下一天 →
            </Button>
          </Link>
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
