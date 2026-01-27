// 东京地铁线路数据库

export interface MetroLine {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  color: string;
  operator: 'JR' | 'Tokyo Metro' | 'Toei' | 'Private';
  stations: string[];
}

export interface Station {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  lat: number;
  lng: number;
  lines: string[]; // 线路ID列表
}

// 东京主要地铁线路
export const metroLines: MetroLine[] = [
  // JR山手线
  {
    id: 'jr-yamanote',
    name: 'JR山手线',
    nameJa: 'JR山手線',
    nameEn: 'JR Yamanote Line',
    color: '#9ACD32',
    operator: 'JR',
    stations: [
      '东京', '有乐町', '新橋', '滨松町', '田町', '品川', '大崎', '五反田',
      '目黑', '惠比寿', '涩谷', '原宿', '代代木', '新宿', '新大久保', '高田马场',
      '目白', '池袋', '大塚', '巢鸭', '驹込', '田端', '西日暮里', '日暮里',
      '莺谷', '上野', '御徒町', '秋叶原', '神田'
    ]
  },
  
  // 东京Metro银座线
  {
    id: 'metro-ginza',
    name: '银座线',
    nameJa: '銀座線',
    nameEn: 'Ginza Line',
    color: '#FF9500',
    operator: 'Tokyo Metro',
    stations: [
      '涩谷', '表参道', '外苑前', '青山一丁目', '赤坂见附', '溜池山王',
      '虎之门', '新橋', '银座', '京桥', '日本桥', '三越前', '神田',
      '末广町', '上野广小路', '上野', '稻荷町', '田原町', '浅草'
    ]
  },
  
  // 东京Metro丸之内线
  {
    id: 'metro-marunouchi',
    name: '丸之内线',
    nameJa: '丸ノ内線',
    nameEn: 'Marunouchi Line',
    color: '#F62E36',
    operator: 'Tokyo Metro',
    stations: [
      '荻洼', '南阿佐谷', '新高円寺', '东高円寺', '新中野', '中野坂上',
      '西新宿', '新宿', '新宿三丁目', '新宿御苑前', '四谷三丁目', '四谷',
      '赤坂见附', '国会议事堂前', '霞关', '银座', '东京', '大手町',
      '淡路町', '御茶之水', '本乡三丁目', '后乐园', '茗荷谷', '新大塚',
      '池袋'
    ]
  },
  
  // 东京Metro日比谷线
  {
    id: 'metro-hibiya',
    name: '日比谷线',
    nameJa: '日比谷線',
    nameEn: 'Hibiya Line',
    color: '#B5B5AC',
    operator: 'Tokyo Metro',
    stations: [
      '中目黑', '惠比寿', '广尾', '六本木', '神谷町', '霞关', '日比谷',
      '银座', '东银座', '筑地', '八丁堀', '茅场町', '人形町', '小传马町',
      '秋叶原', '仲御徒町', '上野', '入谷', '三之轮', '南千住', '北千住'
    ]
  },
  
  // 东京Metro东西线
  {
    id: 'metro-tozai',
    name: '东西线',
    nameJa: '東西線',
    nameEn: 'Tozai Line',
    color: '#009BBF',
    operator: 'Tokyo Metro',
    stations: [
      '中野', '落合', '高田马场', '早稻田', '神乐坂', '饭田桥', '九段下',
      '竹桥', '大手町', '日本桥', '茅场町', '门前仲町', '木场', '东阳町',
      '南砂町', '西葛西', '葛西', '浦安', '南行德', '行德', '妙典', '原木中山', '西船桥'
    ]
  },
  
  // 东京Metro千代田线
  {
    id: 'metro-chiyoda',
    name: '千代田线',
    nameJa: '千代田線',
    nameEn: 'Chiyoda Line',
    color: '#00BB85',
    operator: 'Tokyo Metro',
    stations: [
      '代代木上原', '代代木公园', '明治神宫前', '表参道', '乃木坂', '赤坂',
      '国会议事堂前', '霞关', '日比谷', '二重桥前', '大手町', '新御茶之水',
      '汤岛', '根津', '千驮木', '西日暮里', '町屋', '北千住', '绫濑', '北绫濑'
    ]
  },
  
  // 东京Metro有乐町线
  {
    id: 'metro-yurakucho',
    name: '有乐町线',
    nameJa: '有楽町線',
    nameEn: 'Yurakucho Line',
    color: '#C1A470',
    operator: 'Tokyo Metro',
    stations: [
      '和光市', '地下铁成增', '地下铁赤塚', '平和台', '氷川台', '小竹向原',
      '千川', '要町', '池袋', '东池袋', '护国寺', '江户川桥', '饭田桥',
      '市谷', '麹町', '永田町', '樱田门', '有乐町', '银座一丁目', '新富町',
      '月岛', '丰洲', '辰巳', '新木场'
    ]
  },
  
  // 都营浅草线
  {
    id: 'toei-asakusa',
    name: '都营浅草线',
    nameJa: '都営浅草線',
    nameEn: 'Toei Asakusa Line',
    color: '#E85298',
    operator: 'Toei',
    stations: [
      '西马込', '马込', '中延', '户越', '五反田', '高轮台', '泉岳寺',
      '三田', '大门', '新橋', '东银座', '宝町', '日本桥', '人形町',
      '东日本桥', '浅草桥', '藏前', '浅草', '本所吾妻桥', '押上'
    ]
  },
  
  // 都营大江户线
  {
    id: 'toei-oedo',
    name: '都营大江户线',
    nameJa: '都営大江戸線',
    nameEn: 'Toei Oedo Line',
    color: '#B6007A',
    operator: 'Toei',
    stations: [
      '都厅前', '新宿西口', '东新宿', '若松河田', '牛込柳町', '牛込神乐坂',
      '饭田桥', '春日', '本乡三丁目', '上野御徒町', '新御徒町', '藏前',
      '两国', '森下', '清澄白河', '门前仲町', '月岛', '胜哄', '筑地市场',
      '汐留', '大门', '赤羽桥', '麻布十番', '六本木', '青山一丁目',
      '国立竞技场', '代代木', '新宿', '都厅前'
    ]
  },
  
  // 京成本线
  {
    id: 'keisei-main',
    name: '京成本线',
    nameJa: '京成本線',
    nameEn: 'Keisei Main Line',
    color: '#0D6EB8',
    operator: 'Private',
    stations: [
      '京成上野', '日暮里', '京成高砂', '青砥', '京成成田', '成田机场'
    ]
  },
  
  // 临海线
  {
    id: 'rinkai',
    name: '临海线',
    nameJa: '臨海線',
    nameEn: 'Rinkai Line',
    color: '#00AC9B',
    operator: 'Private',
    stations: [
      '新木场', '东云', '国际展示场', '东京电讯港', '天王洲Isle',
      '品川海滨', '大井町', '大崎'
    ]
  },
  
  // 百合鸥线（台场）
  {
    id: 'yurikamome',
    name: '百合鸥线',
    nameJa: 'ゆりかもめ',
    nameEn: 'Yurikamome',
    color: '#00B5AD',
    operator: 'Private',
    stations: [
      '新桥', '汐留', '竹芝', '日之出', '芝浦埠头', '御台场海滨公园',
      '台场', '东京国际展览中心', '有明', '有明网球之森', '市场前',
      '新丰洲', '丰洲'
    ]
  }
];

