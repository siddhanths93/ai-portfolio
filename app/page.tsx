import Link from "next/link";
import Navbar from "@/components/Navbar";

const SUPPLIER_SPEND_APP_URL = "https://supplier-performance-briefing-5k3n38kxgqwe3g7n7q3tbf.streamlit.app/";

{/* <div className="fixed top-20 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg">
  TEST: World Cup deploy check
</div> */}

const focusAreas = [
  {
    title: "Decision Intelligence",
    description:
      "Turning assumptions, risks, and business inputs into structured recommendations.",
  },
  {
    title: "Risk Modeling",
    description:
      "Building practical models for supplier risk, tariff exposure, cost pressure, and scenario planning.",
  },
  {
    title: "Enterprise Analytics",
    description:
      "Applying analytics to messy operational data and translating it into clear business action.",
  },
  {
    title: "AI-Enabled Workflows",
    description:
      "Exploring how AI can support analysis, prioritization, monitoring, and decision support.",
  },
];

const projects = [
  {
    title: "Supplier Performance & Spend Intelligence Dashboard",
    slug: "supplier-performance-spend-intelligence",
    appUrl: SUPPLIER_SPEND_APP_URL,
    description:
      "A Python and Streamlit procurement analytics app that turns messy supplier spend files into spend insights, supplier categorization, rationalization opportunities, savings estimates, and procurement action recommendations.",
    tags: [
      "Python",
      "Streamlit",
      "Pandas",
      "Plotly",
      "Procurement Analytics",
      "Data Quality",
    ],
    featured: true,
  },
  {
  title: "World Cup Drama Lab",
  slug: "world-cup-drama-lab",
  description: "A free-data World Cup storytelling app that turns match results into recaps, group chaos, and qualification scenarios.",
  tags: ["Streamlit", "Python", "Sports Analytics", "GitHub Actions"],
  // demoUrl: "https://sid-world-cup-drama-lab.streamlit.app/",
  // githubUrl: "https://github.com/siddhanths93/world-cup-drama-lab",
},
{
    title: "Supplier Risk Assessment",
    slug: "supplier-risk-assessment",
    description:
      "A supplier risk scoring tool that evaluates financial, geographic, quality, delivery, spend concentration, and contract risk factors.",
    tags: ["React", "Risk Analytics", "Supply Chain", "Tailwind"],
    featured: false,
  },
  {
    title: "Tariff Exposure Estimator",
    slug: "tariff-exposure-estimator",
    description:
      "A scenario-based tariff exposure estimator for analyzing import cost risk, country exposure, and landed cost sensitivity.",
    tags: ["React", "Trade Analytics", "Scenario Modeling", "Tariffs"],
    featured: false,
  },
  {
  title: "Supplier Normalization Workbench",
  slug: "supplier-normalization-workbench",
  description:
    "A procurement data-quality tool that standardizes messy supplier names, detects duplicate vendor records, recommends supplier families, flags questionable matches for human review, and exports cleaner supplier data for spend analytics.",
  tags: ["Procurement", "Data Quality", "Fuzzy Matching", "Python", "Streamlit"],
  image: "/projects/supplier-normalization.png",
  githubUrl: "https://github.com/siddhanths93/supplier-normalization-workbench",
  demoUrl: "https://supplier-normalization-workbench.streamlit.app/",
},
{
    title: "10-K Insight Agent",
    slug: "ten-k-insight-agent",
    description:
      "An AI-assisted financial document analysis concept that extracts company insights from uploaded 10-K filings.",
    tags: ["AI", "Document Analysis", "Next.js", "Finance"],
    featured: false,
  },
];

export default function Home() {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
          Hi, I&apos;m Sid Shetty
        </p>

        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Building AI-enabled tools for{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            better business decisions.
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-300">
          I build practical analytics and AI-enabled decision-support tools that
          help teams assess risk, model cost exposure, and turn complex business
          inputs into clear recommendations.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-7 shadow-lg shadow-blue-950/20">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
              Experience
            </p>

            <h2 className="mt-5 text-2xl font-bold leading-8">
              8+ years in analytics, procurement, and transformation
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Experience translating messy operational data into clear business
              recommendations across procurement, supply chain, and enterprise
              operations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-7 shadow-lg shadow-blue-950/20">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
              Learning Journey
            </p>

            <h2 className="mt-5 text-2xl font-bold leading-8">
              Georgia Tech MS Analytics candidate with an AI focus
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Building hands-on projects to explore how AI, automation, and
              decision intelligence can support real enterprise workflows.
            </p>
          </div>
        </div>

        <section className="mt-16">
          <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
            Focus Areas
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
              >
                <h3 className="text-lg font-bold">{area.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {featuredProject && (
          <section className="mt-20">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
              Featured Portfolio Project
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Procurement Analytics Tool
            </h2>

            <div className="mt-8 rounded-3xl border border-blue-500/30 bg-slate-950/90 p-7 shadow-lg shadow-blue-950/30">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    Featured Project
                  </span>

                  <h3 className="mt-5 max-w-4xl text-2xl font-bold md:text-3xl">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-4 max-w-4xl leading-7 text-slate-300">
                    {featuredProject.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-black/40 p-4">
                  <p className="text-xl font-bold text-blue-300">Spend</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Analysis and categorization
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/40 p-4">
                  <p className="text-xl font-bold text-indigo-300">Savings</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Directional opportunity estimates
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black/40 p-4">
                  <p className="text-xl font-bold text-purple-300">Actions</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Procurement next-step recommendations
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                >
                  View case study →
                </Link>

                {featuredProject.appUrl &&
                  featuredProject.appUrl !==
                    "PASTE_YOUR_STREAMLIT_APP_URL_HERE" && (
                    <a
                      href={featuredProject.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                    >
                      Launch live app ↗
                    </a>
                  )}
              </div>
            </div>
          </section>
        )}

        <section id="projects" className="mt-20">
          <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
            Other Projects
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Portfolio</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {otherProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
              >
                <h3 className="text-xl font-bold">{project.title}</h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm text-blue-300 transition group-hover:translate-x-1">
                  View project →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}