export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projects = [
    {
      slug: "spend-classification-agent",
      title: "Spend Classification Agent",
      description:
        "AI system that classifies procurement spend using embeddings + LLMs.",
    },
    {
      slug: "contract-rag-assistant",
      title: "Contract RAG Assistant",
      description:
        "Retrieval system that answers questions from enterprise contracts.",
    },
    {
      slug: "procurement-copilot",
      title: "Procurement Copilot",
      description:
        "Multi-agent system for sourcing, analysis, and supplier intelligence.",
    },
  ];

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white px-8 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <p className="text-gray-400 mt-3">
            The URL slug does not match any project.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-4xl mx-auto">

        <a href="/" className="text-gray-400 hover:text-white">
          ← Back to Home
        </a>

        <h1 className="text-5xl font-bold mt-6">
          {project.title}
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          {project.description}
        </p>

      </div>
    </main>
  );
}