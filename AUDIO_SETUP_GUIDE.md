# 离线音频设置指南

## 概述

本项目支持离线语音播放功能，通过预录音频文件作为 Web Speech API 的降级方案。这样可以：
- 提供更稳定的语音播放体验
- 减少对浏览器语音引擎的依赖
- 在没有日语语音包的设备上也能正常播放
- 提供更自然、更专业的发音

## 音频文件结构

### 目录结构
```
client/public/audio/
└── ja/                    # 日语音频文件目录
    ├── kaminarimon.mp3    # 雷門
    ├── sensoji.mp3        # 浅草寺
    ├── nakamise.mp3       # 仲見世通り
    ├── kagetsu-do.mp3     # 浅草花月堂
    ├── sumida-park.mp3    # 隅田公園
    ├── azuma-bridge.mp3   # 吾妻橋
    ├── tokyo-skytree.mp3  # 東京スカイツリー
    ├── ueno-park.mp3      # 上野公園
    ├── shibuya.mp3        # 渋谷
    ├── harajuku.mp3       # 原宿
    ├── shinjuku.mp3       # 新宿
    ├── ginza.mp3          # 銀座
    ├── akihabara.mp3      # 秋葉原
    ├── fujisan.mp3        # 富士山
    ├── konnichiwa.mp3     # こんにちは
    ├── arigatou.mp3       # ありがとう
    ├── sumimasen.mp3      # すみません
    ├── itadakimasu.mp3    # いただきます
    └── gochisousama.mp3   # ごちそうさま
```

## 音频文件要求

### 技术规格
- **格式**: MP3 (推荐) 或 OGG
- **采样率**: 44.1kHz 或 48kHz
- **比特率**: 128kbps - 192kbps
- **声道**: 单声道 (Mono) 或立体声 (Stereo)
- **时长**: 1-5秒（根据文本长度）
- **音量**: 标准化到 -3dB 至 -6dB

### 质量要求
- 清晰的发音，无背景噪音
- 自然的语速（不要太快或太慢）
- 标准的日语发音（东京口音）
- 音量一致，无爆音或失真

## 生成音频文件的方法

### 方法1: 使用在线 TTS 服务

#### Google Cloud Text-to-Speech
```bash
# 安装 Google Cloud SDK
# 然后使用以下命令生成音频

gcloud text-to-speech synthesize-speech \
  --text="雷門" \
  --language-code="ja-JP" \
  --voice-name="ja-JP-Wavenet-A" \
  --output-file="kaminarimon.mp3"
```

#### Amazon Polly
```bash
# 使用 AWS CLI
aws polly synthesize-speech \
  --text "雷門" \
  --voice-id "Mizuki" \
  --output-format mp3 \
  --language-code ja-JP \
  kaminarimon.mp3
```

#### Microsoft Azure Speech Service
```bash
# 使用 Azure CLI
az cognitiveservices speech synthesize \
  --text "雷門" \
  --voice "ja-JP-NanamiNeural" \
  --output kaminarimon.mp3
```

### 方法2: 使用 Python 脚本批量生成

创建 `generate_audio.py`:

```python
#!/usr/bin/env python3
import os
from google.cloud import texttospeech

# 初始化客户端
client = texttospeech.TextToSpeechClient()

# 音频映射表
audio_map = {
    'kaminarimon.mp3': '雷門',
    'sensoji.mp3': '浅草寺',
    'nakamise.mp3': '仲見世通り',
    'kagetsu-do.mp3': '浅草花月堂',
    'sumida-park.mp3': '隅田公園',
    'azuma-bridge.mp3': '吾妻橋',
    'tokyo-skytree.mp3': '東京スカイツリー',
    'ueno-park.mp3': '上野公園',
    'shibuya.mp3': '渋谷',
    'harajuku.mp3': '原宿',
    'shinjuku.mp3': '新宿',
    'ginza.mp3': '銀座',
    'akihabara.mp3': '秋葉原',
    'fujisan.mp3': '富士山',
    'konnichiwa.mp3': 'こんにちは',
    'arigatou.mp3': 'ありがとう',
    'sumimasen.mp3': 'すみません',
    'itadakimasu.mp3': 'いただきます',
    'gochisousama.mp3': 'ごちそうさま',
}

# 输出目录
output_dir = 'client/public/audio/ja'
os.makedirs(output_dir, exist_ok=True)

# 语音配置
voice = texttospeech.VoiceSelectionParams(
    language_code='ja-JP',
    name='ja-JP-Wavenet-A',  # 女声，也可以选择 Wavenet-B (男声)
)

audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    speaking_rate=0.9,  # 稍慢一点，更清晰
    pitch=0.0,
    volume_gain_db=0.0,
)

# 批量生成
for filename, text in audio_map.items():
    print(f'生成: {filename} - {text}')
    
    synthesis_input = texttospeech.SynthesisInput(text=text)
    
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )
    
    output_path = os.path.join(output_dir, filename)
    with open(output_path, 'wb') as out:
        out.write(response.audio_content)
    
    print(f'✓ 已保存: {output_path}')

print('\n所有音频文件生成完成！')
```

