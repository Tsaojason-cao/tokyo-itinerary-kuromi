import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface JapaneseTextProps {
  japanese: string;
  chinese: string;
  showTranslation?: boolean;
}

export function JapaneseText({ japanese, chinese, showTranslation = true }: JapaneseTextProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
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

    return () => {
      // 清理：组件卸载时取消所有语音
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playJapanese = () => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "不支持语音播放",
        description: "您的浏览器不支持语音合成功能",
        variant: "destructive",
      });
      return;
    }

    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();

    // 获取可用的语音列表
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));

    if (japaneseVoices.length === 0) {
      toast({
        title: "未找到日语语音包",
        description: "您的设备可能没有安装日语语音包，将使用默认语音播放",
        variant: "default",
      });
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 如果有日语语音包，使用第一个
    if (japaneseVoices.length > 0) {
      utterance.voice = japaneseVoices[0];
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      setIsPlaying(false);
      console.error('Speech synthesis error:', event);
      
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
    };

    // 开始播放
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsPlaying(false);
      console.error('Failed to speak:', error);
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
        title="播放日文发音"
      >
        <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-purple-600 animate-pulse' : 'text-gray-400'}`} />
      </Button>
    </span>
  );
}
