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
  Zap,
  ShoppingBag,
  Building2
} from "lucide-react";
import { Link } from "wouter";

export default function Day5() {
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

  const progress = (checkedSpots.size / 9) * 100;

  const spots = [
    {
      id: "akihabara",
      title: "秋叶原电器街",
      titleJa: "秋葉原電気街",
      titleEn: "Akihabara Electric Town",
      location: "JR秋叶原站",
      icon: "⚡",
      time: "10:00-12:00",
      lat: 35.7022,
      lng: 139.7744,
      history: "秋叶原是东京著名的电器和动漫文化街区，二战后从黑市发展成为电器街，1990年代后成为御宅族文化的圣地。这里有无数的动漫店、女仆咖啡厅、游戏中心和电器商店。",
      special: "💡 必逛店铺：友都八喜（Yodobashi）电器城、animate动漫店、K-BOOKS二手店、Radio会馆。女仆咖啡厅推荐：@home cafe。周末会有女仆在街上发传单。",
      photoTips: [
        "电器街全景：拍摄秋叶原站前的繁华街景和巨大广告牌",
        "动漫店铺：拍摄各种动漫周边和手办",
        "女仆咖啡厅：在女仆咖啡厅内拍照（需征得同意）",
        "游戏中心：拍摄抓娃娃机和游戏机",
        "二次元氛围：捕捉秋叶原独特的御宅族文化氛围"
      ],
      food: ["女仆咖啡厅", "拉面", "牛丼", "章鱼烧"],
      femalePoses: [
        "【动漫店前】站在animate或其他动漫店前，双手比V字，表情开心",
        "【手办合影】拿着喜欢的手办或周边，做开心表情",
        "【电器街背景】站在繁华的电器街前，一手叉腰，一手比心",
        "【游戏中心】在抓娃娃机前，做要抓娃娃的动作",
        "【二次元风】模仿动漫角色的经典姿势，俏皮可爱"
      ],
      couplePoses: [
        "【一起逛店】两人一起看动漫周边，头靠在一起",
        "【抓娃娃】男生帮女生抓娃娃，女生在旁边加油",
        "【电器街合影】站在秋叶原标志性建筑前合影",
        "【分享战利品】两人一起展示购买的动漫周边",
        "【女仆咖啡厅】在女仆咖啡厅内合影（需征得同意）"
      ]
    },
    {
      id: "imperial-palace",
      title: "皇居外苑",
      titleJa: "皇居外苑",
      titleEn: "Imperial Palace East Gardens",
      location: "地铁大手町站",
      icon: "🏰",
      time: "12:30-13:30",
      lat: 35.6852,
      lng: 139.7528,
      history: "皇居是日本天皇的居所，位于东京中心。外苑和东御苑对公众开放，可以看到江户城的遗迹、二重桥和护城河。春季樱花盛开时非常美丽。",
      special: "💡 二重桥是最经典的拍照点！东御苑免费开放（周一周五休园）。护城河边可以拍到天鹅。建议穿舒适的鞋子，园区很大。",
      photoTips: [
        "二重桥：拍摄经典的二重桥和护城河",
        "石墙遗迹：拍摄江户城的石墙和城门",
        "日式庭园：东御苑内的日式庭园",
        "护城河：拍摄护城河和天鹅",
        "樱花季：春季拍摄樱花和皇居的组合"
      ],
      food: ["附近商业区餐厅", "便当"],
      femalePoses: [
        "【二重桥前】站在二重桥前，双脚交叉，一手轻提包，侧身45度",
        "【石墙前】倚靠在江户城石墙前，一手撑墙，表情优雅",
        "【庭园漫步】走在日式庭园的小径上，回头看镜头",
        "【护城河边】站在护城河边，一手遮阳眺望，侧脸拍摄",
        "【樱花下】春季站在樱花树下，一手轻触樱花枝"
      ],
      couplePoses: [
        "【二重桥合影】两人站在二重桥前，女生靠在男生肩上",
        "【庭园漫步】牵手在庭园小径上漫步，背影拍摄",
        "【护城河边】男生从背后环抱女生，看向护城河",
        "【石墙前】两人倚靠石墙，侧面拍摄",
        "【樱花下】春季在樱花树下拥抱或牵手"
      ]
    },
    {
      id: "ginza",
      title: "银座购物街",
      titleJa: "銀座",
      titleEn: "Ginza",
      location: "地铁银座站",
      icon: "💎",
      time: "14:00-16:30",
      lat: 35.6717,
      lng: 139.7647,
      history: "银座是东京最高档的购物区，从明治时代开始就是繁华商业街。这里有各种国际奢侈品牌旗舰店、百货公司、高级餐厅和艺术画廊。周末的步行者天国（车辆禁行）是特色。",
      special: "💡 必逛：银座三越、银座松屋、GINZA SIX、优衣库旗舰店、无印良品旗舰店。周末12:00-18:00中央通禁止车辆通行，可以在马路上拍照！",
      photoTips: [
        "中央通：拍摄银座中央通的繁华街景",
        "奢侈品店：在各大品牌旗舰店前拍照",
        "步行者天国：周末在禁止车辆的马路上拍照",
        "夜景：傍晚拍摄银座的霓虹灯夜景",
        "时尚街拍：展现银座的高级时尚氛围"
      ],
      food: ["银座寿司", "高级餐厅", "咖啡厅", "甜品店"],
      femalePoses: [
        "【时尚街拍】在银座中央通上走秀般行走，一手提包，表情自信",
        "【奢侈品店前】站在喜欢的品牌店前，双脚交叉，一手叉腰",
        "【购物袋姿势】双手提着购物袋，开心微笑",
        "【橱窗前】站在精美的橱窗前，侧身看向橱窗",
        "【咖啡厅】坐在露天咖啡厅，腿部交叉，一手拿咖啡杯"
      ],
      couplePoses: [
        "【牵手逛街】牵手在银座中央通漫步，背影拍摄",
        "【奢侈品店前】站在品牌店前合影，女生靠在男生肩上",
        "【购物互动】男生帮女生提购物袋，女生开心微笑",
        "【咖啡厅】两人坐在咖啡厅，头靠在一起看菜单",
        "【步行者天国】周末在禁止车辆的马路中央合影"
      ]
    },
    {
      id: "tsukiji-outer-market",
      title: "筑地场外市场",
      titleJa: "築地場外市場",
      titleEn: "Tsukiji Outer Market",
      location: "地铁筑地站",
      icon: "🐟",
      time: "16:30-17:30",
      lat: 35.6654,
      lng: 139.7707,
      history: "筑地是东京著名的海鲜市场，虽然批发市场已搬迁至丰洲，但场外市场仍然营业，有各种海鲜餐厅、寿司店、小吃摊和食材店。这里是品尝新鲜海鲜的好地方。",
      special: "💡 必吃：海鲜丼、寿司、玉子烧、烤扇贝、金枪鱼串。推荐店铺：寿司大、大和寿司、筑地虎杖。下午去人比较少，但部分店铺可能已关门。",
      photoTips: [
        "市场街景：拍摄热闹的市场氛围",
        "海鲜美食：拍摄新鲜的海鲜丼和寿司",
        "店铺特写：拍摄各种特色小吃摊",
        "边走边吃：拍摄拿着美食边走边吃的画面",
        "市场细节：捕捉市场的生活气息"
      ],
      food: ["海鲜丼", "寿司", "玉子烧", "烤扇贝", "金枪鱼串"],
      femalePoses: [
        "【拿美食】一手拿着海鲜串或玉子烧，做要吃的表情",
        "【市场背景】站在热闹的市场前，一手拿美食，一手比心",
        "【边走边吃】边走边吃，回头看镜头，表情满足",
        "【美食特写】拿着美食靠近镜头，做要咬的动作",
        "【店铺前】站在喜欢的店铺前，展示购买的食物"
      ],
      couplePoses: [
        "【喂食互动】女生拿着海鲜串喂男生，男生做要吃的动作",
        "【一起品尝】两人一起吃同一个海鲜丼，头靠在一起",
        "【市场漫步】牵手在市场漫步，手里拿着美食",
        "【分享美食】两人一起展示购买的各种美食",
        "【餐厅合影】在寿司店内合影，背景是新鲜寿司"
      ]
    },
    {
      id: "tokyo-tower",
      title: "东京塔",
      titleJa: "東京タワー",
      titleEn: "Tokyo Tower",
      location: "地铁赤羽桥站",
      icon: "🗼",
      time: "18:00-19:30",
      lat: 35.6586,
      lng: 139.7454,
      history: "东京塔建于1958年，高332.9米，是东京的标志性建筑。以巴黎埃菲尔铁塔为原型设计，曾是日本最高的建筑物。夜晚点灯后非常美丽，是东京夜景的代表。",
      special: "💡 门票：大展望台1,200日元，特别展望台追加1,000日元。建议傍晚时分上塔，可以同时看到日落和夜景！塔下的芝公园是拍摄东京塔全景的好地方。",
      photoTips: [
        "塔下仰拍：从芝公园仰拍东京塔全景",
        "夜景：拍摄点灯后的东京塔夜景",
        "展望台：在展望台拍摄东京市区全景",
        "日落时分：傍晚拍摄日落和东京塔的组合",
        "人塔同框：拍摄人物和东京塔的合影"
      ],
      food: ["塔内餐厅", "周边餐厅"],
      femalePoses: [
        "【仰望东京塔】站在塔下，仰头看向塔顶，侧面拍摄",
        "【指向塔顶】一手指向塔顶，表情惊叹",
        "【夜景姿势】夜晚点灯后，站在塔前，双手做爱心手势",
        "【展望台】在展望台上，一手扶栏杆，眺望东京夜景",
        "【芝公园】坐在芝公园草地上，东京塔在背景"
      ],
      couplePoses: [
        "【塔下拥抱】在东京塔下拥抱，仰拍",
        "【一起仰望】两人一起仰望塔顶，牵手",
        "【夜景合影】夜晚点灯后，在塔前合影，女生靠在男生肩上",
        "【展望台】在展望台上，男生从背后环抱女生，看向夜景",
        "【芝公园】坐在草地上，女生靠在男生肩上，东京塔在背景"
      ]
    },
    {
      id: "roppongi-hills",
      title: "六本木之丘",
      titleJa: "六本木ヒルズ",
      titleEn: "Roppongi Hills",
      location: "地铁六本木站",
      icon: "🏙️",
      time: "19:30-21:00",
      lat: 35.6604,
      lng: 139.7292,
      history: "六本木之丘是东京的高端商业综合体，2003年开业。包括森大厦、森美术馆、东京城市观景台（Tokyo City View）、高级商店和餐厅。是东京夜景的最佳观赏地之一。",
      special: "💡 Tokyo City View门票1,800日元，屋顶Sky Deck追加500日元。52楼室内展望台可以360度俯瞰东京夜景，能看到东京塔、晴空塔、东京湾！",
      photoTips: [
        "展望台夜景：在Tokyo City View拍摄东京夜景全景",
        "东京塔视角：从六本木拍摄东京塔夜景",
        "Sky Deck：在屋顶露天展望台拍摄星空和夜景",
        "商业区：拍摄六本木之丘的现代建筑",
        "夜景人像：以东京夜景为背景拍摄人像"
      ],
      food: ["六本木之丘餐厅", "高级料理"],
      femalePoses: [
        "【展望台】站在展望台，一手扶玻璃，眺望东京夜景，侧脸拍摄",
        "【夜景背景】以东京塔夜景为背景，双手做框架手势",
        "【Sky Deck】在屋顶露天展望台，张开双臂拥抱夜景",
        "【现代建筑】站在六本木之丘的现代建筑前，时尚街拍",
        "【夜景自拍】举起手机自拍，背景是东京夜景"
      ],
      couplePoses: [
        "【展望台拥抱】在展望台上拥抱，东京夜景在背景",
        "【一起看夜景】两人并肩站立，一起看向东京塔，牵手",
        "【Sky Deck】在屋顶露天展望台，男生从背后环抱女生",
        "【夜景之吻】以东京夜景为背景，亲吻剪影",
        "【合影留念】在展望台上自拍合影，背景是璀璨夜景"
      ]
    },
    {
      id: "roppongi-dinner",
      title: "六本木晚餐",
      titleJa: "六本木で夕食",
      titleEn: "Dinner at Roppongi",
      location: "六本木之丘",
      icon: "🍽️",
      time: "21:00-22:30",
      lat: 35.6604,
      lng: 139.7292,
      history: "六本木有很多高级餐厅和特色料理店，可以选择日式料理、西餐或融合料理。",
      special: "💡 推荐：六本木之丘内的餐厅、烤肉店、居酒屋。可以选择有夜景的餐厅，边吃边欣赏东京夜景。",
      photoTips: [
        "美食特写：拍摄精致的料理",
        "餐厅氛围：拍摄高级餐厅的氛围",
        "夜景餐厅：在有夜景的餐厅拍照",
        "满足表情：拍摄享用美食的满足表情"
      ],
      food: ["日式料理", "烤肉", "西餐", "居酒屋"],
      femalePoses: [
        "【拿美食】一手拿着料理，做要吃的表情",
        "【餐厅氛围】坐在餐厅内，腿部交叉，一手拿酒杯",
        "【夜景背景】在有夜景的餐厅，以夜景为背景拍照",
        "【满足表情】吃饭时闭眼享受，表情满足",
        "【举杯庆祝】举起酒杯或饮料，做庆祝手势"
      ],
      couplePoses: [
        "【共享美食】两人一起吃同一道料理",
        "【喂食互动】女生喂男生吃东西，男生做夸张表情",
        "【举杯碰杯】两人举杯碰杯，庆祝美好的一天",
        "【餐厅合影】在餐厅里自拍，背景是美食和夜景",
        "【浪漫氛围】两人对视微笑，餐桌上的烛光或灯光"
      ]
    },
    {
      id: "roppongi-night",
      title: "六本木夜生活",
      titleJa: "六本木の夜",
      titleEn: "Roppongi Nightlife",
      location: "六本木",
      icon: "🌃",
      time: "22:30-",
      lat: 35.6604,
      lng: 139.7292,
      history: "六本木是东京著名的夜生活区，有很多酒吧、夜店和娱乐场所。如果不想去夜店，也可以在六本木之丘周边散步，欣赏夜景。",
      special: "💡 如果想体验东京夜生活，可以去酒吧或夜店。如果想安静一点，可以在六本木之丘周边散步，或去便利店买点小吃回酒店。",
      photoTips: [
        "夜景街拍：拍摄六本木的夜景街道",
        "霓虹灯：拍摄五彩缤纷的霓虹灯",
        "酒吧氛围：在酒吧内拍照（如允许）",
        "夜晚人像：以夜景为背景拍摄人像"
      ],
      food: ["酒吧", "夜宵", "便利店"],
      femalePoses: [
        "【夜景街拍】站在六本木的夜景街道上，霓虹灯为背景",
        "【酒吧氛围】坐在酒吧内，一手拿酒杯，表情慵懒",
        "【夜晚漫步】在夜晚的街道上行走，回头看镜头",
        "【霓虹灯背景】以五彩霓虹灯为背景，时尚街拍",
        "【夜景自拍】举起手机自拍，背景是六本木夜景"
      ],
      couplePoses: [
        "【夜晚漫步】牵手在六本木夜晚的街道上漫步",
        "【酒吧合影】在酒吧内合影，举杯碰杯",
        "【夜景拥抱】在夜景街道上拥抱，霓虹灯为背景",
        "【浪漫氛围】男生搂着女生，两人一起看向夜景",
        "【回酒店】牵手走向地铁站，准备回酒店"
      ]
    },
    {
      id: "return-to-ueno",
      title: "返回上野",
      titleJa: "上野へ戻る",
      titleEn: "Return to Ueno",
      location: "地铁六本木站",
      icon: "🚇",
      time: "23:00-",
      lat: 35.6604,
      lng: 139.7292,
      history: "从六本木站乘坐地铁日比谷线直达上野站，约20分钟。",
      special: "💡 地铁日比谷线从六本木直达上野，非常方便。末班车约在24:00左右，注意时间。",
      photoTips: [
        "地铁站：拍摄六本木地铁站",
        "车厢内：拍摄地铁车厢内的画面",
        "疲惫休息：拍摄在地铁上休息的自然状态"
      ],
      food: ["便利店夜宵"],
      femalePoses: [
        "【地铁站】站在地铁站月台，眺望铁轨，侧脸拍摄",
        "【车厢内】坐在地铁上，看向窗外，侧脸拍摄",
        "【闭眼休息】靠在座位上闭眼休息，表情安详",
        "【整理照片】低头看手机中的照片，微笑",
        "【自拍微笑】举起手机自拍，做胜利手势"
      ],
      couplePoses: [
        "【地铁站合影】在地铁站月台合影",
        "【肩膀依偎】女生靠在男生肩上休息，男生看向窗外",
        "【一起看照片】两人一起看手机中的照片，头靠在一起",
        "【牵手休息】两人牵手，闭眼休息",
        "【回酒店】牵手走出地铁站，准备回酒店"
      ]
    }
  ];

  const routeSteps = [
    { from: "上野APA酒店", to: "上野站", method: "步行", time: "5分钟", icon: "🚶" },
    { from: "上野站", to: "秋叶原站", method: "JR山手线", time: "3分钟", icon: "🚄" },
    { from: "秋叶原", to: "大手町站", method: "地铁丸之内线", time: "5分钟", icon: "🚇" },
    { from: "大手町", to: "银座站", method: "地铁丸之内线", time: "5分钟", icon: "🚇" },
    { from: "银座", to: "筑地站", method: "步行", time: "10分钟", icon: "🚶" },
    { from: "筑地", to: "赤羽桥站", method: "地铁日比谷线", time: "10分钟", icon: "🚇" },
    { from: "赤羽桥", to: "六本木站", method: "步行+地铁", time: "15分钟", icon: "🚇" },
    { from: "六本木", to: "上野站", method: "地铁日比谷线", time: "20分钟", icon: "🚇" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="fixed top-16 right-8 w-20 h-20 opacity-15 animate-float z-0 pointer-events-none">
        <img src="/images/kuromi-cute.png" alt="" className="w-full h-full" />
      </div>
      <div className="fixed bottom-24 left-8 w-24 h-24 opacity-20 animate-float-delayed z-0 pointer-events-none">
        <img src="/images/kuromi-sticker.png" alt="" className="w-full h-full" />
      </div>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-purple-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
          <Badge variant="outline" className="mb-4 text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
            <Building2 className="w-5 h-5 mr-2" />
            第5天
          </Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            东京市区精华游
          </h2>
          <p className="text-gray-600 text-lg">
            <JapaneseText zh="2月10日（周二）" ja="2月10日（火曜日）" en="Feb 10 (Tue)" />
          </p>
          <p className="text-pink-600 font-medium mt-2">
            秋叶原 → 皇居 → 银座 → 筑地 → 东京塔 → 六本木
          </p>
        </div>

        {/* 今日完成度 */}
        <Card className="mb-6 border-2 border-purple-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
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
                2月10日天气
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-sky-600">13°C</div>
                <p className="text-gray-600">晴天</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>💧 湿度: 55%</div>
                  <div>🌬️ 风速: 2m/s</div>
                </div>
                <p className="text-pink-600 font-medium mt-2">建议穿搭：时尚外套+长裤+舒适鞋</p>
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
                <span><strong>地铁一日券</strong> - 购买东京Metro一日券800日元</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>展望台门票</strong> - 东京塔1,200日元，六本木1,800日元</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>银座购物</strong> - 周末12-18点中央通禁止车辆</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <span><strong>筑地市场</strong> - 下午部分店铺可能关门</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日亮点 */}
        <Card className="mb-6 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <Sparkles className="w-5 h-5" />
              今日亮点：东京塔 & 六本木夜景
            </CardTitle>
            <CardDescription className="text-pink-600 font-medium">
              10:00-23:00 · 东京市区精华 · 双塔夜景体验
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🌃 夜景体验</h4>
              <p className="text-sm text-gray-600">
                <strong>东京塔</strong>（推荐★★★★★）- 东京的标志性建筑，傍晚上塔可以同时看到日落和夜景<br/>
                <strong>六本木之丘</strong>（推荐★★★★★）- 52楼展望台360度俯瞰东京夜景，能看到东京塔、晴空塔
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🛍️ 购物天堂</h4>
              <p className="text-sm text-gray-600">
                秋叶原的动漫文化、银座的奢侈品购物、筑地的海鲜美食，一天体验东京的多样魅力。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 主要内容标签页 */}
        <Tabs defaultValue="spots" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-purple-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              景点打卡
            </TabsTrigger>
            <TabsTrigger value="route" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Train className="w-4 h-4 mr-2" />
              路线导航
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Info className="w-4 h-4 mr-2" />
              旅行贴士
            </TabsTrigger>
          </TabsList>

          {/* 景点打卡标签页 */}
          <TabsContent value="spots" className="space-y-6 mt-6">
            {spots.map((spot, index) => (
              <Card key={spot.id} className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg bg-white/90 backdrop-blur">
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
                              className="hover:bg-purple-100"
                            >
                              <Volume2 className="w-4 h-4 text-purple-500" />
                            </Button>
                          </CardTitle>
                          <CardDescription className="text-base">
                            <JapaneseText zh={spot.location} ja={spot.titleJa} en={spot.titleEn} />
                          </CardDescription>
                          <Badge variant="outline" className="mt-1 text-pink-600 border-pink-300">
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
                        className="w-6 h-6 border-2 border-purple-400 data-[state=checked]:bg-purple-500"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openNavigation(spot.title, spot.lat, spot.lng)}
                        className="border-pink-300 text-pink-600 hover:bg-pink-50"
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
            <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-pink-600">2月10日路线图</CardTitle>
                <CardDescription>东京市区精华游完整路线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        {index < routeSteps.length - 1 && (
                          <div className="w-1 h-16 bg-gradient-to-b from-purple-300 to-pink-300 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-pink-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{step.from}</span>
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="bg-white">{step.method}</Badge>
                          <span>→</span>
                          <span className="font-medium">{step.time}</span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-pink-600">
                          ↓ {step.to}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-pink-300">
                  <h4 className="font-semibold text-pink-800 mb-2">东京Metro一日券（800日元）</h4>
                  <p className="text-sm text-gray-700 mb-2">购买东京Metro一日券，可以无限次乘坐东京地铁，非常划算！</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      无限次乘坐东京Metro地铁
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      覆盖今天所有景点
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
              <Card className="border-2 border-purple-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-purple-600">交通建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span><strong>地铁一日券</strong> - 购买东京Metro一日券800日元，无限次乘坐</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span><strong>JR山手线</strong> - 上野到秋叶原只需3分钟</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span><strong>步行距离</strong> - 银座到筑地约10分钟步行</span>
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
                    <span><strong>东京塔</strong> - 傍晚上塔，可以同时拍到日落和夜景</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>六本木展望台</strong> - 360度俯瞰东京夜景，绝佳拍照点</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>银座步行者天国</strong> - 周末12-18点可以在马路上拍照</span>
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
                    <span><strong>展望台门票</strong> - 东京塔1,200日元，六本木1,800日元</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>筑地市场</strong> - 下午部分店铺可能关门，建议早点去</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>六本木夜生活</strong> - 注意安全，建议结伴而行</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <span><strong>末班车</strong> - 地铁末班车约24:00，注意时间</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-green-600">预算参考</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>东京Metro一日券</span>
                    <span className="font-semibold text-green-600">¥800日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>东京塔门票</span>
                    <span className="font-semibold text-green-600">¥1,200日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>六本木展望台门票</span>
                    <span className="font-semibold text-green-600">¥1,800日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>午餐（筑地海鲜）</span>
                    <span className="font-semibold text-green-600">¥2,000-3,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>晚餐（六本木）</span>
                    <span className="font-semibold text-green-600">¥3,000-5,000日元/人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>购物和小吃</span>
                    <span className="font-semibold text-green-600">¥5,000-10,000日元/人</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between items-center font-bold">
                    <span>预计总花费（2人）</span>
                    <span className="text-lg text-green-600">¥28,000-48,000日元</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部导航 */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/day4">
            <Button variant="outline" className="border-2 border-purple-300 hover:bg-purple-50">
              ← 上一天
            </Button>
          </Link>
          <Link href="/day6">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              下一天 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
