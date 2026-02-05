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
  Sparkles,
  Utensils,
  Info,
  ExternalLink,
  Volume2,
  Mountain,
  Bus
} from "lucide-react";
import { Link } from "wouter";

export default function Day3() {
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
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));
      
      if (japaneseVoices.length > 0) {
        utterance.voice = japaneseVoices[0];
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Failed to speak:', error);
      }
    }, 100);
  };

  const openNavigation = (placeName: string, lat?: number, lng?: number) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`, '_blank');
    }
  };

  const progress = (checkedSpots.size / 7) * 100;

  const spots = [
    {
      id: "meeting-point",
      title: "上野集合点",
      titleJa: "上野集合点",
      titleEn: "Ueno Meeting Point",
      location: "上野站附近",
      icon: "🚌",
      time: "07:00-07:30",
      lat: 35.7141,
      lng: 139.7774,
      history: "从酒店步行至上野站附近的旅游团集合点。提前15分钟到达，携带护照，穿好防寒衣物。",
      special: "💡 建议前一晚准备好所有物品：护照、相机、充电宝、保暖衣物、零食和水。富士山五合目气温约-5℃！",
      photoTips: [
        "出发前在酒店门口拍摄出发照，展示期待的心情",
        "在旅游大巴前拍摄合影，记录旅程开始",
        "车窗拍摄：在大巴上透过车窗拍摄沿途风景",
        "自拍：在车上拍摄期待的表情和手势"
      ],
      food: ["便利店早餐", "车上零食"],
      femalePoses: [
        "【出发姿势】站在大巴前，一手拿着行李包，一手做加油手势，表情兴奋",
        "【车窗自拍】坐在车上，脸贴近车窗，用手机自拍，背景是窗外风景",
        "【期待表情】双手合十放在胸前，做祈祷状，表情期待又兴奋",
        "【比心姿势】对着镜头比心，背景是旅游大巴",
        "【闭眼休息】在车上闭眼休息，侧脸对镜头，营造安静美好的氛围"
      ],
      couplePoses: [
        "【出发合影】两人站在大巴前，女生跳起来，男生在旁边笑",
        "【车上依偎】女生靠在男生肩上，两人看向窗外",
        "【比心互动】两人一起对镜头比心，表情开心",
        "【喂食互动】女生喂男生吃零食，男生做要吃的动作",
        "【牵手期待】两人牵手，看向前方，充满期待"
      ]
    },
    {
      id: "fuji-5th-station",
      title: "富士山五合目",
      titleJa: "富士山五合目",
      titleEn: "Mt. Fuji 5th Station",
      location: "海拔2,305米",
      icon: "🗻",
      time: "10:00-12:00",
      lat: 35.3606,
      lng: 138.7278,
      history: "富士山五合目位于海拔2,305米，是普通游客可以轻松到达的最高点。这里设有展望台、神社、餐厅和纪念品商店。天气晴朗时，可以俯瞰山梨县和静冈县的壮丽景色。",
      special: "💡 气温约-5℃，务必穿戴保暖衣物！可能会有轻微高原反应，注意慢慢行动。五合目邮局可以寄明信片，盖富士山纪念章！",
      photoTips: [
        "展望台全景：站在展望台拍摄富士山山顶和云海全景",
        "雪景特写：拍摄积雪、冰柱等冬季特有的雪景细节",
        "神社鸟居：以富士山神社的红色鸟居为前景，富士山为背景",
        "云海俯瞰：如果天气好，可以拍摄脚下的云海和远处的山脉",
        "纪念碑合影：在五合目标志碑前拍摄纪念照"
      ],
      food: ["五合目餐厅日式定食", "热红豆汤", "富士山限定零食"],
      femalePoses: [
        "【张开双臂】站在展望台，张开双臂拥抱富士山，表情兴奋",
        "【雪景互动】蹲下触摸雪地，回头看镜头，表情惊喜",
        "【鸟居前祈福】站在神社鸟居前，双手合十祈祷，侧面拍摄",
        "【云海眺望】站在栏杆前，一手扶栏杆，眺望远方云海，侧脸拍摄",
        "【雪地天使】躺在雪地上做雪天使动作，从上方俯拍"
      ],
      couplePoses: [
        "【背后拥抱】男生从背后环抱女生，两人一起看向富士山",
        "【雪球互动】两人一起堆雪球或打雪仗，抓拍欢乐瞬间",
        "【牵手眺望】两人牵手站在展望台，背影拍摄，背景是富士山",
        "【额头相抵】两人额头相抵，闭眼微笑，雪景为背景",
        "【跳跃合影】两人一起跳起来，抓拍在空中的瞬间，背景是富士山"
      ]
    },
    {
      id: "oshino-hakkai",
      title: "忍野八海",
      titleJa: "忍野八海",
      titleEn: "Oshino Hakkai",
      location: "富士山融雪清泉",
      icon: "💧",
      time: "12:00-13:30",
      lat: 35.4567,
      lng: 138.8447,
      history: "忍野八海是富士山融雪形成的8个清澈见底的池塘，被称为'日本九寨沟'。这些池塘水质极佳，透明度高，可以清晰看到池底的水草和游鱼。周围保留着传统的茅草屋建筑，充满日式田园风情。",
      special: "💡 池水常年保持12-13℃，清澈见底！可以在这里品尝富士山泉水，还可以买到用泉水制作的豆腐和荞麦面。",
      photoTips: [
        "池塘倒影：拍摄清澈池水中的富士山倒影（天气好时）",
        "茅草屋背景：以传统茅草屋为背景拍摄日式田园风光",
        "水中游鱼：近距离拍摄池中清晰可见的锦鲤和水草",
        "小桥流水：拍摄石桥、水车等传统日式景观元素",
        "雪景村落：冬季可以拍摄雪中的茅草屋和池塘"
      ],
      food: ["忍野八海豆腐", "荞麦面", "富士山泉水", "日式定食（团餐）"],
      femalePoses: [
        "【池边蹲姿】蹲在池塘边，一手轻触水面，回头看镜头",
        "【茅草屋前】站在传统茅草屋前，双手放在身后，微微侧身",
        "【小桥上】站在石桥中央，一手扶栏杆，另一手轻提衣角",
        "【喂鱼姿势】蹲下喂池中的锦鲤，侧面拍摄",
        "【眺望富士山】站在池边，一手遮阳眺望远处的富士山"
      ],
      couplePoses: [
        "【池边并坐】两人并排坐在池边，脚悬在水面上方，背影拍摄",
        "【小桥牵手】两人牵手走在小桥上，从侧面或背后拍摄",
        "【茅草屋前合影】两人站在茅草屋前，女生靠在男生肩上",
        "【喂鱼互动】两人一起蹲下喂鱼，头部靠近",
        "【倒影合影】两人站在池边，拍摄倒影和真人同框的画面"
      ]
    },
    {
      id: "kawaguchiko",
      title: "河口湖",
      titleJa: "河口湖",
      titleEn: "Lake Kawaguchi",
      location: "富士五湖之一",
      icon: "🌊",
      time: "13:30-17:00",
      lat: 35.5131,
      lng: 138.7644,
      history: "河口湖是富士五湖中最北的一个，也是观赏富士山的最佳地点之一。湖面海拔830米，周长约20公里。湖畔有许多温泉旅馆、咖啡厅和美术馆，是富士山地区最受欢迎的旅游目的地。",
      special: "💡 经典机位：湖畔栏杆处可以拍到富士山倒影！红色鸟居（产屋崎神社）是网红打卡点，可以拍到鸟居、湖水、富士山三者同框的经典照片。",
      photoTips: [
        "湖畔倒影：在湖边拍摄富士山在湖面的倒影（无风时最佳）",
        "红色鸟居：拍摄产屋崎神社的红色鸟居与富士山同框",
        "湖畔栏杆：站在湖畔栏杆前，以富士山为背景拍摄人像",
        "咖啡厅窗景：在湖畔咖啡厅透过窗户拍摄富士山",
        "日落时分：傍晚时拍摄富士山剪影和晚霞"
      ],
      food: ["湖畔咖啡厅下午茶", "富士山特色甜品", "温泉旅馆料理"],
      femalePoses: [
        "【湖畔眺望】站在湖边，侧身眺望富士山，一手轻放胸前",
        "【鸟居前祈福】站在红色鸟居下，双手合十，仰望富士山",
        "【栏杆倚靠】倚靠在湖畔栏杆上，回头看镜头，富士山在背景",
        "【咖啡厅窗边】坐在咖啡厅窗边，手捧咖啡杯，窗外是富士山",
        "【湖边漫步】在湖边小路上漫步，背影拍摄，富士山在远处"
      ],
      couplePoses: [
        "【湖边拥抱】男生从背后环抱女生，两人一起看向富士山和湖面",
        "【鸟居下合影】两人站在红色鸟居下，牵手或拥抱，富士山为背景",
        "【栏杆前依偎】女生靠在男生肩上，两人倚靠栏杆，侧面拍摄",
        "【咖啡厅约会】两人坐在咖啡厅内，面对面聊天，窗外是富士山",
        "【湖边牵手】两人牵手在湖边漫步，背影拍摄，夕阳和富士山在背景"
      ]
    },
    {
      id: "return-bus",
      title: "返回东京",
      titleJa: "東京へ戻る",
      titleEn: "Return to Tokyo",
      location: "旅游大巴",
      icon: "🚌",
      time: "17:00-19:30",
      history: "乘坐旅游大巴返回东京上野。在车上可以休息，整理照片，回味一天的美好时光。",
      special: "💡 在车上可以整理今天拍的照片，挑选最喜欢的发朋友圈！如果累了就睡一觉，到上野后还有精力去吃晚饭。",
      photoTips: [
        "车窗夕阳：透过车窗拍摄夕阳和远处的富士山",
        "整理照片：拍摄自己在车上看照片的画面",
        "疲惫休息：拍摄在车上休息的自然状态",
        "回程自拍：在车上自拍，展示满足的表情"
      ],
      food: ["车上零食", "矿泉水"],
      femalePoses: [
        "【车窗眺望】看向车窗外，侧脸拍摄，表情满足",
        "【整理照片】低头看手机中的照片，微笑",
        "【闭眼休息】靠在座位上闭眼休息，表情安详",
        "【自拍微笑】举起手机自拍，做胜利手势",
        "【回味表情】托腮看向窗外，表情回味无穷"
      ],
      couplePoses: [
        "【肩膀依偎】女生靠在男生肩上休息，男生看向窗外",
        "【一起看照片】两人一起看手机中的照片，头靠在一起",
        "【牵手休息】两人牵手，闭眼休息",
        "【分享零食】女生喂男生吃零食，温馨互动",
        "【车窗合影】两人一起看向车窗外，侧面拍摄"
      ]
    },
    {
      id: "ueno-return",
      title: "抵达上野",
      titleJa: "上野到着",
      titleEn: "Arrive at Ueno",
      location: "上野集合点",
      icon: "🏁",
      time: "19:30-20:00",
      history: "抵达上野集合点，结束一天的富士山之旅。可以在附近的阿美横丁或松坂屋解决晚餐，购买伴手礼。",
      special: "💡 推荐在阿美横丁吃晚饭，有很多平价美食选择。如果还有精力，可以去松坂屋百货逛逛，或者直接回酒店休息。",
      photoTips: [
        "抵达合影：在集合点拍摄抵达后的合影",
        "阿美横丁夜景：拍摄热闹的阿美横丁夜市",
        "晚餐美食：拍摄晚餐的美食照片",
        "回酒店路上：拍摄回酒店路上的街景"
      ],
      food: ["阿美横丁拉面", "居酒屋料理", "松坂屋美食街"],
      femalePoses: [
        "【抵达姿势】站在集合点，做胜利手势，表情满足",
        "【夜市背景】站在阿美横丁的灯笼下，拍摄夜景人像",
        "【美食照】拿着美食，做要吃的表情",
        "【疲惫满足】坐在餐厅里，表情疲惫但满足",
        "【回酒店】走在回酒店的路上，背影拍摄"
      ],
      couplePoses: [
        "【抵达合影】两人在集合点拍合影，做胜利手势",
        "【夜市漫步】两人牵手在阿美横丁漫步，背影拍摄",
        "【共享美食】两人一起吃晚餐，分享美食",
        "【疲惫依偎】在餐厅里，女生靠在男生肩上，表情疲惫但幸福",
        "【回酒店路上】两人牵手走在回酒店的路上，背影拍摄"
      ]
    },
    {
      id: "hotel-rest",
      title: "回酒店休息",
      titleJa: "ホテルで休憩",
      titleEn: "Rest at Hotel",
      location: "上野APA酒店",
      icon: "🏨",
      time: "20:00-",
      history: "回到酒店，洗个热水澡，整理今天的照片和视频，为明天的镰仓之旅做准备。",
      special: "💡 记得给手机和相机充电！可以在便利店买好明天的早餐和饮料。如果有需要洗的衣服，可以使用酒店的洗衣机。",
      photoTips: [
        "酒店房间：拍摄酒店房间的舒适环境",
        "整理照片：拍摄自己在床上整理照片的画面",
        "泡澡放松：拍摄浴室和泡澡的场景（注意隐私）",
        "晚安自拍：睡前自拍，展示满足的表情"
      ],
      food: ["便利店夜宵", "酒店客房服务"],
      femalePoses: [
        "【床上放松】躺在床上，举起手机看照片，表情满足",
        "【整理行李】坐在床边整理行李，侧面拍摄",
        "【泡澡放松】在浴缸边拍摄泡澡的脚或手（注意隐私）",
        "【晚安自拍】躺在床上自拍，做晚安手势",
        "【窗边夜景】站在窗边看夜景，背影拍摄"
      ],
      couplePoses: [
        "【床上依偎】两人躺在床上，一起看手机中的照片",
        "【整理照片】两人坐在床上，一起整理今天的照片",
        "【泡脚放松】两人一起泡脚，拍摄脚部特写",
        "【晚安合影】两人在床上自拍，做晚安手势",
        "【窗边拥抱】站在窗边拥抱，看向窗外夜景，背影拍摄"
      ]
    }
  ];

  const routeSteps = [
    { from: "上野APA酒店", to: "上野集合点", method: "步行", time: "5-10分钟", icon: "🚶" },
    { from: "上野集合点", to: "富士山五合目", method: "旅游大巴", time: "2.5小时", icon: "🚌" },
    { from: "富士山五合目", to: "忍野八海", method: "旅游大巴", time: "30分钟", icon: "🚌" },
    { from: "忍野八海", to: "河口湖", method: "旅游大巴", time: "20分钟", icon: "🚌" },
    { from: "河口湖", to: "上野集合点", method: "旅游大巴", time: "2.5小时", icon: "🚌" },
    { from: "上野集合点", to: "上野APA酒店", method: "步行", time: "5-10分钟", icon: "🚶" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                东京浪漫之旅
              </h1>
            </div>
            <p className="text-sm text-gray-600">2/6 - 2/11 · 库洛米风格行程</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 日期标题 */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 text-lg px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none">
            <Mountain className="w-5 h-5 mr-2" />
            第3天
          </Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            富士山一日游
          </h2>
          <p className="text-gray-600 text-lg">
            <JapaneseText zh="2月8日（周日）" ja="2月8日（日曜日）" en="Feb 8 (Sun)" />
          </p>
          <p className="text-purple-600 font-medium mt-2">
            富士山五合目 → 忍野八海 → 河口湖
          </p>
        </div>

        {/* 今日完成度 */}
        <Card className="mb-6 border-2 border-pink-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <CheckCircle2 className="w-5 h-5" />
              今日完成度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>已完成 {checkedSpots.size} / {spots.length} 个打卡点</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* 天气和重要提醒 */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Cloud className="w-5 h-5" />
                2月8日天气
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">8°C</div>
                <p className="text-gray-600">晴天（富士山五合目约-5℃）</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>💧 湿度: 45%</div>
                  <div>🌬️ 风速: 4m/s</div>
                </div>
                <p className="text-purple-600 font-medium mt-2">建议穿搭：羽绒服+保暖内衣+围巾+手套</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                重要提醒
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>07:00出发</strong> - 提前15分钟到达集合点</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>携带护照</strong> - 部分景点需要出示</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>防寒保暖</strong> - 五合目气温约-5℃</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>高原反应</strong> - 慢慢行动，不要剧烈运动</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日亮点 */}
        <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              今日亮点：富士山绝景之旅
            </CardTitle>
            <CardDescription className="text-purple-600 font-medium">
              07:30-19:30 · 跟团一日游 · 富士山五合目+忍野八海+河口湖
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📸 必拍机位</h4>
              <p className="text-sm text-gray-600">
                <strong>富士山五合目</strong>（推荐★★★★★）- 海拔2,305米，可以近距离观赏富士山山顶和云海<br/>
                <strong>忍野八海</strong>（推荐★★★★★）- 清澈池塘倒映富士山，日式田园风光<br/>
                <strong>河口湖</strong>（推荐★★★★★）- 湖面倒影+红色鸟居+富士山三者同框
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚠️ 注意事项</h4>
              <p className="text-sm text-gray-600">
                提前准备好保暖衣物、相机、充电宝、零食和水。五合目气温低，注意防寒。高原地区可能有轻微高原反应，慢慢行动。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 主要内容标签页 */}
        <Tabs defaultValue="spots" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-pink-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              景点打卡
            </TabsTrigger>
            <TabsTrigger value="route" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Bus className="w-4 h-4 mr-2" />
              路线导航
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Info className="w-4 h-4 mr-2" />
              旅行贴士
            </TabsTrigger>
          </TabsList>

          {/* 景点打卡标签页 */}
          <TabsContent value="spots" className="space-y-6 mt-6">
            {spots.map((spot, index) => (
              <Card key={spot.id} className="border-2 border-pink-200 hover:border-pink-400 transition-all hover:shadow-lg bg-white/90 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{spot.icon}</span>
                        <div>
                          <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                            {spot.title}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakJapanese(spot.titleJa)}
                              className="hover:bg-pink-100"
                            >
                              <Volume2 className="w-4 h-4 text-pink-500" />
                            </Button>
                          </CardTitle>
                          <CardDescription className="text-base">
                            <JapaneseText zh={spot.location} ja={spot.titleJa} en={spot.titleEn} />
                          </CardDescription>
                          <Badge variant="outline" className="mt-1 text-purple-600 border-purple-300">
                            <Clock className="w-3 h-3 mr-1" />
                            {spot.time}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Checkbox
                        id={spot.id}
                        checked={checkedSpots.has(spot.id)}
                        onCheckedChange={() => toggleSpot(spot.id)}
                        className="w-6 h-6 border-2 border-pink-400 data-[state=checked]:bg-pink-500"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openNavigation(spot.title, spot.lat, spot.lng)}
                        className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        导航
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 历史故事 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      历史故事
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{spot.history}</p>
                  </div>

                  {/* 特别说明 */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      特别说明
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{spot.special}</p>
                  </div>

                  {/* 拍照技巧 */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      拍照技巧
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {spot.photoTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 女生拍照姿势 */}
                  <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-300">
                    <h4 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                      <span className="text-lg">👩</span>
                      女生拍照姿势（重点）
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {spot.femalePoses.map((pose, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-pink-500 font-bold">•</span>
                          <span>{pose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 情侣互动姿势 */}
                  <div className="bg-rose-50 p-4 rounded-lg border-2 border-rose-300">
                    <h4 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                      <span className="text-lg">💑</span>
                      情侣互动姿势
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {spot.couplePoses.map((pose, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{pose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 美食推荐 */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      美食推荐
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {spot.food.map((item, i) => (
                        <Badge key={i} variant="secondary" className="bg-orange-100 text-orange-700 border-orange-300">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 路线导航标签页 */}
          <TabsContent value="route" className="mt-6">
            <Card className="border-2 border-purple-200 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-purple-600">2月8日路线图</CardTitle>
                <CardDescription>富士山一日游完整路线 / 2月8日跟团行程</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        {index < routeSteps.length - 1 && (
                          <div className="w-1 h-16 bg-gradient-to-b from-pink-300 to-purple-300 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{step.from}</span>
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="bg-white">{step.method}</Badge>
                          <span>→</span>
                          <span className="font-medium">{step.time}</span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-purple-600">
                          ↓ {step.to}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border-2 border-purple-300">
                  <h4 className="font-semibold text-purple-800 mb-2">路线包含在内（跟团）</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      往返旅游大巴交通
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      富士山五合目入场
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      忍野八海游览
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      河口湖自由活动时间
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      中文导游讲解
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 旅行贴士标签页 */}
          <TabsContent value="tips" className="mt-6">
            <div className="space-y-4">
              <Card className="border-2 border-blue-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-blue-600">出发前准备</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>护照</strong> - 务必携带，部分景点需要出示</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>保暖衣物</strong> - 羽绒服、围巾、手套、保暖内衣</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>摄影设备</strong> - 相机、手机、充电宝、备用电池</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>零食和水</strong> - 车上和景点可能需要</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>晕车药</strong> - 如果容易晕车，提前准备</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-orange-600">拍照建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>五合目</strong> - 展望台全景、神社鸟居、雪景特写</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>忍野八海</strong> - 池塘倒影、茅草屋、清澈池水</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>河口湖</strong> - 湖畔倒影、红色鸟居、湖边栏杆</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>最佳时间</strong> - 上午10-12点光线最好，下午3-5点适合拍日落</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-red-600">注意事项</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>高原反应</strong> - 五合目海拔2,305米，可能有轻微高原反应，慢慢行动</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>气温低</strong> - 五合目气温约-5℃，务必穿好保暖衣物</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>天气变化</strong> - 山区天气多变，可能看不到富士山全貌</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>时间紧凑</strong> - 跟团行程时间固定，注意不要掉队</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>纪念品</strong> - 五合目邮局可以寄明信片，盖富士山纪念章</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-green-600">预算参考</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>富士山一日游团费</span>
                    <span className="font-semibold text-green-600">¥8,000-12,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>午餐（团餐包含）</span>
                    <span className="font-semibold text-green-600">已包含</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>零食和饮料</span>
                    <span className="font-semibold text-green-600">¥1,000日元</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>纪念品和明信片</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>晚餐（上野）</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between items-center font-bold">
                    <span>预计总花费（2人）</span>
                    <span className="text-lg text-green-600">¥22,000-30,000日元</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部导航 */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/day2">
            <Button variant="outline" className="border-2 border-pink-300 hover:bg-pink-50">
              ← 上一天
            </Button>
          </Link>
          <Link href="/day4">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              下一天 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
