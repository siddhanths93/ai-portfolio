import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

const projects = {
  "supplier-performance-spend-intelligence": {
    title: "Supplier Performance & Spend Intelligence Dashboard",
    eyebrow: "Procurement Analytics · Python · Streamlit",
    appUrl: "https://supplier-performance-briefing-5k3n38kxgqwe3g7n7q3tbf.streamlit.app/",
      description:
      "A practical procurement analytics application that turns messy supplier spend files into spend insights, supplier categorization, rationalization opportunities, directional savings estimates, and procurement action recommendations.",
    problem:
      "Supplier spend data is rarely clean. Real files often contain inconsistent supplier names, multiple Excel tabs, varied column names, missing categories, multiple currencies, transaction-level rows, contract gaps, and extra ERP fields. Most dashboards assume clean input, but procurement analysis usually starts with data preparation and validation.",
    solution:
      "I built a Streamlit app that maps common spend file columns, checks data readiness, classifies suppliers into procurement categories, parses dates, aggregates supplier/category spend, identifies rationalization opportunities, estimates savings, and generates procurement next-action recommendations.",
    features: [
      "CSV and multi-sheet Excel upload",
      "Automatic column alias mapping for real-world spend files",
      "Extra, context, and unmapped column reporting",
      "Rules-based supplier and spend categorization",
      "Classification confidence scoring and review flags",
      "Invoice date parsing with year, quarter, and month fields",
      "Supplier/category aggregation for transaction-level files",
      "Spend dashboard with supplier, category, region, business unit, and trend views",
      "Supplier rationalization opportunity engine",
      "Directional savings estimate ranges",
      "Grouped procurement recommendation initiatives",
      "Downloadable CSV and Excel outputs",
    ],
    demonstrates:
      "This project combines procurement domain expertise with hands-on analytics engineering. It shows how I think about messy business data, product workflow design, spend analytics, category strategy, supplier rationalization, savings estimation, and executive-facing insight generation.",
    tags: [
      "Python",
      "Streamlit",
      "Pandas",
      "Plotly",
      "OpenPyXL",
      "Pytest",
      "Procurement Analytics",
      "Data Quality",
    ],
    // talkTrack:
    //   "I built this because procurement analytics rarely starts with clean data. The tool accepts messy supplier spend files, maps common real-world column names, classifies suppliers, identifies fragmented categories, estimates directional savings, and groups recommendations into procurement initiatives like preferred supplier rationalization, tail spend cleanup, and contract coverage review.",
  },
  "supplier-risk-assessment": {
    title: "Supplier Risk Assessment",
    eyebrow: "Supply Chain Analytics · React",
    description:
      "A supplier risk scoring tool that evaluates financial, geographic, quality, delivery, spend concentration, and contract risk factors.",
    problem:
      "Supplier risk is often evaluated inconsistently across teams, making it difficult to compare suppliers and prioritize review actions.",
    solution:
      "I built a structured risk scoring interface that converts multiple supplier risk factors into an easy-to-read risk score and recommendation output.",
    features: [
      "Risk factor inputs",
      "Weighted scoring model",
      "Supplier-level recommendation output",
      "Simple portfolio-ready UI",
    ],
    demonstrates:
      "This project demonstrates structured thinking around supplier risk, scorecard design, and analytics product presentation.",
    tags: ["React", "Risk Analytics", "Supply Chain", "Tailwind"],
    talkTrack:
      "This project shows how supplier risk factors can be translated into a structured scoring model and a simple decision-support interface.",
  },
  "tariff-exposure-estimator": {
    title: "Tariff Exposure Estimator",
    eyebrow: "Trade Analytics · Scenario Modeling",
    description:
      "A scenario-based tariff exposure estimator for analyzing import cost risk, country exposure, and landed cost sensitivity.",
    problem:
      "Tariff changes can affect landed cost quickly, but teams often lack a quick way to estimate exposure across sourcing scenarios.",
    solution:
      "I built a lightweight estimator that models tariff exposure and helps users understand directional landed cost impact.",
    features: [
      "Scenario inputs",
      "Tariff exposure estimate",
      "Country and cost sensitivity framing",
      "Decision-support style output",
    ],
    demonstrates:
      "This project demonstrates scenario modeling, supply chain cost thinking, and practical analytics UI design.",
    tags: ["React", "Trade Analytics", "Scenario Modeling", "Tariffs"],
    talkTrack:
      "This project helps frame tariff exposure as a scenario-modeling problem rather than a static cost calculation.",
  },
  "ten-k-insight-agent": {
    title: "10-K Insight Agent",
    eyebrow: "AI · Document Analysis",
    description:
      "An AI-assisted financial document analysis concept that extracts company insights from uploaded 10-K filings.",
    problem:
      "Annual reports are long and dense, making it difficult to quickly extract business, risk, and financial insights.",
    solution:
      "I built a concept for uploading a 10-K and extracting structured company insights, risks, and business context.",
    features: [
      "Document upload concept",
      "Structured insight extraction",
      "Risk and business summary framing",
      "AI-assisted analysis workflow",
    ],
    demonstrates:
      "This project demonstrates document intelligence, AI product thinking, and financial analysis workflow design.",
    tags: ["AI", "Document Analysis", "Next.js", "Finance"],
    talkTrack:
      "This project explores how AI can help convert dense company filings into structured business insight.",
  },
};

type ProjectSlug = keyof typeof projects;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projects[resolvedParams.slug as ProjectSlug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-28">
        <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          ← Back to Home
        </Link>

        <div className="mt-10 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-8 shadow-2xl md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            {project.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-semibold">Problem</h2>
            <p className="mt-4 leading-7 text-slate-300">{project.problem}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-semibold">Solution</h2>
            <p className="mt-4 leading-7 text-slate-300">{project.solution}</p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-semibold">Core Features</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-slate-300"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-semibold">What It Demonstrates</h2>
          <p className="mt-4 leading-7 text-slate-300">
            {project.demonstrates}
          </p>
        </section>

        {/*<section className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-7">*/}
        {/*  <h2 className="text-2xl font-semibold">Interview Talk Track</h2>*/}
        {/*  <p className="mt-4 leading-8 text-slate-200">{project.talkTrack}</p>*/}
        {/*</section>*/}
      </div>
    </main>
  );
}