// 主要车站数据
export const stations: Station[] = [
  { id: 'tokyo', name: '东京站', nameJa: '東京駅', nameEn: 'Tokyo Station', lat: 35.6812, lng: 139.7671, lines: ['jr-yamanote', 'metro-marunouchi'] },
  { id: 'shinjuku', name: '新宿站', nameJa: '新宿駅', nameEn: 'Shinjuku Station', lat: 35.6896, lng: 139.7006, lines: ['jr-yamanote', 'metro-marunouchi', 'toei-oedo'] },
  { id: 'shibuya', name: '涩谷站', nameJa: '渋谷駅', nameEn: 'Shibuya Station', lat: 35.6580, lng: 139.7016, lines: ['jr-yamanote', 'metro-ginza'] },
  { id: 'ikebukuro', name: '池袋站', nameJa: '池袋駅', nameEn: 'Ikebukuro Station', lat: 35.7295, lng: 139.7109, lines: ['jr-yamanote', 'metro-marunouchi', 'metro-yurakucho'] },
  { id: 'ueno', name: '上野站', nameJa: '上野駅', nameEn: 'Ueno Station', lat: 35.7139, lng: 139.7774, lines: ['jr-yamanote', 'metro-ginza', 'metro-hibiya'] },
  { id: 'asakusa', name: '浅草站', nameJa: '浅草駅', nameEn: 'Asakusa Station', lat: 35.7106, lng: 139.7967, lines: ['metro-ginza', 'toei-asakusa'] },
  { id: 'ginza', name: '银座站', nameJa: '銀座駅', nameEn: 'Ginza Station', lat: 35.6719, lng: 139.7640, lines: ['metro-ginza', 'metro-marunouchi', 'metro-hibiya'] },
  { id: 'roppongi', name: '六本木站', nameJa: '六本木駅', nameEn: 'Roppongi Station', lat: 35.6627, lng: 139.7298, lines: ['metro-hibiya', 'toei-oedo'] },
  { id: 'akihabara', name: '秋叶原站', nameJa: '秋葉原駅', nameEn: 'Akihabara Station', lat: 35.6984, lng: 139.7731, lines: ['jr-yamanote', 'metro-hibiya'] },
  { id: 'harajuku', name: '原宿站', nameJa: '原宿駅', nameEn: 'Harajuku Station', lat: 35.6702, lng: 139.7026, lines: ['jr-yamanote'] },
  { id: 'odaiba', name: '台场站', nameJa: '台場駅', nameEn: 'Daiba Station', lat: 35.6256, lng: 139.7744, lines: ['yurikamome'] },
  { id: 'shinbashi', name: '新橋站', nameJa: '新橋駅', nameEn: 'Shimbashi Station', lat: 35.6658, lng: 139.7576, lines: ['jr-yamanote', 'metro-ginza', 'toei-asakusa', 'yurikamome'] },
];

