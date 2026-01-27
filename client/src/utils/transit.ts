// 详细交通路线规划工具

import { getMetroLine, getNearestStation, stations, metroLines, type Station, type MetroLine } from '@/data/metro';

export interface TransitStep {
  type: 'walk' | 'subway' | 'train';
  from: string;
  to: string;
  line?: MetroLine;
  duration: number; // 分钟
  distance?: number; // 公里
  instructions: string;
  transferStation?: string; // 换乘站
}

export interface DetailedRoute {
  steps: TransitStep[];
  totalDuration: number;
  totalDistance: number;
  summary: string;
}

// 计算两点之间的距离（Haversine公式）
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 查找最近的车站
function findNearestStation(lat: number, lng: number): Station | null {
  let nearest: Station | null = null;
  let minDistance = Infinity;
  
  for (const station of stations) {
    const distance = calculateDistance(lat, lng, station.lat, station.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  }
  
  return nearest;
}

// 查找两个车站之间的直达线路
function findDirectLine(from: Station, to: Station): MetroLine | null {
  const commonLines = from.lines.filter(lineId => to.lines.includes(lineId));
  
  if (commonLines.length === 0) return null;
  
  // 优先选择JR山手线
  const yamanote = commonLines.find(id => id === 'jr-yamanote');
  if (yamanote) return getMetroLine(yamanote) || null;
  
  // 其次选择Tokyo Metro
  const tokyoMetro = commonLines.find(id => id.startsWith('metro-'));
  if (tokyoMetro) return getMetroLine(tokyoMetro) || null;
  
  // 最后选择第一条线路
  return getMetroLine(commonLines[0]) || null;
}

// 查找需要换乘的路线
function findTransferRoute(from: Station, to: Station): { via: Station, line1: MetroLine, line2: MetroLine } | null {
  // 查找可能的换乘站
  for (const station of stations) {
    // 检查是否可以从起点到换乘站，再从换乘站到终点
    const line1 = findDirectLine(from, station);
    const line2 = findDirectLine(station, to);
    
    if (line1 && line2 && line1.id !== line2.id) {
      return { via: station, line1, line2 };
    }
  }
  
  return null;
}

// 估算地铁行驶时间（每站约2分钟）
function estimateSubwayDuration(from: Station, to: Station, line: MetroLine): number {
  const fromIndex = line.stations.indexOf(from.name);
  const toIndex = line.stations.indexOf(to.name);
  
  if (fromIndex === -1 || toIndex === -1) {
    // 如果找不到车站，使用距离估算
    const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
    return Math.ceil(distance / 0.5) * 2; // 假设每0.5公里2分钟
  }
  
  const stationCount = Math.abs(toIndex - fromIndex);
  return stationCount * 2; // 每站2分钟
}

// 生成详细的交通路线
export function generateDetailedRoute(
  fromLat: number,
  fromLng: number,
  fromName: string,
  toLat: number,
  toLng: number,
  toName: string
): DetailedRoute {
  const steps: TransitStep[] = [];
  let totalDuration = 0;
  let totalDistance = 0;
  
  // 计算直线距离
  const straightDistance = calculateDistance(fromLat, fromLng, toLat, toLng);
  
  // 如果距离小于1公里，直接步行
  if (straightDistance < 1) {
    const walkDuration = Math.ceil(straightDistance * 15); // 1公里约15分钟
    steps.push({
      type: 'walk',
      from: fromName,
      to: toName,
      duration: walkDuration,
      distance: straightDistance,
      instructions: `从${fromName}步行至${toName}，约${walkDuration}分钟`
    });
    
    return {
      steps,
      totalDuration: walkDuration,
      totalDistance: straightDistance,
      summary: `步行 ${walkDuration}分钟`
    };
  }
  
  // 查找最近的车站
  const fromStation = findNearestStation(fromLat, fromLng);
  const toStation = findNearestStation(toLat, toLng);
  
  if (!fromStation || !toStation) {
    // 如果找不到车站，返回步行或出租车建议
    const duration = Math.ceil(straightDistance * 10); // 出租车约10分钟/公里
    steps.push({
      type: 'walk',
      from: fromName,
      to: toName,
      duration,
      distance: straightDistance,
      instructions: `建议乘坐出租车，约${duration}分钟，${straightDistance.toFixed(1)}公里`
    });
    
    return {
      steps,
      totalDuration: duration,
      totalDistance: straightDistance,
      summary: `出租车 ${duration}分钟`
    };
  }
  
  // 步行到起点车站
  const walkToStationDistance = calculateDistance(fromLat, fromLng, fromStation.lat, fromStation.lng);
  if (walkToStationDistance > 0.05) { // 超过50米才显示步行
    const walkDuration = Math.ceil(walkToStationDistance * 15);
    steps.push({
      type: 'walk',
      from: fromName,
      to: fromStation.name,
      duration: walkDuration,
      distance: walkToStationDistance,
      instructions: `步行至${fromStation.name}，约${walkDuration}分钟`
    });
    totalDuration += walkDuration;
    totalDistance += walkToStationDistance;
  }
  
  // 查找直达线路
  const directLine = findDirectLine(fromStation, toStation);
  
  if (directLine) {
    // 有直达线路
    const subwayDuration = estimateSubwayDuration(fromStation, toStation, directLine);
    steps.push({
      type: directLine.operator === 'JR' ? 'train' : 'subway',
      from: fromStation.name,
      to: toStation.name,
      line: directLine,
      duration: subwayDuration,
      instructions: `乘坐${directLine.name}，从${fromStation.name}到${toStation.name}，约${subwayDuration}分钟`
    });
    totalDuration += subwayDuration;
  } else {
    // 需要换乘
    const transferRoute = findTransferRoute(fromStation, toStation);
    
    if (transferRoute) {
      const { via, line1, line2 } = transferRoute;
      
      // 第一段
      const duration1 = estimateSubwayDuration(fromStation, via, line1);
      steps.push({
        type: line1.operator === 'JR' ? 'train' : 'subway',
        from: fromStation.name,
        to: via.name,
        line: line1,
        duration: duration1,
        instructions: `乘坐${line1.name}，从${fromStation.name}到${via.name}，约${duration1}分钟`
      });
      totalDuration += duration1;
      
      // 换乘
      steps.push({
        type: 'walk',
        from: via.name,
        to: via.name,
        duration: 3,
        transferStation: via.name,
        instructions: `在${via.name}换乘，约3分钟`
      });
      totalDuration += 3;
      
      // 第二段
      const duration2 = estimateSubwayDuration(via, toStation, line2);
      steps.push({
        type: line2.operator === 'JR' ? 'train' : 'subway',
        from: via.name,
        to: toStation.name,
        line: line2,
        duration: duration2,
        instructions: `换乘${line2.name}，从${via.name}到${toStation.name}，约${duration2}分钟`
      });
      totalDuration += duration2;
    } else {
      // 找不到换乘路线，使用简单估算
      const subwayDuration = Math.ceil(straightDistance * 5); // 地铁约5分钟/公里
      steps.push({
        type: 'subway',
        from: fromStation.name,
        to: toStation.name,
        duration: subwayDuration,
        instructions: `乘坐地铁，从${fromStation.name}到${toStation.name}，约${subwayDuration}分钟`
      });
      totalDuration += subwayDuration;
    }
  }
  
  // 从终点车站步行到目的地
  const walkFromStationDistance = calculateDistance(toStation.lat, toStation.lng, toLat, toLng);
  if (walkFromStationDistance > 0.05) {
    const walkDuration = Math.ceil(walkFromStationDistance * 15);
    steps.push({
      type: 'walk',
      from: toStation.name,
      to: toName,
      duration: walkDuration,
      distance: walkFromStationDistance,
      instructions: `从${toStation.name}步行至${toName}，约${walkDuration}分钟`
    });
    totalDuration += walkDuration;
    totalDistance += walkFromStationDistance;
  }
  
  // 生成摘要
  const subwaySteps = steps.filter(s => s.type === 'subway' || s.type === 'train');
  const transferCount = steps.filter(s => s.transferStation).length;
  
  let summary = '';
  if (subwaySteps.length === 0) {
    summary = `步行 ${totalDuration}分钟`;
  } else if (transferCount === 0) {
    summary = `${subwaySteps[0].line?.name} ${totalDuration}分钟`;
  } else {
    summary = `${subwaySteps[0].line?.name} → ${subwaySteps[subwaySteps.length - 1].line?.name}，${totalDuration}分钟`;
  }
  
  return {
    steps,
    totalDuration,
    totalDistance,
    summary
  };
}

// 格式化时间显示
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
}

// 格式化距离显示
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}米`;
  }
  return `${km.toFixed(1)}公里`;
}
