"use client";

import { useMemo, useState } from "react";
import { DECADES, DECADE_ORDER, type DecadeKey } from "@/components/musicEras";


type SongTier = "hit" | "defining" | "deepcut";
type ActiveTab = "Enter the Era" | "Modern Match" | "The Songs";

const tabs: ActiveTab[] = ["Enter the Era", "Modern Match", "The Songs"];

const songFilters: Array<"all" | SongTier> = [
  "all",
  "hit",
  "defining",
  "deepcut",
];

const songFilterLabels: Record<"all" | SongTier, string> = {
  all: "All Songs",
  hit: "Start Here",
  defining: "Shaped the Sound",
  deepcut: "Curator Picks",
};

const genreBuckets = [
  "all",
  "pop",
  "rock",
  "hiphop",
  "rnb",
  "electronic",
  "indie",
  "global",
] as const;

type GenreBucket = (typeof genreBuckets)[number];

const genreBucketLabels: Record<GenreBucket, string> = {
  all: "All Genres",
  pop: "Pop",
  rock: "Rock / Alternative",
  hiphop: "Hip-Hop / Rap",
  rnb: "R&B / Soul",
  electronic: "Electronic / Dance",
  indie: "Indie / Folk",
  global: "Latin / Global",
};

function getGenreBucket(genre: string): GenreBucket {
  const g = genre.toLowerCase();

  if (
    g.includes("hip-hop") ||
    g.includes("hip hop") ||
    g.includes("rap") ||
    g.includes("trap") ||
    g.includes("g-funk")
  ) {
    return "hiphop";
  }

  if (
    g.includes("r&b") ||
    g.includes("soul") ||
    g.includes("funk") ||
    g.includes("neo-soul")
  ) {
    return "rnb";
  }

  if (
    g.includes("rock") ||
    g.includes("grunge") ||
    g.includes("alternative") ||
    g.includes("punk") ||
    g.includes("metal") ||
    g.includes("britpop") ||
    g.includes("new wave") ||
    g.includes("post-punk")
  ) {
    return "rock";
  }

  if (
    g.includes("electronic") ||
    g.includes("dance") ||
    g.includes("disco") ||
    g.includes("edm") ||
    g.includes("synth") ||
    g.includes("trip-hop")
  ) {
    return "electronic";
  }

  if (
    g.includes("indie") ||
    g.includes("folk") ||
    g.includes("singer-songwriter") ||
    g.includes("acoustic")
  ) {
    return "indie";
  }

  if (
    g.includes("latin") ||
    g.includes("afro") ||
    g.includes("afrobeats") ||
    g.includes("reggae") ||
    g.includes("regional mexican") ||
    g.includes("k-pop") ||
    g.includes("country")
  ) {
    return "global";
  }

  return "pop";
}

