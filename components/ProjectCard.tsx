import Link from "next/link";

type ProjectCardProps = {
  href: string;
  title: string;
  description: string;
};

export default function ProjectCard({
  href,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="h-full rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-600">
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-4 text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}