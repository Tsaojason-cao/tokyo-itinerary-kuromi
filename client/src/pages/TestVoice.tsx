import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestVoice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [testResult, setTestResult] = useState<string>("");

  const testPhrases = [
    { japanese: "成田空港", chinese: "成田机场" },
    { japanese: "上野", chinese: "上野" },
    { japanese: "浅草寺", chinese: "浅草寺" },
    { japanese: "富士山", chinese: "富士山" },
    { japanese: "鎌倉", chinese: "镰仓" },
  ];

  const playJapanese = (japanese: string) => {
    if (!('speechSynthesis' in window)) {
      setTestResult("❌ 您的浏览器不支持语音合成功能");
      return;
    }

    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));

    setTestResult(`找到 ${japaneseVoices.length} 个日语语音包`);

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (japaneseVoices.length > 0) {
      utterance.voice = japaneseVoices[0];
      setTestResult(`✅ 使用日语语音: ${japaneseVoices[0].name}`);
    } else {
      setTestResult("⚠️ 未找到日语语音包，使用默认语音");
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setTestResult(prev => prev + "\n✅ 播放完成");
    };

    utterance.onerror = (event) => {
      setIsPlaying(false);
      setTestResult(`❌ 播放失败: ${event.error}`);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsPlaying(false);
      setTestResult(`❌ 无法启动语音播放: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>日文发音测试</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {testPhrases.map((phrase, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <div className="font-bold text-purple-900">{phrase.chinese}</div>
                <div className="text-sm text-gray-600">{phrase.japanese}</div>
              </div>
              <Button
                onClick={() => playJapanese(phrase.japanese)}
                disabled={isPlaying}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                播放
              </Button>
            </div>
          ))}

          {testResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold mb-2">测试结果:</div>
              <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
