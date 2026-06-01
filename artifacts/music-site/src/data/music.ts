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
    id: "virtual-to-live",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/82/9f/c3/829fc3d8-033e-d3eb-500b-28cf55a727b3/859755220214_cover.jpg/300x300bb.webp",
    artist: "nijisanji",
    album: "Virtual to Live - Single",
    reason:
      "这首来自 2019 年彩虹社的歌曲以其全员合唱以及充满活力的活力而被选中。尽管我不是那个全盛时期的亲历者，但从这首歌中依然可以一窥当时的它带给大家的欢乐和活力。在我看来，他已经脱离了虚拟偶像的窠臼，成为了一个时期一个领域，小小的缩影。",
    listenUrl: "https://music.apple.com/cn/song/virtual-to-live/1486320016",
    listenLabel: "Listen on Apple Music",
  },
  {
    id: "cool-me-down",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/5d/99/4c/5d994c94-798f-7eff-9b49-fd31719994a9/4511820-96136.jpg/300x300bb.webp",
    artist: "Mwk、巡音ルカ",
    album: "Cool Me Down - Single",
    reason:
      "这首来自 2023 年的歌曲巧妙地结合了 Vocaloid 和电子音乐。尽管声音并非出自真人，却自有着夏日晴空一般热烈的情感和动人的力量，正如标题和整首歌反复咏唱的 Cool Me Down 一样。",
    listenUrl: "https://music.apple.com/cn/song/cool-me-down/1703764350",
    listenLabel: "Listen on Apple Music",
  },
];

export default music;
