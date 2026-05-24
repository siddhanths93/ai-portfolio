import Navbar from "@/components/Navbar";

export default function AboutPage() {
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

          <h1 className="text-5xl font-bold">
            About Me
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-gray-400">
            I turn procurement complexity into measurable cost savings,
            with 8 years of experience in supply chain and analytics,
            now expanding into AI-driven automation.
          </p>

          <div className="mt-12 space-y-6 leading-relaxed text-gray-300">
            <p>
              I am a Senior Manager at The Hackett Group, where I lead
              benchmarking and transformation engagements for Fortune 500
              clients. Previously, I worked at Procure Analytics building spend analysis
              models and data ingestion pipelines that identified millions in
              savings opportunities.
            </p>

            <p>
              I hold a Master’s in Industrial Engineering from NC State, along
              with Lean Six Sigma certification and deep expertise in supply
              chain analytics.
            </p>

            <p>
              I am currently pursuing a Master’s in Analytics with an data science focus
              at Georgia Tech, exploring AI agents and intelligent automation
              for enterprise workflows.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold">
              Contact
            </h2>

            <div className="mt-6 space-y-3 text-gray-300">
              <p>📧 siddhanths93@gmail.com</p>
              <p>💼 linkedin.com/in/siddhanthshetty93</p>
              <p>📍 Atlanta, GA</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}