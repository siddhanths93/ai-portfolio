import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 text-center"
      >
        <div className="max-w-4xl">

          <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-6">
            Hi, I’m Sid Shetty
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Building{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              AI Systems
            </span>{" "}
            for Procurement & Supply Chain
          </h1>

          <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Data-driven supply chain strategist evolving into AI specialist

          </p>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="border-t border-gray-900 px-8 py-24"
      >
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-12">
            Featured Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <ProjectCard
              href="/projects/supplier-risk-assessment"
              title="Supplier Risk Assessment Scorecard"
              description="Interactive supplier risk assessment platform."
            />

            <ProjectCard
              href="/projects/spend-classification-agent"
              title="Spend Classification Agent"
              description="LLM-powered spend classification and categorization system."
            />

            <ProjectCard
              href="/projects/contract-rag-assistant"
              title="Contract RAG Assistant"
              description="Retrieval-based AI assistant for enterprise contract intelligence."
            />

          </div>

        </div>
      </section>

    </main>
  );
}