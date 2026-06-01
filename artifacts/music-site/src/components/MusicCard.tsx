import { useEffect, useRef } from "react";
import { useColorExtractor, paletteToVars } from "@/hooks/useColorExtractor";
import type { MusicEntry } from "@/data/music";

interface Props {
  entry: MusicEntry;
}

export default function MusicCard({ entry }: Props) {
  const { palette } = useColorExtractor(entry.cover);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!palette || !cardRef.current) return;
    const vars = paletteToVars(palette);
    for (const [k, v] of Object.entries(vars)) {
      cardRef.current.style.setProperty(k, v);
    }
  }, [palette]);

  return (
    <article
      ref={cardRef}
      className="music-card"
      style={{
        "--c-bg": "hsl(0,0%,6%)",
        "--c-bg-2": "hsl(0,0%,10%)",
        "--c-accent": "hsl(250,60%,60%)",
        "--c-muted": "hsl(0,0%,35%)",
        "--c-fg": "hsl(0,0%,94%)",
        "--c-fg-dim": "hsl(0,0%,60%)",
        "--c-border": "hsl(0,0%,18%)",
      } as React.CSSProperties}
    >
      <div className="card-inner">
        <div className="cover-col">
          <div className="cover-wrap">
            <img
              src={entry.cover}
              alt={`${entry.album} by ${entry.artist}`}
              className="cover-img"
              loading="lazy"
            />
            <div className="cover-glow" />
          </div>
        </div>

        <div className="info-col">
          <div className="meta">
            <span className="label-tag">NOW PRESENTING</span>
          </div>

          <div className="title-block">
            <h2 className="album-name">{entry.album}</h2>
            {entry.track && <p className="track-name">{entry.track}</p>}
            <p className="artist-name">{entry.artist}</p>
          </div>

          <div className="divider" />

          <div className="reason-block">
            <p className="reason-label">WHY THIS ALBUM</p>
            <p className="reason-text">{entry.reason}</p>
          </div>

          <div className="listen-block">
            <a
              href={entry.listenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="listen-btn"
            >
              <span className="listen-icon">▶</span>
              {entry.listenLabel ?? "Listen Now"}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
