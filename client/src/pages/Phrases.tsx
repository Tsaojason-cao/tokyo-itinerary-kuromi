import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Phrases() {
  const speakJapanese = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(v => v.lang.startsWith('ja'));
    if (japaneseVoice) utterance.voice = japaneseVoice;
    window.speechSynthesis.speak(utterance);
  };

  const phrases = [
    { category: "基本问候", items: [
      { zh: "你好", ja: "こんにちは", romaji: "Konnichiwa" },
      { zh: "早上好", ja: "おはようございます", romaji: "Ohayou gozaimasu" },
      { zh: "晚上好", ja: "こんばんは", romaji: "Konbanwa" },
      { zh: "谢谢", ja: "ありがとうございます", romaji: "Arigatou gozaimasu" },
      { zh: "不好意思/对不起", ja: "すみません", romaji: "Sumimasen" },
      { zh: "再见", ja: "さようなら", romaji: "Sayounara" }
    ]},
    { category: "餐厅用语", items: [
      { zh: "我要点餐", ja: "注文お願いします", romaji: "Chuumon onegaishimasu" },
      { zh: "这个多少钱？", ja: "これはいくらですか", romaji: "Kore wa ikura desu ka" },
      { zh: "好吃", ja: "美味しい", romaji: "Oishii" },
      { zh: "买单", ja: "お会計お願いします", romaji: "Okaikei onegaishimasu" },
      { zh: "有中文菜单吗？", ja: "中国語のメニューはありますか", romaji: "Chuugokugo no menyuu wa arimasu ka" }
    ]},
    { category: "交通用语", items: [
      { zh: "这里怎么走？", ja: "ここはどう行きますか", romaji: "Koko wa dou ikimasu ka" },
      { zh: "请问XX站怎么走？", ja: "XX駅はどこですか", romaji: "XX eki wa doko desu ka" },
      { zh: "多少钱？", ja: "いくらですか", romaji: "Ikura desu ka" },
      { zh: "我要去XX", ja: "XXに行きたいです", romaji: "XX ni ikitai desu" }
    ]},
    { category: "购物用语", items: [
      { zh: "可以试穿吗？", ja: "試着してもいいですか", romaji: "Shichaku shite mo ii desu ka" },
      { zh: "有折扣吗？", ja: "割引はありますか", romaji: "Waribiki wa arimasu ka" },
      { zh: "可以刷卡吗？", ja: "カードで払えますか", romaji: "Kaado de haraemasu ka" },
      { zh: "能便宜一点吗？", ja: "もう少し安くなりますか", romaji: "Mou sukoshi yasuku narimasu ka" }
    ]},
    { category: "紧急用语", items: [
      { zh: "救命！", ja: "助けて！", romaji: "Tasukete!" },
      { zh: "我迷路了", ja: "道に迷いました", romaji: "Michi ni mayoimashita" },
      { zh: "请叫警察", ja: "警察を呼んでください", romaji: "Keisatsu wo yonde kudasai" },
      { zh: "我不舒服", ja: "気分が悪いです", romaji: "Kibun ga warui desu" }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                <Heart className="w-8 h-8 fill-pink-400 text-pink-400" />
                日语常用语
              </h1>
              <p className="text-sm text-purple-600/70 mt-1">旅行必备 · 点击发音</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-purple-300">← 返回首页</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {phrases.map((category, idx) => (
          <Card key={idx} className="mb-6 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-600">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((phrase, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{phrase.zh}</div>
                      <div className="text-lg text-purple-600 mt-1">{phrase.ja}</div>
                      <div className="text-sm text-gray-500">{phrase.romaji}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-4"
                      onClick={() => speakJapanese(phrase.ja)}
                    >
                      <Volume2 className="w-5 h-5 text-purple-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
