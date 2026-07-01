"use client";

import { useMemo, useState } from "react";

type SongGroup = "Start Here" | "Shaped the Sound" | "Curator Picks";

type EraSong = {
  title: string;
  artist: string;
  year: number | string;
  group: SongGroup;
  genre: string;
  moods: string[];
  note: string;
};

type CulturalMoment = {
  title: string;
  text: string;
};

type ThenNowBridge = {
  thenArtist: string;
  nowArtist: string;
  bridgeLine: string;
  reason: string;
  tags: string[];
};

type MusicEra = {
  id: string;
  decade: string;
  years: string;
  tagline: string;
  colorTheme: {
  name: string;
  texture: string;
  from: string;
  via: string;
  to: string;
  accent: string;
};
  genres: string[];
  heroSummary: string;
  songs: EraSong[];
  culturalMoments: CulturalMoment[];
  thenNowBridges: ThenNowBridge[];
  definingAlbum: {
    title: string;
    artist: string;
    year: number | string;
    note: string;
  };
  shareCard: {
    headline: string;
    sound: string[];
    songs: string[];
    vibe: string;
  };
};

const musicEras: MusicEra[] = [
  {
    id: "1970s",
    decade: "1970s",
    years: "1970–1979",
    tagline: "Disco lights, arena rock, punk attitude, and soul power.",
    colorTheme: {
      name: "Vinyl Gold",
      texture: "Disco ball reflections, vinyl sleeves, warm film grain",
      from: "#2a1600",
      via: "#7c2d12",
      to: "#facc15",
      accent: "#facc15",
    },
    genres: [
      "Disco",
      "Funk",
      "Soul",
      "Punk",
      "Classic Rock",
      "Singer-Songwriter",
      "Reggae",
      "Early Electronic",
    ],
    heroSummary:
      "The 70s were loud, stylish, rebellious, and deeply musical. Disco took over dance floors, funk made rhythm the star, punk rejected polish, and classic rock filled arenas. It was a decade where music scenes felt physical: clubs, vinyl records, radio, and live concerts shaped the culture.",
    songs: [
      {
        title: "Stayin' Alive",
        artist: "Bee Gees",
        year: 1977,
        group: "Start Here",
        genre: "Disco",
        moods: ["iconic", "dancefloor", "swagger"],
        note: "One of the defining disco records of the decade.",
      },
      {
        title: "Superstition",
        artist: "Stevie Wonder",
        year: 1972,
        group: "Start Here",
        genre: "Funk / Soul",
        moods: ["groovy", "sharp", "timeless"],
        note: "A perfect mix of funk rhythm, soul vocals, and unforgettable keyboard riffs.",
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        year: 1976,
        group: "Start Here",
        genre: "Classic Rock",
        moods: ["cinematic", "mysterious", "sunset"],
        note: "A polished, mythic rock song that still defines 70s radio nostalgia.",
      },
      {
        title: "Blitzkrieg Bop",
        artist: "Ramones",
        year: 1976,
        group: "Shaped the Sound",
        genre: "Punk",
        moods: ["fast", "raw", "rebellious"],
        note: "A punk blueprint: short, loud, simple, and impossible to ignore.",
      },
      {
        title: "I Feel Love",
        artist: "Donna Summer",
        year: 1977,
        group: "Shaped the Sound",
        genre: "Electronic Disco",
        moods: ["futuristic", "hypnotic", "sleek"],
        note: "A futuristic dance record that pointed toward electronic music’s future.",
      },
      {
        title: "Marquee Moon",
        artist: "Television",
        year: 1977,
        group: "Curator Picks",
        genre: "Art Punk",
        moods: ["angular", "cool", "downtown"],
        note: "A cult classic from the New York art-punk scene.",
      },
    ],
    culturalMoments: [
      {
        title: "Disco became a lifestyle",
        text: "Clubs, fashion, nightlife, and dance culture helped disco become more than a genre.",
      },
      {
        title: "Punk rejected polish",
        text: "Punk bands made music feel raw, fast, political, and accessible.",
      },
      {
        title: "Arena rock got huge",
        text: "Rock bands turned concerts into massive shared experiences.",
      },
      {
        title: "Vinyl defined discovery",
        text: "Album art, record stores, and full-length listening shaped how fans experienced music.",
      },
    ],
    thenNowBridges: [
      {
        thenArtist: "Stevie Wonder",
        nowArtist: "Anderson .Paak",
        bridgeLine: "Soul, groove, musicianship, and joy.",
        reason:
          "Both make rhythm feel alive while blending soul, funk, pop, and personality.",
        tags: ["soul", "funk", "groove", "musicianship"],
      },
      {
        thenArtist: "Donna Summer",
        nowArtist: "Dua Lipa",
        bridgeLine: "Dance-pop built for the lights.",
        reason:
          "Both channel disco energy into sleek, stylish pop built around movement.",
        tags: ["disco", "dance-pop", "glossy", "nightlife"],
      },
    ],
    definingAlbum: {
      title: "Songs in the Key of Life",
      artist: "Stevie Wonder",
      year: 1976,
      note: "A massive, joyful, and ambitious album that captured the musical range of the decade.",
    },
    shareCard: {
      headline: "My music era is the 1970s",
      sound: ["Disco", "Funk", "Soul", "Punk", "Classic Rock"],
      songs: ["Stayin' Alive", "Superstition", "Hotel California"],
      vibe: "Vinyl records, disco balls, arena shows, punk clubs, and golden-hour guitar solos.",
    },
  },

  {
    id: "1980s",
    decade: "1980s",
    years: "1980–1989",
    tagline: "Synths, neon, MTV, stadium pop, and larger-than-life icons.",
    colorTheme: {
      name: "Neon Chrome",
      texture: "VHS glow, arcade lights, leather jackets, synth grids",
      from: "#111827",
      via: "#7e22ce",
      to: "#06b6d4",
      accent: "#22d3ee",
    },
    genres: [
      "Synth-Pop",
      "New Wave",
      "Pop",
      "Hair Metal",
      "Hip-Hop",
      "Post-Punk",
      "R&B",
      "Dance",
    ],
    heroSummary:
      "The 80s made music visual. MTV turned artists into icons, synthesizers changed pop forever, hip-hop grew from a movement into a force, and stadium-sized choruses became the sound of ambition. Everything felt brighter, bigger, and more dramatic.",
    songs: [
      {
        title: "Billie Jean",
        artist: "Michael Jackson",
        year: 1982,
        group: "Start Here",
        genre: "Pop / R&B",
        moods: ["sleek", "iconic", "moonwalk"],
        note: "A perfect pop record and one of the most recognizable basslines ever.",
      },
      {
        title: "Like a Virgin",
        artist: "Madonna",
        year: 1984,
        group: "Start Here",
        genre: "Pop",
        moods: ["provocative", "glossy", "star-making"],
        note: "A defining moment in the rise of Madonna as a pop-cultural force.",
      },
      {
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        year: 1987,
        group: "Start Here",
        genre: "Rock",
        moods: ["anthemic", "romantic", "guitar hero"],
        note: "One of the decade’s most famous rock anthems.",
      },
      {
        title: "Blue Monday",
        artist: "New Order",
        year: 1983,
        group: "Shaped the Sound",
        genre: "Synth-Pop / Dance",
        moods: ["mechanical", "cool", "club"],
        note: "A bridge between post-punk, dance music, and electronic pop.",
      },
      {
        title: "The Message",
        artist: "Grandmaster Flash & The Furious Five",
        year: 1982,
        group: "Shaped the Sound",
        genre: "Hip-Hop",
        moods: ["street-level", "serious", "historic"],
        note: "A landmark hip-hop record that showed rap could be social commentary.",
      },
      {
        title: "Running Up That Hill",
        artist: "Kate Bush",
        year: 1985,
        group: "Curator Picks",
        genre: "Art Pop",
        moods: ["dramatic", "strange", "emotional"],
        note: "An art-pop masterpiece that still sounds futuristic.",
      },
    ],
    culturalMoments: [
      {
        title: "MTV changed everything",
        text: "Music videos became central to stardom. Image, choreography, fashion, and storytelling became part of the song.",
      },
      {
        title: "Pop stars became global icons",
        text: "Michael Jackson, Madonna, Prince, and others turned pop into worldwide spectacle.",
      },
      {
        title: "Synths took over",
        text: "Electronic textures moved from experimental edges into the center of mainstream pop.",
      },
      {
        title: "Hip-hop found its voice",
        text: "The decade helped move hip-hop from block parties toward national cultural influence.",
      },
    ],
    thenNowBridges: [
      {
        thenArtist: "Madonna",
        nowArtist: "Lady Gaga",
        bridgeLine: "Pop as image, performance, and reinvention.",
        reason:
          "Both understand pop as a full visual and cultural universe, not just songs.",
        tags: ["pop", "performance", "reinvention", "visual"],
      },
      {
        thenArtist: "Kate Bush",
        nowArtist: "Florence + The Machine",
        bridgeLine: "Theatrical emotion and art-pop drama.",
        reason:
          "Both make pop feel mystical, emotional, and larger than ordinary life.",
        tags: ["art-pop", "dramatic", "emotional", "theatrical"],
      },
    ],
    definingAlbum: {
      title: "Thriller",
      artist: "Michael Jackson",
      year: 1982,
      note: "The blockbuster album that turned pop into a global multimedia event.",
    },
    shareCard: {
      headline: "My music era is the 1980s",
      sound: ["Synth-Pop", "New Wave", "Pop", "Rock", "Early Hip-Hop"],
      songs: ["Billie Jean", "Like a Virgin", "Blue Monday"],
      vibe: "MTV premieres, neon lights, cassette tapes, dance floors, and giant choruses.",
    },
  },

  {
    id: "1990s",
    decade: "1990s",
    years: "1990–1999",
    tagline: "The last decade before the internet changed everything.",
    colorTheme: {
      name: "MTV Static",
      texture: "CD reflections, magazine collage, VHS static",
      from: "#020617",
      via: "#312e81",
      to: "#0891b2",
      accent: "#67e8f9",
    },
    genres: [
      "Grunge / Alternative Rock",
      "Golden Age Hip-Hop",
      "R&B / Neo-Soul",
      "Britpop",
      "TRL Pop",
      "Electronic / Trip-Hop",
      "Country Crossover",
      "Latin Pop",
    ],
    heroSummary:
      "The 90s were the last great pre-streaming decade: CDs, MTV, radio, movie soundtracks, and early internet chaos shaped what everyone heard. Grunge made rock raw again, hip-hop became a dominant cultural force, R&B entered a golden age, and teen pop exploded by the end of the decade.",
    songs: [
      {
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        year: 1991,
        group: "Start Here",
        genre: "Grunge",
        moods: ["generational explosion", "teen angst", "raw"],
        note: "The song that made grunge feel like a global youth movement.",
      },
      {
        title: "...Baby One More Time",
        artist: "Britney Spears",
        year: 1998,
        group: "Start Here",
        genre: "Pop",
        moods: ["teen pop peak", "glossy", "TRL queen"],
        note: "The song that announced the late-90s teen pop takeover.",
      },
      {
        title: "Waterfalls",
        artist: "TLC",
        year: 1995,
        group: "Start Here",
        genre: "R&B",
        moods: ["cautionary", "lush", "socially conscious"],
        note: "A smooth R&B-pop classic with a serious message and unforgettable video.",
      },
      {
        title: "Wonderwall",
        artist: "Oasis",
        year: 1995,
        group: "Start Here",
        genre: "Britpop",
        moods: ["romantic", "singalong", "nostalgic"],
        note: "The Britpop anthem that became a global shorthand for 90s guitar nostalgia.",
      },
      {
        title: "No Scrubs",
        artist: "TLC",
        year: 1999,
        group: "Start Here",
        genre: "R&B",
        moods: ["sharp", "unapologetic", "attitude"],
        note: "A late-90s R&B anthem that turned rejection into a cultural catchphrase.",
      },
      {
        title: "California Love",
        artist: "2Pac ft. Dr. Dre",
        year: 1995,
        group: "Shaped the Sound",
        genre: "West Coast Hip-Hop",
        moods: ["party anthem", "sunset drive", "swagger"],
        note: "A West Coast anthem that captured hip-hop’s mainstream dominance.",
      },
      {
        title: "Doo Wop (That Thing)",
        artist: "Lauryn Hill",
        year: 1998,
        group: "Shaped the Sound",
        genre: "Neo-Soul / Hip-Hop",
        moods: ["sharp", "beautiful", "wise"],
        note: "A brilliant fusion of hip-hop, soul, and moral clarity from one of the decade’s defining voices.",
      },
      {
        title: "Say My Name",
        artist: "Destiny's Child",
        year: 1999,
        group: "Shaped the Sound",
        genre: "R&B",
        moods: ["suspicious", "flawless", "cool"],
        note: "A precise, futuristic R&B record that pointed directly toward the 2000s.",
      },
      {
        title: "Unfinished Sympathy",
        artist: "Massive Attack",
        year: 1991,
        group: "Shaped the Sound",
        genre: "Trip-Hop",
        moods: ["cinematic", "weightless", "haunting"],
        note: "A defining trip-hop song that made electronic music feel soulful and widescreen.",
      },
      {
        title: "Nuthin' But a G Thang",
        artist: "Dr. Dre ft. Snoop Dogg",
        year: 1992,
        group: "Shaped the Sound",
        genre: "G-Funk",
        moods: ["laid-back", "cool", "cruising"],
        note: "A smooth West Coast blueprint that shaped early-90s hip-hop.",
      },
      {
        title: "Creep",
        artist: "Radiohead",
        year: 1992,
        group: "Curator Picks",
        genre: "Alternative Rock",
        moods: ["self-loathing", "universal", "explosive"],
        note: "A misfit anthem that turned alienation into a stadium-sized chorus.",
      },
      {
        title: "Brown Sugar",
        artist: "D'Angelo",
        year: 1995,
        group: "Curator Picks",
        genre: "Neo-Soul",
        moods: ["warm", "sensual", "smoky"],
        note: "A key neo-soul record that made R&B feel organic, intimate, and deeply cool.",
      },
      {
        title: "Fade Into You",
        artist: "Mazzy Star",
        year: 1993,
        group: "Curator Picks",
        genre: "Dream Pop",
        moods: ["hazy", "romantic", "late night"],
        note: "A dream-pop classic that became the sound of quiet longing.",
      },
      {
        title: "Can I Kick It?",
        artist: "A Tribe Called Quest",
        year: 1990,
        group: "Curator Picks",
        genre: "Jazz Rap",
        moods: ["cool", "playful", "laid-back"],
        note: "An early-90s hip-hop classic with effortless cool and jazz-soaked charm.",
      },
      {
        title: "Rebel Girl",
        artist: "Bikini Kill",
        year: 1993,
        group: "Curator Picks",
        genre: "Riot Grrrl / Punk",
        moods: ["fierce", "DIY", "feminist"],
        note: "A riot grrrl anthem that captured the decade’s underground feminist punk energy.",
      },
    ],
    culturalMoments: [
      {
        title: "The CD store was a cultural institution",
        text: "Tower Records, HMV, and Virgin Megastore turned music discovery into a physical ritual. Cover art, liner notes, and staff recommendations all mattered.",
      },
      {
        title: "TRL made pop stars in real time",
        text: "MTV’s Total Request Live turned music videos into daily teen culture. Pop stars were not just heard — they were watched, voted for, screamed over, and made iconic on TV.",
      },
      {
        title: "Napster broke everything",
        text: "By the end of the decade, file sharing made music feel unlimited and free. The industry panicked, teenagers adapted instantly, and the business never fully went back.",
      },
      {
        title: "Hip-hop became the dominant American art form",
        text: "By the late 90s, hip-hop was no longer outside the mainstream. Biggie, Tupac, Lauryn Hill, Jay-Z, Eminem, Missy Elliott, and others made rap the center of cultural gravity.",
      },
    ],
    thenNowBridges: [
      {
        thenArtist: "Lauryn Hill",
        nowArtist: "SZA",
        bridgeLine: "Neo-soul mastery and emotional honesty.",
        reason:
          "Both turn vulnerability into power, blending R&B, hip-hop influence, and intimate writing.",
        tags: ["neo-soul", "R&B", "vulnerability", "genre-blending"],
      },
      {
        thenArtist: "Nirvana",
        nowArtist: "Wet Leg",
        bridgeLine: "Guitar energy, irony, and anti-polished cool.",
        reason:
          "Both make guitar music feel messy, funny, detached, and alive instead of overly polished.",
        tags: ["guitar energy", "alt-rock", "irony", "raw"],
      },
      {
        thenArtist: "Missy Elliott",
        nowArtist: "Doja Cat",
        bridgeLine: "Genre-bending hip-hop and visual creativity.",
        reason:
          "Both understand that sound, image, humor, and weirdness can all be part of the same pop package.",
        tags: ["hip-hop", "visual", "playful", "genre-bending"],
      },
      {
        thenArtist: "Radiohead",
        nowArtist: "Bon Iver",
        bridgeLine: "Emotional weight and sonic experimentation.",
        reason:
          "Both make sadness sound expansive, experimental, and oddly beautiful.",
        tags: ["experimental", "melancholy", "alternative", "texture"],
      },
      {
        thenArtist: "D'Angelo",
        nowArtist: "Frank Ocean",
        bridgeLine: "Neo-soul and vulnerability as strength.",
        reason:
          "Both make R&B feel human, spacious, sensual, and emotionally complex.",
        tags: ["neo-soul", "R&B", "vulnerability", "intimate"],
      },
    ],
    definingAlbum: {
      title: "The Miseducation of Lauryn Hill",
      artist: "Lauryn Hill",
      year: 1998,
      note: "A landmark fusion of hip-hop, soul, reggae, and gospel that still feels emotionally direct and modern.",
    },
    shareCard: {
      headline: "My music era is the 1990s",
      sound: ["Grunge", "Hip-hop", "R&B", "Britpop", "Trip-hop"],
      songs: ["Smells Like Teen Spirit", "Waterfalls", "No Scrubs"],
      vibe: "CD stores, MTV, movie soundtracks, Napster, and the last pre-streaming monoculture.",
    },
  },
];

