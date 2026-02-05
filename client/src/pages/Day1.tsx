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
  Plane
} from "lucide-react";
import { Link } from "wouter";

export default function Day1() {
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
      id: "narita-airport",
      title: "成田机场抵达",
      titleJa: "成田空港到着",
      titleEn: "Narita Airport Arrival",
      location: "成田国际机场 T1/T2",
      icon: "✈️",
      time: "14:00-15:00",
      lat: 35.7653,
      lng: 140.3864,
      history: "成田国际机场是东京的主要国际机场之一，位于千叶县成田市，距离东京市中心约60公里。机场于1978年开业，是日本最繁忙的机场之一。",
      special: "**交通指引**：\n- 抵达后，跟随「京成线」标志前往B1层\n- 寻找橙色的「Skyliner」标志\n- 在自动售票机或人工窗口购买车票\n- 车票价格：2,570日元\n- 乘坐开往「京成上野」方向的列车\n- 车程约41分钟\n\n**重要提示**：\n- 建议提前在官网或App预订Skyliner车票，可享优惠\n- 如果行李较多，可选择N'EX成田特快（直达上野）\n- 机场有免费WiFi，可下载Google Maps离线地图",
      tips: [
        "📱 抵达后立即开启手机漫游或购买SIM卡",
        "💴 在机场兑换一些日元现金（约3-5万日元）",
        "🎫 购买Skyliner车票时可同时购买地铁通票",
        "🗺️ 下载Google Maps离线地图",
        "📸 在机场大厅拍照留念"
      ],
      girlPoses: [
        "在机场大厅的「Welcome to Japan」标志前，双手比V字，露出期待的笑容",
        "坐在候机区的座位上，手持护照和机票，做出「终于到了」的表情",
        "在行李转盘前，假装推着行李箱，回头微笑",
        "在Skyliner列车前，手持车票，做出「出发」的姿势",
        "透过机场玻璃窗拍摄飞机，侧身回头微笑"
      ],
      couplePoses: [
        "在「Welcome to Japan」标志前，两人相拥，一起比V字",
        "男生帮女生推行李箱，女生在旁边牵着男生的手",
        "在Skyliner列车前，两人手牵手，一起看向列车",
        "在候机区座位上，女生靠在男生肩膀上休息",
        "透过机场玻璃窗，两人一起看飞机，男生从后面环抱女生"
      ],
      food: [
        "机场便利店：三明治、饭团、饮料（约500-800日元）",
        "机场餐厅：拉面、寿司、天妇罗（约1,500-2,500日元）"
      ]
    },
    {
      id: "skyliner-to-ueno",
      title: "京成Skyliner",
      titleJa: "京成スカイライナー",
      titleEn: "Keisei Skyliner",
      location: "成田机场 → 京成上野站",
      icon: "🚄",
      time: "15:00-15:41",
      lat: 35.7106,
      lng: 139.7767,
      history: "京成Skyliner是连接成田机场和东京市区的高速列车，最高时速160公里，是前往上野最快捷的交通方式。列车内部宽敞舒适，每个座位都有充电插座。",
      special: "**乘车指引**：\n- 在B1层找到京成线入口\n- 通过闸机后，前往Skyliner专用站台\n- 站台上有明确的车厢编号标识\n- 找到您的车厢和座位号\n- 车厢内有行李架，可放置大件行李\n\n**车程信息**：\n- 时间：约41分钟\n- 费用：2,570日元\n- 班次：每20-40分钟一班\n- 终点站：京成上野站\n\n**到达上野后**：\n- 从「池之端口」出站\n- 出站后右转，步行约3分钟到达上野APA酒店\n- 沿途会经过上野公园入口",
      tips: [
        "🎫 车票包含座位号，请对号入座",
        "🔌 座位旁有充电插座，可为手机充电",
        "📱 车上有免费WiFi",
        "🧳 大件行李可放在车厢前后的行李架",
        "🗺️ 到站前5分钟会有中文广播提醒"
      ],
      girlPoses: [
        "在列车外拍摄Skyliner的流线型车头，侧身回头微笑",
        "在座位上，手持车票，透过窗户拍摄窗外风景",
        "在车厢内，手持手机假装自拍，展示车厢内部",
        "在座位上，双手托腮，看向窗外，展现期待的表情",
        "在车厢连接处，手扶把手，回头微笑"
      ],
      couplePoses: [
        "在列车前，两人手牵手，一起看向列车",
        "在座位上，女生靠在男生肩膀上，一起看窗外风景",
        "男生帮女生拍照，女生在窗边摆姿势",
        "两人一起举起车票，做出「出发」的手势",
        "在车厢内，两人面对面坐着，手牵手聊天"
      ],
      food: []
    },
    {
      id: "ueno-apa-hotel",
      title: "上野APA酒店",
      titleJa: "上野APAホテル",
      titleEn: "APA Hotel Ueno",
      location: "上野站附近",
      icon: "🏨",
      time: "16:00-17:00",
      lat: 35.7106,
      lng: 139.7767,
      history: "APA酒店是日本知名的连锁商务酒店，以性价比高、位置便利著称。上野地区的APA酒店距离上野站步行仅3-5分钟，周边有阿美横丁、上野公园等景点。",
      special: "**从京成上野站到酒店**：\n1. 从「池之端口」出站\n2. 出站后右转，沿着不忍通り（Shinobazu-dori）向南走\n3. 步行约3分钟，看到APA酒店的招牌\n4. 进入酒店大堂，前往前台办理入住\n\n**Check-in流程**：\n- 出示护照和预订确认单\n- 填写入住登记表\n- 领取房卡和早餐券（如含早餐）\n- 询问前台WiFi密码\n\n**酒店设施**：\n- 免费WiFi\n- 自动贩卖机\n- 洗衣机（需投币）\n- 大浴场（部分酒店有）",
      tips: [
        "🔑 房卡是磁卡，进出房间需刷卡",
        "🛁 浴室有浴缸，可泡澡放松",
        "🧴 酒店提供洗发水、沐浴露、牙刷等",
        "📺 电视有中文频道",
        "🍜 前台可索取周边餐厅地图"
      ],
      girlPoses: [
        "在酒店大堂，手持房卡，做出「终于到家了」的表情",
        "在房间门口，手持房卡刷卡，回头微笑",
        "在房间内，坐在床上，双手举起做出「耶」的手势",
        "在房间窗边，看向窗外的上野街景",
        "在浴室门口，手持浴巾，做出「准备泡澡」的姿势"
      ],
      couplePoses: [
        "在酒店大堂，两人一起看房卡，讨论房间号",
        "在房间门口，男生帮女生刷房卡开门",
        "在房间内，两人一起坐在床上，相拥合影",
        "在窗边，两人一起看窗外风景，男生从后面环抱女生",
        "在房间内，两人一起打开行李箱，整理物品"
      ],
      food: []
    },
    {
      id: "ameyoko",
      title: "阿美横丁",
      titleJa: "アメ横",
      titleEn: "Ameyoko",
      location: "上野站附近",
      icon: "🏪",
      time: "17:00-19:00",
      lat: 35.7076,
      lng: 139.7745,
      history: "阿美横丁（Ameyoko）是上野最热闹的商业街，二战后作为黑市发展起来，现在是东京著名的购物和美食街。这里有超过400家店铺，从药妆、零食到海鲜、服装应有尽有。",
      special: "**从酒店到阿美横丁**：\n1. 从酒店出发，向上野站方向步行\n2. 步行约5分钟，看到JR上野站\n3. 在上野站中央口附近，就能看到「アメ横」的大招牌\n4. 进入商业街，开始探索\n\n**推荐路线**：\n- 从JR上野站中央口进入\n- 沿着主街道向南走\n- 逛药妆店（松本清、SUN DRUG等）\n- 品尝街边小吃（章鱼烧、烤串等）\n- 参观海鲜市场\n- 最后到达御徒町站\n\n**购物建议**：\n- 药妆店价格比市区便宜10-20%\n- 零食批发店「二木の菓子」性价比高\n- 海鲜市场可买新鲜海胆、金枪鱼",
      tips: [
        "💰 大部分店铺可刷卡，但小店铺建议带现金",
        "🛍️ 药妆店满5,000日元可免税",
        "🍢 街边小吃约300-500日元一份",
        "📸 商业街入口的大招牌是经典拍照点",
        "🕐 营业时间：10:00-20:00（部分店铺更晚）"
      ],
      girlPoses: [
        "在「アメ横」大招牌下，双手举起购物袋，露出开心的笑容",
        "在药妆店内，手持面膜或化妆品，做出「买买买」的表情",
        "在街边小吃摊前，手持章鱼烧，做出品尝的姿势",
        "在零食批发店内，被零食包围，做出「选择困难」的表情",
        "在商业街中间，手提购物袋，回头微笑"
      ],
      couplePoses: [
        "在「アメ横」大招牌下，两人一起举起购物袋",
        "在药妆店内，男生帮女生拿购物篮，女生在挑选商品",
        "在街边小吃摊前，两人一起品尝章鱼烧，互相喂食",
        "在商业街中，男生帮女生拎购物袋，女生挽着男生的手",
        "在零食店内，两人一起挑选零食，讨论要买什么"
      ],
      food: [
        "章鱼烧：300-500日元",
        "烤串：200-400日元/串",
        "海鲜盖饭：1,000-2,000日元",
        "拉面：800-1,200日元",
        "可丽饼：400-600日元"
      ]
    },
    {
      id: "dinner",
      title: "晚餐时间",
      titleJa: "夕食",
      titleEn: "Dinner Time",
      location: "阿美横丁或上野站附近",
      icon: "🍜",
      time: "19:00-20:00",
      lat: 35.7076,
      lng: 139.7745,
      history: "上野地区有众多餐厅，从平价拉面店到高级料理店应有尽有。阿美横丁内有许多海鲜饭店和居酒屋，是品尝地道日本料理的好去处。",
      special: "**推荐餐厅**：\n\n**拉面店**：\n- 一兰拉面（上野店）：豚骨拉面，约1,000日元\n- 麺屋武蔵：味噌拉面，约1,200日元\n\n**海鲜饭店**：\n- みなとや：海鲜盖饭，约1,500-2,500日元\n- 大統領：金枪鱼盖饭，约2,000日元\n\n**居酒屋**：\n- 磯丸水産：烤海鲜，约2,000-3,000日元\n- やきとり家すみれ：烤鸡串，约1,500-2,500日元\n\n**点餐技巧**：\n- 大部分餐厅有图片菜单\n- 可使用翻译App或指着图片点餐\n- 说「おすすめは？」（osusume wa？）询问推荐菜\n- 结账时说「お会計お願いします」（okaikei onegaishimasu）",
      tips: [
        "🍜 拉面店通常需要在自动售票机点餐",
        "💴 大部分餐厅可刷卡，但小店建议带现金",
        "🚰 日本餐厅提供免费冰水",
        "🧂 桌上有调味料，可根据口味调整",
        "📸 拍照前说「写真いいですか？」（shashin ii desu ka？）"
      ],
      girlPoses: [
        "在餐厅门口，手持菜单，做出「选择困难」的表情",
        "在座位上，手持筷子，面对美食露出期待的表情",
        "在拉面店，手持拉面碗，做出品尝的姿势",
        "在海鲜饭店，手持海鲜盖饭，展示丰盛的食物",
        "在居酒屋，手持啤酒杯，做出「干杯」的手势"
      ],
      couplePoses: [
        "在餐厅门口，两人一起看菜单，讨论要吃什么",
        "在座位上，两人面对面坐着，一起举起筷子",
        "在拉面店，两人一起品尝拉面，互相喂食",
        "在海鲜饭店，两人一起分享海鲜盖饭",
        "在居酒屋，两人举起啤酒杯，做出「干杯」的姿势"
      ],
      food: [
        "拉面：800-1,500日元",
        "海鲜盖饭：1,500-2,500日元",
        "寿司：2,000-5,000日元",
        "居酒屋：2,000-4,000日元/人",
        "天妇罗定食：1,500-2,500日元"
      ]
    },
    {
      id: "shopping",
      title: "购物时间",
      titleJa: "買い物",
      titleEn: "Shopping Time",
      location: "业务超市 上野广小路店（上野3丁目）",
      icon: "🛒",
      time: "20:00-21:00",
      lat: 35.7076,
      lng: 139.7745,
      history: "业务超市（業務スーパー）是日本知名的批发超市，以价格低廉、品种丰富著称。上野广小路店位于上野2丁目3番4号，在Centurion Hotel上野1楼，是东京都内人气第一的业务超市分店。这里营业到晚上10点，非常适合购买饮料、零食和早餐食材。",
      special: "**详细地址和交通**：\n📍 地址：东京都台东区上野2丁目3番4号（センチュリオンホテル上野1F）\n📞 电话：03-5812-2168\n🕐 营业时间：9:00-22:00\n💳 支付方式：现金、信用卡（VISA、MasterCard、JCB）\n\n**从晚餐地点到业务超市**：\n1. 从阿美横丁或上野站出发\n2. 前往JR御徒町站方向\n3. 从东京Metro地铁「上野广小路站」步行约2分钟\n4. 或从JR「御徒町站」北口步行约5分钟\n5. 超市位于Centurion Hotel上野1楼\n\n**购物建议**：\n- 💧 饮料：矿泉水、茶饮、果汁（比便利店便宜30-50%）\n- 🍪 零食：薯片、巧克力、饼干、日本特色零食\n- 🍞 早餐：面包、牛奶、酸奶、水果\n- 🍜 速食：拉面、咖喱包、冷冻食品\n- 🎁 伴手礼：日本特色零食、调味料、茶叶\n\n**周边其他购物地点**：\n- 多庆屋（TAKEYA）：大型折扣商场，7层楼，药妆、家电、服装、食品等\n- 松本清药妆店：免税药妆连锁店\n- 唐吉诃德（ドン・キホーテ）：24小时营业，商品种类丰富\n- 便利店：7-Eleven、FamilyMart、Lawson（上野站周边密集分布）\n\n**注意事项**：\n- 需要自备购物袋或购买塑料袋（3-5日元）\n- 大部分商品可刷卡\n- 建议购买2-3天的饮料和零食，节省旅行成本",
      tips: [
        "🛍️ 建议购买2-3天的饮料和零食",
        "🥛 牛奶和酸奶可放在酒店冰箱",
        "🍞 面包可作为第二天的早餐",
        "💰 价格比便利店便宜30-50%",
        "🎁 可购买一些伴手礼带回国"
      ],
      girlPoses: [
        "在超市门口，手持购物袋，做出「准备大采购」的表情",
        "在货架前，手持商品，做出「选择困难」的表情",
        "在饮料区，被各种饮料包围，做出「太多选择」的表情",
        "在零食区，手持零食，做出「买买买」的表情",
        "在收银台，手持购物篮，做出「满载而归」的表情"
      ],
      couplePoses: [
        "在超市门口，两人一起推购物车",
        "在货架前，男生帮女生拿购物篮，女生在挑选商品",
        "在饮料区，两人一起讨论要买什么饮料",
        "在零食区，两人一起挑选零食，互相推荐",
        "在收银台，男生帮女生结账，女生在旁边整理购物袋"
      ],
      food: []
    },
    {
      id: "back-to-hotel",
      title: "返回酒店",
      titleJa: "ホテルに戻る",
      titleEn: "Back to Hotel",
      location: "上野APA酒店",
      icon: "🏨",
      time: "21:00-",
      lat: 35.7106,
      lng: 139.7767,
      history: "结束第一天的行程，返回酒店休息，为第二天的浅草和服体验和横滨花火大会做好准备。",
      special: "**从业务超市返回酒店**：\n1. 从业务超市出发\n2. 沿着来时的路线返回\n3. 步行约5-8分钟到达酒店\n\n**回到酒店后**：\n- 将购买的饮料和食物放入冰箱\n- 洗澡放松\n- 整理第二天的行程\n- 检查和服租赁预约信息\n- 充电手机和相机\n- 早点休息，为第二天做好准备\n\n**第二天准备**：\n- 确认和服租赁时间（09:30）\n- 准备好相机和充电宝\n- 查看天气预报，准备合适的衣物\n- 设置闹钟（建议07:30起床）",
      tips: [
        "🛁 建议泡个热水澡放松",
        "📱 充电手机和相机",
        "🗺️ 检查第二天的行程安排",
        "⏰ 设置闹钟（07:30起床）",
        "💤 早点休息，为第二天做好准备"
      ],
      girlPoses: [
        "在酒店门口，手提购物袋，做出「满载而归」的表情",
        "在房间内，坐在床上，整理购物袋",
        "在浴室门口，手持浴巾，做出「准备泡澡」的姿势",
        "在床上，盖着被子，做出「终于可以休息了」的表情",
        "在窗边，看向窗外的上野夜景，做出「期待明天」的表情"
      ],
      couplePoses: [
        "在酒店门口，男生帮女生拎购物袋",
        "在房间内，两人一起整理购物袋",
        "在床上，两人相拥，讨论第一天的行程",
        "在窗边，两人一起看窗外夜景，男生从后面环抱女生",
        "在床上，两人一起看第二天的行程安排"
      ],
      food: []
    },
    {
      id: "rest",
      title: "休息时间",
      titleJa: "休憩時間",
      titleEn: "Rest Time",
      location: "上野APA酒店",
      icon: "😴",
      time: "21:00-",
      lat: 35.7106,
      lng: 139.7767,
      history: "第一天的行程结束，好好休息，为接下来的精彩旅程储备体力。",
      special: "**睡前准备**：\n- 设置闹钟（07:30起床）\n- 充电手机和相机\n- 准备第二天的衣物\n- 检查和服租赁预约信息\n- 查看天气预报\n\n**第二天行程预告**：\n- 09:30：ookini和服租赁（浅草雷门店）\n- 10:00-14:00：浅草寺和服体验\n- 14:00-15:30：前往横滨\n- 15:30-19:00：横滨港未来散步\n- 19:00-19:05：横滨冬季烟火大会\n- 19:30-20:30：返回酒店",
      tips: [
        "😴 建议23:00前入睡",
        "⏰ 设置闹钟（07:30起床）",
        "📱 充电手机和相机",
        "👘 准备第二天的衣物（适合穿和服）",
        "💤 早点休息，为第二天做好准备"
      ],
      girlPoses: [],
      couplePoses: [],
      food: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Plane className="w-8 h-8" />
                抵达日 & 上野初探
              </h1>
              <p className="text-pink-100 mt-1">2月6日 · 成田机场 → 上野 → 阿美横丁</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => speakJapanese('到着日と上野初探')}
              className="bg-white/20 hover:bg-white/30"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">今日完成度</span>
              <span className="text-sm font-medium">已完成 {checkedSpots.size} / {spots.length} 个打卡点</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/30" />
            <div className="text-right text-sm mt-1">{Math.round(progress)}%</div>
          </div>
        </div>
      </div>

      {/* Weather & Tips */}
      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-4">
        <Card className="border-2 border-pink-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <Cloud className="w-5 h-5" />
              2月6日天气
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">12°C</div>
                <div className="text-gray-600">多云转晴</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>💧 湿度: 65%</div>
                <div>🌬️ 风速: 3m/s</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-pink-50 rounded-lg">
              <div className="font-medium text-pink-800 mb-1">建议穿搭：</div>
              <div className="text-sm text-gray-700">厚外套+围巾+长裤+运动鞋（舒适为主）</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-200 bg-yellow-50/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="w-5 h-5" />
              重要提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>15:55抵达成田机场，请提前确认航班信息</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>今晚务必到APA酒店入住，建议于20:00前完成</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>购买Skyliner车票时可同时购买地铁通票，更划算</span>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>在机场兑换一些日元现金（约3-5万日元）</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              今日亮点
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">
              第一次踏上日本的土地，感受成田机场的现代化，乘坐Skyliner体验日本高速列车，
              在上野阿美横丁感受东京的热闹与便利，为接下来的旅程做好准备。
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spots List */}
      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {spots.map((spot, index) => (
          <Card 
            key={spot.id}
            className={`border-2 transition-all duration-300 ${
              checkedSpots.has(spot.id)
                ? 'border-green-400 bg-green-50/80'
                : 'border-pink-200 bg-white/80 hover:border-pink-300'
            } backdrop-blur-sm`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox
                      checked={checkedSpots.has(spot.id)}
                      onCheckedChange={() => toggleSpot(spot.id)}
                      className="w-6 h-6"
                    />
                    <span className="text-4xl">{spot.icon}</span>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {spot.title}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakJapanese(spot.titleJa)}
                          className="h-6 w-6 p-0"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3" />
                        {spot.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {spot.time}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openNavigation(spot.title, spot.lat, spot.lng)}
                      className="text-xs"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      导航
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">📖 故事</TabsTrigger>
                  <TabsTrigger value="tips">💡 技巧</TabsTrigger>
                  <TabsTrigger value="poses">📸 姿势</TabsTrigger>
                  <TabsTrigger value="food">🍜 美食</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      历史故事
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{spot.history}</p>
                  </div>
                  {spot.special && (
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        特别说明
                      </h4>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-purple-50 p-3 rounded-lg">
                        {spot.special}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tips" className="space-y-2">
                  <h4 className="font-semibold text-blue-600 mb-2">实用建议</h4>
                  {spot.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-blue-50 p-2 rounded">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="poses" className="space-y-4">
                  {spot.girlPoses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-pink-600 mb-2 flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        女生拍照姿势
                      </h4>
                      <div className="space-y-2">
                        {spot.girlPoses.map((pose, i) => (
                          <div key={i} className="text-sm text-gray-700 bg-pink-50 p-3 rounded-lg">
                            <span className="font-medium text-pink-600">姿势{i + 1}：</span>
                            {pose}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {spot.couplePoses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        情侣互动姿势
                      </h4>
                      <div className="space-y-2">
                        {spot.couplePoses.map((pose, i) => (
                          <div key={i} className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                            <span className="font-medium text-purple-600">姿势{i + 1}：</span>
                            {pose}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="food" className="space-y-2">
                  {spot.food.length > 0 ? (
                    <>
                      <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        美食推荐
                      </h4>
                      {spot.food.map((item, i) => (
                        <div key={i} className="text-sm text-gray-700 bg-orange-50 p-2 rounded flex items-center gap-2">
                          <span className="text-orange-500">🍽️</span>
                          {item}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-4">
                      此景点暂无美食推荐
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              ← 返回首页
            </Button>
          </Link>
          <div className="text-sm text-gray-600">
            Day 1 / 6
          </div>
          <Link href="/day2">
            <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              下一天 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
