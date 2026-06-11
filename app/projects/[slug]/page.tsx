import Navbar from "@/components/Navbar";
import SupplierRiskCalculator from "@/components/SupplierRiskCalculator";
import TariffExposureEstimator from "@/components/TariffExposureEstimator";
import TenKInsightAgent from "@/components/TenKInsightAgent";

type Project = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
  tags: string[];
};

const projects: Project[] = [
  {
    slug: "supplier-risk-assessment",
    title: "Supplier Risk Assessment",
    description:
      "Interactive supplier risk assessment and procurement analytics platform.",
    problem:
      "Procurement teams often assess supplier risk using fragmented data, manual spreadsheets, and inconsistent scoring methods.",
    approach:
      "Built a structured calculator that evaluates financial health, geographic diversification, quality performance, on-time delivery, spend concentration, and contract stability.",
    result:
      "Created a live decision-support tool that converts supplier inputs into a risk score and recommended mitigation actions.",
    tags: ["Procurement", "Risk Analytics", "Supply Chain", "Decision Support"],
  },
  {
    slug: "tariff-exposure-estimator",
    title: "Tariff Exposure Estimator",
    description:
      "Scenario-planning tool to estimate tariff cost, margin exposure, and sourcing risk.",
    problem:
      "Procurement and strategy teams need a fast way to understand how tariff changes could affect landed cost, supplier exposure, and gross margin.",
    approach:
      "Built an interactive estimator that combines supplier spend, tariff assumptions, supplier dependence, gross margin, and cost pass-through ability into a simple exposure model.",
    result:
      "Created a live decision-support tool that estimates incremental tariff cost, unrecovered cost, margin exposure, and recommended sourcing actions.",
    tags: ["Tariffs", "Landed Cost", "Sourcing Strategy", "Scenario Planning"],
  },
  {
  slug: "ten-k-insight-agent",
  title: "10-K Insight Agent",
  description:
    "Document intelligence tool that analyzes annual reports for business model, risk themes, strategy signals, and financial health.",
  problem:
    "Annual reports contain valuable business, risk, and financial information, but the documents are long, dense, and difficult to quickly synthesize into actionable insights.",
  approach:
    "Built an interactive analyzer that combines 10-K filing text with key financial inputs to identify risk themes, opportunity signals, financial health indicators, red flags, and analyst-style questions.",
  result:
    "Created a structured company intelligence brief that helps users quickly understand business drivers, risks, financial signals, and areas for deeper research.",
  tags: [
    "10-K Analysis",
    "Financial Analysis",
    "Document Intelligence",
    "Decision Support",],
  },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <a
              href="/"
              className="mb-10 inline-block text-gray-500 transition-colors hover:text-white"
            >
              ← Back to Home
            </a>

            <h1 className="text-4xl font-bold">Project not active</h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              This project is currently paused while I refine the concept and
              implementation.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="px-6 pt-20 pb-14 border-b border-gray-900">
        <div className="mx-auto max-w-6xl">
          <a
            href="/"
            className="mb-8 inline-block text-sm text-gray-500 transition-colors hover:text-white"
          >
            ← Back to Home
          </a>

          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-gray-500">
              Project Case Study
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SUMMARY */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
              Overview
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.15em] text-gray-500">
                Problem
              </p>

              <h3 className="text-xl font-semibold text-white">
                Business challenge
              </h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.15em] text-gray-500">
                Approach
              </p>

              <h3 className="text-xl font-semibold text-white">
                Tool design
              </h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                {project.approach}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <p className="mb-3 text-sm uppercase tracking-[0.15em] text-gray-500">
                Result
              </p>

              <h3 className="text-xl font-semibold text-white">
                Decision support
              </h3>

              <p className="mt-4 leading-relaxed text-gray-400">
                {project.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TOOL */}
      {project.slug === "supplier-risk-assessment" && (
        <section className="border-t border-gray-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                Live Demo
              </p>

              <h2 className="text-3xl font-bold">
                Supplier Risk Calculator
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                Adjust supplier risk inputs to generate a weighted risk score,
                risk level, and recommended mitigation actions.
              </p>
            </div>

            <SupplierRiskCalculator />
          </div>
        </section>
      )}

      {project.slug === "tariff-exposure-estimator" && (
        <section className="border-t border-gray-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                Live Demo
              </p>

              <h2 className="text-3xl font-bold">
                Tariff Exposure Estimator
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                Model how tariff assumptions, supplier dependence, margin
                exposure, and cost pass-through affect sourcing risk.
              </p>
            </div>

            <TariffExposureEstimator />
          </div>
        </section>
      )}

      {project.slug === "ten-k-insight-agent" && (
        <section className="border-t border-gray-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                Live Demo
              </p>

              <h2 className="text-3xl font-bold">
                10-K Insight Agent
              </h2>

              <p className="mt-3 max-w-2xl text-gray-400">
                Upload or paste annual report text and enter financials to generate a
                structured business, risk, and financial analysis brief.
              </p>
            </div>

            <TenKInsightAgent />
          </div>
        </section>
    )}
    </main>
  );
}