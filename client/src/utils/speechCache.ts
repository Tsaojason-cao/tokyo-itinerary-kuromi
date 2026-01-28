/**
 * 语音缓存工具
 * 使用 Web Audio API 预加载和缓存语音，避免重复合成
 */

interface CachedAudio {
  buffer: AudioBuffer;
  timestamp: number;
}

class SpeechCache {
  private cache: Map<string, CachedAudio> = new Map();
  private audioContext: AudioContext | null = null;
  private maxCacheSize: number = 50; // 最多缓存50个音频
  private cacheExpiry: number = 1000 * 60 * 30; // 30分钟过期

  constructor() {
    // 初始化 AudioContext
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  /**
   * 获取 AudioContext
   */
  private getAudioContext(): AudioContext | null {
    if (!this.audioContext && typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  /**
   * 生成缓存键
   */
  private getCacheKey(text: string, lang: string, rate: number): string {
    return `${lang}:${rate}:${text}`;
  }

  /**
   * 清理过期的缓存
   */
  private cleanExpiredCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((value, key) => {
      if (now - value.timestamp > this.cacheExpiry) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * 清理最旧的缓存（当缓存满时）
   */
  private cleanOldestCache(): void {
    if (this.cache.size >= this.maxCacheSize) {
      let oldestKey: string | null = null;
      let oldestTime = Date.now();

      this.cache.forEach((value, key) => {
        if (value.timestamp < oldestTime) {
          oldestTime = value.timestamp;
          oldestKey = key;
        }
      });

      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  /**
   * 使用 Web Speech API 合成语音并转换为 AudioBuffer
   */
  private async synthesizeToBuffer(
    text: string,
    lang: string,
    rate: number,
    voice?: SpeechSynthesisVoice
  ): Promise<AudioBuffer | null> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve(null);
        return;
      }

      // 创建一个临时的音频录制
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      if (voice) {
        utterance.voice = voice;
      }

      // 注意：Web Speech API 不直接支持录制到 AudioBuffer
      // 这里我们使用一个简化的方案：直接播放而不缓存音频数据
      // 真正的音频缓存需要使用服务器端 TTS API
      resolve(null);
    });
  }

  /**
   * 从缓存获取音频
   */
  getCached(text: string, lang: string, rate: number): AudioBuffer | null {
    this.cleanExpiredCache();
    const key = this.getCacheKey(text, lang, rate);
    const cached = this.cache.get(key);
    
    if (cached) {
      console.log('[SpeechCache] 命中缓存:', text);
      return cached.buffer;
    }
    
    return null;
  }

  /**
   * 播放缓存的音频
   */
  async playCached(buffer: AudioBuffer): Promise<void> {
    const context = this.getAudioContext();
    if (!context) {
      throw new Error('AudioContext not available');
    }

    // 恢复 AudioContext（如果被暂停）
    if (context.state === 'suspended') {
      await context.resume();
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  }

  /**
   * 清空所有缓存
   */
  clearAll(): void {
    this.cache.clear();
    console.log('[SpeechCache] 已清空所有缓存');
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
    };
  }
}

// 导出单例
export const speechCache = new SpeechCache();

/**
 * 带缓存的语音播放函数
 * 注意：由于 Web Speech API 的限制，真正的音频缓存需要使用服务器端 TTS
 * 这里提供的是缓存检查机制，实际播放仍使用 Web Speech API
 */
export async function speakWithCache(
  text: string,
  options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
    onEnd?: () => void;
    onError?: (error: any) => void;
  }
): Promise<void> {
  const lang = options?.lang ?? 'ja-JP';
  const rate = options?.rate ?? 0.8;

  // 检查是否有缓存（预留接口，实际需要服务器端支持）
  const cached = speechCache.getCached(text, lang, rate);
  
  if (cached) {
    try {
      await speechCache.playCached(cached);
      options?.onEnd?.();
      return;
    } catch (error) {
      console.error('[SpeechCache] 播放缓存失败，降级到 Web Speech API:', error);
    }
  }

  // 使用 Web Speech API 播放
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      const error = new Error('Speech synthesis not supported');
      options?.onError?.(error);
      reject(error);
      return;
    }

    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = options?.pitch ?? 1.0;
      utterance.volume = options?.volume ?? 1.0;

      if (options?.voice) {
        utterance.voice = options.voice;
      }

      utterance.onend = () => {
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('[SpeechCache] 语音合成错误:', event);
        options?.onError?.(event);
        reject(event);
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('[SpeechCache] 播放失败:', error);
        options?.onError?.(error);
        reject(error);
      }
    }, 100);
  });
}