const tabs = ["Enter the Era", "Modern Match", "The Songs"] as const;
type Tab = (typeof tabs)[number];

const songFilters: Array<"All" | SongGroup> = [
  "All",
  "Start Here",
  "Shaped the Sound",
  "Curator Picks",
];

export default function MusicEraTimeMachine() {
  const [selectedEraId, setSelectedEraId] = useState("1990s");
  const [activeTab, setActiveTab] = useState<Tab>("Enter the Era");
  const [songFilter, setSongFilter] = useState<"All" | SongGroup>("All");

  const selectedEra = useMemo(() => {
    return musicEras.find((era) => era.id === selectedEraId) ?? musicEras[0];
  }, [selectedEraId]);

  const visibleSongs =
    songFilter === "All"
      ? selectedEra.songs
      : selectedEra.songs.filter((song) => song.group === songFilter);

  return (
    <section
      className="mt-8 overflow-hidden rounded-3xl border border-white/15 text-white shadow-2xl transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${selectedEra.colorTheme.from}, ${selectedEra.colorTheme.via}, ${selectedEra.colorTheme.to})`,
      }}
    >
      <div className="relative overflow-hidden px-6 py-12 md:px-10">
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative">

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Music Era Time Machine
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            Pick a decade. Step into its sound, style, and cultural moment —
            then discover your modern music match.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {musicEras.map((era) => (
              <button
                key={era.id}
                onClick={() => {
                  setSelectedEraId(era.id);
                  setActiveTab("Enter the Era");
                  setSongFilter("All");
                }}
                style={
                  selectedEra.id === era.id
                    ? {
                        borderColor: selectedEra.colorTheme.accent,
                        boxShadow: `0 20px 45px ${selectedEra.colorTheme.accent}33`,
                      }
                    : undefined
                }
                className={`rounded-3xl border p-5 text-left transition ${
                  selectedEra.id === era.id
                    ? "border-cyan-300 bg-white text-black shadow-2xl shadow-cyan-500/20"
                    : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl font-black">{era.decade}</div>
                <div
                  className={`mt-2 text-xs leading-5 ${
                    selectedEra.id === era.id ? "text-black/70" : "text-white/60"
                  }`}
                >
                  {era.tagline}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={
                  activeTab === tab
                    ? { backgroundColor: selectedEra.colorTheme.accent }
                    : undefined
                }
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "text-black"
                    : "bg-white/10 text-white/75 hover:bg-white/15"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 md:px-10">
        {activeTab === "Enter the Era" && <EnterEra era={selectedEra} />}
        {activeTab === "Modern Match" && <ModernMatch era={selectedEra} />}
        {activeTab === "The Songs" && (
          <TheSongs
            era={selectedEra}
            songFilter={songFilter}
            setSongFilter={setSongFilter}
            visibleSongs={visibleSongs}
          />
        )}
      </div>
    </section>
  );
}

function EnterEra({ era }: { era: MusicEra }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Enter the Era
        </p>

        <h3 className="mt-4 text-5xl font-black">{era.decade}</h3>

        <p className="mt-4 text-2xl font-semibold text-white/90">
          {era.tagline}
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          {era.heroSummary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {era.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
          Defining Album
        </p>

        <h3 className="mt-4 text-3xl font-black">{era.definingAlbum.title}</h3>

        <p className="mt-2 text-white/70">
          {era.definingAlbum.artist}, {era.definingAlbum.year}
        </p>

        <p className="mt-5 leading-7 text-white/70">{era.definingAlbum.note}</p>
      </div>

      <div className="lg:col-span-2">
        <h3 className="mb-5 text-2xl font-black">The Cultural Moment</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {era.culturalMoments.map((moment) => (
            <div
              key={moment.title}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
            >
              <h4 className="text-xl font-bold">{moment.title}</h4>
              <p className="mt-3 leading-7 text-white/65">{moment.text}</p>
            </div>
          ))}
        </div>
      </div>

      <ShareEraCard era={era} />
    </div>
  );
}

function ModernMatch({ era }: { era: MusicEra }) {
  const [index, setIndex] = useState(0);
  const featured = era.thenNowBridges[index % era.thenNowBridges.length];

  return (
    <div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Modern Match
        </p>

        <h3 className="mt-4 text-4xl font-black">
          If you loved this then, try this now.
        </h3>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-3xl bg-black/35 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">
              Then
            </p>
            <h4 className="mt-3 text-3xl font-black">{featured.thenArtist}</h4>
          </div>

          <div className="text-center text-4xl font-black text-cyan-300">→</div>

          <div className="rounded-3xl bg-cyan-300 p-6 text-black">
            <p className="text-sm uppercase tracking-[0.25em] text-black/55">
              Now
            </p>
            <h4 className="mt-3 text-3xl font-black">{featured.nowArtist}</h4>
          </div>
        </div>

        <p className="mt-6 text-xl font-semibold">{featured.bridgeLine}</p>

        <p className="mt-3 max-w-3xl leading-7 text-white/65">
          {featured.reason}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {featured.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIndex((current) => current + 1)}
          className="mt-8 rounded-full bg-white px-6 py-3 font-bold text-black hover:bg-cyan-200"
        >
          Reveal another match
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {era.thenNowBridges.map((bridge) => (
          <div
            key={`${bridge.thenArtist}-${bridge.nowArtist}`}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-xl font-black">{bridge.thenArtist}</h4>
              <span className="text-cyan-300">→</span>
              <h4 className="text-xl font-black">{bridge.nowArtist}</h4>
            </div>

            <p className="mt-3 text-sm text-white/60">{bridge.bridgeLine}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheSongs({
  era,
  songFilter,
  setSongFilter,
  visibleSongs,
}: {
  era: MusicEra;
  songFilter: "All" | SongGroup;
  setSongFilter: (filter: "All" | SongGroup) => void;
  visibleSongs: EraSong[];
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            The Songs
          </p>

          <h3 className="mt-3 text-4xl font-black">
            Songs that defined the {era.decade}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {songFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSongFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                songFilter === filter
                  ? "bg-cyan-300 text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleSongs.map((song) => (
          <article
            key={`${song.title}-${song.artist}`}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-black">{song.title}</h4>
                <p className="mt-1 text-white/65">
                  {song.artist} · {song.year}
                </p>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
                {song.group}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-cyan-200">
              {song.genre}
            </p>

            <p className="mt-3 leading-7 text-white/65">{song.note}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {song.moods.map((mood) => (
                <span
                  key={mood}
                  className="rounded-full bg-black/30 px-3 py-1 text-xs text-white/60"
                >
                  {mood}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ShareEraCard({ era }: { era: MusicEra }) {
  return (
    <div className="lg:col-span-2 rounded-[2rem] border border-cyan-300/20 bg-cyan-300 p-8 text-black">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/50">
        Shareable Era Card
      </p>

      <h3 className="mt-4 text-4xl font-black">{era.shareCard.headline}</h3>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/50">
            The Sound
          </p>
          <p className="mt-2 font-semibold">{era.shareCard.sound.join(" · ")}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/50">
            The Songs
          </p>
          <p className="mt-2 font-semibold">{era.shareCard.songs.join(" · ")}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/50">
            The Vibe
          </p>
          <p className="mt-2 font-semibold">{era.shareCard.vibe}</p>
        </div>
      </div>
    </div>
  );
}