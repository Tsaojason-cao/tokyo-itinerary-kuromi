// 东京景点数据库
export interface Spot {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  area: string; // 所属区域
  lat: number;
  lng: number;
  description: string;
  tags: string[]; // 标签：文化、购物、美食、自然等
  visitDuration: number; // 建议游览时长（分钟）
  bestTime: string; // 最佳游览时间
  photoSpots: number; // 拍照点数量
  icon: string;
}

export interface Accommodation {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  description: string;
  advantages: string[];
}

// 住宿选项
export const accommodations: Accommodation[] = [
  {
    id: "ueno",
    name: "上野",
    area: "上野",
    lat: 35.7148,
    lng: 139.7772,
    description: "交通枢纽，前往成田机场方便，周边有上野公园、阿美横町",
    advantages: ["距离成田机场近", "地铁线路多", "购物方便", "性价比高"]
  },
  {
    id: "shinjuku",
    name: "新宿",
    area: "新宿",
    lat: 35.6896,
    lng: 139.7006,
    description: "东京最繁华的商业区，购物、美食、娱乐一应俱全",
    advantages: ["交通极为便利", "购物天堂", "美食众多", "夜生活丰富"]
  },
  {
    id: "shibuya",
    name: "涩谷",
    area: "涩谷",
    lat: 35.6595,
    lng: 139.7004,
    description: "年轻时尚的代表，潮流文化聚集地",
    advantages: ["时尚潮流", "年轻活力", "交通便利", "网红打卡地"]
  },
  {
    id: "ginza",
    name: "银座",
    area: "银座",
    lat: 35.6717,
    lng: 139.7650,
    description: "高端奢华的购物区，适合品质购物",
    advantages: ["高端购物", "品质保证", "交通便利", "环境优雅"]
  },
  {
    id: "asakusa",
    name: "浅草",
    area: "浅草",
    lat: 35.7148,
    lng: 139.7967,
    description: "传统文化区，体验江户风情",
    advantages: ["传统文化", "和服体验", "寺庙神社", "性价比高"]
  }
];

