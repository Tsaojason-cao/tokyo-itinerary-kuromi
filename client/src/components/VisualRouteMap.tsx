import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";

interface RouteStep {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  details: string;
  lat?: number;
  lng?: number;
}

interface VisualRouteMapProps {
  title: string;
  date: string;
  steps: RouteStep[];
}

export function VisualRouteMap({ title, date, steps }: VisualRouteMapProps) {
  const openNavigation = (placeName: string, lat?: number, lng?: number) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`, '_blank');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 rounded-2xl p-8 shadow-xl border-4 border-pink-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-600 mb-2">{title}</h2>
        <div className="flex items-center justify-center gap-2 text-pink-500">
          <span className="text-xl">♡</span>
          <span className="text-lg font-medium">{date}</span>
          <span className="text-xl">♡</span>
        </div>
      </div>

      {/* Route Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-[50px] top-[100px] w-0.5 h-[calc(100%+24px)] bg-pink-400 z-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0L10 20M5 15L10 20L15 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Step Card */}
            <div className="relative z-10 flex items-start gap-4">
              {/* Icon Circle */}
              <div className="flex-shrink-0 w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                {step.icon}
              </div>

              {/* Content Box */}
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:border-pink-400 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{step.title}</h3>
                    <p className="text-pink-600 font-medium mb-3">{step.subtitle}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.details}</p>
                  </div>
                  {(step.lat && step.lng) && (
                    <Button
                      onClick={() => openNavigation(step.title, step.lat, step.lng)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-shrink-0"
                      size="sm"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      导航
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Stars */}
            {index % 2 === 0 && (
              <div className="absolute -right-4 top-8 text-pink-300 text-2xl animate-pulse">
                ✦
              </div>
            )}
            {index % 2 === 1 && (
              <div className="absolute -left-4 top-8 text-purple-300 text-2xl animate-pulse">
                ✧
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 text-pink-300 text-3xl opacity-50">✿</div>
      <div className="absolute top-4 right-4 text-purple-300 text-3xl opacity-50">❀</div>
      <div className="absolute bottom-4 left-4 text-purple-300 text-3xl opacity-50">✾</div>
      <div className="absolute bottom-4 right-4 text-pink-300 text-3xl opacity-50">✽</div>
    </div>
  );
}
