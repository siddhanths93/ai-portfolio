"use client";

import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      <div className="relative min-h-screen bg-black text-white">

        {/* Glow Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px]" />
        </div>

        {/* Content */}
        <Navbar />

        <main className="min-h-screen bg-black text-white px-8 py-20 space-y-16">

          {/* Header Section */}
          <section id="home" className="max-w-4xl mx-auto">

            <motion.p
              className="text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              AI Engineer • Agentic Systems • RAG • Automation
            </motion.p>

            <motion.h1
              className="text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              Hi, I’m Sid Shetty
            </motion.h1>

            <motion.h2
              className="text-2xl text-gray-300 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              I build AI agents and enterprise automation tools.
            </motion.h2>

            <motion.p
              className="text-gray-400 mt-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              Focused on applying AI to daily life and real-world business problems in procurement, and enterprise workflows.
            </motion.p>

            <motion.div
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
            >
              <a
                href="#projects"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold inline-block hover:bg-gray-200 transition"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="border border-gray-700 text-white px-6 py-3 rounded-xl font-semibold inline-block hover:border-white transition"
              >
                Contact Me
              </a>
            </motion.div>

          </section>

          {/* Projects Section */}
          <section id="projects" className="max-w-5xl mx-auto">

            <h3 className="text-3xl font-bold mb-10">
              Featured Projects
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <ProjectCard
                title="Spend Classification Agent"
                description="AI system that classifies procurement spend using embeddings + LLMs."
              />

              <ProjectCard
                title="Contract RAG Assistant"
                description="Retrieval system that answers questions from enterprise contracts."
              />

              <ProjectCard
                title="Procurement Copilot"
                description="Multi-agent system for sourcing, analysis, and supplier intelligence."
              />
            </div>

          </section>

          {/* About Section */}
          <motion.section
            id="about"
            className="max-w-5xl mx-auto mt-24"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >

            <h3 className="text-3xl font-bold mb-4">About</h3>

            <p className="text-gray-400">
              I am an AI engineer focused on building agentic systems, RAG pipelines,
              and enterprise AI tools that solve real business problems.
            </p>

          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="max-w-5xl mx-auto mt-24 mb-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >

            <h3 className="text-3xl font-bold mb-4">Contact</h3>

            <p className="text-gray-400">
              Email: siddhanths93@gmail.com
            </p>

          </motion.section>

        </main>
      </div>
    </>
  );
}