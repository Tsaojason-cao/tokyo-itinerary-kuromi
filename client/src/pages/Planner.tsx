import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, 
  Home,
  Navigation, 
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Star,
  Heart,
  Hotel,
  Star,
  Map as MapIcon,
  Info,
  Filter
} from "lucide-react";
import { accommodations, spots, getAllTags, type Spot, type Accommodation } from "@/data/spots";
import { 
  optimizeRoute, 
  formatDistance, 
  formatDuration, 
  getTransportModeName,
  getTransportModeIcon,
  type Location,
  type OptimizedRoute
} from "@/utils/tsp";
import { generateDetailedRoute, type DetailedRoute } from "@/utils/transit";
import { DetailedTransit, CompactTransit } from "@/components/DetailedTransit";

export default function Planner() {
  const [step, setStep] = useState(1);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);
  const [detailedRoutes, setDetailedRoutes] = useState<Map<number, DetailedRoute>>(new Map());
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const allTags = getAllTags();

  // 根据标签筛选景点
  const filteredSpots = selectedTags.size > 0
    ? spots.filter(spot => 
        Array.from(selectedTags).some(tag => spot.tags.includes(tag))
      )
    : spots;

  // 切换景点选择
  const toggleSpot = (spotId: string) => {
    const newSet = new Set(selectedSpots);
    if (newSet.has(spotId)) {
      newSet.delete(spotId);
    } else {
      newSet.add(spotId);
    }
    setSelectedSpots(newSet);
  };

  // 切换标签筛选
  const toggleTag = (tag: string) => {
    const newSet = new Set(selectedTags);
    if (newSet.has(tag)) {
      newSet.delete(tag);
    } else {
      newSet.add(tag);
    }
    setSelectedTags(newSet);
  };

  // 生成路线
  const generateRoute = () => {
    if (!selectedAccommodation || selectedSpots.size === 0) {
      return;
    }

    const start: Location = {
      id: selectedAccommodation.id,
      name: selectedAccommodation.name,
      lat: selectedAccommodation.lat,
      lng: selectedAccommodation.lng
    };

    const destinations: Location[] = Array.from(selectedSpots)
      .map(spotId => {
        const spot = spots.find(s => s.id === spotId);
        if (!spot) return null;
        return {
          id: spot.id,
          name: spot.name,
          lat: spot.lat,
          lng: spot.lng
        };
      })
      .filter((loc): loc is Location => loc !== null);

    const route = optimizeRoute(start, destinations);
    setOptimizedRoute(route);
    
    // 生成每段路线的详细交通信息
    const newDetailedRoutes = new Map<number, DetailedRoute>();
    route.steps.forEach((step, index) => {
      const detailedRoute = generateDetailedRoute(
        step.from.lat,
        step.from.lng,
        step.from.name,
        step.to.lat,
        step.to.lng,
        step.to.name
      );
      newDetailedRoutes.set(index, detailedRoute);
    });
    setDetailedRoutes(newDetailedRoutes);
    
    setStep(3);
  };

  // 重置规划
  const resetPlanner = () => {
    setStep(1);
    setSelectedAccommodation(null);
    setSelectedSpots(new Set());
    setSelectedTags(new Set());
    setOptimizedRoute(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Kuromi decorations */}
      <div className="fixed top-20 right-5 w-20 h-20 opacity-15 animate-float z-0 pointer-events-none">
        <img src="/images/kuromi-cute.png" alt="" className="w-full h-full" />
      </div>
      <div className="fixed bottom-32 left-5 w-24 h-24 opacity-20 animate-float-delayed z-0 pointer-events-none">
        <img src="/images/kuromi-sticker.png" alt="" className="w-full h-full" />
      </div>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="mb-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                <img src="/images/kuromi-main.png" alt="Kuromi" className="w-10 h-10 rounded-full border-2 border-pink-300" />
                模块化行程规划器
                <Star className="w-6 h-6 fill-pink-400 text-pink-400 animate-pulse" />
              </h1>
              <p className="text-sm text-purple-600/70 mt-1">自定义你的东京之旅</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Star className="w-3 h-3 mr-1 fill-purple-400" />
                Step {step}/3
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Progress Indicator */}
        <Card className="mb-6 border-purple-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-medium">选择住宿</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                </div>
                <span className="font-medium">选择景点</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {step > 3 ? <CheckCircle2 className="w-5 h-5" /> : '3'}
                </div>
                <span className="font-medium">查看路线</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: 选择住宿 */}
        {step === 1 && (
          <div className="space-y-4">
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-purple-600" />
                  选择你的住宿区域
                </CardTitle>
                <CardDescription>
                  选择一个住宿区域作为你的行程起点
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {accommodations.map((acc) => (
                    <Card
                      key={acc.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedAccommodation?.id === acc.id
                          ? 'border-purple-600 border-2 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedAccommodation(acc)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Home className="w-5 h-5 text-purple-600" />
                          {acc.name}
                        </CardTitle>
                        <CardDescription>{acc.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {acc.advantages.map((adv, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span>{adv}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={!selectedAccommodation}
                onClick={() => setStep(2)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                下一步：选择景点
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: 选择景点 */}
        {step === 2 && (
          <div className="space-y-4">
            {/* 标签筛选 */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-purple-600" />
                  标签筛选
                </CardTitle>
                <CardDescription>
                  选择标签来筛选景点（可多选）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.has(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTags.has(tag)
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'hover:bg-purple-100'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 景点选择 */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  选择你想去的景点
                </CardTitle>
                <CardDescription>
                  已选择 {selectedSpots.size} 个景点 · 共 {filteredSpots.length} 个景点可选
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSpots.map((spot) => (
                    <Card
                      key={spot.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedSpots.has(spot.id)
                          ? 'border-purple-600 border-2 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => toggleSpot(spot.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-2xl">{spot.icon}</span>
                              {spot.name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {spot.area} · {spot.nameJa}
                            </CardDescription>
                          </div>
                          <Checkbox
                            checked={selectedSpots.has(spot.id)}
                            onCheckedChange={() => toggleSpot(spot.id)}
                            className="mt-1"
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{spot.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {spot.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {spot.visitDuration}分钟
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {spot.photoSpots}个拍照点
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              <Button
                size="lg"
                disabled={selectedSpots.size === 0}
                onClick={generateRoute}
                className="bg-purple-600 hover:bg-purple-700"
              >
                生成最优路线
                <Navigation className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: 查看路线 */}
        {step === 3 && optimizedRoute && (
          <div className="space-y-4">
            {/* 路线概览 */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-purple-600" />
                  你的最优路线
                </CardTitle>
                <CardDescription>
                  共 {optimizedRoute.locations.length} 个地点 · 
                  总距离 {formatDistance(optimizedRoute.totalDistance)} · 
                  预计时间 {formatDuration(optimizedRoute.totalDuration)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">路线说明</p>
                      <p>此路线使用TSP算法自动优化，确保总距离最短。预计时间包含交通和等待时间，实际时间可能因交通状况而异。</p>
                    </div>
                  </div>
                </div>

                {/* 路线步骤 */}
                <div className="space-y-4">
                  {optimizedRoute.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        {idx < optimizedRoute.steps.length - 1 && (
                          <div className="w-0.5 h-full bg-purple-300 my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="bg-white rounded-lg border border-purple-200 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-purple-900">
                                {idx === 0 ? '🏨 ' : ''}{step.from.name}
                              </h3>
                              {idx === 0 && (
                                <p className="text-sm text-gray-600">住宿地点</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="my-4 flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
                              <span className="text-2xl">{getTransportModeIcon(step.transportMode)}</span>
                              <span className="font-medium">{getTransportModeName(step.transportMode)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapIcon className="w-4 h-4" />
                              {formatDistance(step.distance)}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              约{formatDuration(step.duration)}
                            </div>
                          </div>

                          {/* 详细交通信息 */}
                          {detailedRoutes.has(idx) && (
                            <div className="mb-4">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                                className="w-full justify-between"
                              >
                                <span className="flex items-center gap-2">
                                  <Info className="w-4 h-4" />
                                  {expandedStep === idx ? '隐藏' : '查看'}详细交通步骤
                                </span>
                                <ArrowRight className={`w-4 h-4 transition-transform ${
                                  expandedStep === idx ? 'rotate-90' : ''
                                }`} />
                              </Button>
                              
                              {expandedStep === idx && (
                                <div className="mt-3">
                                  <DetailedTransit route={detailedRoutes.get(idx)!} />
                                </div>
                              )}
                              
                              {expandedStep !== idx && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                  <CompactTransit route={detailedRoutes.get(idx)!} />
                                </div>
                              )}
                            </div>
                          )}

                          <div className="pt-3 border-t border-purple-100">
                            <h3 className="font-bold text-lg text-purple-900 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-purple-600" />
                              {step.to.name}
                            </h3>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={() => window.open(
                                `https://www.google.com/maps/dir/?api=1&origin=${step.from.lat},${step.from.lng}&destination=${step.to.lat},${step.to.lng}&travelmode=transit`,
                                '_blank'
                              )}
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              在Google Maps中查看
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 最后一个目的地 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                        <h3 className="font-bold text-lg text-green-900">
                          行程结束
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          恭喜！你已完成所有景点的游览
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex justify-between">
              <Button
                size="lg"
                variant="outline"
                onClick={resetPlanner}
              >
                重新规划
              </Button>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${selectedAccommodation?.lat},${selectedAccommodation?.lng}&destination=${optimizedRoute.locations[optimizedRoute.locations.length - 1].lat},${optimizedRoute.locations[optimizedRoute.locations.length - 1].lng}&waypoints=${optimizedRoute.locations.slice(1, -1).map(loc => `${loc.lat},${loc.lng}`).join('|')}&travelmode=transit`,
                  '_blank'
                )}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                在Google Maps中查看完整路线
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
