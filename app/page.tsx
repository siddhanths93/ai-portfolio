import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="px-6 pt-24 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-gray-500">
              Hi, I’m Sid Shetty
            </p>

            <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              Building AI-enabled tools for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                better business decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              I build practical analytics and AI-enabled decision-support tools
              that help teams assess risk, model cost exposure, and turn complex
              business inputs into clear recommendations.
            </p>
          </div>

          {/* EXPERIENCE + LEARNING JOURNEY */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Experience
              </p>

              <h2 className="mt-3 text-xl font-semibold text-white">
                8+ years in analytics, procurement, and transformation
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Experience translating messy operational data into clear
                business recommendations across procurement, supply chain, and
                enterprise operations.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                Learning Journey
              </p>

              <h2 className="mt-3 text-xl font-semibold text-white">
                Georgia Tech MS Analytics candidate with an AI focus
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Building hands-on projects to explore how AI, automation, and
                decision intelligence can support real enterprise workflows.
              </p>
            </div>
          </div>

          {/* FOCUS AREAS */}
          <div className="mt-12">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-gray-500">
              Focus Areas
            </p>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                <p className="font-semibold text-white">
                  Decision Intelligence
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Turning assumptions, risks, and business inputs into
                  structured recommendations.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                <p className="font-semibold text-white">
                  Risk Modeling
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Building practical models for supplier risk, tariff exposure,
                  cost pressure, and scenario planning.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                <p className="font-semibold text-white">
                  Enterprise Analytics
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Applying analytics to messy operational data and translating
                  it into clear business action.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                <p className="font-semibold text-white">
                  AI-Enabled Workflows
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Exploring how AI can support analysis, prioritization,
                  monitoring, and decision support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="border-t border-gray-900 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
              Featured Work
            </p>

            <h2 className="text-3xl font-bold">
              Interactive business tools
            </h2>

            <p className="mt-3 max-w-2xl text-gray-400">
              A growing collection of hands-on tools built around real business
              problems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              href="/projects/supplier-risk-assessment"
              title="Supplier Risk Assessment"
              description="Interactive supplier risk assessment tool using weighted procurement risk factors and recommended mitigation actions."
            />

            <ProjectCard
              href="/projects/tariff-exposure-estimator"
              title="Tariff Exposure Estimator"
              description="Scenario-planning tool to estimate tariff cost, margin exposure, and sourcing risk."
            />
          </div>
        </div>
      </section>
    </main>
  );
}