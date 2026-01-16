"use client";

import Image from "next/image";
import ScrollVideoBackground from "./ScrollVideoBackground";
import { useMemo, useState } from "react";

function ProjectFlipCard({
  img,
  title,
  desc,
  bullets,
  tech,
  link,
}: {
  img: string;
  title: string;
  desc: string;
  bullets: string[];
  tech?: string[];
  link: string;
}) {
  return (
    <a
  href={link}
  target="_blank"
  rel="noreferrer"
  className="[perspective:1200px] w-full max-w-[420px] block"
>

      <div
        className="
          relative h-[300px] w-full cursor-pointer
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
    </a>
  );
}

function FlipCard({
  imgSrc,
  imgAlt,
  title,
  points,
}: {
  imgSrc: string;
  imgAlt: string;
  title: string;
  points: string[];
}) {
  return (
    <div className="[perspective:1200px] w-full max-w-[320px]">
      <div
        className="
          relative h-[260px] w-full max-w-[320px]
          transition-transform duration-700
          [transform-style:preserve-3d]
          hover:[transform:rotateY(180deg)]
        "
      >
        {/* Front */}
        <div className="relative h-[260px] w-full overflow-hidden rounded-2xl [backface-visibility:hidden]">
          {/* Keep using next/image */}
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
          {/* optional subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Back */}
        <div
          className="
            absolute inset-0 rounded-2xl
            bg-[#111] border border-white/10
            p-6 flex flex-col justify-between
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[#FF5722]">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Hover to flip • 
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({
  projects,
}: {
  projects: { title: string; desc: string; img: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? projects : projects.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((p) => (
          <div
            key={p.title}
            className="group overflow-hidden rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all"
          >
            {/* smaller image height */}
            <div className="relative h-[150px] overflow-hidden">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* tighter padding */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      <div className="text-center mt-10">
        <button
          onClick={() => setExpanded((s) => !s)}
          className="bg-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/15 transition-colors border border-white/15"
        >
          {expanded ? "Show less" : "See all Projects"}
        </button>
      </div>
    </>
  );
}

function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);

  const projects = [
    {
      title: "Voice & Gesture Assisted RPA System",
      desc: "A custom-built assistant designed to feel conversational and fast.",
      img: "/GG/asmodeus.jpg",
      bullets: ["Voice + gesture control", "Automation workflows", "Fast, assistant-like UI"],
      tech: ["Python", "Computer Vision", "Automation"],
      link: "https://github.com/MORTH01/-Asmodeus-Voice-Assisted-RPA-System.git",
    },
    {
      title: "CoVault",
      desc: "A cloud-native academic knowledge platform acting as a private social network for universities.",
      img: "/GG/covault.jpg",
      bullets: ["Cloud-Native","Scalable","Searchable","Role-Based"],
      tech: ["Web Tech", "Cloud Architecture"],
      link: "#",
    },
    {
      title: "Smart Object Detector",
      desc: "A camera-based assistive system that audibly describes surroundings and estimates object distance.",
      img: "/GG/smartobj.jpg",
      bullets: ["Computer-Vision", "Audio-Guided", "Real-Time"],
      tech: ["Python", "Camera APIs", "Audio Feedback Systems"],
      link: "https://github.com/MORTH01/SmartObject-Detector.git",
    },
    {
      title: "Speech-To-Image",
      desc: "A python based application that converts speech to AI-generated images.",
      img: "/GG/speechai.jpg",
      bullets: ["Multimodal", "Generative", "AI-Powered"],
      tech: ["Python","Speech Recognition", "AI/ML" ],
      link: "https://github.com/MORTH01/Speech-To-Image-.git",
    },
    {
      title: "FDH - Company Website",
      desc: "Worked on the official website for Funnkar Design House.",
      img: "/GG/fdh1.jpg",
      bullets: ["Responsive", "Branding", "Live"],
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://funnkardesignhouse.com/",
    },
    {
      title: "GBC Restaurant UI Design",
      desc: "Modern app + website UI for a UK-based restaurant brand.",
      img: "/GG/gbc1.jpg",
      bullets: ["Clean UI system", "Mobile-first design", "Brand-consistent visuals"],
      tech: ["Figma", "UI Design", "Web"],
      link: "#",
    }
    
  ];

  const visible = expanded ? projects : projects.slice(0, 6);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        {visible.map((p) => (
          <ProjectFlipCard
            key={p.title}
            img={p.img}
            title={p.title}
            desc={p.desc}
            bullets={p.bullets}
            tech={p.tech}
            link={p.link}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => setExpanded((s) => !s)}
          className="bg-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/15 transition-colors border border-white/15"
        >
          {expanded ? "Show less" : "See all Projects"}
        </button>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen text-white pt-16">
      <ScrollVideoBackground src="/GG/bg_mobile.mp4" 
      poster="/GG/hero.jpg"
      //scrollBoost={0.008}
      //friction={0.9}
      //basePlaybackRate={1} 
      />
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image - NO OVERLAY */}

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center">
  <div className="text-xl font-semibold text-white">GG</div>

  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=goureshvernekar9@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Gouresh%2C%0A%0A"
    target="_blank"
    rel="noreferrer"
    className="px-5 py-2 rounded-full text-sm font-medium bg-black/35 border border-white/15 text-white/90 hover:border-white/35 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.16)] transition"
  >
    Contact me
  </a>
</nav>


        {/* HERO HEADLINE (new style) */}
<div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16">
  {/* small role */}
  <p className="text-sm sm:text-base tracking-[0.35em] uppercase text-white/80">
    Software Developer
  </p>

  {/* big name */}
  <h1 className="mt-4 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wide text-white">
    Gouresh Vernekar
  </h1>

  {/* buttons row */}
  <div className="mt-10 w-full max-w-[900px] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
  {/* Resume (moves left) */}
  <a
    href="/GG/GG.Resume.pdf"
    target="_blank"
    rel="noreferrer"
    className="justify-self-start relative left-[400px] w-[220px] text-center px-7 py-3 rounded-full font-medium
bg-black/45 border border-white/15 text-white/90 backdrop-blur-md
hover:border-white/40 hover:text-white
hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]
transition"
  >
    Resume
  </a>

  {/* center spacer */}
  <div />

  {/* Projects (stays where it is / slightly right) */}
  <a
    href="#projects"
    className="justify-self-end relative right-[400px] w-[220px] text-center px-7 py-3 rounded-full font-medium
bg-black/45 border border-white/15 text-white/90 backdrop-blur-md
hover:border-[#FF5722]/70 hover:text-white
hover:shadow-[0_0_28px_rgba(255,87,34,0.30)]
transition"
  >
    Projects
  </a>
</div>
</div>
</section>

      {/* About Section */}
<section className="relative py-24">
  <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
    <div className="rounded-3xl bg-black/55 backdrop-blur-md border border-white/10 p-8 md:p-12">
      {/* GRID START */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        {/* Left Column - Text */}
        <div className="space-y-8">
          <h2 className="text-6xl font-bold italic">I'm</h2>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>a passionate software developer and UI/UX designer currently pursuing a Bachelor of
               Technology in Computer Science (Software Engineering) at Ajeenkya DY Patil University, Pune.
               I enjoy building clean, functional, and user-focused digital experiences—whether that means
               writing efficient code, designing intuitive interfaces, or thinking through how people
               interact with technology.</p>
            <p>For me, it's not just about making things work—it's about making them feel right.
               I like to see a project as a complete design system. My goal is to bring a strong technical
               foundation with creative design thinking to craft solutions that are fast, intuitive, and
               visually clear.</p>
            <p>I love exploring new technologies, solving problems through smart logic, and finding ways to
               optimize workflows. Whether I'm designing an interface, developing a feature, or analyzing data,
               I aim to create work that makes processes smoother and users happier. I'm especially drawn to
               projects where I can turn ideas into great experiences that look good and work even better.</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4">
            <a href="https://github.com/MORTH01" 
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/gouresh__/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5z" />
                    <path d="M12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                    <path d="M17.5 6.5a1 1 0 110 2 1 1 0 010-2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/gouresh-vernekar-87000924b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.368-1.85 3.6 0 4.266 2.369 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />                 
                  </svg>
                </a>
          </div>
        </div>

        {/* Right Column - Portrait (TOP-RIGHT) */}
        <div className="flex justify-end self-start">
          <div className="relative w-[360px] max-w-full h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Image
              src="/GG/portrait.png"
              alt="Portrait"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
      {/* GRID END */}
    </div>
  </div>
</section>

            {/* Image Strip Section */}
            <section className="py-12 relative">
              <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Title */}
                <div className="mb-10 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Inspiration & Interests
                  </h2>
                  <p className="text-gray-400 mt-3">
                    A quick snapshot of what I build and what I’m curious about.
                  </p>
                </div>
            
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center relative">
                  <FlipCard
                    imgSrc="/GG/img1.jpg"
                    imgAlt="Human x Machine"
                    title="Human × Machine"
                    points={[
                      "Human-centered design",
                      "Interfaces with personality",
                      "Design that feels alive",
                    ]}
                  />
            
                  <FlipCard
                    imgSrc="/GG/img2.jpg"
                    imgAlt="Creative Chaos"
                    title="Creative Chaos"
                    points={[
                      "Experimentation first",
                      "Visual storytelling",
                      "Bold concepts, clean execution",
                    ]}
                  />
            
                  <FlipCard
                    imgSrc="/GG/tag1.jpg"
                    imgAlt="Systems & Structure"
                    title="Systems & Structure"
                    points={[
                      "Scalable components",
                      "Performance & clarity",
                      "Design systems mindset",
                    ]}
                  />
                </div>
              </div>
            </section>

      {/* What I Do Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient Background */}

        <div className="relative max-w-[1280px] mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">What I Do!</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-[#FF5722]/30">
              <h3 className="text-xl font-bold mb-6 text-white">Software Development</h3>
              <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                <li>• Full-stack applications</li>
                <li>• Build reliable software using Python and Java</li>
                <li>• Design modular, clean architectures for maintainable systems</li>
                <li>• Develop automation tools and desktop applications</li>
                <li>• olve real-world problems with efficient algorithms</li>
              </ul>
            </div>

            {/* Software Tools & Automation */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-[#FF5722]/30">
              <h3 className="text-xl font-bold mb-6 text-white">AI, ML & Intelligent Systems</h3>
              <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                <li>• Develop machine learning models for classification and prediction</li>
                <li>• Build computer-vision and speech-based applications</li>
                <li>• Voice-based assistants</li>
                <li>• Create multimodal systems (speech → text → image)</li>
                <li>• Apply data analysis for insight-driven decisions</li>
              </ul>
            </div>

            {/* UI/UX & Product Design */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-[#FF5722]/30">
              <h3 className="text-xl font-bold mb-6 text-white">Web & Product Engineering</h3>
              <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                <li>• Develop responsive, production-ready websites</li>
                <li>• Build interactive platforms and dashboards</li>
                <li>• Translate requirements into scalable web solutions</li>
                <li>• Optimize performance, usability, and deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Orange Gradient Background */}

        <div className="relative max-w-[1280px] mx-auto px-8">
          <h2 className="text-5xl font-bold mb-12 text-white">Experience</h2>

          <div className="space-y-6">
            {/* Funnkar Design House */}
            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Software Developer Intern</h3>
                  <p className="text-white/90 text-lg">Funnkar Design House</p>
                </div>
                <span className="bg-white text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium">Aug 2025 - Jan 2026</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                Developed and maintained software applications using Python and Java, focusing on clean architecture, modular design,   
                and performance. 
              </p>
            </div>

            {/* FreeLancer */}
            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Freelance Software Developer </h3>
                  <p className="text-white/90 text-lg">Independent Projects</p>
                </div>
                <span className="bg-white text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium">Mar 2024 - Apr 2025</span>
              </div>
              <p className="text-white/80 leading-relaxed">
                 Developed and delivered software and web-based solutions for clients, focusing on functionality and usability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section id ="projects" className="relative max-w-[1280px] mx-auto">
  <div className="w-full px-6 sm:px-10 lg:px-16">
    <div className="mb-10">
      <h2 className="text-5xl font-bold text-white">Projects</h2>
      <p className="text-gray-400 mt-3">
        A few builds I’m proud of — hover and click to see details.
      </p>
    </div>

    <ProjectsSection />
  </div>
</section>


      {/* Skills Section */}
<section className="relative py-24">
  <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
    <h2 className="text-5xl font-bold mb-10 text-white">Skills</h2>

    {/* BOX (like About) */}
    <div className="rounded-3xl bg-black/55 backdrop-blur-md border border-white/10 p-8 md:p-12">
      <div className="space-y-10">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">Programing Languages</h3>
          <p className="text-gray-300 leading-relaxed">
            Python (NumPy, Pandas, Matplotlib) · Java (OOP, JDBC, Swing) · C/C++ · HTML · CSS · JavaScript
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">Software & Web Development</h3>
          <p className="text-gray-300 leading-relaxed">
            Android Studio · Jetpack Compose · Firebase · Git/GitHub · Node.js · Web Hosting · CSV/Excel Data Handling
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">Data Structures & Algorithms (DSA)</h3>
          <p className="text-gray-300 leading-relaxed">
            Linked Lists · Trees · Graphs · Dynamic Programming · Sorting/Searching Algorithms · Time Complexity Analysis
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">UI/UX Design & Graphics Tools</h3>
          <p className="text-gray-300 leading-relaxed">
            Figma · Adobe Photoshop · Illustrator · Canva -- Prototyping · Wireframing · Interface Design 
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">Data Analysis & Visualization</h3>
          <p className= "text-gray-300 leading-relaxed">
            Python (Pandas, Matplotlib, Seaborn) · MATLAB · Excel · Regression Modeling · Clustering · AIC/BIC 
          </p>
        </div>
      </div>
    </div>

    {/* MARQUEE BELOW THE BOX */}
    <div className="mt-10 skills-marquee">
      <div className="skills-track gap-4">
        {[
          "Python",
  "Java",
  "Machine Learning",
  "Data Analysis",
  "Computer Vision",
  "Speech Recognition",
  "Automation",
  "RPA",
  "Web Development",
  "UI/UX Design",
  "Accessibility Tech",
  "Cloud Platforms",
  "Android Development",
  "POS Systems",
  "OCR",
  "AI Tools",
  "API Integration",
  "Git & GitHub",
  "Problem Solving",
  "Software Architecture",
        ].map((s) => (
          <span
            key={`a-${s}`}
            className="shrink-0 px-6 py-2 bg-white/10 text-white rounded-full text-sm border border-white/15 backdrop-blur-md"
          >
            {s}
          </span>
        ))}

        {[
          "Copywriting",
          "Postbox",
          "Framer Migration",
          "Videos & Motion Graphics",
          "Optimization",
          "Custom Code",
          "SEO",
          "Icons",
          "Social Media",
          "Landing Pages",
        ].map((s) => (
          <span
            key={`b-${s}`}
            className="shrink-0 px-6 py-2 bg-white/10 text-white rounded-full text-sm border border-white/15 backdrop-blur-md"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Education Section */}
<section className="relative py-24 overflow-hidden">
  <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
    <h2 className="text-5xl font-bold mb-12 text-white">Education</h2>

    <div className="space-y-6">
      {/* B.Tech */}
      <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <div className="flex justify-between items-start gap-6 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Bachelor of Technology in Computer Science (Software Engineering)
            </h3>
            <p className="text-white/80 text-lg">
              Ajeenkya DY Patil University, Pune, India
            </p>
          </div>
          <span className="bg-white text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            Aug 2022 – May 2026
          </span>
        </div>

        <p className="text-white/70 leading-relaxed">
          Building a strong foundation in software development, problem-solving, system design, and modern development tools.
        </p>
      </div>

      {/* INTI */}
      <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <div className="flex justify-between items-start gap-6 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Bachelor of Computer Science (Hons)
            </h3>
            <p className="text-white/80 text-lg">
              INTI International University, Kuala Lumpur, Malaysia
            </p>
          </div>
          <span className="bg-white text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            Jan 2025 – May 2025
          </span>
        </div>

        <p className="text-white/70 leading-relaxed">
          International academic exposure and advanced perspectives in software engineering and global computing concepts.
        </p>
      </div>

      {/* PUC */}
      <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <div className="flex justify-between items-start gap-6 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Pre University (PUC)
            </h3>
            <p className="text-white/80 text-lg">
              Govindram Seksaria Science College, Belgaum, India
            </p>
          </div>
          <span className="bg-white text-[#FF5722] px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
            2020–2022
          </span>
        </div>

        <p className="text-white/70 leading-relaxed">
          Focused on mathematics, logical reasoning, and core sciences that laid the groundwork for technical thinking.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Who I Am as a Developer Section */}
      <section className="relative py-10">
          <h2 className="text-5xl font-bold mb-8 text-center text-[#FF5722]">Who I Am as a Developer</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              I'm a developer who loves turning ideas into clean, functional, and visually polished experiences.
              I focus on writing efficient code, building intuitive interfaces, and creating software that feels
              smooth and reliable. I approach every project with curiosity, discipline, and a desire to improve
              with each build. Whether it's solving a technical challenge or refining a user flow, I aim to
              deliver work that looks good, works well, and makes sense to the people using it.


            </p>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent border-t border-gray-900 py-8">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">© 2026 GG</p>

            <div className="flex gap-6">
              <a href="https://github.com/MORTH01" 
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              <a href="https://www.instagram.com/gouresh__/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5z" />
                    <path d="M12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                    <path d="M17.5 6.5a1 1 0 110 2 1 1 0 010-2z" />
                  </svg>
                </a>
              <a href="https://www.linkedin.com/in/gouresh-vernekar-87000924b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-[#FF5722] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.368-1.85 3.6 0 4.266 2.369 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />                 
                  </svg>
                </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

