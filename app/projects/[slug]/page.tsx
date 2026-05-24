import Navbar from "@/components/Navbar";
import SupplierRiskCalculator from "@/components/SupplierRiskCalculator";

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
    tags: ["Procurement", "Risk Analytics", "Supply Chain"],
  },
  {
    slug: "spend-classification-agent",
    title: "Spend Classification Agent",
    description:
      "LLM-powered spend classification and categorization system.",
    problem:
      "Spend data is often messy, inconsistently labeled, and difficult to classify at scale.",
    approach:
      "Designed an AI-assisted workflow using LLMs to categorize spend descriptions and improve classification consistency.",
    result:
      "Created a reusable framework for turning unstructured supplier and transaction data into cleaner category insights.",
    tags: ["LLM", "Spend Analytics", "Python", "Classification"],
  },
  {
    slug: "contract-rag-assistant",
    title: "Contract RAG Assistant",
    description:
      "Retrieval-based AI assistant for enterprise contract intelligence.",
    problem:
      "Contract terms are difficult to search, compare, and summarize manually across large document sets.",
    approach:
      "Designed a RAG-style assistant concept that retrieves relevant contract clauses and generates structured answers.",
    result:
      "Created a foundation for faster contract review, obligation tracking, and procurement decision support.",
    tags: ["RAG", "Contracts", "Vector Search", "AI Assistant"],
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

        <section className="px-8 py-24">
          <div className="max-w-4xl mx-auto">
            <a
              href="/"
              className="inline-block mb-10 text-gray-500 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>

            <h1 className="text-4xl font-bold">Project not found</h1>

            <p className="mt-4 text-gray-400">
              The project you are looking for does not exist.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="px-8 py-24 border-b border-gray-900">
        <div className="max-w-5xl mx-auto">
          <a
            href="/"
            className="inline-block mb-10 text-gray-500 hover:text-white transition-colors"
          >
            ← Back to Home
          </a>

          <h1 className="text-5xl font-bold">{project.title}</h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-4 leading-relaxed text-gray-400">
              {project.problem}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Approach</h2>
            <p className="mt-4 leading-relaxed text-gray-400">
              {project.approach}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Result</h2>
            <p className="mt-4 leading-relaxed text-gray-400">
              {project.result}
            </p>
          </div>
        </div>
      </section>

      {project.slug === "supplier-risk-assessment" && (
        <section className="px-8 py-20 border-t border-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              Live Supplier Risk Calculator
            </h2>

            <SupplierRiskCalculator />
          </div>
        </section>
      )}
    </main>
  );
}