import { Train, Navigation, Clock, MapPin, ArrowRight, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DetailedRoute, TransitStep } from '@/utils/transit';
import { formatDuration, formatDistance } from '@/utils/transit';

interface DetailedTransitProps {
  route: DetailedRoute;
  className?: string;
}

export function DetailedTransit({ route, className = '' }: DetailedTransitProps) {
  return (
    <Card className={`border-purple-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Train className="w-5 h-5 text-purple-600" />
          详细交通路线
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>总时长: {formatDuration(route.totalDuration)}</span>
          </div>
          {route.totalDistance > 0 && (
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>总距离: {formatDistance(route.totalDistance)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {route.steps.map((step, index) => (
          <TransitStepCard key={index} step={step} isLast={index === route.steps.length - 1} />
        ))}
      </CardContent>
    </Card>
  );
}

interface TransitStepCardProps {
  step: TransitStep;
  isLast: boolean;
}

function TransitStepCard({ step, isLast }: TransitStepCardProps) {
  const getStepIcon = () => {
    switch (step.type) {
      case 'walk':
        return <Navigation className="w-5 h-5 text-blue-600" />;
      case 'subway':
        return <Train className="w-5 h-5 text-purple-600" />;
      case 'train':
        return <Train className="w-5 h-5 text-green-600" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStepColor = () => {
    if (step.transferStation) return 'bg-orange-50 border-orange-200';
    switch (step.type) {
      case 'walk':
        return 'bg-blue-50 border-blue-200';
      case 'subway':
        return 'bg-purple-50 border-purple-200';
      case 'train':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStepLabel = () => {
    if (step.transferStation) return '换乘';
    switch (step.type) {
      case 'walk':
        return '步行';
      case 'subway':
        return '地铁';
      case 'train':
        return '电车';
      default:
        return '交通';
    }
  };

  return (
    <div className="relative">
      <div className={`p-4 rounded-lg border-2 ${getStepColor()}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getStepIcon()}
          </div>
          <div className="flex-1 space-y-2">
            {/* 步骤类型和时长 */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-semibold">
                {getStepLabel()}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(step.duration)}</span>
              </div>
            </div>

            {/* 线路信息 */}
            {step.line && (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: step.line.color }}
                />
                <span className="font-semibold text-gray-900">{step.line.name}</span>
                <span className="text-xs text-gray-500">({step.line.nameJa})</span>
              </div>
            )}

            {/* 起点和终点 */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{step.from}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{step.to}</span>
            </div>

            {/* 距离信息 */}
            {step.distance && step.distance > 0 && (
              <div className="text-xs text-gray-500">
                距离: {formatDistance(step.distance)}
              </div>
            )}

            {/* 换乘提示 */}
            {step.transferStation && (
              <div className="flex items-center gap-2 p-2 bg-orange-100 rounded text-sm">
                <RefreshCw className="w-4 h-4 text-orange-600" />
                <span className="text-orange-800">在 {step.transferStation} 换乘</span>
              </div>
            )}

            {/* 详细说明 */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.instructions}
            </p>
          </div>
        </div>
      </div>

      {/* 连接线 */}
      {!isLast && (
        <div className="absolute left-6 top-full w-0.5 h-3 bg-gray-300" />
      )}
    </div>
  );
}

// 简化版交通显示组件（用于列表视图）
interface CompactTransitProps {
  route: DetailedRoute;
  className?: string;
}

export function CompactTransit({ route, className = '' }: CompactTransitProps) {
  const subwaySteps = route.steps.filter(s => s.type === 'subway' || s.type === 'train');
  const hasTransfer = route.steps.some(s => s.transferStation);

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Train className="w-4 h-4 text-purple-600" />
      <span className="text-gray-700">{route.summary}</span>
      
      {subwaySteps.length > 0 && (
        <div className="flex items-center gap-1">
          {subwaySteps.map((step, index) => (
            <div key={index} className="flex items-center gap-1">
              {step.line && (
                <>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: step.line.color }}
                  />
                  <span className="text-xs text-gray-600">{step.line.name}</span>
                </>
              )}
              {hasTransfer && index < subwaySteps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
