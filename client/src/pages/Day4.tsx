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
  Waves,
  School
} from "lucide-react";
import { Link } from "wouter";

export default function Day4() {
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

  const progress = (checkedSpots.size / 8) * 100;

  const spots = [
    {
      id: "tsurugaoka-hachimangu",
      title: "鹤冈八幡宫",
      titleJa: "鶴岡八幡宮",
      titleEn: "Tsurugaoka Hachimangu Shrine",
      location: "镰仓站步行10分钟",
      icon: "⛩️",
      time: "09:30-11:00",
      lat: 35.3260,
      lng: 139.5563,
      history: "鹤冈八幡宫建于1063年，是镰仓最重要的神社，供奉八幡神（武神）。源赖朝在1180年将神社迁至现址，成为镰仓幕府的精神支柱。神社的参道笔直延伸至海边，象征着武士的刚直精神。",
      special: "💡 参道两侧的樱花树在春季盛开时非常壮观！神社内有一棵千年银杏树（已倒），是镰仓的象征。每年9月的流镝马（骑射）仪式非常有名。",
      photoTips: [
        "参道全景：从若宫大路拍摄笔直的参道和朱红色鸟居",
        "本殿仰拍：从石阶下仰拍本殿，展现神社的庄严",
        "池塘倒影：在源氏池拍摄神社建筑的倒影",
        "石阶特写：拍摄长长的石阶和两侧的石灯笼",
        "鸽子互动：神社内有很多鸽子，可以拍摄喂鸽子的场景"
      ],
      food: ["小町通商店街美食", "镰仓特色团子", "抹茶甜品"],
      femalePoses: [
        "【鸟居下站姿】站在朱红色鸟居下，双脚交叉，一手轻提包包，侧身45度",
        "【石阶回眸】走在石阶上，回头看镜头，一手扶栏杆",
        "【祈福姿势】在本殿前双手合十祈祷，闭眼虔诚",
        "【池塘边蹲姿】蹲在源氏池边，一手轻触水面，回头微笑",
        "【喂鸽子】蹲下喂鸽子，鸽子围绕身边，侧面拍摄"
      ],
      couplePoses: [
        "【鸟居下牵手】两人牵手站在鸟居下，看向远方参道",
        "【石阶并肩】两人并肩走在石阶上，从背后拍摄",
        "【一起祈福】两人并排在本殿前祈祷，头部微微靠近",
        "【池塘边依偎】女生靠在男生肩上，两人坐在池边",
        "【喂鸽子互动】两人一起喂鸽子，鸽子在身边飞舞"
      ]
    },
    {
      id: "kamakura-kokomae",
      title: "镰仓高校前站",
      titleJa: "鎌倉高校前駅",
      titleEn: "Kamakurakokomae Station",
      location: "江之电沿线",
      icon: "🚃",
      time: "11:30-12:30",
      lat: 35.3073,
      lng: 139.4964,
      history: "镰仓高校前站是江之电的一个小站，因《灌篮高手》动漫而闻名世界。动漫中樱木花道和晴子挥手的经典场景就是在这里的平交道口拍摄的。如今这里成为动漫迷的朝圣地。",
      special: "💡 最佳拍摄时间是上午10-11点或下午3-4点，光线最好。等待江之电经过时拍摄最有感觉！周末和节假日人很多，要有耐心排队。",
      photoTips: [
        "经典机位：站在平交道口，等待绿色江之电经过，拍摄同框照",
        "挥手姿势：模仿晴子向樱木花道挥手的经典动作",
        "铁轨特写：拍摄铁轨延伸向大海的画面",
        "海景背景：以湘南海岸为背景拍摄人像",
        "车站牌：在镰仓高校前站的站牌下拍照留念"
      ],
      food: ["车站附近便利店", "海边咖啡厅"],
      femalePoses: [
        "【经典挥手】站在平交道口，一手高举挥手，模仿晴子，江之电经过时拍摄",
        "【铁轨上站姿】站在铁轨中央（确保安全），双脚前后交叉，海景为背景",
        "【栏杆倚靠】倚靠在平交道栏杆上，侧脸看向大海",
        "【跳跃瞬间】在平交道口跳起来，抓拍在空中的瞬间",
        "【背影杀】背对镜头站在铁轨上，看向远处的大海"
      ],
      couplePoses: [
        "【模仿樱木晴子】男生站在铁轨一侧，女生在另一侧挥手，江之电经过时拍摄",
        "【铁轨上牵手】两人牵手站在铁轨上，背影拍摄，大海为背景",
        "【平交道前拥抱】男生从背后环抱女生，两人看向大海",
        "【一起跳跃】两人一起跳起来，江之电经过时抓拍",
        "【车站牌前合影】两人站在镰仓高校前站牌下，做胜利手势"
      ]
    },
    {
      id: "hasedera",
      title: "长谷寺",
      titleJa: "長谷寺",
      titleEn: "Hase-dera Temple",
      location: "江之电长谷站步行5分钟",
      icon: "🏯",
      time: "12:30-13:30",
      lat: 35.3125,
      lng: 139.5333,
      history: "长谷寺建于736年，以供奉9.18米高的十一面观音像而闻名，是日本最大的木雕观音像之一。寺庙位于山坡上，可以俯瞰镰仓市区和湘南海岸。春季的樱花和初夏的紫阳花（绣球花）非常有名。",
      special: "💡 门票400日元。寺内的见晴台可以俯瞰镰仓海景，是绝佳的拍照点！6月的紫阳花季节最美，但人也最多。",
      photoTips: [
        "观音堂：拍摄金色的十一面观音像（内部可能禁止拍照，注意标识）",
        "见晴台：在观景台拍摄镰仓市区和湘南海岸的全景",
        "庭园小径：拍摄日式庭园的石灯笼、池塘和小桥",
        "紫阳花：6月拍摄满山的紫阳花（绣球花）",
        "地藏菩萨：拍摄可爱的地藏菩萨石像"
      ],
      food: ["寺内茶室", "长谷站周边餐厅"],
      femalePoses: [
        "【观景台眺望】站在见晴台，一手扶栏杆，眺望远处海景，侧脸拍摄",
        "【庭园小径】走在日式庭园的石板路上，回头看镜头，一手提裙摆",
        "【地藏菩萨前】蹲在可爱的地藏菩萨前，做同款表情",
        "【紫阳花丛中】站在紫阳花丛中（6月），一手轻触花朵，侧脸微笑",
        "【祈福姿势】在观音堂前双手合十祈祷，表情虔诚"
      ],
      couplePoses: [
        "【观景台合影】两人站在见晴台，女生靠在男生肩上，海景为背景",
        "【庭园漫步】两人牵手在庭园小径上漫步，背影拍摄",
        "【地藏菩萨前合影】两人蹲在地藏菩萨前，做可爱表情",
        "【紫阳花下拥抱】男生从背后环抱女生，紫阳花为背景（6月）",
        "【一起祈福】两人并排在观音堂前祈祷，头部微微靠近"
      ]
    },
    {
      id: "kamakura-daibutsu",
      title: "镰仓大佛",
      titleJa: "鎌倉大仏",
      titleEn: "Kamakura Daibutsu",
      location: "长谷寺步行10分钟",
      icon: "🗿",
      time: "13:30-14:30",
      lat: 35.3167,
      lng: 139.5358,
      history: "镰仓大佛建于1252年，高11.3米，重约121吨，是日本第二大佛像（仅次于奈良大佛）。原本供奉在大殿内，但1498年的海啸摧毁了大殿，从此大佛露天而坐，成为镰仓的标志性景观。",
      special: "💡 门票300日元，进入大佛内部参观需额外50日元。大佛的背后有窗户，可以看到内部结构！拍照时注意不要挡住其他游客。",
      photoTips: [
        "正面仰拍：从大佛正前方仰拍，展现其庄严宏伟",
        "侧面角度：从侧面45度拍摄大佛的侧脸轮廓",
        "人佛同框：站在大佛前拍摄人像，展现大佛的巨大",
        "细节特写：拍摄大佛的手势、面部表情等细节",
        "内部参观：进入大佛内部拍摄铜制结构（如允许）"
      ],
      food: ["高德院周边小吃", "镰仓特色冰淇淋"],
      femalePoses: [
        "【仰望大佛】站在大佛前，仰头看向大佛，侧面拍摄，展现敬畏感",
        "【双手合十】在大佛前双手合十祈祷，正面或侧面拍摄",
        "【坐姿模仿】坐在地上，模仿大佛的坐姿和手势，俏皮可爱",
        "【比例对比】站在大佛脚下，展现人与佛像的巨大比例差",
        "【侧脸眺望】侧身站立，一手轻放胸前，眺望大佛"
      ],
      couplePoses: [
        "【大佛前合影】两人站在大佛前，女生靠在男生肩上，仰拍",
        "【一起祈福】两人并排在大佛前双手合十祈祷",
        "【模仿坐姿】两人一起坐在地上，模仿大佛的坐姿，俏皮合影",
        "【牵手仰望】两人牵手，一起仰望大佛，背影拍摄",
        "【拥抱合影】男生从背后环抱女生，两人一起看向大佛"
      ]
    },
    {
      id: "komachi-dori",
      title: "小町通商店街",
      titleJa: "小町通り",
      titleEn: "Komachi-dori Street",
      location: "镰仓站东口",
      icon: "🛍️",
      time: "14:30-16:00",
      lat: 35.3193,
      lng: 139.5502,
      history: "小町通是镰仓最热闹的商店街，全长约360米，有超过250家店铺。从镰仓站东口一直延伸到鹤冈八幡宫，两侧是各种特色小店、餐厅、咖啡厅和纪念品店，是购物和品尝美食的好地方。",
      special: "💡 必吃美食：镰仓可丽饼、紫薯冰淇淋、章鱼烧、抹茶甜品。人气店铺：bills镰仓店（pancake）、镰仓小川轩（饼干）。周末人很多，建议平日去。",
      photoTips: [
        "商店街全景：拍摄热闹的商店街和人流",
        "美食特写：拍摄各种特色美食的特写照片",
        "店铺橱窗：拍摄可爱的店铺橱窗和装饰",
        "边走边吃：拍摄拿着美食边走边吃的画面",
        "购物袋：拍摄手提各种购物袋的照片"
      ],
      food: ["镰仓可丽饼", "紫薯冰淇淋", "bills pancake", "章鱼烧", "抹茶甜品", "镰仓小川轩饼干"],
      femalePoses: [
        "【拿美食】一手拿着可丽饼或冰淇淋，做要吃的表情，另一手比心",
        "【橱窗前】站在可爱的店铺橱窗前，侧身看向橱窗内",
        "【购物姿势】双手提着购物袋，开心微笑，走在商店街上",
        "【背影杀】背对镜头走在商店街上，一手拿美食，回头看镜头",
        "【坐姿休息】坐在商店街的长椅上，一手拿饮料，表情满足"
      ],
      couplePoses: [
        "【喂食互动】女生拿着可丽饼喂男生，男生做要吃的动作",
        "【并肩漫步】两人牵手在商店街漫步，手里拿着美食，背影拍摄",
        "【分享美食】两人一起吃同一个冰淇淋或可丽饼，头靠在一起",
        "【购物合影】两人一起提着购物袋，做胜利手势",
        "【长椅休息】两人坐在长椅上，女生靠在男生肩上，手里拿着饮料"
      ]
    },
    {
      id: "enoshima",
      title: "江之岛",
      titleJa: "江ノ島",
      titleEn: "Enoshima Island",
      location: "江之电江之岛站",
      icon: "🏝️",
      time: "16:00-17:30",
      lat: 35.2995,
      lng: 139.4803,
      history: "江之岛是湘南海岸的一个小岛，通过一座桥与陆地相连。岛上有江岛神社、展望台、岩屋洞窟等景点。这里也是《灌篮高手》片尾曲中出现的场景，可以看到富士山和湘南海岸的美景。",
      special: "💡 如果时间充裕，可以登上Sea Candle展望台（门票500日元）俯瞰湘南海岸和富士山。岛上的章鱼仙贝很有名！日落时分景色最美。",
      photoTips: [
        "弁天桥：拍摄连接陆地和江之岛的弁天桥",
        "海景全景：在岛上拍摄湘南海岸和富士山的全景",
        "神社鸟居：拍摄江岛神社的红色鸟居",
        "展望台：在Sea Candle展望台拍摄360度海景",
        "日落剪影：傍晚拍摄日落和人物剪影"
      ],
      food: ["江之岛章鱼仙贝", "海鲜料理", "岛上咖啡厅"],
      femalePoses: [
        "【弁天桥上】站在弁天桥上，一手扶栏杆，海风吹起头发，侧脸拍摄",
        "【海边眺望】站在海边，一手遮阳眺望远处，背景是大海和富士山",
        "【鸟居前祈福】站在江岛神社鸟居前，双手合十祈祷",
        "【展望台】站在展望台，张开双臂拥抱大海，表情开心",
        "【日落剪影】日落时站在海边，侧脸剪影，背景是夕阳"
      ],
      couplePoses: [
        "【弁天桥牵手】两人牵手走在弁天桥上，背影拍摄，大海为背景",
        "【海边拥抱】男生从背后环抱女生，两人看向大海和富士山",
        "【鸟居下合影】两人站在鸟居下，女生靠在男生肩上",
        "【展望台合影】两人在展望台上，一起指向远处的富士山",
        "【日落之吻】日落时，男生亲吻女生额头，侧面剪影拍摄"
      ]
    },
    {
      id: "return-to-ueno",
      title: "返回上野",
      titleJa: "上野へ戻る",
      titleEn: "Return to Ueno",
      location: "JR镰仓站",
      icon: "🚄",
      time: "17:30-18:30",
      lat: 35.3193,
      lng: 139.5502,
      history: "从镰仓站乘坐JR横须贺线返回东京站，再换乘JR山手线到上野站。全程约1小时。",
      special: "💡 如果购买了JR Pass，这段行程免费。如果没有，单程约1,080日元。晚高峰时段车厢可能比较拥挤。",
      photoTips: [
        "车站月台：拍摄镰仓站的复古月台",
        "列车特写：拍摄JR列车进站的画面",
        "车窗风景：透过车窗拍摄沿途风景",
        "疲惫休息：拍摄在车上休息的自然状态"
      ],
      food: ["车站便当", "车上零食"],
      femalePoses: [
        "【月台等车】站在月台上，一手拿着包，眺望铁轨，侧脸拍摄",
        "【车窗眺望】坐在车上，看向车窗外，侧脸拍摄，表情满足",
        "【闭眼休息】靠在座位上闭眼休息，表情安详",
        "【整理照片】低头看手机中的照片，微笑",
        "【自拍微笑】举起手机自拍，做胜利手势"
      ],
      couplePoses: [
        "【月台合影】两人在月台上拍合影，列车为背景",
        "【肩膀依偎】女生靠在男生肩上休息，男生看向窗外",
        "【一起看照片】两人一起看手机中的照片，头靠在一起",
        "【牵手休息】两人牵手，闭眼休息",
        "【分享零食】女生喂男生吃零食，温馨互动"
      ]
    },
    {
      id: "ueno-dinner",
      title: "上野晚餐",
      titleJa: "上野で夕食",
      titleEn: "Dinner at Ueno",
      location: "上野阿美横丁",
      icon: "🍜",
      time: "18:30-",
      lat: 35.7106,
      lng: 139.7747,
      history: "回到上野后，在阿美横丁或附近的餐厅享用晚餐。可以选择拉面、居酒屋、海鲜饭等。",
      special: "💡 推荐：一兰拉面、矶丸水产（24小时海鲜居酒屋）、上野藪荞麦面。吃完饭可以在松坂屋或唐吉诃德购物。",
      photoTips: [
        "美食特写：拍摄晚餐的美食照片",
        "居酒屋氛围：拍摄居酒屋的热闹氛围",
        "夜市街景：拍摄阿美横丁的夜景",
        "满足表情：拍摄吃饭时满足的表情"
      ],
      food: ["一兰拉面", "矶丸水产", "上野藪荞麦面", "居酒屋料理"],
      femalePoses: [
        "【拿美食】一手拿着拉面碗，做要吃的表情",
        "【夹菜姿势】用筷子夹起食物，表情期待",
        "【满足表情】吃饭时闭眼享受，表情满足",
        "【夜市背景】站在阿美横丁的灯笼下，拍摄夜景人像",
        "【举杯庆祝】举起饮料杯，做庆祝手势"
      ],
      couplePoses: [
        "【共享美食】两人一起吃同一碗拉面或料理",
        "【喂食互动】女生喂男生吃东西，男生做夸张表情",
        "【举杯碰杯】两人举杯碰杯，庆祝美好的一天",
        "【夜市漫步】两人牵手在阿美横丁漫步，背影拍摄",
        "【餐厅合影】两人在餐厅里自拍，背景是美食"
      ]
    }
  ];

  const routeSteps = [
    { from: "上野APA酒店", to: "上野站", method: "步行", time: "5分钟", icon: "🚶" },
    { from: "上野站", to: "镰仓站", method: "JR上野东京线", time: "55分钟", icon: "🚄" },
    { from: "镰仓站", to: "鹤冈八幡宫", method: "步行", time: "10分钟", icon: "🚶" },
    { from: "鹤冈八幡宫", to: "镰仓站", method: "步行", time: "10分钟", icon: "🚶" },
    { from: "镰仓站", to: "镰仓高校前站", method: "江之电", time: "10分钟", icon: "🚃" },
    { from: "镰仓高校前站", to: "长谷站", method: "江之电", time: "3分钟", icon: "🚃" },
    { from: "长谷站", to: "长谷寺", method: "步行", time: "5分钟", icon: "🚶" },
    { from: "长谷寺", to: "镰仓大佛", method: "步行", time: "10分钟", icon: "🚶" },
    { from: "镰仓大佛", to: "长谷站", method: "步行", time: "7分钟", icon: "🚶" },
    { from: "长谷站", to: "镰仓站", method: "江之电", time: "5分钟", icon: "🚃" },
    { from: "镰仓站", to: "小町通", method: "步行", time: "1分钟", icon: "🚶" },
    { from: "镰仓站", to: "江之岛站", method: "江之电", time: "25分钟", icon: "🚃" },
    { from: "江之岛站", to: "镰仓站", method: "江之电", time: "25分钟", icon: "🚃" },
    { from: "镰仓站", to: "上野站", method: "JR横须贺线+山手线", time: "60分钟", icon: "🚄" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-blue-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
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
          <Badge variant="outline" className="mb-4 text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none">
            <Waves className="w-5 h-5 mr-2" />
            第4天
          </Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            镰仓一日游
          </h2>
          <p className="text-gray-600 text-lg">
            <JapaneseText zh="2月9日（周一）" ja="2月9日（月曜日）" en="Feb 9 (Mon)" />
          </p>
          <p className="text-cyan-600 font-medium mt-2">
            鹤冈八幡宫 → 镰仓高校前 → 长谷寺 → 镰仓大佛 → 小町通 → 江之岛
          </p>
        </div>

        {/* 今日完成度 */}
        <Card className="mb-6 border-2 border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
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
                2月9日天气
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-sky-600">14°C</div>
                <p className="text-gray-600">晴天转多云</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>💧 湿度: 60%</div>
                  <div>🌬️ 风速: 3m/s</div>
                </div>
                <p className="text-cyan-600 font-medium mt-2">建议穿搭：轻便外套+长裤+运动鞋</p>
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
                <span><strong>江之电一日券</strong> - 在镰仓站购买，800日元</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>镰仓高校前</strong> - 最佳拍摄时间10-11点或15-16点</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>门票准备</strong> - 长谷寺400日元，镰仓大佛300日元</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>步行较多</strong> - 穿舒适的运动鞋</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日亮点 */}
        <Card className="mb-6 border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-600">
              <Sparkles className="w-5 h-5" />
              今日亮点：《灌篮高手》圣地巡礼
            </CardTitle>
            <CardDescription className="text-cyan-600 font-medium">
              08:30-18:30 · 江之电一日游 · 镰仓高校前经典场景
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎬 圣地巡礼</h4>
              <p className="text-sm text-gray-600">
                <strong>镰仓高校前站</strong>（推荐★★★★★）- 《灌篮高手》樱木花道和晴子挥手的经典平交道口<br/>
                <strong>江之岛</strong>（推荐★★★★）- 片尾曲中出现的湘南海岸，可以看到富士山
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📸 必拍机位</h4>
              <p className="text-sm text-gray-600">
                镰仓高校前平交道口等待江之电经过，鹤冈八幡宫的笔直参道，长谷寺的见晴台海景，镰仓大佛的正面仰拍，江之岛的弁天桥和日落。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 主要内容标签页 */}
        <Tabs defaultValue="spots" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-blue-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              景点打卡
            </TabsTrigger>
            <TabsTrigger value="route" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Train className="w-4 h-4 mr-2" />
              路线导航
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Info className="w-4 h-4 mr-2" />
              旅行贴士
            </TabsTrigger>
          </TabsList>

          {/* 景点打卡标签页 */}
          <TabsContent value="spots" className="space-y-6 mt-6">
            {spots.map((spot, index) => (
              <Card key={spot.id} className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg bg-white/90 backdrop-blur">
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
                              className="hover:bg-blue-100"
                            >
                              <Volume2 className="w-4 h-4 text-blue-500" />
                            </Button>
                          </CardTitle>
                          <CardDescription className="text-base">
                            <JapaneseText zh={spot.location} ja={spot.titleJa} en={spot.titleEn} />
                          </CardDescription>
                          <Badge variant="outline" className="mt-1 text-cyan-600 border-cyan-300">
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
                        className="w-6 h-6 border-2 border-blue-400 data-[state=checked]:bg-blue-500"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openNavigation(spot.title, spot.lat, spot.lng)}
                        className="border-cyan-300 text-cyan-600 hover:bg-cyan-50"
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
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                    <h4 className="font-semibold text-cyan-800 mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      拍照技巧
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {spot.photoTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-500 mt-1">•</span>
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
            <Card className="border-2 border-cyan-200 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-cyan-600">2月9日路线图</CardTitle>
                <CardDescription>镰仓江之电一日游完整路线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        {index < routeSteps.length - 1 && (
                          <div className="w-1 h-16 bg-gradient-to-b from-blue-300 to-cyan-300 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-cyan-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{step.from}</span>
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="bg-white">{step.method}</Badge>
                          <span>→</span>
                          <span className="font-medium">{step.time}</span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-cyan-600">
                          ↓ {step.to}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border-2 border-cyan-300">
                  <h4 className="font-semibold text-cyan-800 mb-2">江之电一日券（800日元）</h4>
                  <p className="text-sm text-gray-700 mb-2">在镰仓站购买江之电一日券，可以无限次乘坐江之电，非常划算！</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      无限次乘坐江之电
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      可在任意站上下车
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      当日有效
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
                  <CardTitle className="text-blue-600">交通建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>江之电一日券</strong> - 在镰仓站购买，800日元，可无限次乘坐</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>JR Pass</strong> - 如果有JR Pass，上野到镰仓的往返免费</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <span><strong>步行距离</strong> - 镰仓站到鹤冈八幡宫约10分钟，长谷寺到大佛约10分钟</span>
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
                    <span><strong>镰仓高校前</strong> - 最佳拍摄时间10-11点或15-16点，等待江之电经过</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>长谷寺见晴台</strong> - 可以俯瞰镰仓海景，绝佳拍照点</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>江之岛日落</strong> - 傍晚时分景色最美，可以拍到富士山剪影</span>
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
                    <span><strong>人流高峰</strong> - 镰仓高校前周末和节假日人很多，要有耐心排队</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>门票准备</strong> - 长谷寺400日元，镰仓大佛300日元，大佛内部50日元</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>舒适鞋子</strong> - 今天步行较多，务必穿舒适的运动鞋</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>时间安排</strong> - 如果时间紧张，可以省略江之岛，专注于镰仓市区</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-green-600">预算参考</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>上野-镰仓往返（JR）</span>
                    <span className="font-semibold text-green-600">¥1,880日元/人（或JR Pass）</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>江之电一日券</span>
                    <span className="font-semibold text-green-600">¥800日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>长谷寺门票</span>
                    <span className="font-semibold text-green-600">¥400日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>镰仓大佛门票</span>
                    <span className="font-semibold text-green-600">¥300日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>午餐和小吃</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>晚餐（上野）</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元/人</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between items-center font-bold">
                    <span>预计总花费（2人）</span>
                    <span className="text-lg text-green-600">¥14,000-18,000日元</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部导航 */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/day3">
            <Button variant="outline" className="border-2 border-blue-300 hover:bg-blue-50">
              ← 上一天
            </Button>
          </Link>
          <Link href="/day5">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
              下一天 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
