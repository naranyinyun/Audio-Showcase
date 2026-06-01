import { useState, useEffect } from "react";

export interface ExtractedPalette {
  dominant: [number, number, number];
  muted: [number, number, number];
  vibrant: [number, number, number];
}

function toHSL(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0, h = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function samplePixels(data: Uint8ClampedArray, sampleRate = 4): [number, number, number][] {
  const pixels: [number, number, number][] = [];
  for (let i = 0; i < data.length; i += 4 * sampleRate) {
    const a = data[i + 3];
    if (a < 128) continue;
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  return pixels;
}

function kMeans(pixels: [number, number, number][], k = 6, iters = 10): [number, number, number][] {
  if (pixels.length === 0) return Array(k).fill([20, 20, 20]);
  const step = Math.max(1, Math.floor(pixels.length / k));
  const centers: [number, number, number][] = Array.from({ length: k }, (_, i) => [...pixels[i * step]] as [number, number, number]);

  for (let t = 0; t < iters; t++) {
    const clusters: [number, number, number][][] = Array.from({ length: k }, () => []);
    for (const px of pixels) {
      let best = 0, bestDist = Infinity;
      for (let c = 0; c < k; c++) {
        const dr = px[0] - centers[c][0], dg = px[1] - centers[c][1], db = px[2] - centers[c][2];
        const d = dr * dr + dg * dg + db * db;
        if (d < bestDist) { bestDist = d; best = c; }
      }
      clusters[best].push(px);
    }
    for (let c = 0; c < k; c++) {
      if (!clusters[c].length) continue;
      const n = clusters[c].length;
      centers[c] = [
        Math.round(clusters[c].reduce((s, p) => s + p[0], 0) / n),
        Math.round(clusters[c].reduce((s, p) => s + p[1], 0) / n),
        Math.round(clusters[c].reduce((s, p) => s + p[2], 0) / n),
      ];
    }
  }
  return centers;
}

function buildPalette(centers: [number, number, number][]): ExtractedPalette {
  const withHSL = centers.map(rgb => ({ rgb, hsl: toHSL(rgb[0], rgb[1], rgb[2]) }));
  const bySat = [...withHSL].sort((a, b) => b.hsl[1] - a.hsl[1]);
  const byLum = [...withHSL].sort((a, b) => a.hsl[2] - b.hsl[2]);
  return {
    dominant: byLum[0]?.rgb ?? [15, 15, 15],
    vibrant: bySat[0]?.rgb ?? [100, 80, 200],
    muted: bySat[Math.floor(bySat.length / 2)]?.rgb ?? [60, 60, 70],
  };
}

const DEFAULT: ExtractedPalette = { dominant: [15, 15, 15], muted: [50, 50, 65], vibrant: [100, 80, 200] };

function extractFromImage(src: string): Promise<ExtractedPalette> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const fallback = () => {
      // If CORS blocked, try without crossOrigin (may still work on same-origin or open CORS images)
      const img2 = new Image();
      img2.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 64; canvas.height = 64;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img2, 0, 0, 64, 64);
          const { data } = ctx.getImageData(0, 0, 64, 64);
          const pixels = samplePixels(data);
          resolve(buildPalette(kMeans(pixels)));
        } catch {
          resolve(DEFAULT);
        }
      };
      img2.onerror = () => resolve(DEFAULT);
      img2.src = src;
    };

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, 64, 64);
        const { data } = ctx.getImageData(0, 0, 64, 64);
        const pixels = samplePixels(data);
        resolve(buildPalette(kMeans(pixels)));
      } catch {
        fallback();
      }
    };
    img.onerror = () => fallback();
    img.src = src;
  });
}

export function useColorExtractor(src: string): { palette: ExtractedPalette | null; loading: boolean } {
  const [palette, setPalette] = useState<ExtractedPalette | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) return;
    setLoading(true);
    setPalette(null);
    extractFromImage(src).then((p) => {
      setPalette(p);
      setLoading(false);
    });
  }, [src]);

  return { palette, loading };
}

export function paletteToVars(palette: ExtractedPalette): Record<string, string> {
  const [dh, ds, dl] = toHSL(...palette.dominant);
  const [vh, vs, vl] = toHSL(...palette.vibrant);
  const [mh, ms] = toHSL(...palette.muted);

  const bgL = Math.min(dl, 11);
  const fgL = 93;

  return {
    "--c-bg":      `hsl(${dh}, ${Math.max(ds, 10)}%, ${bgL}%)`,
    "--c-bg-2":    `hsl(${dh}, ${Math.max(ds - 4, 6)}%, ${Math.min(bgL + 7, 18)}%)`,
    "--c-accent":  `hsl(${vh}, ${Math.max(vs, 50)}%, ${Math.min(Math.max(vl, 48), 68)}%)`,
    "--c-muted":   `hsl(${mh}, ${Math.max(ms - 8, 5)}%, 40%)`,
    "--c-fg":      `hsl(${dh}, 8%, ${fgL}%)`,
    "--c-fg-dim":  `hsl(${dh}, 6%, 52%)`,
    "--c-border":  `hsl(${dh}, ${Math.max(ds - 12, 6)}%, ${Math.min(bgL + 14, 24)}%)`,
  };
}
