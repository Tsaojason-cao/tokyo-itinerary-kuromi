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
  Bus,
  Snowflake
} from "lucide-react";
import { Link } from "wouter";
import { VisualRouteMap } from "@/components/VisualRouteMap";

export default function Day3() {
  const [checkedSpots, setCheckedSpots] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState<'zh' | 'ja' | 'en'>('zh');
  
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

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang.startsWith('ja'));
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleNavigation = (lat: number, lng: number, placeName: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${lat},${lng}&travelmode=transit`,
            '_blank'
          );
        },
        () => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`, '_blank');
        }
      );
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`, '_blank');
    }
  };

  const progress = (checkedSpots.size / 8) * 100;

  const spots = [
    {
      id: "meeting-point",
      title: "集合地点",
      titleJa: "集合場所",
      titleEn: "Meeting Point",
      location: "JR东京站新丸之内大楼",
      icon: "🚌",
      lat: 35.6812,
      lng: 139.7671,
      time: "出发前",
      history: "JR东京站是东京最重要的交通枢纽之一，新丸之内大楼（新丸ビル）位于车站旁，是现代化的商业大楼。BEAMS是日本知名的时尚品牌，其标牌是常见的集合地标。",
      special: "💡 集合地点：JR东京站前新丸之内大楼BEAMS标牌下。地址：日本〒100-6590 Tokyo, Chiyoda City, Marunouchi, 1-chome-5-1 新丸の内ビル。请提前10-15分钟到达，不要迟到！",
      photoTips: [
        "出发前合影：在BEAMS标牌下拍摄出发前的纪念照",
        "新丸之内大楼：拍摄现代化的建筑外观",
        "东京站红砖建筑：如果时间充裕，可以拍摄附近的东京站红砖建筑",
        "期待表情：拍摄充满期待的表情，准备开始富士山之旅",
        "巴士前合影：上车前在巴士前拍照留念"
      ],
      femalePoses: [
        "【期待姿势】双手合十放在脸颊旁，做期待的表情，展示对富士山之旅的期待",
        "【指向标牌】一手指向BEAMS标牌，另一手做V字手势，开心微笑",
        "【背包客风格】背着背包，一手拿着地图或手机，做准备出发的姿势",
        "【建筑前站姿】站在新丸之内大楼前，双脚交叉，一手插口袋，自然微笑",
        "【回眸姿势】背对镜头准备上车，回头看镜头，露出期待的笑容"
      ],
      couplePoses: [
        "【一起看地图】两人一起看手机上的行程，头部靠近，讨论今天的计划",
        "【牵手出发】牵手站在BEAMS标牌下，准备开始旅程",
        "【背包互助】男生帮女生整理背包，温馨互动",
        "【期待拥抱】女生从背后抱住男生，两人都做期待的表情",
        "【巴士前合影】在巴士前牵手合影，展示即将开始的旅程"
      ],
      food: ["新丸之内大楼内餐厅", "东京站便当店"],
      tips: [
        "请提前10-15分钟到达集合地点",
        "携带保暖衣物（富士山地区较冷）",
        "准备相机和手机（多个拍照点）",
        "带上现金（部分地方可能不支持信用卡）",
        "如计划泡温泉，建议自备毛巾"
      ]
    },
    {
      id: "saiko-ice-festival",
      title: "西湖冰之祭典",
      titleJa: "西湖氷の祭典",
      titleEn: "Saiko Ice Festival",
      location: "西湖野鸟森公园",
      icon: "❄️",
      lat: 35.4833,
      lng: 138.6333,
      time: "11:30-14:00",
      history: "西湖冰之祭典是富士五湖地区冬季限定的冰雕艺术节，每年1月下旬至2月中旬举办。西湖是富士五湖中最小的湖泊，但以其宁静的氛围和绝佳的富士山观景角度而闻名。冰之祭典展示各种精美的冰雕作品，在夜晚点灯后更加梦幻。",
      special: "💡 2月8日前往西湖冰之祭典（西湖野鸟森公园）！冬季限定活动，可以看到精美的冰雕艺术和富士山背景。自助游览1小时，建议穿防滑保暖的鞋子。",
      photoTips: [
        "冰雕特写：拍摄精美的冰雕作品，利用自然光展现冰的质感",
        "富士山背景：以富士山为背景，拍摄冰雕和雪山的组合",
        "冰雕人像：站在大型冰雕旁，展示冰雕的规模和细节",
        "互动照片：假装触摸或拥抱冰雕，创造有趣的互动画面",
        "全景照片：拍摄整个冰之祭典会场，展示冰雕群和富士山"
      ],
      femalePoses: [
        "【冰雕旁站姿】站在精美冰雕旁，一手轻触冰雕，侧身45度看镜头，展示冰雕细节",
        "【雪地姿势】在雪地上蹲下或坐下，双手捧雪，做开心的表情",
        "【富士山背景】背对富士山站立，回头看镜头，展示富士山和冰雕的组合",
        "【保暖风格】戴着毛线帽和围巾，双手捧热饮，展示冬日温暖感",
        "【跳跃姿势】在冰雕前跳跃，拍摄动态照片，展示活力"
      ],
      couplePoses: [
        "【冰雕前拥抱】在大型冰雕前拥抱，展示浪漫氛围",
        "【共赏冰雕】两人并排站立，一起欣赏冰雕，从侧面拍摄",
        "【打雪仗】假装打雪仗，拍摄有趣的互动画面",
        "【背靠背】背靠背站在冰雕前，展示默契",
        "【牵手漫步】在冰雕群中牵手漫步，从背后拍摄"
      ],
      food: ["会场小吃摊位", "热饮（咖啡、热可可）", "烤红薯"],
      tips: [
        "穿防滑保暖的鞋子（地面可能结冰）",
        "戴手套和帽子（气温较低）",
        "相机电池注意保暖（低温会影响电池续航）",
        "建议购买热饮保暖",
        "注意冰雕周围的安全提示"
      ]
    },
    {
      id: "lawson-fuji",
      title: "罗森富士河口湖町役场前店",
      titleJa: "ローソン富士河口湖町役場前店",
      titleEn: "Lawson Fujikawaguchiko Town Hall",
      location: "富士河口湖町船津",
      icon: "🏪",
      lat: 35.5003,
      lng: 138.7644,
      time: "15:30-15:50",
      history: "这家罗森便利店因其绝佳的富士山拍摄角度而成为网红打卡点。店铺位于富士河口湖町役场（町政府）前，招牌为深蓝色的罗森标志。相比河口湖站前的罗森，这里人少、空地多、更安全，成为摄影爱好者的首选机位。",
      special: "💡 网红富士山拍摄机位！罗森深蓝色招牌+富士山的经典组合。地址：日本山梨县南都留郡富士河口湖町船津1395-1。步行到河口湖站约15分钟。",
      photoTips: [
        "经典机位：站在便利店前，以罗森招牌和富士山为背景拍摄",
        "低角度拍摄：蹲下拍摄，让富士山显得更加雄伟",
        "招牌特写：拍摄罗森深蓝色招牌和富士山的组合",
        "便利店内：在店内透过玻璃拍摄富士山",
        "创意构图：利用便利店的线条和富士山构图"
      ],
      femalePoses: [
        "【经典站姿】站在罗森招牌下，一手做V字手势，另一手指向富士山，开心微笑",
        "【便利店前】假装刚从便利店出来，手里拿着饮料或零食，自然行走",
        "【坐姿拍摄】坐在便利店前的台阶或空地上，腿部交叉，背景是富士山",
        "【跳跃姿势】在便利店前跳跃，拍摄动态照片，背景是富士山和罗森招牌",
        "【回眸杀】背对富士山和罗森招牌，回头看镜头，展示侧脸"
      ],
      couplePoses: [
        "【便利店前合影】两人站在罗森招牌下，牵手或拥抱，背景是富士山",
        "【分享零食】两人一起分享从便利店买的零食，自然互动",
        "【指向富士山】两人一起指向富士山，做惊喜的表情",
        "【坐姿合影】两人坐在便利店前，靠在一起，背景是富士山",
        "【亲吻瞬间】男生亲吻女生额头或脸颊，背景是罗森招牌和富士山"
      ],
      food: ["罗森便利店（饮料、零食、便当）"],
      tips: [
        "这里是网红打卡点，可能需要排队拍照",
        "建议在便利店购买饮料和零食",
        "注意不要影响便利店的正常营业",
        "最佳拍摄时间是下午阳光充足时",
        "可以在便利店内购买富士山限定商品"
      ]
    },
    {
      id: "hikawa-clock-shop",
      title: "日川时计街",
      titleJa: "日川時計街",
      titleEn: "Hikawa Clock Shop Street",
      location: "富士吉田市",
      icon: "🏘️",
      lat: 35.4869,
      lng: 138.8103,
      time: "16:10-16:50",
      history: "日川时计街被称为通往富士山的天梯小镇，是一条安静的街道，笔直地通向富士山。站在街道上，仿佛沿着一条云梯无限接近富士山，却又触不可及。这里远离都市喧嚣，保留着传统的日本小镇风情，是摄影和散步的绝佳地点。",
      special: "💡 富士山天梯小镇！安静的街道像一条云梯，路的尽头仿佛就是富士山，无限接近却触不可及。逃离都市喧嚣的绝佳地点，非常适合拍摄文艺照片。",
      photoTips: [
        "天梯视角：站在街道中央，拍摄笔直通向富士山的街道",
        "透视构图：利用街道的透视线条，让富士山成为视觉焦点",
        "人物剪影：在街道上拍摄人物剪影，背景是富士山",
        "街道两侧：拍摄传统日本建筑和富士山的组合",
        "低角度拍摄：从低角度拍摄街道和富士山，增强透视感"
      ],
      femalePoses: [
        "【街道中央】站在街道中央，双脚前后交叉，一手轻提裙摆或衣角，面向富士山",
        "【行走姿势】在街道上自然行走，回头看镜头，背景是富士山",
        "【坐姿拍摄】坐在街道旁的台阶上，腿部交叉，远眺富士山",
        "【伸手姿势】伸手做触摸富士山的姿势，创造触不可及的意境",
        "【背影杀】背对镜头站在街道上，面向富士山，展示背影和街道的透视感"
      ],
      couplePoses: [
        "【牵手漫步】两人牵手在街道上漫步，从背后拍摄，背景是富士山",
        "【对视互动】两人面对面站在街道中央，深情对视，背景是富士山",
        "【拥抱姿势】在街道上拥抱，从侧面拍摄，展示富士山背景",
        "【坐姿合影】两人坐在街道旁，靠在一起，远眺富士山",
        "【指向富士山】两人一起指向富士山，做惊叹的表情"
      ],
      food: ["附近小店", "传统日式茶馆"],
      tips: [
        "注意来往车辆，拍照时注意安全",
        "最佳拍摄时间是下午阳光充足时",
        "建议穿着文艺风格的服装",
        "可以在街道两侧探索传统商店",
        "保持安静，尊重当地居民"
      ]
    },
    {
      id: "fujiyama-onsen",
      title: "富士山 Fujiyama 温泉",
      titleJa: "ふじやま温泉",
      titleEn: "Fujiyama Onsen",
      location: "富士吉田市",
      icon: "♨️",
      lat: 35.4625,
      lng: 138.7806,
      time: "17:20-18:50",
      history: "Fujiyama温泉（ふじやま温泉）是富士山地区著名的温泉设施，以其绝佳的富士山观景视角而闻名。在温泉中浸泡热汤，远方雪顶的富士山倒映在湖面，寒冬也变得温暖而柔和。温泉水质优良，具有美肌和放松效果。",
      special: "💡 可选活动：富士吉田小镇自由用餐 或 FUJIYAMA温泉体验。温泉不含晚餐、入浴费用和毛巾费用，需自费。在温泉中远眺富士山，是难得的体验！",
      photoTips: [
        "温泉外观：拍摄温泉设施的外观和富士山背景",
        "休息区：在休息区拍摄放松的照片",
        "富士山观景：从温泉观景台拍摄富士山",
        "美食照片：如果选择用餐，拍摄当地美食",
        "夜景：傍晚时分拍摄温泉和富士山的夜景"
      ],
      femalePoses: [
        "【浴衣姿势】穿着浴衣在休息区，一手拿着饮料，自然放松的姿势",
        "【观景台】站在观景台，背对富士山，回头看镜头",
        "【放松表情】坐在休息区，做放松舒适的表情，展示温泉体验",
        "【美食照】拍摄享用当地美食的照片，表情满足",
        "【夜景人像】在傍晚时分，以富士山夜景为背景拍摄人像"
      ],
      couplePoses: [
        "【浴衣合影】两人穿着浴衣在休息区合影",
        "【观景台合影】两人在观景台，背对富士山，牵手或拥抱",
        "【共享美食】两人一起享用美食，自然互动",
        "【放松时刻】两人坐在休息区，靠在一起，展示放松的氛围",
        "【夜景合影】在傍晚时分，以富士山夜景为背景合影"
      ],
      food: ["富士吉田小镇餐厅", "温泉内食堂", "当地特色料理"],
      tips: [
        "温泉入浴费用需自费（约800-1500日元）",
        "建议自备毛巾（租赁需额外费用）",
        "温泉内禁止拍照（尊重他人隐私）",
        "如果不泡温泉，可以选择在富士吉田小镇用餐",
        "注意时间，不要错过集合时间"
      ]
    },
    {
      id: "oike-park-fireworks",
      title: "大池公园 - 河口湖冬花火大会",
      titleJa: "大池公園 - 河口湖冬花火大会",
      titleEn: "Oike Park - Kawaguchiko Winter Fireworks",
      location: "河口湖大池公园",
      icon: "🎆",
      lat: 35.5056,
      lng: 138.7542,
      time: "19:30-20:30",
      history: "河口湖冬花火大会是山梨县人气排名第1位的花火大会，每年冬季在河口湖畔举办。大池公园是主会场，可以欣赏到约3000发烟火在富士山背景下绽放的壮观景象。花火倒映在河口湖面，与雪顶富士山形成绝美画面。",
      special: "💡 山梨人气第1位的花火大会！20:00-20:20为冬花火燃放时间。大池公园是主会场，可以拍摄烟火、湖面倒影和富士山的三重美景。建议提前占位！",
      photoTips: [
        "烟火特写：使用长曝光拍摄烟火的轨迹",
        "湖面倒影：拍摄烟火在湖面的倒影",
        "富士山背景：以富士山为背景，拍摄烟火绽放的瞬间",
        "人物剪影：拍摄观赏烟火的人物剪影",
        "全景照片：拍摄整个会场和烟火的全景"
      ],
      femalePoses: [
        "【观赏姿势】站在湖边，仰头观赏烟火，拍摄侧脸剪影",
        "【欢呼姿势】双手举起做欢呼状，背景是绽放的烟火",
        "【许愿姿势】双手合十做许愿状，背景是烟火",
        "【回眸姿势】背对烟火，回头看镜头，烟火在背景中绽放",
        "【坐姿观赏】坐在湖边，腿部交叉，观赏烟火"
      ],
      couplePoses: [
        "【拥抱观赏】两人拥抱在一起观赏烟火，从背后拍摄剪影",
        "【牵手观赏】两人牵手站在湖边，仰头观赏烟火",
        "【亲吻瞬间】在烟火绽放的瞬间亲吻，拍摄浪漫画面",
        "【坐姿合影】两人坐在湖边，靠在一起，背景是烟火和富士山",
        "【指向烟火】两人一起指向绽放的烟火，做惊叹的表情"
      ],
      food: ["会场小吃摊位", "热饮", "章鱼烧", "烤鱿鱼"],
      tips: [
        "烟火时间：20:00-20:20（准时开始）",
        "建议19:00-19:30到达占位",
        "穿保暖衣物（夜晚湖边较冷）",
        "带上三脚架（如果要拍摄烟火）",
        "注意人群安全，不要拥挤"
      ]
    },
    {
      id: "return-bus",
      title: "返程巴士",
      titleJa: "帰りのバス",
      titleEn: "Return Bus",
      location: "返回东京",
      icon: "🚌",
      lat: 35.6812,
      lng: 139.7671,
      time: "20:30-23:00",
      history: "从河口湖地区返回东京站，车程约2小时。巴士会沿着中央自动车道返回，夜晚可以欣赏沿途的灯光和夜景。",
      special: "💡 返程时间仅供参考，可能因行程顺利、路况良好等原因提早返程。实际抵达解散地的时间会根据路况有所变动。为避免损失，请不要安排当天晚上的其他活动！",
      photoTips: [
        "巴士内：拍摄巴士内的氛围和同行的伙伴",
        "窗外夜景：拍摄窗外的夜景和灯光",
        "疲惫但满足：拍摄疲惫但满足的表情",
        "回顾照片：在巴士上回顾今天拍摄的照片",
        "东京夜景：快到东京时拍摄城市夜景"
      ],
      femalePoses: [
        "【巴士内自拍】在巴士座位上自拍，做疲惫但满足的表情",
        "【看窗外】侧脸看向窗外，拍摄思考或回味的表情",
        "【回顾照片】看手机上今天拍的照片，做开心的表情",
        "【休息姿势】靠在座位上休息，拍摄放松的姿势",
        "【比心姿势】对着镜头做爱心手势，感谢美好的一天"
      ],
      couplePoses: [
        "【靠肩休息】女生靠在男生肩上休息，温馨画面",
        "【牵手休息】两人牵手休息，拍摄手部特写",
        "【回顾照片】两人一起看手机上的照片，头部靠近",
        "【窗外夜景】两人一起看窗外夜景，从侧面拍摄",
        "【疲惫合影】两人做疲惫但开心的表情，纪念充实的一天"
      ],
      food: ["巴士上可以吃自备的零食和饮料"],
      tips: [
        "上车前去洗手间（车程约2小时）",
        "准备一些零食和水在车上吃",
        "可以在车上休息或整理照片",
        "注意个人物品，不要遗漏在车上",
        "到达东京站后，注意交通方式回酒店"
      ]
    },
    {
      id: "arrival-tokyo",
      title: "抵达东京站",
      titleJa: "東京駅到着",
      titleEn: "Arrival at Tokyo Station",
      location: "JR东京站",
      icon: "🏁",
      lat: 35.6812,
      lng: 139.7671,
      time: "约23:00",
      history: "JR东京站是东京最重要的交通枢纽，连接多条JR线路和地铁线路。从这里可以方便地前往东京各个地区。",
      special: "💡 预计23:00左右抵达东京站新丸之内大楼BEAMS标牌下（解散地点）。实际时间可能因路况有所变动。解散后请尽快返回酒店休息，准备明天的行程！",
      photoTips: [
        "东京站夜景：拍摄东京站的夜景和灯光",
        "解散合影：在解散地点拍摄合影，纪念今天的旅程",
        "疲惫归来：拍摄疲惫但满足的表情",
        "红砖建筑：拍摄东京站标志性的红砖建筑夜景",
        "再见富士山：回顾今天的照片，告别富士山"
      ],
      femalePoses: [
        "【归来姿势】站在东京站前，做疲惫但满足的表情，展示充实的一天",
        "【挥手告别】对着镜头挥手，告别富士山之旅",
        "【东京站前】站在东京站红砖建筑前，拍摄夜景人像",
        "【回顾照片】看手机上今天的照片，做满足的表情",
        "【期待明天】做期待的表情，准备明天的新行程"
      ],
      couplePoses: [
        "【归来合影】两人在东京站前合影，做疲惫但开心的表情",
        "【拥抱告别】拥抱在一起，纪念美好的一天",
        "【牵手归来】牵手站在东京站前，展示默契",
        "【回顾照片】两人一起看今天的照片，头部靠近",
        "【期待明天】两人做期待的表情，准备明天的新冒险"
      ],
      food: ["东京站内便当店（如果饿了可以买夜宵）"],
      tips: [
        "注意个人物品，不要遗漏",
        "记下回酒店的交通方式",
        "如果太晚，可以考虑打车回酒店",
        "尽快回酒店休息，准备明天的行程",
        "可以在东京站购买明天的早餐或零食"
      ]
    }
  ];

  const subwayRoutes = [
    {
      from: "上野站",
      to: "东京站",
      line: "JR山手线",
      time: "10分钟",
      fare: "160日元",
      color: "bg-green-500",
      steps: [
        "从上野站乘坐JR山手线（内环方向）",
        "2站后在东京站下车",
        "前往新丸之内大楼BEAMS标牌下集合"
      ]
    },
    {
      from: "东京站",
      to: "富士山地区",
      line: "旅游巴士",
      time: "约2.5小时",
      fare: "已包含",
      color: "bg-blue-500",
      steps: [
        "在BEAMS标牌下集合",
        "乘坐旅游巴士前往富士山地区",
        "第一站：西湖冰之祭典"
      ]
    },
    {
      from: "富士山地区",
      to: "东京站",
      line: "旅游巴士",
      time: "约2小时",
      fare: "已包含",
      color: "bg-blue-500",
      steps: [
        "20:30从河口湖地区出发",
        "乘坐旅游巴士返回东京",
        "约23:00抵达东京站新丸之内大楼"
      ]
    },
    {
      from: "东京站",
      to: "上野站",
      line: "JR山手线",
      time: "10分钟",
      fare: "160日元",
      color: "bg-green-500",
      steps: [
        "从东京站乘坐JR山手线（外环方向）",
        "2站后在上野站下车",
        "返回酒店休息"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Heart className="mr-2 h-4 w-4" />
                东京浪漫之旅
              </Button>
            </Link>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              2/6 - 2/11 · 库洛米风格行程
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Snowflake className="h-10 w-10" />
            第3天
          </h1>
          <p className="text-xl opacity-90">富士山一日游 · 冬季限定体验</p>
          <p className="text-sm opacity-75 mt-2">2月8日 · 西湖冰之祭典 · 罗森网红机位 · 河口湖冬花火</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Progress Card */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-purple-600" />
              今日完成度
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>已完成 {checkedSpots.size} / {spots.length} 个打卡点</span>
                <span className="font-bold text-purple-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-blue-600" />
              2月8日天气
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-blue-600">5°C</div>
                <div className="text-gray-600">晴天</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>💧 湿度: 45%</div>
                <div>🌬️ 风速: 3m/s</div>
                <div className="mt-2 text-purple-600 font-medium">
                  建议穿搭：羽绒服+保暖内衣
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Reminders */}
        <Card className="border-2 border-yellow-200 bg-yellow-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-6 w-6" />
              重要提醒
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="font-bold">🚌 集合地点</span> - JR东京站新丸之内大楼BEAMS标牌下，请提前10-15分钟到达
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">❄️ 西湖冰之祭典</span> - 2月8日前往西湖冰之祭典，穿防滑保暖鞋
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">♨️ 温泉费用</span> - 温泉入浴、晚餐、毛巾需自费
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">🎆 冬花火大会</span> - 20:00-20:20，建议19:00-19:30到达占位
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">🕚 返程时间</span> - 约23:00抵达东京站，请勿安排当晚其他活动
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Highlight Card */}
        <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <Sparkles className="h-6 w-6" />
              今日亮点：河口湖冬花火大会
            </CardTitle>
            <CardDescription className="text-base">
              20:00-20:20 · 山梨人气第1位 · 大池公园主会场
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">最佳观赏点</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">大池公园</span>（推荐★★★★★）- 主会场，可拍摄烟火、湖面倒影和富士山的三重美景
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">占位策略</h4>
                <p className="text-sm text-gray-700">
                  19:00-19:30抵达，选择靠近湖边的位置，既能拍到烟火，又能拍到湖面倒影
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="spots" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Camera className="mr-2 h-4 w-4" />
              景点打卡
            </TabsTrigger>
            <TabsTrigger value="subway" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Train className="mr-2 h-4 w-4" />
              交通指引
            </TabsTrigger>
            <TabsTrigger value="route" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Navigation className="mr-2 h-4 w-4" />
              路线导航
            </TabsTrigger>
          </TabsList>

          {/* Spots Tab */}
          <TabsContent value="spots" className="space-y-6 mt-6">
            {spots.map((spot, index) => (
              <Card key={spot.id} className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{spot.icon}</span>
                        <div>
                          <CardTitle className="text-xl">
                            <JapaneseText 
                              zh={spot.title}
                              ja={spot.titleJa}
                              en={spot.titleEn}
                              language={language}
                            />
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4" />
                            {spot.location}
                          </CardDescription>
                          {spot.time && (
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4" />
                              {spot.time}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Checkbox
                        id={spot.id}
                        checked={checkedSpots.has(spot.id)}
                        onCheckedChange={() => toggleSpot(spot.id)}
                        className="h-6 w-6"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => speakJapanese(spot.titleJa)}
                        className="gap-1"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* History */}
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      历史故事
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{spot.history}</p>
                  </div>

                  {/* Special */}
                  {spot.special && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 特别说明</h4>
                      <p className="text-sm text-yellow-700">{spot.special}</p>
                    </div>
                  )}

                  {/* Photo Tips */}
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      拍照技巧
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {spot.photoTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Female Poses */}
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-600 mb-3 flex items-center gap-2">
                      👩 女生拍照姿势（重点）
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {spot.femalePoses.map((pose, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-pink-400 font-bold mt-0.5">•</span>
                          <span>{pose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Couple Poses */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                      💑 情侣互动姿势
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {spot.couplePoses.map((pose, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 font-bold mt-0.5">•</span>
                          <span>{pose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Food */}
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      美食推荐
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {spot.food.map((item, i) => (
                        <Badge key={i} variant="secondary" className="bg-orange-100 text-orange-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  {spot.tips && spot.tips.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">💡 实用建议</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {spot.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Navigation Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleNavigation(spot.lat, spot.lng, spot.title)}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    导航
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Subway Tab */}
          <TabsContent value="subway" className="space-y-4 mt-6">
            {subwayRoutes.map((route, index) => (
              <Card key={index} className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    {route.from} → {route.to}
                  </CardTitle>
                  <CardDescription>
                    <Badge className={`${route.color} text-white`}>{route.line}</Badge>
                    <span className="ml-2">约 {route.time}</span>
                    <span className="ml-2 text-purple-600 font-semibold">{route.fare}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ol className="space-y-2">
                    {route.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Badge variant="outline" className="mt-0.5">{i + 1}</Badge>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Route Tab */}
          <TabsContent value="route" className="mt-6">
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  今日路线图
                </CardTitle>
                <CardDescription>富士山一日游完整路线</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <VisualRouteMap spots={spots} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Link href="/day2">
            <Button variant="outline" className="gap-2">
              ← 上一天
            </Button>
          </Link>
          <Link href="/day4">
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              下一天 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