// 获取线路信息
export function getMetroLine(lineId: string): MetroLine | undefined {
  return metroLines.find(line => line.id === lineId);
}

// 获取车站信息
export function getStation(stationId: string): Station | undefined {
  return stations.find(station => station.id === stationId);
}

// 查找两个车站之间的线路
export function findCommonLines(station1Id: string, station2Id: string): MetroLine[] {
  const station1 = getStation(station1Id);
  const station2 = getStation(station2Id);
  
  if (!station1 || !station2) return [];
  
  const commonLineIds = station1.lines.filter(lineId => station2.lines.includes(lineId));
  return commonLineIds.map(lineId => getMetroLine(lineId)).filter(Boolean) as MetroLine[];
}

// 根据区域获取最近的车站
export function getNearestStation(area: string): Station | undefined {
  const areaStationMap: Record<string, string> = {
    '浅草': 'asakusa',
    '新宿': 'shinjuku',
    '涩谷': 'shibuya',
    '原宿': 'harajuku',
    '银座': 'ginza',
    '台场': 'odaiba',
    '上野': 'ueno',
    '秋叶原': 'akihabara',
    '六本木': 'roppongi',
    '池袋': 'ikebukuro',
    '东京站': 'tokyo',
  };
  
  const stationId = areaStationMap[area];
  return stationId ? getStation(stationId) : undefined;
}
