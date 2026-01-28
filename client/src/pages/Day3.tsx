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
  Volume2
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

    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();

    // 等待一小段时间确保取消完成
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // 获取可用的语音列表
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));
      
      // 如果有日语语音包，使用第一个
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

  const progress = (checkedSpots.size / 22) * 100;

  const spots = [
    {
      id: "kaminarimon",
      title: "雷门",
      titleJa: "雷門",
      titleEn: "Kaminarimon Gate",
      location: "浅草寺入口",
      icon: "⛩️",
      lat: 35.7106,
      lng: 139.7967,
      history: "建于公元941年，由军事指挥官平之金正所建。供奉风神和雷神，守护伽藍防止风灾水灾。现在的门是1960年由松下幸之助捐赠重建。",
      special: "💡 大灯笼重达700公斤，底部刻有「松下電器」字样。早上7点前人最少，是拍照黄金时间！",
      photoTips: [
        "正面拍摄：站在灯笼正下方，仰拍完整的雷门和大灯笼",
        "侧面角度：从侧面45度拍摄，可以拍到风神或雷神雕像",
        "和服人像：穿和服站在雷门下方，从正面拍摄半身照避开人群",
        "夜景：晚上灯笼点灯后，拍摄金色灯光下的雷门更有氛围"
      ],
      
      
      femalePoses: [
        "【经典站姿】双脚前后交叉站立，前脚脚尖微微翘起，身体微侧45度对镜头，一手轻提和服袖子展示花纹，另一手自然垂放或轻放腰侧",
        "【托腮姿势】站在雷门侧面，一手轻托脸颊做「牙痛」状，头部微微倾斜，眼神看向镜头外，营造害羞可爱感",
        "【回眸杀】背对雷门大灯笼，身体转45度，头部转向镜头，露出侧脸和发饰，一手轻提袖子",
        "【仰拍姿势】站在灯笼正下方，双手合十做祈祷状，头部微微仰起，表情虔诚",
        "【遮脸姿势】用扇子或手机遮住半张脸，只露出眼睛和发饰，眼神看向镜头"
      ],
      couplePoses: [
        "【牵手前行】男生在前牵着女生的手，女生另一手提着和服袖子，两人自然行走，回头看镜头",
        "【背后拥抱】女生站在前面看向雷门，男生从背后轻轻环抱，女生可以把手放在男生手上",
        "【对视互动】两人面对面站立，女生轻靠男生，男生一手扶着女生腰部，两人深情对视",
        "【比心姿势】两人一起用手做爱心手势，放在雷门大灯笼前",
        "【亲额头】男生亲吻女生额头，女生闭眼微笑，侧面拍摄"
      ],
      
      food: ["人形烧（仲见世大道）", "雷门三定天妇罗", "浅草梅园红豆汤"]
    },
    {
      id: "nakamise",
      title: "仲见世大道",
      titleJa: "仲見世通り",
      titleEn: "Nakamise Shopping Street",
      location: "浅草寺参道",
      icon: "🏮",
      lat: 35.7115,
      lng: 139.7967,
      history: "江户时代形成的参道商店街，全长约250米，有89家店铺。是日本最古老的商店街之一，至今保留着传统江户风情。",
      special: "💡 商店街的红色灯笼在夜晚点灯后超美！建议傍晚时分拍摄，既有自然光又有灯笼光。",
      photoTips: [
        "背影杀：穿和服在商店街中央拍摄背影，营造穿越感",
        "灯笼特写：拍摄红色灯笼和传统店铺，突出江户风情",
        "人群中：利用人群作为前景，拍摄热闹的商店街氛围",
        "细节照：拍摄传统小吃、手工艺品等特色商品"
      ],
      
      
      femalePoses: [
        "【背影杀】穿和服在商店街中央，背对镜头行走，头部转向一侧露出侧脸和发饰，一手提袖子",
        "【边走边吃】一手拿着小吃（人形烧、炸馒头），另一手做要吃的动作，表情开心",
        "【橱窗前】站在传统店铺橱窗前，侧身看向橱窗内的商品，一手轻触玻璃",
        "【灯笼特写】站在红色灯笼下，双手轻托一个小灯笼装饰品，脸部靠近做亲吻状",
        "【蹲下拍摄】蹲下拍摄地面商品，腿部交叉，和服自然展开，回头看镜头"
      ],
      couplePoses: [
        "【喂食互动】女生拿着小吃喂男生，男生做要吃的动作，两人笑着互动",
        "【并肩行走】两人牵手并肩走在商店街，从背后拍摄，展示和服背面",
        "【共撑一伞】两人共撑一把和伞，头部靠近，从侧面拍摄",
        "【指向互动】女生指向某个店铺，男生顺着看过去，展现自然互动",
        "【拥抱亲吻】在人群中拥抱，男生亲吻女生脸颊，用手机或食物遮挡"
      ],
      food: ["木村家人形烧", "舟和芋羊羹", "浅草九重炸馒头"]
    },
    {
      id: "sensoji",
      title: "浅草寺本堂",
      titleJa: "浅草寺本堂",
      titleEn: "Sensoji Main Hall",
      location: "浅草寺",
      icon: "🏯",
      lat: 35.7148,
      lng: 139.7967,
      history: "东京最古老的寺庙，建于628年。传说渔夫兄弟在隅田川捕鱼时捞起观音像，后建寺供奉。德川家康时期被指定为幕府朝拜场所。",
      special: "💡 本堂前的大香炉烟雾据说能治病！很多人会把烟雾扇到身上祈求健康。抽签100日元一次，凶签可以系在旁边的架子上化解。",
      photoTips: [
        "祈福瞬间：拍摄参拜、抽签或往香炉扇烟的瞬间",
        "建筑全景：从本堂前广场拍摄完整的寺庙建筑",
        "细节特写：拍摄精美的屋檐雕刻和装饰",
        "人物剪影：逆光拍摄在本堂前参拜的人物剪影"
      ],
      
      
      femalePoses: [
        "【祈福姿势】双手合十放在胸前，闭眼祈祷，表情虔诚安详",
        "【扇烟姿势】站在大香炉前，双手做扇烟动作，烟雾缭绕中拍摄",
        "【抽签瞬间】一手拿着签筒，做抽签动作，表情期待",
        "【建筑前站姿】站在本堂前，双脚交叉，一手提袖展示腰带，另一手轻放胸前",
        "【侧面剪影】侧身站立，逆光拍摄剪影，双手合十"
      ],
      couplePoses: [
        "【一起祈福】两人并排站立，双手合十祈祷，头部微微靠近",
        "【系签互动】女生帮男生系凶签，男生看着女生，温馨互动",
        "【扇烟互动】两人一起在香炉前扇烟，动作同步",
        "【看签纸】两人一起看抽到的签纸，头部靠近，表情惊喜",
        "【寺庙前合影】站在本堂前，女生靠在男生肩上，男生搂着女生"
      ],
      food: ["浅草寺周边素食料理", "传统日式茶点"]
    },
    {
      id: "five-story-pagoda",
      title: "五重塔",
      titleJa: "五重塔",
      titleEn: "Five-Story Pagoda",
      location: "浅草寺",
      icon: "🗼",
      lat: 35.7145,
      lng: 139.7965,
      history: "建于942年，现在的塔是1973年重建。高53.32米，是浅草寺的标志性建筑之一。五重塔在佛教中象征着五大元素。",
      special: "💡 隐藏机位：从宝藏门可以拍到五重塔和东京晴空塔同框的震撼画面！",
      photoTips: [
        "仰拍：从低角度仰拍五重塔，突出其高耸壮观",
        "同框：从宝藏门拍摄五重塔和晴空塔同框",
        "和服人像：穿和服站在塔前，拍摄日式古典照片",
        "樱花季：春天可以拍摄五重塔和樱花的组合"
      ],
      food: []
    },
    {
      id: "jinrikisha",
      title: "人力车体验",
      titleJa: "人力車体験",
      titleEn: "Rickshaw Experience",
      location: "浅草寺门口",
      icon: "🛺",
      lat: 35.7106,
      lng: 139.7967,
      history: "人力车起源于明治时代，是日本传统交通工具。车夫会带你游览浅草隐藏景点，还会帮拍专业情侣照。",
      special: "💡 车夫都经过专业训练，会讲解浅草历史故事，还会推荐最佳拍照角度！15分钟约3,000日元。",
      photoTips: [
        "乘车照：情侣同坐人力车，车夫帮拍",
        "背景选择：以雷门或五重塔为背景",
        "动态抓拍：拍摄人力车行进中的画面",
        "复古感：利用人力车营造复古浪漫氛围"
      ],
      food: []
    },
    {
      id: "kagetsu-do",
      title: "浅草花月堂",
      titleJa: "浅草花月堂",
      titleEn: "Asakusa Kagetsu-do",
      location: "浅草",
      icon: "🎡",
      lat: 35.7125,
      lng: 139.7955,
      history: "蜜瓜面包专卖店，在浅草地区有两家店。大号的蜜瓜面包非常适合边走边吃。",
      special: "💡 总店的墙壁是五彩缤纷的风车，风车的颜色和设计每三个月更换一次！超级适合拍照打卡！",
      photoTips: [
        "风车背景：以五彩风车墙为背景拍摄",
        "背影照：从后面拍摄风车的照片，营造节日气氛",
        "美食照：拍摄大号蜜瓜面包的特写",
        "色彩对比：利用风车的鲜艳颜色营造活力感"
      ],
      
      
      femalePoses: [
        "【风车墙前】背对五彩风车墙，回头看镜头，一手轻触风车",
        "【举起面包】双手举起大号蜜瓜面包，做要咬的动作，表情开心",
        "【遮脸姿势】用蜜瓜面包遮住半张脸，只露出眼睛",
        "【蹲下拍摄】蹲在风车墙前，腿部侧放，一手拿面包，回头微笑",
        "【跳跃姿势】在风车墙前跳起，双手举起面包，抓拍动态瞬间"
      ],
      couplePoses: [
        "【共享美食】两人一起咬一个大面包，头部靠近",
        "【喂食互动】女生喂男生吃面包，男生做夸张表情",
        "【风车前合影】站在风车墙前，女生举起面包，男生搂着女生",
        "【比心姿势】两人一起做爱心手势，面包放在前景",
        "【背靠背】两人背靠背站立，各自拿着面包"
      ],
      food: ["大号蜜瓜面包", "特色甜点"]
    },
    {
      id: "sumida-park",
      title: "隅田公园",
      titleJa: "隅田公園",
      titleEn: "Sumida Park",
      location: "浅草附近",
      icon: "🌸",
      lat: 35.7145,
      lng: 139.8025,
      history: "靠近浅草的隅田公园位于隅田川沿岸。早春樱花盛开，秋天树叶变红，可以拍摄不同季节的美丽照片。",
      special: "💡 可以以晴空塔为背景拍照！从河边望向天空树的照片超级出片！",
      photoTips: [
        "晴空塔背景：从河边拍摄晴空塔",
        "自然风光：春天拍樱花，秋天拍红叶",
        "和服人像：穿和服在公园的自然风光下拍照",
        "河边漫步：拍摄在隅田川边散步的照片"
      ],
      
      
      femalePoses: [
        "【晴空塔背景】站在河边，一手指向晴空塔，头部看向塔顶",
        "【樱花季姿势】站在樱花树下，一手轻触樱花枝，仰头看花",
        "【河边漫步】沿着河边行走，一手提袖，回头看镜头",
        "【坐姿拍摄】坐在草地上，腿部侧放，一手撑地，晴空塔在背景",
        "【逆光剪影】逆光站立，双手做爱心手势，晴空塔在背景"
      ],
      couplePoses: [
        "【指向晴空塔】女生指向晴空塔，男生从背后环抱",
        "【河边牵手】牵手沿河边漫步，从侧面拍摄",
        "【草地坐姿】两人坐在草地上，女生靠在男生肩上，看向晴空塔",
        "【樱花下亲吻】在樱花树下亲吻，樱花瓣飘落",
        "【背影合影】两人背对镜头看向晴空塔，牵手"
      ],
      food: ["公园周边小吃"]
    },
    {
      id: "azuma-bridge",
      title: "吾妻桥",
      titleJa: "吾妻橋",
      titleEn: "Azuma Bridge",
      location: "浅草站外",
      icon: "🌉",
      lat: 35.7108,
      lng: 139.8042,
      history: "横跨隅田川的大桥，呈鲜艳的朱红色。可以欣赏到晴空塔、朝日集团总部大楼等城市景观。",
      special: "💡 朝日集团总部大楼带有火焰主题的金色物体超引人注目！建议在船经过桥下时拍照。",
      photoTips: [
        "桥梁全景：拍摄鲜艳的朱红色大桥",
        "城市景观：以晴空塔和金色火焰为背景",
        "动态抓拍：拍摄船只经过桥下的瞬间",
        "对比照：传统大桥与现代建筑的对比"
      ],
      
      
      femalePoses: [
        "【桥上站姿】站在朱红色大桥上，一手扶栏杆，身体微侧，晴空塔在背景",
        "【看向远方】站在桥边，眼神看向远处的晴空塔，侧面拍摄",
        "【金色火焰背景】以朝日大楼的金色火焰为背景，双手做框架手势",
        "【动态抓拍】在桥上行走，裙摆飘动，抓拍动态瞬间",
        "【倚靠栏杆】侧身倚靠桥栏杆，一手撑头，表情慵懒"
      ],
      couplePoses: [
        "【桥上拥抱】在桥中央拥抱，晴空塔在背景",
        "【牵手看景】牵手站在桥边，一起看向远处",
        "【背后环抱】男生从背后环抱女生，女生一手指向晴空塔",
        "【亲吻剪影】逆光拍摄亲吻剪影，桥梁和晴空塔在背景",
        "【并肩倚靠】两人并肩倚靠栏杆，从侧面拍摄"
      ],
      food: []
    },
    {
      id: "red-brick",
      title: "横滨红砖仓库",
      titleJa: "赤レンガ倉庫",
      titleEn: "Yokohama Red Brick Warehouse",
      location: "横滨港",
      icon: "🏛️",
      lat: 35.4532,
      lng: 139.6425,
      history: "建于1908-1913年明治大正时期，原为横滨港的保税仓库。2002年改建为文化商业设施，被指定为近代化产业遗产。",
      special: "💡 1号馆和2号馆之间的广场是最佳拍照点！冬天有时会有滑冰场。夜晚棕色灯光照射下的红砖仓库超级浪漫！",
      photoTips: [
        "建筑外观：傍晚时分拍摄红砖建筑，光线柔和",
        "广场全景：从1号馆和2号馆之间的广场拍摄",
        "夜景：夜晚灯光下的红砖仓库，营造温暖浪漫氛围",
        "情侣照：在红砖墙前拍摄情侣合影，复古文艺"
      ],
      
      
      femalePoses: [
        "【天使翅膀】站在'天使的羽'壁画前，双手向两侧展开，做飞翔姿势",
        "【红砖墙前】倚靠红砖墙，一手撑墙，一腿微曲，复古文艺感",
        "【广场中央】站在1号馆和2号馆之间的广场，双脚交叉，一手叉腰",
        "【夜景姿势】夜晚灯光下，一手轻触脸颊，表情温柔",
        "【坐姿拍摄】坐在广场台阶上，腿部交叉，一手撑地，回头看镜头"
      ],
      couplePoses: [
        "【翅膀前合影】站在天使翅膀壁画前，女生在前做飞翔姿势，男生在后环抱",
        "【红砖墙前亲吻】倚靠红砖墙亲吻，侧面拍摄",
        "【牵手漫步】牵手在红砖仓库前漫步，从背后拍摄",
        "【广场拥抱】在广场中央拥抱，红砖仓库在背景",
        "【坐姿合影】两人坐在台阶上，女生靠在男生肩上，看向海景"
      ],
      food: ["红砖仓库美食广场西餐", "Bills松饼", "横滨啤酒"],
      instagramSpot: "💫 网红打卡：赤レンガ倉庫侧入口正面墙上的'天使的羽'壁画，拍摄背中长出羽毛的照片！"
    },
    {
      id: "yamashita-park",
      title: "山下公园",
      titleJa: "山下公園",
      titleEn: "Yamashita Park",
      location: "横滨港",
      icon: "🌅",
      lat: 35.4437,
      lng: 139.6501,
      history: "1930年开园，是日本第一座临海公园。由1923年关东大地震后的瓦砾填海造陆建成，象征横滨的重建与复兴。",
      special: "💡 公园的花砖道和古老银杏树是特色！玫瑰园区域是烟火大会最佳观赏点。可以看到横滨海湾大桥和港口船只。",
      photoTips: [
        "海滨长廊：拍摄海滨步道和横滨地标塔",
        "夕阳时分：傍晚拍摄夕阳下的海景",
        "情侣剪影：以海景为背景拍摄情侣剪影",
        "烟火：19:00-19:05烟火占画面2/3，海面倒影占1/3"
      ],
      
      
      femalePoses: [
        "【海边站姿】站在海滨长廊，一手扶栏杆，眼神看向大海，侧面拍摄",
        "【夕阳剪影】夕阳时分，背对镜头，双手举起做爱心手势",
        "【玫瑰园姿势】站在玫瑰花丛中，一手轻触花朵，侧脸微笑",
        "【坐姿拍摄】坐在长椅上，腿部交叉，一手放在椅背，看向大海",
        "【行走姿势】沿着海滨步道行走，裙摆飘动，回头看镜头"
      ],
      couplePoses: [
        "【海边拥抱】面向大海拥抱，从背后拍摄",
        "【长椅坐姿】两人坐在长椅上，女生靠在男生肩上，看向大海",
        "【牵手看夕阳】牵手站立，一起看夕阳，侧面拍摄剪影",
        "【玫瑰园互动】男生摘花送给女生，女生接花微笑",
        "【烟火下剪影】烟火绽放时，两人拥抱或牵手，拍摄剪影"
      ],
      food: ["山下公园小吃摊", "海景咖啡厅"]
    },
    {
      id: "fireworks-1",
      title: "烟火大会 - 全景",
      titleJa: "花火大会 - 全景",
      titleEn: "Fireworks - Panorama",
      location: "山下公园",
      icon: "🎆",
      lat: 35.4437,
      lng: 139.6501,
      history: "横滨烟火大会历史悠久，是港口城市的传统庆典活动。2026年2月7日的冬季烟火虽然只有5分钟，但约3,000发烟火密度极高。",
      special: "💡 18:00-18:30提前占位！选择玫瑰园区域，既能拍到烟火，又能以横滨地标塔为背景。记得带三脚架！",
      photoTips: [
        "经典构图：烟火占画面2/3，海面倒影占1/3",
        "长曝光：快门2-4秒，光圈F8-F11，ISO 100-200",
        "手机拍摄：使用专业模式或夜景模式，开启HDR",
        "连拍组合：使用连拍模式，后期可合成多重曝光"
      ],
      
      
      femalePoses: [
        "【仰望烟火】仰头看烟火，双手合十或做祈祷状，侧面拍摄",
        "【烟火棒姿势】手持烟火棒，做画圈动作，长曝光拍摄",
        "【坐姿观赏】坐在草地上，腿部侧放，一手撑地，仰头看烟火",
        "【欢呼姿势】双手举起欢呼，烟火在背景绽放",
        "【背影剪影】背对镜头，双手举起，烟火在上方"
      ],
      couplePoses: [
        "【拥抱剪影】面对烟火拥抱，从背后拍摄剪影",
        "【牵手仰望】牵手一起仰望烟火，侧面拍摄",
        "【亲吻剪影】烟火绽放时亲吻，拍摄剪影",
        "【依偎观赏】女生靠在男生肩上，一起看烟火",
        "【比心姿势】两人一起做爱心手势，烟火在背景"
      ],
      food: ["烟火当天临时小吃摊", "热饮和小吃"]
    },
    {
      id: "fireworks-2",
      title: "烟火大会 - 建筑同框",
      titleJa: "花火大会 - 建物同框",
      titleEn: "Fireworks - With Buildings",
      location: "山下公园",
      icon: "🎇",
      lat: 35.4437,
      lng: 139.6501,
      history: "",
      special: "💡 将横滨地标塔或红砖仓库放在画面下方1/3处，烟火在上方绽放，形成完美构图！",
      photoTips: [
        "建筑同框：横滨地标塔放在画面下方1/3",
        "红砖前景：以红砖仓库为前景拍摄烟火",
        "广角镜头：使用广角捕捉更多场景",
        "三脚架必备：长曝光需要稳定支撑"
      ],
      
      
      femalePoses: [
        "【仰望烟火】仰头看烟火，双手合十或做祈祷状，侧面拍摄",
        "【烟火棒姿势】手持烟火棒，做画圈动作，长曝光拍摄",
        "【坐姿观赏】坐在草地上，腿部侧放，一手撑地，仰头看烟火",
        "【欢呼姿势】双手举起欢呼，烟火在背景绽放",
        "【背影剪影】背对镜头，双手举起，烟火在上方"
      ],
      couplePoses: [
        "【拥抱剪影】面对烟火拥抱，从背后拍摄剪影",
        "【牵手仰望】牵手一起仰望烟火，侧面拍摄",
        "【亲吻剪影】烟火绽放时亲吻，拍摄剪影",
        "【依偎观赏】女生靠在男生肩上，一起看烟火",
        "【比心姿势】两人一起做爱心手势，烟火在背景"
      ],
      food: []
    },
    {
      id: "fireworks-3",
      title: "烟火大会 - 情侣剪影",
      titleJa: "花火大会 - カップルシルエット",
      titleEn: "Fireworks - Couple Silhouette",
      location: "山下公园",
      icon: "💑",
      lat: 35.4437,
      lng: 139.6501,
      history: "",
      special: "💡 让情侣站在前景，背对镜头，拍摄烟火下的剪影。这是最浪漫的烟火照片！",
      photoTips: [
        "剪影拍摄：情侣站在前景，背对镜头",
        "烟火背景：以绽放的烟火为背景",
        "依偎姿势：情侣依偎或牵手的姿势",
        "逆光拍摄：利用烟火的光线形成剪影效果"
      ],
      
      
      femalePoses: [
        "【仰望烟火】仰头看烟火，双手合十或做祈祷状，侧面拍摄",
        "【烟火棒姿势】手持烟火棒，做画圈动作，长曝光拍摄",
        "【坐姿观赏】坐在草地上，腿部侧放，一手撑地，仰头看烟火",
        "【欢呼姿势】双手举起欢呼，烟火在背景绽放",
        "【背影剪影】背对镜头，双手举起，烟火在上方"
      ],
      couplePoses: [
        "【拥抱剪影】面对烟火拥抱，从背后拍摄剪影",
        "【牵手仰望】牵手一起仰望烟火，侧面拍摄",
        "【亲吻剪影】烟火绽放时亲吻，拍摄剪影",
        "【依偎观赏】女生靠在男生肩上，一起看烟火",
        "【比心姿势】两人一起做爱心手势，烟火在背景"
      ],
      food: []
    },
    {
      id: "osanbashi",
      title: "大栈桥",
      titleJa: "大さん橋",
      titleEn: "Osanbashi Pier",
      location: "横滨港",
      icon: "🌉",
      lat: 35.4507,
      lng: 139.6475,
      history: "横滨港的国际客船码头，建于1894年。现在的建筑是2002年重建，屋顶是开放式木质甲板，可以360度欣赏横滨港景。",
      special: "💡 木质甲板超级出片！180度全景视野，可以拍摄烟火全貌。白天和夜晚都很美！",
      photoTips: [
        "木质甲板：利用波浪形木质甲板拍摄时尚照片",
        "全景视野：180度拍摄横滨港全景",
        "夜景：以横滨建筑灯光和摩天轮为背景",
        "情侣照：在甲板上拍摄浪漫情侣照"
      ],
      
      
      femalePoses: [
        "【木质甲板】站在波浪形木质甲板上，顺着曲线站立，展现身体线条",
        "【全景拍摄】站在甲板中央，双手展开，360度海景在背景",
        "【坐姿拍摄】坐在甲板上，腿部伸直，一手撑地，看向大海",
        "【夜景姿势】夜晚灯光下，一手轻触脸颊，摩天轮在背景",
        "【行走姿势】沿着甲板曲线行走，裙摆飘动，抓拍动态"
      ],
      couplePoses: [
        "【甲板拥抱】在木质甲板上拥抱，海景在背景",
        "【牵手漫步】牵手沿着甲板曲线漫步，从背后拍摄",
        "【坐姿合影】两人坐在甲板上，女生靠在男生肩上",
        "【夜景亲吻】夜晚摩天轮灯光下亲吻，侧面拍摄",
        "【全景合影】站在甲板中央，女生在前，男生从背后环抱"
      ],
      food: ["大栈桥码头咖啡厅"]
    },
    {
      id: "zounohana",
      title: "象鼻公园",
      titleJa: "象の鼻パーク",
      titleEn: "Zou-no-Hana Park",
      location: "横滨港",
      icon: "🐘",
      lat: 35.4495,
      lng: 139.6445,
      history: "横滨港的发源地，修复后的历史码头。因形状像大象鼻子而得名。是横滨开港的起点，具有重要历史意义。",
      special: "💡 这里比较安静，适合情侣边聊天边看夕阳西下。晚上所有灯光亮起来超美！",
      photoTips: [
        "夕阳西下：傍晚拍摄夕阳和海景",
        "夜景：夜晚灯光下的码头",
        "情侣照：安静的环境适合拍摄亲密照片",
        "历史感：拍摄修复后的历史码头建筑"
      ],
      food: []
    },
    {
      id: "marine-walk",
      title: "Marine & Walk 购物街",
      titleJa: "MARINE & WALK",
      titleEn: "Marine & Walk",
      location: "横滨港",
      icon: "🛍️",
      lat: 35.4545,
      lng: 139.6438,
      history: "2016年开业的开放式海滨购物街，以加州海滨小镇为设计理念。是横滨新兴的时尚购物和约会圣地。",
      special: "💡 ins风满满的商店和咖啡厅！白色建筑配蓝天超出片。情侣约会圣地，很多网红店！",
      photoTips: [
        "ins风：拍摄白色建筑和时尚店铺",
        "咖啡厅：在海景咖啡厅拍摄下午茶",
        "购物街：拍摄开放式购物街的氛围",
        "海景背景：以海景为背景拍摄时尚照片"
      ],
      
      
      femalePoses: [
        "【时尚街拍】在购物街行走，一手提包，一手插口袋，表情自信",
        "【橱窗前】站在时尚店铺橱窗前，侧身看向橱窗，一手轻触玻璃",
        "【咖啡厅姿势】坐在露天咖啡厅，腿部交叉，一手拿咖啡杯",
        "【海景背景】站在购物街尽头，海景在背景，双脚交叉站立",
        "【购物袋姿势】双手提着购物袋，开心微笑，展示购物成果"
      ],
      couplePoses: [
        "【牵手逛街】牵手在购物街漫步，从背后拍摄",
        "【咖啡厅合影】坐在咖啡厅，两人面对面，桌上有咖啡和甜点",
        "【橱窗前互动】一起看橱窗，女生指向某个商品，男生看过去",
        "【购物互动】男生帮女生提购物袋，女生挽着男生手臂",
        "【海景拥抱】在购物街尽头拥抱，海景在背景"
      ],
      food: ["Bills松饼", "海景咖啡厅", "西式简餐"]
    },
    {
      id: "cosmo-world",
      title: "横滨宇宙世界摩天轮",
      titleJa: "よこはまコスモワールド",
      titleEn: "Yokohama Cosmo World",
      location: "港未来",
      icon: "🎡",
      lat: 35.4553,
      lng: 139.6364,
      history: "1989年开业的游乐园，地标性的摩天轮高112.5米，是世界上最大的时钟摩天轮。夜晚彩灯变换超级梦幻。",
      special: "💡 摩天轮夜晚会变换不同颜色的灯光！情侣必打卡。可以从高空俯瞰烟火（需提前预约）。",
      photoTips: [
        "夜景：拍摄彩灯变换的摩天轮",
        "倒影：拍摄摩天轮在水面的倒影",
        "情侣照：以摩天轮为背景拍摄浪漫照片",
        "高空视角：在摩天轮上俯瞰横滨夜景"
      ],
      food: ["游乐园小吃"]
    },
    {
      id: "chinatown",
      title: "横滨中华街",
      titleJa: "中華街",
      titleEn: "Yokohama Chinatown",
      location: "横滨",
      icon: "🏮",
      lat: 35.4433,
      lng: 139.6458,
      history: "日本最大的中华街，形成于1859年横滨开港后。有600多家中餐馆和商店，是日本华人文化的重要据点。",
      special: "💡 四个牌楼分别代表东南西北！夜晚灯光全开最美。推荐萬珍楼（粤菜）和聘珍楼（点心）。",
      photoTips: [
        "牌楼：拍摄中华街标志性牌楼",
        "夜景：夜晚彩灯下的中华街",
        "美食：拍摄特色中餐和点心",
        "街景：拍摄热闹的街道氛围"
      ],
      food: ["萬珍楼（粤菜）", "聘珍楼（点心）", "横滨大饭店", "中华料理"]
    },
    {
      id: "return-kimono",
      title: "归还和服",
      titleJa: "着物返却",
      titleEn: "Return Kimono",
      location: "浅草",
      icon: "👘",
      lat: 35.7106,
      lng: 139.7967,
      history: "",
      special: "💡 确保20:00前归还！从横滨返回约45分钟，预留足够时间。",
      photoTips: [],
      food: []
    },
    {
      id: "skytree",
      title: "东京晴空塔夜景",
      titleJa: "東京スカイツリー",
      titleEn: "Tokyo Skytree",
      location: "晴空塔",
      icon: "🌃",
      lat: 35.7101,
      lng: 139.8107,
      history: "2012年建成，高634米，是世界第二高的建筑。数字634在日语中发音类似'武藏'，是东京的古称。",
      special: "💡 19:00后有3D灯光秀！350米和450米两个观景台。SKYTREE CAFE可以边用餐边看夜景。冬季限定灯饰最美！",
      photoTips: [
        "观景台：从350米天望甲板拍摄东京夜景",
        "落地窗：站在大型落地窗前拍摄",
        "灯光秀：拍摄3D灯光秀",
        "远景：从浅草周边拍摄完整的晴空塔"
      ],
      food: ["SKYTREE CAFE", "晴空塔美食街", "Tokyo Solamachi"]
    }
  ];

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
                <span>已完成 {checkedSpots.size} / {spots.length} 个打卡点</span>
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
        <Tabs defaultValue="spots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-purple-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              景点打卡
            </TabsTrigger>
            <TabsTrigger value="subway" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Train className="w-4 h-4 mr-2" />
              地铁指引
            </TabsTrigger>
            <TabsTrigger value="route" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Navigation className="w-4 h-4 mr-2" />
              路线导航
            </TabsTrigger>
          </TabsList>

          {/* Spots Tab */}
          <TabsContent value="spots" className="space-y-4">
            {spots.map((spot) => (
              <Card
                key={spot.id}
                className={`border-2 transition-all ${
                  checkedSpots.has(spot.id)
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-purple-200 hover:border-purple-300"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Checkbox
                        id={spot.id}
                        checked={checkedSpots.has(spot.id)}
                        onCheckedChange={() => toggleSpot(spot.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{spot.icon}</span>
                          <CardTitle className="text-lg">{spot.title}</CardTitle>
                          {spot.titleJa && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakJapanese(spot.titleJa)}
                              className="h-6 w-6 p-0"
                            >
                              <Volume2 className="w-4 h-4 text-purple-600" />
                            </Button>
                          )}
                        </div>
                        <CardDescription className="mt-1">{spot.location}</CardDescription>
                      </div>
                    </div>
                    {spot.lat && spot.lng && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNavigation(spot.title, spot.lat, spot.lng)}
                        className="flex items-center gap-1"
                      >
                        <Navigation className="w-4 h-4" />
                        导航
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {spot.history && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        历史故事
                      </h4>
                      <p className="text-sm text-gray-700">{spot.history}</p>
                    </div>
                  )}

                  {spot.special && (
                    <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        特别说明
                      </h4>
                      <p className="text-sm text-gray-700">{spot.special}</p>
                    </div>
                  )}

                  {spot.photoTips.length > 0 && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        拍照技巧
                      </h4>
                      <ul className="space-y-2">
                        {spot.photoTips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {spot.femalePoses && spot.femalePoses.length > 0 && (
                    <div className="p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                      <h4 className="font-semibold text-pink-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">👩</span>
                        女生拍照姿势（重点）
                      </h4>
                      <ul className="space-y-2">
                        {spot.femalePoses.map((pose, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-pink-600 font-bold">•</span>
                            <span>{pose}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {spot.couplePoses && spot.couplePoses.length > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">💑</span>
                        情侣互动姿势
                      </h4>
                      <ul className="space-y-2">
                        {spot.couplePoses.map((pose, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{pose}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {spot.food.length > 0 && (
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <h4 className="font-semibold text-pink-900 mb-2 flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        美食推荐
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {spot.food.map((food, index) => (
                          <Badge key={index} className="bg-pink-200 text-pink-800">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Subway Tab */}
          <TabsContent value="subway" className="space-y-4">
            {/* 东京地铁线路图 */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  东京地铁线路图
                </CardTitle>
                <CardDescription>
                  点击图片可放大查看详细路线
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-hidden rounded-lg border-2 border-purple-200">
                  <img 
                    src="/images/tokyo-subway-map.jpg" 
                    alt="东京地铁线路图" 
                    className="w-full h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => window.open('/images/tokyo-subway-map.jpg', '_blank')}
                  />
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    使用提示
                  </h4>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• 银座线（橙色）：上野 → 浅草</li>
                    <li>• 都营浅草线（蓝色）：浅草 → 新桥</li>
                    <li>• 港未来线（红色）：新桥 → 横滨</li>
                    <li>• 建议购买一日券，可无限次乘坐</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

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

          {/* Route Tab */}
          <TabsContent value="route" className="space-y-4">
            <VisualRouteMap
              title="浅草寺 → 横滨港 → 晴空塔"
              date="2/7"
              steps={[
                {
                  id: "asakusa-station",
                  icon: "🚇",
                  title: "浅草站",
                  subtitle: "银座线1号出口",
                  details: "从上野APA酒店出发，乘坐银座线到5站到浅草站，约8分钟。从1号出口出站步行1分钟到和服租赁店。",
                  lat: 35.7106,
                  lng: 139.7967
                },
                {
                  id: "kaminarimon",
                  icon: "⛩️",
                  title: "雷门",
                  subtitle: "早上7点前人最少",
                  details: "从和服店步行2分钟到达雷门。建议在灯笼正下方仰拍，或从侧面45度拍摄风神雷神雕像。",
                  lat: 35.7106,
                  lng: 139.7967
                },
                {
                  id: "nakamise",
                  icon: "🏮",
                  title: "仲见世大道",
                  subtitle: "约250米，89家店铺",
                  details: "穿和服在商店街中央拍摄背影，营造穿越感。働晚时分拍摄，既有自然光又有灯笼光。推荐木村家人形烧、舟和芋羊羹。",
                  lat: 35.7115,
                  lng: 139.7967
                },
                {
                  id: "sensoji",
                  icon: "🏯",
                  title: "浅草寺本堂",
                  subtitle: "东京最古老寺庙",
                  details: "拍摄参拜、抽签或往香炉扇烟的瞬间。本堂前的大香炉烟雾据说能治病！抽签100日元一次。",
                  lat: 35.7148,
                  lng: 139.7967
                },
                {
                  id: "yokohama-transit",
                  icon: "🚆",
                  title: "前往横滨",
                  subtitle: "都营浅草线+港未来线",
                  details: "浅草站乘都营浅草线往西马込方向，在新桥站换乘港未来线，到元町·中华街站A1出口。总时间约50分钟。",
                  lat: 35.4433,
                  lng: 139.6458
                },
                {
                  id: "red-brick",
                  icon: "🏛️",
                  title: "横滨红砖仓库",
                  subtitle: "明治大正时期建筑",
                  details: "从元町·中华街站A1出口步行10分钟。働晚时分拍摄红砖建筑，光线柔和。1号2号馆之间的广场是最佳拍照点！",
                  lat: 35.4532,
                  lng: 139.6425
                },
                {
                  id: "yamashita-park",
                  icon: "🌆",
                  title: "山下公园",
                  subtitle: "烟火大会最佳观赏点",
                  details: "18:00-18:30抵达占位，选择玫瑰园区域。19:00-19:05烟火表演，烟火占画面2/3，海面倒影呠1/3。记得带三脚架！",
                  lat: 35.4437,
                  lng: 139.6501
                },
                {
                  id: "return-kimono",
                  icon: "👘",
                  title: "归还和服",
                  subtitle: "确保20:00前到达",
                  details: "从横滨返回浅草，乘坐港未来线→新桥站→换乘都营浅草线→浅草站1号出口，约45分钟。",
                  lat: 35.7106,
                  lng: 139.7967
                },
                {
                  id: "skytree",
                  icon: "🌃",
                  title: "东京晴空塔",
                  subtitle: "19:00后有3D灯光秀",
                  details: "从浅草站乘坐东武晴空塔线1站到东京晴空塔站，A出口步行3分钟。350米和450米两个观景台，SKYTREE CAFE可以边用餐边看夜景。",
                  lat: 35.7101,
                  lng: 139.8107
                }
              ]}
            />

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle>今日路线图</CardTitle>
                <CardDescription>中日英三语对照，方便在日本使用</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle>行程时间安排</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">09:30-11:00 浅草和服体验</div>
                      <div className="text-sm text-gray-600">雷门、仲见世大道、浅草寺</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">16:00-18:00 横滨港浪漫之旅</div>
                      <div className="text-sm text-gray-600">红砖仓库、山下公园、象鼻公园</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    <div>
                      <div className="font-semibold">18:30-19:05 横滨烟火大会</div>
                      <div className="text-sm text-gray-600">18:30前占位，19:00-19:05烟火表演</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">20:00-21:00 晴空塔夜景</div>
                      <div className="text-sm text-gray-600">归还和服后前往晴空塔</div>
                    </div>
                  </div>
                </div>
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
