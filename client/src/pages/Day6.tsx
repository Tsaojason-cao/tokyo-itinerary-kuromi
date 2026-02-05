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
  Star,
  Utensils,
  Info,
  ExternalLink,
  Volume2,
  Music,
  ShoppingBag,
  Building2
} from "lucide-react";
import { Link } from "wouter";

export default function Day6() {
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
      id: "suga-shrine",
      title: "须贺神社",
      titleJa: "須賀神社",
      titleEn: "Suga Shrine",
      location: "地铁四谷三丁目站",
      icon: "⛩️",
      time: "09:30-10:30",
      lat: 35.6879,
      lng: 139.7203,
      history: "须贺神社是《你的名字》动漫电影的取景地，男女主角在神社前的台阶相遇的经典场景就是在这里拍摄的。神社本身历史悠久，供奉须佐之男命和稻田姬命。",
      special: "💡 《你的名字》圣地巡礼必去！神社前的长台阶是最经典的拍照点。早上人比较少，适合拍照。神社不大，参观约30分钟即可。",
      photoTips: [
        "经典台阶：从台阶下仰拍神社，模仿《你的名字》的经典场景",
        "台阶回眸：站在台阶上回头看镜头",
        "神社鸟居：拍摄朱红色的鸟居",
        "街景：拍摄神社周边的日式街景",
        "动漫对比：拿着电影截图和实景对比拍照"
      ],
      food: ["附近咖啡厅", "便利店"],
      femalePoses: [
        "【台阶站姿】站在台阶中央，双脚前后交叉，一手扶栏杆，模仿《你的名字》场景",
        "【回眸瞬间】走在台阶上，回头看镜头，表情期待",
        "【鸟居前祈福】站在鸟居前，双手合十祈祷",
        "【台阶坐姿】坐在台阶上，腿部侧放，一手撑地，回头微笑",
        "【动漫对比】拿着电影截图，和实景对比拍照"
      ],
      couplePoses: [
        "【模仿电影】模仿男女主角在台阶相遇的场景，两人分别站在台阶两端",
        "【台阶牵手】两人牵手走在台阶上，背影拍摄",
        "【鸟居下合影】站在鸟居下，女生靠在男生肩上",
        "【台阶坐姿】两人坐在台阶上，女生靠在男生肩上",
        "【一起祈福】两人并排在神社前祈祷，头部微微靠近"
      ]
    },
    {
      id: "shinjuku-gyoen",
      title: "新宿御苑",
      titleJa: "新宿御苑",
      titleEn: "Shinjuku Gyoen National Garden",
      location: "地铁新宿御苑前站",
      icon: "🌳",
      time: "10:30-11:30",
      lat: 35.6852,
      lng: 139.7100,
      history: "新宿御苑是东京最大的日式庭园之一，原为皇室庭园，1949年对公众开放。园内有日式庭园、法式庭园和英式庭园三种风格，春季樱花和秋季红叶非常有名。",
      special: "💡 门票500日元。园内禁止使用三脚架和无人机。春季（3-4月）樱花盛开，秋季（11月）红叶最美。2月可以看到梅花和早樱。",
      photoTips: [
        "日式庭园：拍摄传统日式庭园的池塘和小桥",
        "大草坪：在大草坪上拍摄人像，背景是东京高楼",
        "温室：拍摄温室内的热带植物",
        "梅花：2月拍摄盛开的梅花",
        "建筑对比：拍摄庭园和背景高楼的对比"
      ],
      food: ["园内茶室", "附近餐厅"],
      femalePoses: [
        "【草坪上】坐在大草坪上，腿部侧放，一手撑地，看向远处",
        "【小桥上】站在日式庭园的小桥上，一手扶栏杆，侧脸拍摄",
        "【梅花前】站在梅花树下，一手轻触花枝，侧脸微笑",
        "【庭园漫步】走在庭园小径上，回头看镜头，一手提裙摆",
        "【草坪躺姿】躺在草坪上，双手枕在头下，看向天空"
      ],
      couplePoses: [
        "【草坪野餐】两人坐在草坪上，像野餐一样，女生靠在男生肩上",
        "【小桥合影】站在小桥上，女生靠在男生肩上，池塘为背景",
        "【梅花下】站在梅花树下，男生从背后环抱女生",
        "【庭园漫步】牵手在庭园小径上漫步，背影拍摄",
        "【草坪躺姿】两人一起躺在草坪上，头靠在一起，看向天空"
      ]
    },
    {
      id: "yumenohanashi-live",
      title: "YUMENOHANASHI LIVE",
      titleJa: "ユメノハナシ ライブ",
      titleEn: "YUMENOHANASHI LIVE",
      location: "新宿Live会场",
      icon: "🎤",
      time: "12:10-14:00",
      lat: 35.6938,
      lng: 139.7036,
      history: "YUMENOHANASHI是日本的音乐组合，这次Live演出是旅行的重要活动之一。",
      special: "💡 门票约3,000日元。请提前确认Live会场的具体位置和入场时间。演出期间可能禁止拍照录像，请遵守现场规定。",
      photoTips: [
        "会场外：在会场外拍摄纪念照",
        "门票：拍摄门票作为纪念",
        "周边：购买演出周边商品拍照",
        "氛围：拍摄现场氛围（如允许）"
      ],
      food: ["会场内小吃", "附近餐厅"],
      femalePoses: [
        "【会场外】站在会场外，举起门票，表情期待",
        "【周边展示】拿着购买的周边商品，开心微笑",
        "【入场前】在入场队伍中，做期待的表情",
        "【演出后】演出结束后，表情满足，做胜利手势",
        "【纪念合影】在会场标志前拍照留念"
      ],
      couplePoses: [
        "【会场外合影】两人在会场外合影，一起举起门票",
        "【一起入场】牵手准备入场，表情期待",
        "【分享周边】两人一起展示购买的周边商品",
        "【演出后】演出结束后，两人拥抱庆祝",
        "【纪念合影】在会场标志前合影，做胜利手势"
      ]
    },
    {
      id: "harajuku-takeshita",
      title: "原宿竹下通",
      titleJa: "原宿竹下通り",
      titleEn: "Harajuku Takeshita Street",
      location: "JR原宿站",
      icon: "🛍️",
      time: "15:00-16:30",
      lat: 35.6702,
      lng: 139.7026,
      history: "竹下通是原宿的标志性购物街，全长约350米，是东京年轻人潮流文化的中心。这里有各种潮流服饰店、杂货店、可丽饼店和特色小店，充满活力和创意。",
      special: "💡 必吃：彩虹可丽饼、棉花糖冰淇淋。必逛：WEGO、SPINNS等潮流服饰店。周末人非常多，建议平日去。拍照时注意不要挡住店铺和行人。",
      photoTips: [
        "商店街全景：拍摄热闹的竹下通街景",
        "彩虹可丽饼：拍摄色彩缤纷的可丽饼",
        "潮流店铺：拍摄各种特色店铺的橱窗",
        "边走边吃：拍摄拿着美食边走边吃的画面",
        "潮流街拍：展现原宿的年轻潮流氛围"
      ],
      food: ["彩虹可丽饼", "棉花糖冰淇淋", "章鱼烧", "珍珠奶茶"],
      femalePoses: [
        "【拿可丽饼】一手拿着彩虹可丽饼，做要吃的表情，另一手比心",
        "【潮流街拍】在竹下通上走秀般行走，一手提包，表情自信",
        "【橱窗前】站在特色店铺橱窗前，侧身看向橱窗",
        "【购物姿势】双手提着购物袋，开心微笑",
        "【背影杀】背对镜头走在竹下通上，一手拿美食，回头看镜头"
      ],
      couplePoses: [
        "【喂食互动】女生拿着可丽饼喂男生，男生做要吃的动作",
        "【并肩漫步】牵手在竹下通漫步，手里拿着美食，背影拍摄",
        "【分享美食】两人一起吃同一个可丽饼，头靠在一起",
        "【购物合影】两人一起提着购物袋，做胜利手势",
        "【潮流合影】在竹下通的标志性地点合影"
      ]
    },
    {
      id: "shibuya-crossing",
      title: "涩谷十字路口",
      titleJa: "渋谷スクランブル交差点",
      titleEn: "Shibuya Crossing",
      location: "JR涩谷站",
      icon: "🚦",
      time: "17:00-18:00",
      lat: 35.6595,
      lng: 139.7004,
      history: "涩谷十字路口是世界上最繁忙的十字路口之一，每次绿灯时有多达3,000人同时过马路，被称为'世界上最疯狂的十字路口'。这里是东京的标志性景观，经常出现在电影和广告中。",
      special: "💡 最佳拍摄点：星巴克2楼（需消费）、涩谷MAGNET屋顶、SHIBUYA SKY。绿灯时站在路口中央拍摄人流。傍晚时分人流最多，最壮观！",
      photoTips: [
        "俯瞰全景：从星巴克2楼或MAGNET屋顶俯拍十字路口",
        "路口中央：绿灯时站在路口中央拍摄周围人流",
        "夜景：傍晚拍摄霓虹灯下的十字路口",
        "人流对比：拍摄红灯和绿灯时的对比",
        "标志性场景：拍摄涩谷的标志性建筑和广告牌"
      ],
      food: ["涩谷餐厅", "星巴克"],
      femalePoses: [
        "【路口中央】绿灯时站在路口中央，双脚交叉，一手叉腰，周围是人流",
        "【指向广告牌】一手指向涩谷的巨大广告牌，表情惊叹",
        "【星巴克窗边】坐在星巴克窗边，一手拿咖啡杯，俯瞰十字路口",
        "【夜景姿势】夜晚霓虹灯下，站在路口，双手做框架手势",
        "【人流中】在人流中行走，回头看镜头"
      ],
      couplePoses: [
        "【路口牵手】绿灯时牵手站在路口中央，周围是人流",
        "【星巴克合影】坐在星巴克窗边，两人一起看向十字路口",
        "【夜景拥抱】夜晚霓虹灯下，在路口拥抱",
        "【人流中】牵手在人流中行走，背影拍摄",
        "【指向广告牌】两人一起指向涩谷的巨大广告牌"
      ]
    },
    {
      id: "shibuya-sky",
      title: "SHIBUYA SKY",
      titleJa: "渋谷スカイ",
      titleEn: "SHIBUYA SKY",
      location: "涩谷Scramble Square",
      icon: "🏙️",
      time: "18:00-19:00",
      lat: 35.6580,
      lng: 139.7016,
      history: "SHIBUYA SKY是涩谷Scramble Square大厦的屋顶展望台，位于46-47楼和屋顶，高约230米。2019年开业，是东京最新的展望台之一，可以360度俯瞰东京全景，包括涩谷十字路口、新宿高楼群、东京塔、富士山等。",
      special: "💡 门票2,000日元，建议提前网上预约。SKY EDGE是屋顶露天区域，可以拍摄悬浮感大片！日落时分（17:00-18:00）景色最美，但人也最多。",
      photoTips: [
        "SKY EDGE：在屋顶露天区域拍摄悬浮感大片",
        "360度全景：拍摄东京全景，包括涩谷、新宿、东京塔",
        "日落：傍晚拍摄日落和东京夜景",
        "玻璃倒影：利用玻璃倒影拍摄创意照片",
        "俯瞰涩谷：俯拍涩谷十字路口和街景"
      ],
      food: ["展望台咖啡厅"],
      femalePoses: [
        "【SKY EDGE】站在屋顶边缘，张开双臂，拍摄悬浮感大片",
        "【展望台】站在展望台，一手扶玻璃，眺望东京夜景，侧脸拍摄",
        "【日落背景】以日落为背景，双手做爱心手势",
        "【俯瞰姿势】趴在栏杆上，俯瞰涩谷街景，回头看镜头",
        "【夜景自拍】举起手机自拍，背景是璀璨夜景"
      ],
      couplePoses: [
        "【SKY EDGE】两人站在屋顶边缘，牵手或拥抱，拍摄悬浮感大片",
        "【展望台拥抱】在展望台上拥抱，东京夜景在背景",
        "【一起看日落】两人并肩站立，一起看向日落，牵手",
        "【夜景之吻】以东京夜景为背景，亲吻剪影",
        "【合影留念】在展望台上自拍合影，背景是璀璨夜景"
      ]
    },
    {
      id: "shibuya-hotel",
      title: "涩谷酒店入住",
      titleJa: "渋谷ホテルチェックイン",
      titleEn: "Check-in at Shibuya Hotel",
      location: "涩谷",
      icon: "🏨",
      time: "19:00-",
      lat: 35.6595,
      lng: 139.7004,
      history: "今晚换到涩谷的酒店入住，方便明天返程。涩谷有很多酒店选择，建议选择靠近涩谷站的酒店。",
      special: "💡 涩谷到成田机场有直达巴士，非常方便。入住后可以在涩谷周边逛逛，或去便利店买点夜宵。",
      photoTips: [
        "酒店外观：拍摄酒店外观",
        "房间：拍摄酒店房间",
        "涩谷夜景：在酒店窗边拍摄涩谷夜景",
        "整理行李：拍摄整理行李的画面"
      ],
      food: ["涩谷餐厅", "便利店"],
      femalePoses: [
        "【酒店外】站在酒店外，拿着行李，表情期待",
        "【房间内】坐在酒店房间的床上，表情放松",
        "【窗边】站在窗边，看向涩谷夜景，侧脸拍摄",
        "【整理行李】整理行李的自然状态",
        "【自拍】在房间内自拍，做胜利手势"
      ],
      couplePoses: [
        "【酒店外】两人拿着行李在酒店外合影",
        "【房间内】两人坐在床上，女生靠在男生肩上",
        "【窗边】两人站在窗边，一起看向涩谷夜景",
        "【整理行李】两人一起整理行李，温馨互动",
        "【房间自拍】在房间内自拍合影"
      ]
    }
  ];

  const routeSteps = [
    { from: "上野APA酒店", to: "上野站", method: "步行", time: "5分钟", icon: "🚶" },
    { from: "上野站", to: "东京站", method: "JR山手线", time: "10分钟", icon: "🚄" },
    { from: "东京站", to: "四谷三丁目站", method: "地铁丸之内线", time: "15分钟", icon: "🚇" },
    { from: "四谷三丁目", to: "新宿御苑前站", method: "地铁丸之内线", time: "2分钟", icon: "🚇" },
    { from: "新宿御苑", to: "新宿Live会场", method: "步行", time: "10分钟", icon: "🚶" },
    { from: "新宿", to: "原宿站", method: "JR山手线", time: "3分钟", icon: "🚄" },
    { from: "原宿", to: "涩谷站", method: "JR山手线", time: "2分钟", icon: "🚄" }
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
            <Music className="w-5 h-5 mr-2" />
            第6天
          </Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Live演出 & 新宿涩谷
          </h2>
          <p className="text-gray-600 text-lg">
            <JapaneseText zh="2月11日（周三）" ja="2月11日（水曜日）" en="Feb 11 (Wed)" />
          </p>
          <p className="text-purple-600 font-medium mt-2">
            须贺神社 → 新宿御苑 → LIVE演出 → 原宿 → 涩谷
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
          <Card className="border-2 border-sky-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-600">
                <Cloud className="w-5 h-5" />
                2月11日天气
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-sky-600">12°C</div>
                <p className="text-gray-600">多云</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>💧 湿度: 60%</div>
                  <div>🌬️ 风速: 3m/s</div>
                </div>
                <p className="text-purple-600 font-medium mt-2">建议穿搭：时尚外套+长裤+舒适鞋</p>
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
                <span><strong>LIVE门票</strong> - 提前确认会场位置和入场时间</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>新宿御苑</strong> - 门票500日元，禁止三脚架</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>SHIBUYA SKY</strong> - 门票2,000日元，建议提前预约</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>换酒店</strong> - 今晚入住涩谷酒店，带好行李</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日亮点 */}
        <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              今日亮点：YUMENOHANASHI LIVE & SHIBUYA SKY
            </CardTitle>
            <CardDescription className="text-purple-600 font-medium">
              09:30-19:00 · 圣地巡礼 · Live演出 · 涩谷夜景
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎤 Live演出</h4>
              <p className="text-sm text-gray-600">
                <strong>YUMENOHANASHI LIVE</strong>（推荐★★★★★）- 12:10-14:00在新宿，门票约3,000日元，是本次旅行的重要活动
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏙️ 涩谷体验</h4>
              <p className="text-sm text-gray-600">
                涩谷十字路口的繁忙人流、SHIBUYA SKY的360度全景夜景、原宿竹下通的潮流文化，体验东京最年轻活力的一面。
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
              <Train className="w-4 h-4 mr-2" />
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
                  {spot.history && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        历史故事
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{spot.history}</p>
                    </div>
                  )}

                  {/* 特别说明 */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      特别说明
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{spot.special}</p>
                  </div>

                  {/* 拍照技巧 */}
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      拍照技巧
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {spot.photoTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">•</span>
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
                  {spot.food.length > 0 && (
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
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 路线导航标签页 */}
          <TabsContent value="route" className="mt-6">
            <Card className="border-2 border-purple-200 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-purple-600">2月11日路线图</CardTitle>
                <CardDescription>Live演出&新宿涩谷完整路线</CardDescription>
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
                  <h4 className="font-semibold text-purple-800 mb-2">今日交通提示</h4>
                  <p className="text-sm text-gray-700 mb-2">今天主要使用JR山手线和地铁丸之内线，可以继续使用昨天的地铁一日券（如果还在有效期内）。</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      JR山手线连接新宿、原宿、涩谷
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      地铁丸之内线连接上野、东京、四谷三丁目
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      涩谷酒店建议选择靠近涩谷站的位置
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 旅行贴士标签页 */}
          <TabsContent value="tips" className="mt-6">
            <div className="space-y-4">
              <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-pink-600">交通建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-pink-600 mt-0.5" />
                    <span><strong>JR山手线</strong> - 新宿→原宿→涩谷，每站只需2-3分钟</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-pink-600 mt-0.5" />
                    <span><strong>地铁丸之内线</strong> - 上野到四谷三丁目约15分钟</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-pink-600 mt-0.5" />
                    <span><strong>涩谷酒店</strong> - 选择靠近涩谷站的酒店，方便明天去机场</span>
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
                    <span><strong>须贺神社</strong> - 《你的名字》圣地，台阶是经典机位</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>涩谷十字路口</strong> - 星巴克2楼是最佳俯拍点</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>SHIBUYA SKY</strong> - SKY EDGE可以拍悬浮感大片</span>
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
                    <span><strong>LIVE演出</strong> - 提前确认会场位置，可能禁止拍照录像</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>新宿御苑</strong> - 禁止使用三脚架和无人机</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>SHIBUYA SKY</strong> - 建议提前网上预约，日落时段人很多</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>换酒店</strong> - 记得带好所有行李，退房时检查物品</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-green-600">预算参考</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>交通费（地铁+JR）</span>
                    <span className="font-semibold text-green-600">¥1,000-1,500日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>新宿御苑门票</span>
                    <span className="font-semibold text-green-600">¥500日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LIVE门票</span>
                    <span className="font-semibold text-green-600">¥3,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SHIBUYA SKY门票</span>
                    <span className="font-semibold text-green-600">¥2,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>午餐和小吃</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>晚餐</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>涩谷酒店（1晚）</span>
                    <span className="font-semibold text-green-600">¥8,000-12,000日元/间</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between items-center font-bold">
                    <span>预计总花费（2人）</span>
                    <span className="text-lg text-green-600">¥29,000-37,000日元</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部导航 */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/day5">
            <Button variant="outline" className="border-2 border-pink-300 hover:bg-pink-50">
              ← 上一天
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