运行脚本:
```bash
# 设置 Google Cloud 凭证
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"

# 安装依赖
pip install google-cloud-texttospeech

# 运行脚本
python3 generate_audio.py
```

### 方法3: 使用开源 TTS 引擎

#### 使用 pyttsx3 (离线)
```python
import pyttsx3
import os

engine = pyttsx3.init()
engine.setProperty('rate', 150)  # 语速

audio_map = {
    'kaminarimon.mp3': '雷門',
    # ... 其他映射
}

output_dir = 'client/public/audio/ja'
os.makedirs(output_dir, exist_ok=True)

for filename, text in audio_map.items():
    output_path = os.path.join(output_dir, filename)
    engine.save_to_file(text, output_path)
    print(f'生成: {output_path}')

engine.runAndWait()
```

## 添加新的音频文件

### 步骤1: 准备音频文件
按照上述方法生成音频文件，确保符合技术规格。

### 步骤2: 更新映射表
编辑 `client/src/utils/offlineSpeech.ts`，在 `audioMap` 中添加新的映射：

```typescript
const audioMap: { [key: string]: string } = {
  // ... 现有映射
  '新景点名': 'new-spot.mp3',
};
```

### 步骤3: 放置文件
将音频文件复制到 `client/public/audio/ja/` 目录。

### 步骤4: 测试
在浏览器中打开应用，点击语音按钮测试播放。

## 性能优化

### 预加载策略
在应用启动时预加载常用音频：

```typescript
// 在 App.tsx 或 main.tsx 中
import { preloadCommonSpotAudios } from '@/utils/offlineSpeech';

// 应用启动时预加载
useEffect(() => {
  preloadCommonSpotAudios();
}, []);
```

### 懒加载策略
对于不常用的音频，采用懒加载策略，在用户点击时才加载。

### 压缩优化
使用工具压缩音频文件以减小体积：

```bash
# 使用 ffmpeg 压缩
ffmpeg -i input.mp3 -b:a 128k -ar 44100 output.mp3
```

## 降级策略

系统会按以下顺序尝试播放语音：
1. **离线音频** - 如果有预录的音频文件，优先使用
2. **Web Speech API** - 如果没有离线音频，使用浏览器的语音合成
3. **静默失败** - 如果都不可用，显示错误提示

## 监控和调试

### 查看缓存状态
```typescript
import { offlineSpeechManager } from '@/utils/offlineSpeech';

// 获取缓存统计
const stats = offlineSpeechManager.getCacheStats();
console.log('缓存统计:', stats);
```

### 清空缓存
```typescript
offlineSpeechManager.clearCache();
```

### 调试日志
在浏览器控制台中查看 `[OfflineSpeech]` 开头的日志信息。

## 成本估算

### Google Cloud TTS
- 前 100 万字符/月: 免费
- 之后: $4 / 100万字符 (Standard)
- Wavenet 语音: $16 / 100万字符

### Amazon Polly
- 前 12 个月: 每月 500 万字符免费
- 之后: $4 / 100万字符 (Standard)
- Neural 语音: $16 / 100万字符

### 本项目估算
- 约 20 个常用短语
- 每个短语平均 5 个字符
- 总计: 100 字符
- **成本: 几乎为 0**（在免费额度内）

## 常见问题

### Q: 音频文件不播放？
A: 检查文件路径是否正确，文件格式是否支持，浏览器控制台是否有错误。

### Q: 音频播放有延迟？
A: 使用预加载策略，在应用启动时预加载常用音频。

### Q: 如何更换语音？
A: 重新生成音频文件，使用不同的语音模型（如 Wavenet-B 男声）。

### Q: 支持其他语言吗？
A: 可以，创建新的目录如 `audio/en/` 并更新 `offlineSpeech.ts` 中的路径。

## 下一步

1. ✅ 创建音频文件目录结构
2. ⏳ 使用 TTS 服务生成音频文件
3. ⏳ 测试离线播放功能
4. ⏳ 优化预加载策略
5. ⏳ 监控播放成功率

---

**注意**: 离线音频是可选功能。如果不提供音频文件，系统会自动降级到 Web Speech API。