// 景点数据库（50+个景点）
export const spots: Spot[] = [
  // 浅草区域
  {
    id: "sensoji",
    name: "浅草寺",
    nameJa: "浅草寺",
    nameEn: "Sensoji Temple",
    area: "浅草",
    lat: 35.7148,
    lng: 139.7967,
    description: "东京最古老的寺庙，香火鼎盛，雷门是标志性建筑",
    tags: ["文化", "历史", "拍照"],
    visitDuration: 90,
    bestTime: "早上7-9点人少",
    photoSpots: 10,
    icon: "⛩️"
  },
  {
    id: "skytree",
    name: "东京晴空塔",
    nameJa: "東京スカイツリー",
    nameEn: "Tokyo Skytree",
    area: "浅草",
    lat: 35.7101,
    lng: 139.8107,
    description: "世界最高的电波塔，634米高，可俯瞰整个东京",
    tags: ["地标", "观景", "拍照"],
    visitDuration: 120,
    bestTime: "傍晚看日落和夜景",
    photoSpots: 8,
    icon: "🗼"
  },
  {
    id: "nakamise",
    name: "仲见世商店街",
    nameJa: "仲見世通り",
    nameEn: "Nakamise Shopping Street",
    area: "浅草",
    lat: 35.7117,
    lng: 139.7965,
    description: "浅草寺前的传统商店街，售卖各种日本特色商品和小吃",
    tags: ["购物", "美食", "文化"],
    visitDuration: 60,
    bestTime: "上午10点后",
    photoSpots: 5,
    icon: "🏮"
  },

  // 新宿区域
  {
    id: "shinjuku-gyoen",
    name: "新宿御苑",
    nameJa: "新宿御苑",
    nameEn: "Shinjuku Gyoen",
    area: "新宿",
    lat: 35.6852,
    lng: 139.7100,
    description: "东京最美的公园之一，春天赏樱、秋天赏枫的绝佳地点",
    tags: ["自然", "公园", "拍照"],
    visitDuration: 120,
    bestTime: "春季3-4月樱花季",
    photoSpots: 15,
    icon: "🌸"
  },
  {
    id: "kabukicho",
    name: "歌舞伎町",
    nameJa: "歌舞伎町",
    nameEn: "Kabukicho",
    area: "新宿",
    lat: 35.6946,
    lng: 139.7021,
    description: "东京最大的红灯区，夜生活繁华，霓虹灯璀璨",
    tags: ["夜生活", "娱乐", "拍照"],
    visitDuration: 90,
    bestTime: "晚上7点后",
    photoSpots: 6,
    icon: "🌃"
  },
  {
    id: "tokyo-metro-building",
    name: "东京都厅",
    nameJa: "東京都庁",
    nameEn: "Tokyo Metropolitan Government Building",
    area: "新宿",
    lat: 35.6896,
    lng: 139.6917,
    description: "免费的观景台，可360度俯瞰东京全景",
    tags: ["观景", "免费", "地标"],
    visitDuration: 60,
    bestTime: "傍晚看夜景",
    photoSpots: 8,
    icon: "🏢"
  },
  {
    id: "omoide-yokocho",
    name: "思出横丁",
    nameJa: "思い出横丁",
    nameEn: "Omoide Yokocho",
    area: "新宿",
    lat: 35.6915,
    lng: 139.7003,
    description: "狭窄的小巷里挤满了小酒馆和烤串店，充满昭和风情",
    tags: ["美食", "居酒屋", "文化"],
    visitDuration: 90,
    bestTime: "晚上6点后",
    photoSpots: 4,
    icon: "🍢"
  },

  // 涩谷区域
  {
    id: "shibuya-crossing",
    name: "涩谷十字路口",
    nameJa: "渋谷スクランブル交差点",
    nameEn: "Shibuya Crossing",
    area: "涩谷",
    lat: 35.6595,
    lng: 139.7004,
    description: "世界上最繁忙的十字路口，每次绿灯可有3000人同时过马路",
    tags: ["地标", "拍照", "打卡"],
    visitDuration: 30,
    bestTime: "傍晚人流高峰",
    photoSpots: 5,
    icon: "🚦"
  },
  {
    id: "hachiko",
    name: "忠犬八公像",
    nameJa: "ハチ公像",
    nameEn: "Hachiko Statue",
    area: "涩谷",
    lat: 35.6590,
    lng: 139.7005,
    description: "纪念忠诚等待主人的秋田犬，涩谷站前的约会圣地",
    tags: ["地标", "拍照", "文化"],
    visitDuration: 15,
    bestTime: "任何时间",
    photoSpots: 3,
    icon: "🐕"
  },
  {
    id: "shibuya-sky",
    name: "涩谷天空",
    nameJa: "渋谷スカイ",
    nameEn: "Shibuya Sky",
    area: "涩谷",
    lat: 35.6585,
    lng: 139.7024,
    description: "涩谷最新的观景台，可俯瞰涩谷十字路口和东京全景",
    tags: ["观景", "拍照", "现代"],
    visitDuration: 90,
    bestTime: "日落时分",
    photoSpots: 10,
    icon: "🌆"
  },
  {
    id: "center-gai",
    name: "涩谷中心街",
    nameJa: "センター街",
    nameEn: "Center Gai",
    area: "涩谷",
    lat: 35.6610,
    lng: 139.6988,
    description: "年轻人的购物天堂，潮流服饰、游戏厅、美食应有尽有",
    tags: ["购物", "美食", "娱乐"],
    visitDuration: 120,
    bestTime: "下午2-6点",
    photoSpots: 6,
    icon: "🛍️"
  },

  // 原宿区域
  {
    id: "takeshita-street",
    name: "竹下通",
    nameJa: "竹下通り",
    nameEn: "Takeshita Street",
    area: "原宿",
    lat: 35.6702,
    lng: 139.7037,
    description: "原宿最具代表性的街道，充满个性小店和可爱甜品店",
    tags: ["购物", "美食", "时尚"],
    visitDuration: 90,
    bestTime: "下午1-5点",
    photoSpots: 8,
    icon: "🍦"
  },
  {
    id: "meiji-shrine",
    name: "明治神宫",
    nameJa: "明治神宮",
    nameEn: "Meiji Shrine",
    area: "原宿",
    lat: 35.6764,
    lng: 139.6993,
    description: "东京最重要的神社之一，供奉明治天皇和昭宪皇太后",
    tags: ["文化", "历史", "自然"],
    visitDuration: 90,
    bestTime: "早上8-10点",
    photoSpots: 12,
    icon: "⛩️"
  },
  {
    id: "omotesando",
    name: "表参道",
    nameJa: "表参道",
    nameEn: "Omotesando",
    area: "原宿",
    lat: 35.6652,
    lng: 139.7125,
    description: "东京的香榭丽舍大道，高端品牌和建筑艺术的完美结合",
    tags: ["购物", "建筑", "时尚"],
    visitDuration: 120,
    bestTime: "下午2-6点",
    photoSpots: 10,
    icon: "🌳"
  },
  {
    id: "yoyogi-park",
    name: "代代木公园",
    nameJa: "代々木公園",
    nameEn: "Yoyogi Park",
    area: "原宿",
    lat: 35.6719,
    lng: 139.6950,
    description: "东京最大的公园之一，周末有各种街头表演和活动",
    tags: ["自然", "公园", "活动"],
    visitDuration: 90,
    bestTime: "周末下午",
    photoSpots: 8,
    icon: "🌲"
  },

  // 银座区域
  {
    id: "ginza-main",
    name: "银座主街",
    nameJa: "銀座中央通り",
    nameEn: "Ginza Main Street",
    area: "银座",
    lat: 35.6717,
    lng: 139.7650,
    description: "东京最高端的购物街，国际奢侈品牌云集",
    tags: ["购物", "奢侈品", "建筑"],
    visitDuration: 150,
    bestTime: "周末步行者天国",
    photoSpots: 12,
    icon: "💎"
  },
  {
    id: "tsukiji-outer",
    name: "築地场外市场",
    nameJa: "築地場外市場",
    nameEn: "Tsukiji Outer Market",
    area: "银座",
    lat: 35.6654,
    lng: 139.7707,
    description: "虽然内场已搬迁，但场外市场依然保留，海鲜美食天堂",
    tags: ["美食", "海鲜", "市场"],
    visitDuration: 120,
    bestTime: "早上7-10点",
    photoSpots: 6,
    icon: "🍣"
  },
  {
    id: "kabukiza",
    name: "歌舞伎座",
    nameJa: "歌舞伎座",
    nameEn: "Kabukiza Theatre",
    area: "银座",
    lat: 35.6697,
    lng: 139.7703,
    description: "日本传统歌舞伎表演的殿堂，建筑本身就是艺术品",
    tags: ["文化", "表演", "建筑"],
    visitDuration: 180,
    bestTime: "预约观看演出",
    photoSpots: 5,
    icon: "🎭"
  },
  {
    id: "hibiya-park",
    name: "日比谷公园",
    nameJa: "日比谷公園",
    nameEn: "Hibiya Park",
    area: "银座",
    lat: 35.6738,
    lng: 139.7584,
    description: "东京第一座西式公园，银座旁的绿洲",
    tags: ["公园", "自然", "休闲"],
    visitDuration: 60,
    bestTime: "下午散步",
    photoSpots: 7,
    icon: "🌷"
  },

  // 台场区域
  {
    id: "odaiba-gundam",
    name: "台场高达",
    nameJa: "お台場ガンダム",
    nameEn: "Odaiba Gundam",
    area: "台场",
    lat: 35.6250,
    lng: 139.7753,
    description: "1:1实物大小的高达模型，动漫迷必打卡",
    tags: ["动漫", "拍照", "地标"],
    visitDuration: 45,
    bestTime: "傍晚有灯光秀",
    photoSpots: 8,
    icon: "🤖"
  },
  {
    id: "rainbow-bridge",
    name: "彩虹桥",
    nameJa: "レインボーブリッジ",
    nameEn: "Rainbow Bridge",
    area: "台场",
    lat: 35.6339,
    lng: 139.7634,
    description: "连接台场和市区的标志性大桥，夜晚灯光璀璨",
    tags: ["地标", "夜景", "拍照"],
    visitDuration: 30,
    bestTime: "晚上看夜景",
    photoSpots: 10,
    icon: "🌈"
  },
  {
    id: "teamlab-borderless",
    name: "teamLab无界美术馆",
    nameJa: "チームラボボーダレス",
    nameEn: "teamLab Borderless",
    area: "台场",
    lat: 35.6291,
    lng: 139.7755,
    description: "沉浸式数字艺术体验，梦幻般的光影世界",
    tags: ["艺术", "体验", "拍照"],
    visitDuration: 150,
    bestTime: "需提前预约",
    photoSpots: 20,
    icon: "✨"
  },
  {
    id: "aqua-city",
    name: "台场海滨公园",
    nameJa: "お台場海浜公園",
    nameEn: "Odaiba Seaside Park",
    area: "台场",
    lat: 35.6296,
    lng: 139.7744,
    description: "可以看到自由女神像和彩虹桥的海滨公园",
    tags: ["公园", "海滨", "拍照"],
    visitDuration: 60,
    bestTime: "日落时分",
    photoSpots: 12,
    icon: "🗽"
  },

  // 上野区域
  {
    id: "ueno-park",
    name: "上野公园",
    nameJa: "上野公園",
    nameEn: "Ueno Park",
    area: "上野",
    lat: 35.7148,
    lng: 139.7740,
    description: "东京最大的公园，春天樱花盛开时美不胜收",
    tags: ["公园", "樱花", "文化"],
    visitDuration: 120,
    bestTime: "春季赏樱",
    photoSpots: 15,
    icon: "🌸"
  },
  {
    id: "ueno-zoo",
    name: "上野动物园",
    nameJa: "上野動物園",
    nameEn: "Ueno Zoo",
    area: "上野",
    lat: 35.7156,
    lng: 139.7731,
    description: "日本最古老的动物园，有熊猫等珍稀动物",
    tags: ["动物", "家庭", "娱乐"],
    visitDuration: 180,
    bestTime: "早上10点后",
    photoSpots: 10,
    icon: "🐼"
  },
  {
    id: "ameyoko",
    name: "阿美横町",
    nameJa: "アメヤ横丁",
    nameEn: "Ameyoko",
    area: "上野",
    lat: 35.7088,
    lng: 139.7747,
    description: "热闹的市场街，可以买到便宜的商品和美食",
    tags: ["购物", "美食", "市场"],
    visitDuration: 90,
    bestTime: "下午2-6点",
    photoSpots: 5,
    icon: "🏪"
  },

  // 秋叶原区域
  {
    id: "akihabara-main",
    name: "秋叶原电器街",
    nameJa: "秋葉原電気街",
    nameEn: "Akihabara Electric Town",
    area: "秋叶原",
    lat: 35.6984,
    lng: 139.7731,
    description: "动漫、游戏、电子产品的天堂，御宅族圣地",
    tags: ["动漫", "购物", "电子产品"],
    visitDuration: 180,
    bestTime: "下午1-7点",
    photoSpots: 8,
    icon: "🎮"
  },
  {
    id: "akiba-culture-zone",
    name: "秋叶原文化区",
    nameJa: "秋葉原カルチャーゾーン",
    nameEn: "Akiba Culture Zone",
    area: "秋叶原",
    lat: 35.6995,
    lng: 139.7712,
    description: "女仆咖啡厅、手办店、动漫周边店集中地",
    tags: ["动漫", "文化", "体验"],
    visitDuration: 120,
    bestTime: "下午2-8点",
    photoSpots: 6,
    icon: "🎌"
  },

  // 六本木区域
  {
    id: "roppongi-hills",
    name: "六本木之丘",
    nameJa: "六本木ヒルズ",
    nameEn: "Roppongi Hills",
    area: "六本木",
    lat: 35.6604,
    lng: 139.7296,
    description: "高端商业综合体，森美术馆和东京城市观景台所在地",
    tags: ["购物", "艺术", "观景"],
    visitDuration: 180,
    bestTime: "傍晚看夜景",
    photoSpots: 12,
    icon: "🏙️"
  },
  {
    id: "tokyo-midtown",
    name: "东京中城",
    nameJa: "東京ミッドタウン",
    nameEn: "Tokyo Midtown",
    area: "六本木",
    lat: 35.6657,
    lng: 139.7294,
    description: "现代化的商业区，设计感十足",
    tags: ["购物", "设计", "现代"],
    visitDuration: 120,
    bestTime: "下午3-7点",
    photoSpots: 8,
    icon: "🏢"
  },
  {
    id: "mori-art-museum",
    name: "森美术馆",
    nameJa: "森美術館",
    nameEn: "Mori Art Museum",
    area: "六本木",
    lat: 35.6605,
    lng: 139.7295,
    description: "位于六本木之丘52层的现代艺术美术馆",
    tags: ["艺术", "文化", "观景"],
    visitDuration: 120,
    bestTime: "下午2-6点",
    photoSpots: 10,
    icon: "🎨"
  },

  // 池袋区域
  {
    id: "sunshine-city",
    name: "太阳城",
    nameJa: "サンシャインシティ",
    nameEn: "Sunshine City",
    area: "池袋",
    lat: 35.7295,
    lng: 139.7192,
    description: "大型商业综合体，有水族馆、展望台、购物中心",
    tags: ["购物", "娱乐", "家庭"],
    visitDuration: 180,
    bestTime: "下午1-7点",
    photoSpots: 10,
    icon: "🌞"
  },
  {
    id: "ikebukuro-station",
    name: "池袋站周边",
    nameJa: "池袋駅周辺",
    nameEn: "Ikebukuro Station Area",
    area: "池袋",
    lat: 35.7295,
    lng: 139.7109,
    description: "繁华的商业区，购物和美食选择丰富",
    tags: ["购物", "美食", "交通枢纽"],
    visitDuration: 150,
    bestTime: "下午2-8点",
    photoSpots: 6,
    icon: "🚉"
  },

  // 东京站区域
  {
    id: "tokyo-station",
    name: "东京站",
    nameJa: "東京駅",
    nameEn: "Tokyo Station",
    area: "东京站",
    lat: 35.6812,
    lng: 139.7671,
    description: "红砖建筑的历史车站，建筑本身就是景点",
    tags: ["建筑", "历史", "交通枢纽"],
    visitDuration: 45,
    bestTime: "白天拍照",
    photoSpots: 8,
    icon: "🚄"
  },
  {
    id: "imperial-palace",
    name: "皇居",
    nameJa: "皇居",
    nameEn: "Imperial Palace",
    area: "东京站",
    lat: 35.6852,
    lng: 139.7528,
    description: "日本天皇的居所，外苑可以参观",
    tags: ["历史", "文化", "公园"],
    visitDuration: 90,
    bestTime: "早上9-11点",
    photoSpots: 10,
    icon: "🏯"
  },
  {
    id: "marunouchi",
    name: "丸之内",
    nameJa: "丸の内",
    nameEn: "Marunouchi",
    area: "东京站",
    lat: 35.6805,
    lng: 139.7640,
    description: "东京的商务中心，高端购物和餐饮",
    tags: ["购物", "商务", "建筑"],
    visitDuration: 120,
    bestTime: "下午3-7点",
    photoSpots: 8,
    icon: "🏢"
  },

  // 横滨区域
  {
    id: "yokohama-chinatown",
    name: "横滨中华街",
    nameJa: "横浜中華街",
    nameEn: "Yokohama Chinatown",
    area: "横滨",
    lat: 35.4437,
    lng: 139.6455,
    description: "日本最大的中华街，中华料理和中国文化体验",
    tags: ["美食", "文化", "购物"],
    visitDuration: 150,
    bestTime: "午餐或晚餐时间",
    photoSpots: 8,
    icon: "🏮"
  },
  {
    id: "yamashita-park",
    name: "山下公园",
    nameJa: "山下公園",
    nameEn: "Yamashita Park",
    area: "横滨",
    lat: 35.4437,
    lng: 139.6502,
    description: "横滨海滨的美丽公园，可以看到港口风光",
    tags: ["公园", "海滨", "拍照"],
    visitDuration: 60,
    bestTime: "傍晚散步",
    photoSpots: 12,
    icon: "⚓"
  },
  {
    id: "red-brick-warehouse",
    name: "红砖仓库",
    nameJa: "赤レンガ倉庫",
    nameEn: "Red Brick Warehouse",
    area: "横滨",
    lat: 35.4532,
    lng: 139.6425,
    description: "历史建筑改造的商业设施，充满复古风情",
    tags: ["购物", "历史", "拍照"],
    visitDuration: 90,
    bestTime: "下午3-7点",
    photoSpots: 10,
    icon: "🧱"
  },
  {
    id: "minato-mirai",
    name: "港未来21",
    nameJa: "みなとみらい21",
    nameEn: "Minato Mirai 21",
    area: "横滨",
    lat: 35.4564,
    lng: 139.6365,
    description: "横滨的现代化海滨区，摩天轮和地标塔",
    tags: ["现代", "观景", "拍照"],
    visitDuration: 120,
    bestTime: "傍晚到夜晚",
    photoSpots: 15,
    icon: "🎡"
  },

  // 镰仓区域
  {
    id: "kamakura-daibutsu",
    name: "镰仓大佛",
    nameJa: "鎌倉大仏",
    nameEn: "Kamakura Daibutsu",
    area: "镰仓",
    lat: 35.3167,
    lng: 139.5361,
    description: "日本第二大佛像，露天青铜大佛",
    tags: ["历史", "文化", "拍照"],
    visitDuration: 60,
    bestTime: "上午10-12点",
    photoSpots: 8,
    icon: "🙏"
  },
  {
    id: "enoshima",
    name: "江之岛",
    nameJa: "江ノ島",
    nameEn: "Enoshima",
    area: "镰仓",
    lat: 35.2999,
    lng: 139.4803,
    description: "美丽的海岛，有神社、洞窟和海景",
    tags: ["自然", "海滨", "拍照"],
    visitDuration: 180,
    bestTime: "全天",
    photoSpots: 20,
    icon: "🏝️"
  },
  {
    id: "kamakura-koko-mae",
    name: "镰仓高校前站",
    nameJa: "鎌倉高校前駅",
    nameEn: "Kamakura Kokomae Station",
    area: "镰仓",
    lat: 35.3072,
    lng: 139.4956,
    description: "《灌篮高手》取景地，铁道与海景的完美结合",
    tags: ["动漫", "拍照", "海滨"],
    visitDuration: 45,
    bestTime: "下午2-5点",
    photoSpots: 5,
    icon: "🚃"
  }
];

// 根据区域筛选景点
export function getSpotsByArea(area: string): Spot[] {
  return spots.filter(spot => spot.area === area);
}

// 根据标签筛选景点
export function getSpotsByTags(tags: string[]): Spot[] {
  return spots.filter(spot => 
    tags.some(tag => spot.tags.includes(tag))
  );
}

// 获取所有区域
export function getAllAreas(): string[] {
  const areas = new Set(spots.map(spot => spot.area));
  return Array.from(areas);
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set(spots.flatMap(spot => spot.tags));
  return Array.from(tags);
}
