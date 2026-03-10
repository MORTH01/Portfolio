import Image from "next/image";

function ProjectFlipCard({
  img,
  title,
  desc,
  bullets,
  tech,
}: {
  img: string;
  title: string;
  desc: string;
  bullets: string[];
  tech?: string[];
}) {
  return (
    <div className="[perspective:1200px] w-full max-w-[360px]">
      <div
        className="
          relative h-[240px] w-full
          transition-transform duration-700
          [transform-style:preserve-3d]
          hover:[transform:rotateY(180deg)]
        "
      >
        {/* FRONT: image only */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]">
          <Image src={img} alt={title} fill className="object-cover" />
          {/* optional: tiny dark fade for depth */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* BACK: details */}
        <div
          className="
            absolute inset-0 rounded-2xl
            bg-black/70 backdrop-blur-md border border-white/10
            p-6
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">{desc}</p>

          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-white/60">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {tech?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
