import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JapaneseTextProps {
  japanese: string;
  chinese: string;
  showTranslation?: boolean;
}

export function JapaneseText({ japanese, chinese, showTranslation = true }: JapaneseTextProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playJapanese = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(japanese);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="inline-flex items-center gap-2 group">
      <div className="flex flex-col">
        <span className="font-medium text-purple-900">{chinese}</span>
        {showTranslation && (
          <span className="text-sm text-gray-500">{japanese}</span>
        )}
      </div>
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
    </div>
  );
}
