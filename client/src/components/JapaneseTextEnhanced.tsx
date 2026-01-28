import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { speakWithFallback, offlineSpeechManager } from "@/utils/offlineSpeech";

interface JapaneseTextProps {
  japanese: string;
  chinese: string;
  showTranslation?: boolean;
  enableOffline?: boolean; // 是否启用离线音频
}

export function JapaneseTextEnhanced({ 
  japanese, 
  chinese, 
  showTranslation = true,
  enableOffline = true 
}: JapaneseTextProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [hasOfflineAudio, setHasOfflineAudio] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // 等待语音列表加载完成
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    // 初始加载
    loadVoices();

    // 监听语音列表变化（某些浏览器需要）
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // 检查是否有离线音频
    if (enableOffline) {
      setHasOfflineAudio(offlineSpeechManager.hasOfflineAudio(japanese));
    }

    return () => {
      // 清理：组件卸载时取消所有语音
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [japanese, enableOffline]);

  const playJapanese = async () => {
    if (!('speechSynthesis' in window) && !hasOfflineAudio) {
      toast({
        title: "不支持语音播放",
        description: "您的浏览器不支持语音合成功能，且没有可用的离线音频",
        variant: "destructive",
      });
      return;
    }

    setIsPlaying(true);

    try {
      // 获取可用的语音列表
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));

      await speakWithFallback(japanese, {
        lang: 'ja-JP',
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0,
        voice: japaneseVoices.length > 0 ? japaneseVoices[0] : undefined,
        forceOnline: !enableOffline,
        onEnd: () => {
          setIsPlaying(false);
        },
        onError: (event) => {
          setIsPlaying(false);
          
          // 根据错误类型显示不同的提示
          let errorMessage = "语音播放失败";
          if (event.error === 'not-allowed') {
            errorMessage = "浏览器阻止了语音播放，请确保您已与页面进行交互";
          } else if (event.error === 'network') {
            errorMessage = "网络错误，无法加载语音";
          } else if (event.error === 'synthesis-failed') {
            errorMessage = "语音合成失败，请稍后重试";
          }

          toast({
            title: "播放失败",
            description: errorMessage,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      setIsPlaying(false);
      console.error('Failed to play audio:', error);
      toast({
        title: "播放失败",
        description: "无法启动语音播放",
        variant: "destructive",
      });
    }
  };

  return (
    <span className="inline-flex items-center gap-2 group">
      <span className="flex flex-col">
        <span className="font-medium text-purple-900">{chinese}</span>
        {showTranslation && (
          <span className="text-sm text-gray-500">{japanese}</span>
        )}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={playJapanese}
        disabled={isPlaying}
        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        title={hasOfflineAudio ? "播放日文发音（离线音频）" : "播放日文发音"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
        ) : hasOfflineAudio ? (
          <Volume2 className="w-4 h-4 text-green-600" />
        ) : (
          <Volume2 className="w-4 h-4 text-gray-400" />
        )}
      </Button>
    </span>
  );
}
