import MusicCard from "@/components/MusicCard";
import music from "@/data/music";

export default function Home() {
  return (
    <div className="site-root">
      <header className="site-header">
        <span className="site-logo">♪</span>
        <span className="site-title">Music Worth Hearing</span>
      </header>

      <main className="cards-list">
        {music.map((entry) => (
          <MusicCard key={entry.id} entry={entry} />
        ))}
      </main>

      <footer className="site-footer">
        <p>Curated with care.</p>
      </footer>
    </div>
  );
}
