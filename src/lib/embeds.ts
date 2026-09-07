export const getYouTubeVideoId = (rawUrl: string): string | null => {
  try {
    const url = new URL(rawUrl);

    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (url.hostname.includes('youtube.com')) {
      return url.searchParams.get('v') ?? url.pathname.split('/').filter(Boolean).pop() ?? null;
    }
  } catch {
    return null;
  }

  return null;
};

export const isYouTubeShort = (rawUrl: string): boolean => {
  try {
    return new URL(rawUrl).pathname.includes('/shorts/');
  } catch {
    return false;
  }
};

// Shorts only have a portrait frame under oardefault; hqdefault/sddefault return
// the same shot letterboxed into 4:3, which crops badly in a 9:16 box.
export const getYouTubePosterUrl = (rawUrl: string): string | undefined => {
  const id = getYouTubeVideoId(rawUrl);
  if (!id) return undefined;

  return `https://i.ytimg.com/vi/${id}/${
    isYouTubeShort(rawUrl) ? 'oardefault' : 'maxresdefault'
  }.jpg`;
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
