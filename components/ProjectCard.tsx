"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";


type Props = {
  title: string;
  description: string;
};

export default function ProjectCard({ title, description }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <Link href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gray-900 p-6 rounded-2xl border border-gray-800 cursor-pointer"
        >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />

        {/* Content */}
        <div className="relative z-10">
            <h4 className="text-xl font-semibold">{title}</h4>
            <p className="text-gray-400 mt-3">{description}</p>
        </div>
        </motion.div>
    </Link>
  );
}