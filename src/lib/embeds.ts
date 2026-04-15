export const getYouTubeEmbedUrl = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);

    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v') ?? url.pathname.split('/').filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

export const getInstagramEmbedUrl = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);
    const cleanedPath = url.pathname.replace(/\/$/, '');
    return `https://www.instagram.com${cleanedPath}/embed/captioned`;
  } catch {
    return null;
  }
};

export const getEmbedUrl = (platform: 'youtube' | 'instagram', rawUrl: string): string | null =>
  platform === 'youtube' ? getYouTubeEmbedUrl(rawUrl) : getInstagramEmbedUrl(rawUrl);
