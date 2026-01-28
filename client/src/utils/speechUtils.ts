/**
 * 语音播放工具函数
 * 用于在整个应用中统一处理日语语音播放功能
 */

/**
 * 播放日语文本
 * @param text 要播放的日语文本
 * @param options 可选配置项
 */
export function speakJapanese(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: SpeechSynthesisErrorEvent) => void;
  }
) {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }

  // 取消当前正在播放的语音
  window.speechSynthesis.cancel();

  // 等待一小段时间确保取消完成
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = options?.rate ?? 0.8;
    utterance.pitch = options?.pitch ?? 1.0;
    utterance.volume = options?.volume ?? 1.0;

    // 获取可用的语音列表
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));
    
    // 如果有日语语音包，使用第一个
    if (japaneseVoices.length > 0) {
      utterance.voice = japaneseVoices[0];
    }

    utterance.onend = () => {
      options?.onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      options?.onError?.(event);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to speak:', error);
    }
  }, 100);
}

/**
 * 检查浏览器是否支持语音合成
 */
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

/**
 * 获取可用的日语语音列表
 */
export function getJapaneseVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) {
    return [];
  }
  
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => voice.lang.startsWith('ja'));
}

/**
 * 停止当前正在播放的语音
 */
export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
