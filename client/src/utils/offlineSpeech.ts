/**
 * 离线语音支持
 * 使用预录音频文件作为降级方案
 */

interface AudioCache {
  [key: string]: HTMLAudioElement;
}

class OfflineSpeechManager {
  private audioCache: AudioCache = {};
  private audioBasePath: string = '/audio/ja'; // 音频文件基础路径
  private isLoading: Map<string, Promise<HTMLAudioElement>> = new Map();

  /**
   * 生成音频文件名（基于文本哈希或预定义映射）
   */
  private getAudioFileName(text: string): string {
    // 这里使用预定义的映射表
    // 实际使用时需要为常用短语预录音频文件
    const audioMap: { [key: string]: string } = {
      // 景点名称
      '雷門': 'kaminarimon.mp3',
      '浅草寺': 'sensoji.mp3',
      '仲見世通り': 'nakamise.mp3',
      '浅草花月堂': 'kagetsu-do.mp3',
      '隅田公園': 'sumida-park.mp3',
      '吾妻橋': 'azuma-bridge.mp3',
      '東京スカイツリー': 'tokyo-skytree.mp3',
      '上野公園': 'ueno-park.mp3',
      '渋谷': 'shibuya.mp3',
      '原宿': 'harajuku.mp3',
      '新宿': 'shinjuku.mp3',
      '銀座': 'ginza.mp3',
      '秋葉原': 'akihabara.mp3',
      '富士山': 'fujisan.mp3',
      
      // 常用短语
      'こんにちは': 'konnichiwa.mp3',
      'ありがとう': 'arigatou.mp3',
      'すみません': 'sumimasen.mp3',
      'いただきます': 'itadakimasu.mp3',
      'ごちそうさま': 'gochisousama.mp3',
    };

    return audioMap[text] || null;
  }

  /**
   * 预加载音频文件
   */
  async preloadAudio(text: string): Promise<HTMLAudioElement | null> {
    const fileName = this.getAudioFileName(text);
    if (!fileName) {
      return null;
    }

    // 如果已经在缓存中，直接返回
    if (this.audioCache[text]) {
      return this.audioCache[text];
    }

    // 如果正在加载，返回加载中的 Promise
    if (this.isLoading.has(text)) {
      return this.isLoading.get(text)!;
    }

    // 开始加载
    const loadPromise = new Promise<HTMLAudioElement>((resolve, reject) => {
      const audio = new Audio();
      const audioPath = `${this.audioBasePath}/${fileName}`;

      audio.addEventListener('canplaythrough', () => {
        this.audioCache[text] = audio;
        this.isLoading.delete(text);
        console.log('[OfflineSpeech] 音频加载成功:', text);
        resolve(audio);
      }, { once: true });

      audio.addEventListener('error', (error) => {
        this.isLoading.delete(text);
        console.error('[OfflineSpeech] 音频加载失败:', text, error);
        reject(error);
      }, { once: true });

      audio.src = audioPath;
      audio.load();
    });

    this.isLoading.set(text, loadPromise);
    return loadPromise;
  }

  /**
   * 播放离线音频
   */
  async playOfflineAudio(text: string): Promise<boolean> {
    try {
      let audio = this.audioCache[text];
      
      if (!audio) {
        audio = await this.preloadAudio(text);
      }

      if (!audio) {
        return false;
      }

      // 重置播放位置
      audio.currentTime = 0;
      
      // 播放音频
      await audio.play();
      console.log('[OfflineSpeech] 播放离线音频:', text);
      return true;
    } catch (error) {
      console.error('[OfflineSpeech] 播放失败:', text, error);
      return false;
    }
  }

  /**
   * 检查是否有离线音频可用
   */
  hasOfflineAudio(text: string): boolean {
    return this.getAudioFileName(text) !== null;
  }

  /**
   * 批量预加载常用音频
   */
  async preloadCommonAudios(texts: string[]): Promise<void> {
    console.log('[OfflineSpeech] 开始预加载常用音频...');
    const promises = texts.map(text => 
      this.preloadAudio(text).catch(err => {
        console.warn('[OfflineSpeech] 预加载失败:', text, err);
        return null;
      })
    );
    await Promise.all(promises);
    console.log('[OfflineSpeech] 预加载完成');
  }

  /**
   * 清空音频缓存
   */
  clearCache(): void {
    Object.values(this.audioCache).forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.audioCache = {};
    console.log('[OfflineSpeech] 已清空音频缓存');
  }

  /**
   * 获取缓存统计
   */
  getCacheStats(): { cached: number; loading: number } {
    return {
      cached: Object.keys(this.audioCache).length,
      loading: this.isLoading.size,
    };
  }
}

// 导出单例
export const offlineSpeechManager = new OfflineSpeechManager();

/**
 * 智能语音播放函数
 * 优先使用离线音频，降级到 Web Speech API
 */
export async function speakWithFallback(
  text: string,
  options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
    onEnd?: () => void;
    onError?: (error: any) => void;
    forceOnline?: boolean; // 强制使用在线语音
  }
): Promise<void> {
  // 如果强制使用在线语音，跳过离线音频
  if (!options?.forceOnline) {
    // 尝试播放离线音频
    const offlineSuccess = await offlineSpeechManager.playOfflineAudio(text);
    if (offlineSuccess) {
      options?.onEnd?.();
      return;
    }
  }

  // 降级到 Web Speech API
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      const error = new Error('Speech synthesis not supported and no offline audio available');
      options?.onError?.(error);
      reject(error);
      return;
    }

    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang ?? 'ja-JP';
      utterance.rate = options?.rate ?? 0.8;
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
        console.error('[SpeakWithFallback] 语音合成错误:', event);
        options?.onError?.(event);
        reject(event);
      };

      try {
        window.speechSynthesis.speak(utterance);
        console.log('[SpeakWithFallback] 使用 Web Speech API 播放:', text);
      } catch (error) {
        console.error('[SpeakWithFallback] 播放失败:', error);
        options?.onError?.(error);
        reject(error);
      }
    }, 100);
  });
}

/**
 * 预加载常用景点名称的音频
 */
export function preloadCommonSpotAudios(): void {
  const commonSpots = [
    '雷門',
    '浅草寺',
    '仲見世通り',
    '浅草花月堂',
    '隅田公園',
    '吾妻橋',
    '東京スカイツリー',
    '上野公園',
    '渋谷',
    '原宿',
    '新宿',
    '銀座',
    '秋葉原',
    '富士山',
  ];

  offlineSpeechManager.preloadCommonAudios(commonSpots);
}
