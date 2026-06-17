import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        <Link href="/" className="text-sm text-blue-300 hover:text-blue-200">
          ← Back to Home
        </Link>

        <p className="mt-12 text-sm uppercase tracking-[0.45em] text-slate-500">
          About Me
        </p>

        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Turning procurement complexity into{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            measurable business value.
          </span>
        </h1>

        <div className="mt-12 space-y-6 text-lg leading-8 text-slate-300">
          <p>
            Currently I lead benchmarking and transformation engagements for Fortune 500 clients.
            At my previous work, I built spend analysis models and data ingestion pipelines that identified millions in
            savings opportunities.
          </p>

          <p>
            I hold a Master&apos;s in Industrial Engineering from NC State, along
            with Lean Six Sigma certification and deep expertise in supply chain
            analytics.
          </p>

          <p>
            I am currently pursuing a Master&apos;s in Analytics with a data
            science focus at Georgia Tech, exploring AI agents and intelligent
            automation for enterprise workflows.
          </p>
        </div>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-7 shadow-lg shadow-blue-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Professional Focus
            </p>

            <h2 className="mt-5 text-2xl font-bold leading-8">
              Procurement, analytics, and transformation
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              I focus on turning operational complexity into structured analysis,
              executive recommendations, and practical decision-support tools.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-7 shadow-lg shadow-blue-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              AI Learning Journey
            </p>

            <h2 className="mt-5 text-2xl font-bold leading-8">
              Building AI-enabled business tools
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              I am building hands-on portfolio projects that combine domain
              expertise, analytics engineering, and AI-enabled workflows.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}