export default function MusicEraTimeMachine() {
  const [selectedDecade, setSelectedDecade] = useState<DecadeKey>("1990s");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Enter the Era");
  const [songFilter, setSongFilter] = useState<"all" | SongTier>("all");
  const [genreFilter, setGenreFilter] = useState<GenreBucket>("all");
  const [bridgeIndex, setBridgeIndex] = useState(0);

  const selectedEra = DECADES[selectedDecade];

  const genreOptions = useMemo(() => {
  const bucketsInEra = selectedEra.songs.map((song) =>
    getGenreBucket(song.genre)
  );

  return genreBuckets.filter(
    (bucket) => bucket === "all" || bucketsInEra.includes(bucket)
  );
  }, [selectedEra]);

  const visibleSongs = useMemo(() => {
    return selectedEra.songs.filter((song) => {
      const matchesTier = songFilter === "all" || song.tier === songFilter;
      const matchesGenre = genreFilter === "all" || getGenreBucket(song.genre) === genreFilter;

      return matchesTier && matchesGenre;
    });
  }, [selectedEra, songFilter, genreFilter]);

  const activeBridge =
    selectedEra.bridges[bridgeIndex % selectedEra.bridges.length];

  return (
    <section
      className="mt-8 overflow-hidden rounded-3xl border text-white shadow-2xl transition-all duration-500"
      style={{
        background: selectedEra.theme.gradient,
        borderColor: selectedEra.theme.accentBorder,
        color: selectedEra.theme.text,
        fontFamily: selectedEra.theme.font,
      }}
    >
      <div className="relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative">
          <div
            className="rounded-[2rem] border p-7 md:p-10"
            style={{
              background: selectedEra.theme.heroGradient,
              borderColor: selectedEra.theme.accentBorder,
            }}
          >
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.35em]"
                style={{ color: selectedEra.theme.accent }}
              >
                Music Era Time Machine
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                {selectedEra.era.headline}
              </h2>

              <p className="mt-4 max-w-3xl text-xl font-semibold leading-8">
                {selectedEra.era.subline}
              </p>

              <p
                className="mt-5 max-w-4xl text-lg leading-8"
                style={{ color: selectedEra.theme.text }}
              >
                {selectedEra.era.description}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {DECADE_ORDER.map((decade) => {
                const decadeData = DECADES[decade];
                const isSelected = selectedDecade === decade;

                return (
                  <button
                    key={decade}
                    onClick={() => {
                      setSelectedDecade(decade);
                      setActiveTab("Enter the Era");
                      setSongFilter("all");
                      setGenreFilter("all");
                      setBridgeIndex(0);
                    }}
                    className="rounded-3xl border p-5 text-left transition hover:-translate-y-1"
                    style={{
                      backgroundColor: isSelected
                        ? selectedEra.theme.accent
                        : "rgba(255,255,255,0.06)",
                      borderColor: isSelected
                        ? selectedEra.theme.accent
                        : "rgba(255,255,255,0.14)",
                      color: isSelected
                        ? selectedEra.theme.bg
                        : selectedEra.theme.text,
                      boxShadow: isSelected
                        ? `0 20px 45px ${selectedEra.theme.accent}33`
                        : "none",
                    }}
                  >
                    <div className="text-2xl font-black">
                      {decadeData.decade}
                    </div>

                    <div
                      className="mt-2 text-xs leading-5"
                      style={{
                        color: isSelected
                          ? selectedEra.theme.bg
                          : selectedEra.theme.textMuted,
                      }}
                    >
                      {decadeData.tagline}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="rounded-full px-5 py-3 text-sm font-semibold transition"
                    style={{
                      backgroundColor: isSelected
                        ? selectedEra.theme.accent
                        : "rgba(255,255,255,0.1)",
                      color: isSelected
                        ? selectedEra.theme.bg
                        : selectedEra.theme.text,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 md:px-10">
        {activeTab === "Enter the Era" && <EnterEra era={selectedEra} />}

        {activeTab === "Modern Match" && (
          <ModernMatch
            era={selectedEra}
            activeBridge={activeBridge}
            onNextBridge={() => setBridgeIndex((current) => current + 1)}
          />
        )}

        {activeTab === "The Songs" && (
          <TheSongs
            era={selectedEra}
            visibleSongs={visibleSongs}
            songFilter={songFilter}
            setSongFilter={setSongFilter}
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            genreOptions={genreOptions}
          />
        )}
      </div>
    </section>
  );
}

function EnterEra({ era }: { era: (typeof DECADES)[DecadeKey] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div
        className="rounded-[2rem] border p-8"
        style={{
          backgroundColor: era.theme.bgCard,
          borderColor: era.theme.accentBorder,
        }}
      >
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: era.theme.accent }}
        >
          Enter the Era
        </p>

        <h3 className="mt-4 text-4xl font-black md:text-5xl">
          {era.decade}
        </h3>

        <p className="mt-4 text-2xl font-semibold">{era.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {era.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border px-4 py-2 text-sm"
              style={{
                backgroundColor: era.theme.accentDim,
                borderColor: era.theme.accentBorder,
                color: era.theme.text,
              }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div
        className="rounded-[2rem] border p-8"
        style={{
          backgroundColor: era.theme.bgCard,
          borderColor: era.theme.accentBorder,
        }}
      >
        <p
          className="text-sm font-semibold uppercase tracking-[0.25em]"
          style={{ color: era.theme.accent }}
        >
          Defining Album
        </p>

        <h3 className="mt-4 text-3xl font-black">
          {era.definingAlbum.title}
        </h3>

        <p className="mt-2" style={{ color: era.theme.textMuted }}>
          {era.definingAlbum.artist}, {era.definingAlbum.year}
        </p>

        <p className="mt-5 leading-7">{era.definingAlbum.why}</p>
      </div>

      <div className="lg:col-span-2">
        <h3 className="mb-5 text-2xl font-black">The Cultural Moment</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {era.culturalMoments.map((moment) => (
            <div
              key={moment.title}
              className="rounded-3xl border p-6"
              style={{
                backgroundColor: era.theme.bgCard,
                borderColor: era.theme.accentBorder,
              }}
            >
              <h4 className="text-xl font-bold">{moment.title}</h4>
              <p
                className="mt-3 leading-7"
                style={{ color: era.theme.textMuted }}
              >
                {moment.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ShareEraCard era={era} />
    </div>
  );
}

function ModernMatch({
  era,
  activeBridge,
  onNextBridge,
}: {
  era: (typeof DECADES)[DecadeKey];
  activeBridge: (typeof DECADES)[DecadeKey]["bridges"][number];
  onNextBridge: () => void;
}) {
  return (
    <div>
      <div
        className="rounded-[2rem] border p-8"
        style={{
          backgroundColor: era.theme.bgCard,
          borderColor: era.theme.accentBorder,
        }}
      >
        <p
          className="text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: era.theme.accent }}
        >
          Modern Match
        </p>

        <h3 className="mt-4 text-4xl font-black">
          If you loved this then, try this now.
        </h3>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div
            className="rounded-3xl border p-6"
            style={{
              backgroundColor: "rgba(0,0,0,0.25)",
              borderColor: era.theme.accentBorder,
            }}
          >
            <p
              className="text-sm uppercase tracking-[0.25em]"
              style={{ color: era.theme.textMuted }}
            >
              Then
            </p>
            <h4 className="mt-3 text-3xl font-black">
              {activeBridge.then}
            </h4>
          </div>

          <div
            className="text-center text-4xl font-black"
            style={{ color: era.theme.accent }}
          >
            →
          </div>

          <div
            className="rounded-3xl p-6"
            style={{
              backgroundColor: era.theme.accent,
              color: era.theme.bg,
            }}
          >
            <p className="text-sm uppercase tracking-[0.25em] opacity-70">
              Now
            </p>
            <h4 className="mt-3 text-3xl font-black">{activeBridge.now}</h4>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xl font-semibold">
          {activeBridge.why}
        </p>

        <button
          onClick={onNextBridge}
          className="mt-8 rounded-full px-6 py-3 font-bold transition hover:scale-[1.02]"
          style={{
            backgroundColor: era.theme.accent,
            color: era.theme.bg,
          }}
        >
          Reveal another match
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {era.bridges.map((bridge) => (
          <div
            key={`${bridge.then}-${bridge.now}`}
            className="rounded-3xl border p-6 transition hover:-translate-y-1"
            style={{
              backgroundColor: era.theme.bgCard,
              borderColor: era.theme.accentBorder,
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-xl font-black">{bridge.then}</h4>
              <span style={{ color: era.theme.accent }}>→</span>
              <h4 className="text-xl font-black">{bridge.now}</h4>
            </div>

            <p className="mt-3 text-sm" style={{ color: era.theme.textMuted }}>
              {bridge.why}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheSongs({
  era,
  visibleSongs,
  songFilter,
  setSongFilter,
  genreFilter,
  setGenreFilter,
  genreOptions,
}: {
  era: (typeof DECADES)[DecadeKey];
  visibleSongs: (typeof DECADES)[DecadeKey]["songs"];
  songFilter: "all" | SongTier;
  setSongFilter: (filter: "all" | SongTier) => void;
  genreFilter: GenreBucket;
  setGenreFilter: (genre: GenreBucket) => void;
  genreOptions: GenreBucket[];
}) {
  return (
    <div>
      <div className="mb-6 space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.3em]"
              style={{ color: era.theme.accent }}
            >
              The Songs
            </p>

            <h3 className="mt-3 text-4xl font-black">
              Songs that defined the {era.decade}
            </h3>

            <p className="mt-3 text-sm" style={{ color: era.theme.textMuted }}>
              Showing {visibleSongs.length} songs
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {songFilters.map((filter) => {
              const isSelected = songFilter === filter;

              return (
                <button
                  key={filter}
                  onClick={() => setSongFilter(filter)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{
                    backgroundColor: isSelected
                      ? era.theme.accent
                      : "rgba(255,255,255,0.1)",
                    color: isSelected ? era.theme.bg : era.theme.text,
                  }}
                >
                  {songFilterLabels[filter]}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-3xl border p-4"
          style={{
            backgroundColor: era.theme.bgCard,
            borderColor: era.theme.accentBorder,
          }}
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: era.theme.textMuted }}
          >
            Filter by genre
          </p>

          <div className="flex flex-wrap gap-2">
            {genreOptions.map((genre) => {
              const isSelected = genreFilter === genre;

              return (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className="rounded-full px-4 py-2 text-xs font-semibold transition"
                  style={{
                    backgroundColor: isSelected
                      ? era.theme.accent
                      : "rgba(255,255,255,0.08)",
                    color: isSelected ? era.theme.bg : era.theme.text,
                    border: `1px solid ${
                      isSelected ? era.theme.accent : era.theme.accentBorder
                    }`,
                  }}
                >
                  {genre === "all" ? "All Genres" : genre}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {visibleSongs.length === 0 && (
        <div
          className="rounded-3xl border p-8 text-center"
          style={{
            backgroundColor: era.theme.bgCard,
            borderColor: era.theme.accentBorder,
          }}
        >
          <h4 className="text-2xl font-black">No songs found</h4>
          <p className="mt-3" style={{ color: era.theme.textMuted }}>
            Try changing the song type or genre filter.
          </p>
        </div>
      )}

      {visibleSongs.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleSongs.map((song) => (
            <article
              key={`${song.rank}-${song.title}-${song.artist}`}
              className="rounded-3xl border p-6 transition hover:-translate-y-1"
              style={{
                backgroundColor: era.theme.bgCard,
                borderColor: era.theme.accentBorder,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl font-black">{song.title}</h4>
                  <p className="mt-1" style={{ color: era.theme.textMuted }}>
                    {song.artist} · {song.year}
                  </p>
                </div>

                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: era.theme.accentDim,
                    color: era.theme.accent,
                  }}
                >
                  {songFilterLabels[song.tier as SongTier]}
                </span>
              </div>

              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: era.theme.accent }}
              >
                {song.genre}
              </p>

              <p className="mt-3 leading-7">{song.why}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {song.mood.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.25)",
                      color: era.theme.textMuted,
                    }}
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ShareEraCard({ era }: { era: (typeof DECADES)[DecadeKey] }) {
  const topSongs = era.songs.slice(0, 3).map((song) => song.title);

  return (
    <div
      className="lg:col-span-2 rounded-[2rem] border p-8"
      style={{
        backgroundColor: era.theme.accent,
        color: era.theme.bg,
        borderColor: era.theme.accent,
      }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-60">
        Shareable Era Card
      </p>

      <h3 className="mt-4 text-4xl font-black">
        My music era is the {era.decade}
      </h3>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">
            The Sound
          </p>
          <p className="mt-2 font-semibold">{era.genres.slice(0, 5).join(" · ")}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">
            The Songs
          </p>
          <p className="mt-2 font-semibold">{topSongs.join(" · ")}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">
            The Vibe
          </p>
          <p className="mt-2 font-semibold">{era.tagline}</p>
        </div>
      </div>
    </div>
  );
}