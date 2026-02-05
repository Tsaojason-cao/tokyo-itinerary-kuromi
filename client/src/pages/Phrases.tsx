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
      { zh: "有中文菜单吗？", ja: "中国語のメニューはありますか", romaji: "Chuugokugo no menyuu wa arimasu ka" },
      { zh: "我要这个", ja: "これをください", romaji: "Kore wo kudasai" },
      { zh: "不要辣", ja: "辛くないでください", romaji: "Karakunai de kudasai" },
      { zh: "给我水", ja: "お水をください", romaji: "Omizu wo kudasai" },
      { zh: "可以打包吗？", ja: "持ち帰りできますか", romaji: "Mochikaeri dekimasu ka" },
      { zh: "推荐什么？", ja: "おすすめは何ですか", romaji: "Osusume wa nan desu ka" }
    ]},
    { category: "拉面点餐", items: [
      { zh: "一碗拉面", ja: "ラーメン一杯お願いします", romaji: "Raamen ippai onegaishimasu" },
      { zh: "豚骨拉面", ja: "とんこつラーメン", romaji: "Tonkotsu raamen" },
      { zh: "味噌拉面", ja: "味噌ラーメン", romaji: "Miso raamen" },
      { zh: "酱油拉面", ja: "醤油ラーメン", romaji: "Shouyu raamen" },
      { zh: "盐味拉面", ja: "塩ラーメン", romaji: "Shio raamen" },
      { zh: "面要硬一点", ja: "麺は硬めで", romaji: "Men wa katame de" },
      { zh: "面要软一点", ja: "麺は柔らかめで", romaji: "Men wa yawarakame de" },
      { zh: "汤浓一点", ja: "スープ濃いめで", romaji: "Suupu koime de" },
      { zh: "油少一点", ja: "油少なめで", romaji: "Abura sukuname de" },
      { zh: "加叉烧", ja: "チャーシュー追加", romaji: "Chaashuu tsuika" },
      { zh: "加溏心蛋", ja: "煮卵追加", romaji: "Nitamago tsuika" },
      { zh: "加海苔", ja: "海苔追加", romaji: "Nori tsuika" }
    ]},
    { category: "天妇罗点餐", items: [
      { zh: "天妇罗定食", ja: "天ぷら定食", romaji: "Tenpura teishoku" },
      { zh: "天丼", ja: "天丼", romaji: "Tendon" },
      { zh: "虾天妇罗", ja: "海老天", romaji: "Ebi ten" },
      { zh: "蔬菜天妇罗", ja: "野菜天", romaji: "Yasai ten" },
      { zh: "综合天妇罗", ja: "天ぷら盛り合わせ", romaji: "Tenpura moriawase" },
      { zh: "天妇罗乌冬面", ja: "天ぷらうどん", romaji: "Tenpura udon" },
      { zh: "天妇罗荞麦面", ja: "天ぷらそば", romaji: "Tenpura soba" },
      { zh: "要酥脆的", ja: "サクサクでお願いします", romaji: "Sakusaku de onegaishimasu" }
    ]},
    { category: "寿司点餐", items: [
      { zh: "寿司拼盘", ja: "寿司盛り合わせ", romaji: "Sushi moriawase" },
      { zh: "金枪鱼", ja: "まぐろ", romaji: "Maguro" },
      { zh: "三文鱼", ja: "サーモン", romaji: "Saamon" },
      { zh: "海胆", ja: "うに", romaji: "Uni" },
      { zh: "鱼子", ja: "いくら", romaji: "Ikura" },
      { zh: "甜虾", ja: "甘エビ", romaji: "Amaebi" },
      { zh: "鳗鱼", ja: "うなぎ", romaji: "Unagi" },
      { zh: "玉子烧", ja: "玉子", romaji: "Tamago" },
      { zh: "要芥末", ja: "わさび入りで", romaji: "Wasabi iri de" },
      { zh: "不要芥末", ja: "わさび抜きで", romaji: "Wasabi nuki de" }
    ]},
    { category: "盖饭点餐", items: [
      { zh: "海鲜盖饭", ja: "海鮮丼", romaji: "Kaisen don" },
      { zh: "鳗鱼饭", ja: "うな丼", romaji: "Una don" },
      { zh: "吻仔鱼盖饭", ja: "しらす丼", romaji: "Shirasu don" },
      { zh: "牛肉盖饭", ja: "牛丼", romaji: "Gyuu don" },
      { zh: "亲子丼", ja: "親子丼", romaji: "Oyako don" },
      { zh: "炸猪排饭", ja: "カツ丼", romaji: "Katsu don" },
      { zh: "大份", ja: "大盛り", romaji: "Oomori" },
      { zh: "小份", ja: "小盛り", romaji: "Komori" }
    ]},
    { category: "特色美食", items: [
      { zh: "味噌乌冬面", ja: "ほうとう", romaji: "Houtou" },
      { zh: "人形烧", ja: "人形焼", romaji: "Ningyouyaki" },
      { zh: "可丽饼", ja: "クレープ", romaji: "Kureepu" },
      { zh: "团子", ja: "団子", romaji: "Dango" },
      { zh: "抹茶冰淇淋", ja: "抹茶アイス", romaji: "Matcha aisu" },
      { zh: "章鱼烧", ja: "たこ焼き", romaji: "Takoyaki" },
      { zh: "大阪烧", ja: "お好み焼き", romaji: "Okonomiyaki" },
      { zh: "烤鸡串", ja: "焼き鳥", romaji: "Yakitori" },
      { zh: "和牛", ja: "和牛", romaji: "Wagyuu" },
      { zh: "中华料理", ja: "中華料理", romaji: "Chuuka ryouri" }
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
      { zh: "能便宜一点吗？", ja: "もう少し安くなりますか", romaji: "Mou sukoshi yasuku narimasu ka" },
      { zh: "有其他颜色吗？", ja: "他の色はありますか", romaji: "Hoka no iro wa arimasu ka" },
      { zh: "有大一点的吗？", ja: "もっと大きいのはありますか", romaji: "Motto ookii no wa arimasu ka" },
      { zh: "有小一点的吗？", ja: "もっと小さいのはありますか", romaji: "Motto chiisai no wa arimasu ka" },
      { zh: "可以免税吗？", ja: "免税できますか", romaji: "Menzei dekimasu ka" },
      { zh: "我要买这个", ja: "これを買います", romaji: "Kore wo kaimasu" },
      { zh: "可以帮我包装吗？", ja: "包装してもらえますか", romaji: "Housou shite moraemasu ka" }
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
