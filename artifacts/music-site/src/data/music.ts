export interface MusicEntry {
  id: string;
  cover: string;
  artist: string;
  album: string;
  track?: string;
  reason: string;
  listenUrl: string;
  listenLabel?: string;
}

/**
 * Add your music entries here.
 *
 * - cover:       Path to your cover image. Place image files in the
 *                `public/covers/` folder and reference them as `/covers/my-album.jpg`.
 *                External URLs also work if the host allows hotlinking.
 *
 * - artist:      Artist name.
 * - album:       Album name (displayed large).
 * - track:       Optional — specific track name shown below the album.
 * - reason:      A few sentences explaining why you're presenting this.
 * - listenUrl:   Link to Spotify, Apple Music, Bandcamp, YouTube, etc.
 * - listenLabel: Button label. Defaults to "Listen Now".
 */
const music: MusicEntry[] = [
  {
    id: "radiohead-kid-a",
    cover: "https://picsum.photos/seed/kida/600/600",
    artist: "Radiohead",
    album: "Kid A",
    reason:
      "A record that dissolved the boundary between electronic and rock — cold on the surface, devastatingly human underneath. Every listen reveals a new texture buried in the noise.",
    listenUrl: "https://open.spotify.com/album/6GjwtEZcfenmOf6l18N7T7",
    listenLabel: "Listen on Spotify",
  },
  {
    id: "frank-ocean-blonde",
    cover: "https://picsum.photos/seed/blonde/600/600",
    artist: "Frank Ocean",
    album: "Blonde",
    reason:
      "Fragmented and intimate — a stream of consciousness that feels less like an album and more like recovering a stranger's diary. The silences are as important as the notes.",
    listenUrl: "https://music.apple.com/us/album/blonde/1146195596",
    listenLabel: "Listen on Apple Music",
  },
];

export default music;
