// TSP (Traveling Salesman Problem) 路线规划算法
// 使用贪心算法 + 2-opt优化

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface RouteStep {
  from: Location;
  to: Location;
  distance: number;
  duration: number; // 预估时间（分钟）
  transportMode: 'walk' | 'subway' | 'train';
}

export interface OptimizedRoute {
  locations: Location[];
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
}

// 计算两点之间的直线距离（Haversine公式）
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 地球半径（公里）
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 估算交通时间（分钟）
function estimateDuration(distance: number, mode: 'walk' | 'subway' | 'train'): number {
  // 根据距离和交通方式估算时间
  if (mode === 'walk') {
    // 步行速度约 4km/h
    return Math.round((distance / 4) * 60);
  } else if (mode === 'subway') {
    // 地铁平均速度约 30km/h，加上等待和换乘时间
    return Math.round((distance / 30) * 60 + 10);
  } else {
    // 火车平均速度约 50km/h
    return Math.round((distance / 50) * 60 + 15);
  }
}

// 判断交通方式
function determineTransportMode(distance: number): 'walk' | 'subway' | 'train' {
  if (distance < 0.8) {
    return 'walk'; // 小于800米步行
  } else if (distance < 20) {
    return 'subway'; // 20公里内地铁
  } else {
    return 'train'; // 超过20公里火车
  }
}

// 贪心算法：从起点开始，每次选择最近的未访问点
function greedyTSP(start: Location, locations: Location[]): Location[] {
  const unvisited = [...locations];
  const route: Location[] = [start];
  let current = start;
  
  // 从未访问列表中移除起点
  const startIndex = unvisited.findIndex(loc => loc.id === start.id);
  if (startIndex !== -1) {
    unvisited.splice(startIndex, 1);
  }
  
  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    // 找到距离当前点最近的未访问点
    for (let i = 0; i < unvisited.length; i++) {
      const distance = calculateDistance(
        current.lat,
        current.lng,
        unvisited[i].lat,
        unvisited[i].lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }
    
    // 访问最近的点
    current = unvisited[nearestIndex];
    route.push(current);
    unvisited.splice(nearestIndex, 1);
  }
  
  return route;
}

// 2-opt优化：尝试交换路线中的两条边，看是否能减少总距离
function twoOptOptimization(route: Location[]): Location[] {
  let improved = true;
  let bestRoute = [...route];
  
  while (improved) {
    improved = false;
    
    for (let i = 1; i < bestRoute.length - 1; i++) {
      for (let j = i + 1; j < bestRoute.length; j++) {
        // 计算当前路线的距离
        const currentDistance = 
          calculateDistance(
            bestRoute[i - 1].lat,
            bestRoute[i - 1].lng,
            bestRoute[i].lat,
            bestRoute[i].lng
          ) +
          calculateDistance(
            bestRoute[j - 1].lat,
            bestRoute[j - 1].lng,
            bestRoute[j].lat,
            bestRoute[j].lng
          );
        
        // 计算交换后的距离
        const newDistance = 
          calculateDistance(
            bestRoute[i - 1].lat,
            bestRoute[i - 1].lng,
            bestRoute[j - 1].lat,
            bestRoute[j - 1].lng
          ) +
          calculateDistance(
            bestRoute[i].lat,
            bestRoute[i].lng,
            bestRoute[j].lat,
            bestRoute[j].lng
          );
        
        // 如果交换后距离更短，则执行交换
        if (newDistance < currentDistance) {
          // 反转i到j-1之间的路线
          const newRoute = [
            ...bestRoute.slice(0, i),
            ...bestRoute.slice(i, j).reverse(),
            ...bestRoute.slice(j)
          ];
          bestRoute = newRoute;
          improved = true;
        }
      }
    }
  }
  
  return bestRoute;
}

// 主函数：优化路线
export function optimizeRoute(start: Location, destinations: Location[]): OptimizedRoute {
  // 如果没有目的地，直接返回
  if (destinations.length === 0) {
    return {
      locations: [start],
      steps: [],
      totalDistance: 0,
      totalDuration: 0
    };
  }
  
  // 如果只有一个目的地，直接返回
  if (destinations.length === 1) {
    const distance = calculateDistance(
      start.lat,
      start.lng,
      destinations[0].lat,
      destinations[0].lng
    );
    const mode = determineTransportMode(distance);
    const duration = estimateDuration(distance, mode);
    
    return {
      locations: [start, destinations[0]],
      steps: [{
        from: start,
        to: destinations[0],
        distance,
        duration,
        transportMode: mode
      }],
      totalDistance: distance,
      totalDuration: duration
    };
  }
  
  // 使用贪心算法获取初始路线
  let optimizedLocations = greedyTSP(start, destinations);
  
  // 使用2-opt算法优化路线
  optimizedLocations = twoOptOptimization(optimizedLocations);
  
  // 生成路线步骤
  const steps: RouteStep[] = [];
  let totalDistance = 0;
  let totalDuration = 0;
  
  for (let i = 0; i < optimizedLocations.length - 1; i++) {
    const from = optimizedLocations[i];
    const to = optimizedLocations[i + 1];
    const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
    const mode = determineTransportMode(distance);
    const duration = estimateDuration(distance, mode);
    
    steps.push({
      from,
      to,
      distance,
      duration,
      transportMode: mode
    });
    
    totalDistance += distance;
    totalDuration += duration;
  }
  
  return {
    locations: optimizedLocations,
    steps,
    totalDistance,
    totalDuration
  };
}

// 格式化距离显示
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}米`;
  }
  return `${km.toFixed(1)}公里`;
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

// 获取交通方式的中文名称
export function getTransportModeName(mode: 'walk' | 'subway' | 'train'): string {
  const names = {
    walk: '步行',
    subway: '地铁',
    train: '电车'
  };
  return names[mode];
}

// 获取交通方式的图标
export function getTransportModeIcon(mode: 'walk' | 'subway' | 'train'): string {
  const icons = {
    walk: '🚶',
    subway: '🚇',
    train: '🚃'
  };
  return icons[mode];
}
