"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  MapPin,
  Send,
  Server,
  Terminal,
  Users,
  X,
  LoaderCircle,
} from "lucide-react";

const navItems = [
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
];
const roles = [
  "Full-Stack Developer",
  "MERN Stack Engineer",
  "Problem Solver",
  "Building reliable software.",
];
const projects = [
  {
    name: "Restaurant Reservation System",
    year: "2026",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description:
      "Built a full-stack reservation flow that handles booking creation, protected customer routes, and real-time availability checks through REST APIs, giving guests a faster path from discovery to confirmed booking.",
    live: "https://restaurant-reservation-system-olive.vercel.app/",
    github: "https://github.com/swetakardam",
  },
];
const skillGroups = [
  {
    title: "Languages",
    icon: Terminal,
    items: [
      { name: "C" },
      { name: "C++" },
      { name: "JavaScript" },
      { name: "Python" },
    ],
  },
  {
    title: "Frontend",
    icon: Code2,
    items: [{ name: "HTML5" }, { name: "CSS3" }, { name: "React.js" }],
  },
  {
    title: "Backend",
    icon: Server,
    items: [{ name: "Node.js" }, { name: "Express.js" }, { name: "REST APIs" }],
  },
  {
    title: "Database & Concepts",
    icon: Database,
    items: [
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "Data Structures & Algorithms" },
      { name: "Authentication" },
      { name: "Middleware" },
      { name: "Responsive Design" },
      { name: "Problem Solving" },
    ],
  },
];

function useTypewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const phrase = roles[index];
    const speed = deleting ? 38 : 78;
    const timer = setTimeout(
      () => {
        if (!deleting && text === phrase) return setDeleting(true);
        if (deleting && text === "") {
          setDeleting(false);
          setIndex((index + 1) % roles.length);
          return;
        }
        setText(
          deleting
            ? phrase.slice(0, text.length - 1)
            : phrase.slice(0, text.length + 1),
        );
      },
      text === phrase ? 1600 : speed,
    );
    return () => clearTimeout(timer);
  }, [text, deleting, index]);
  return text;
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={dark ? "on-dark" : ""}>{title}</h2>
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const typewriter = useTypewriter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0,
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-28% 0px -60% 0px" },
    );
    navItems.forEach(
      (id) =>
        document.getElementById(id) &&
        observer.observe(document.getElementById(id)!),
    );
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormState("error");
      return;
    }
    setFormState("sending");
    // TODO: connect to Formspree, EmailJS, or your backend endpoint.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setFormState("success");
    form.reset();
  };

  return (
    <div className="site-shell">
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#top" className="brand">
          Sweta <span>Kardam</span>
        </a>
        <div className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item}
              className={active === item ? "active" : ""}
              href={`#${item}`}
            >
              {item}
            </a>
          ))}
          <a
            className="resume-button"
            href="https://drive.google.com/uc?export=download&id=1KouAAsAvxNM4pN8qGyeyyZiYBq94N5PE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume{" "}
          </a>
        </div>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="https://drive.google.com/uc?export=download&id=1KouAAsAvxNM4pN8qGyeyyZiYBq94N5PE"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </div>
        )}
      </nav>

      <main id="top">
        <section className="hero dark-section">
          <div className="hero-grid" />
          <div className="container hero-content">
            <div className="hero-copy">
              <Reveal>
                <p className="eyebrow">
                  Software Engineer &amp; Full-Stack Developer Intern{" "}
                </p>
              </Reveal>
              <Reveal>
                <h1>
                  Sweta
                  <br />
                  <span>Kardam</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="type-line">
                  <span>{typewriter}</span>
                  <i aria-hidden="true" />
                </p>
              </Reveal>
              <Reveal>
                <p className="hero-description">
                  Computer Science undergraduate with hands-on experience
                  building full-stack web applications using React.js, Node.js,
                  Express.js, and MongoDB.
                </p>
              </Reveal>
              <Reveal className="hero-actions">
                <a className="button button-terracotta" href="#projects">
                  View Projects
                </a>
                <a
                  className="button button-outline"
                  href="https://drive.google.com/uc?export=download&id=1KouAAsAvxNM4pN8qGyeyyZiYBq94N5PE"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resume
                </a>
              </Reveal>
              <Reveal>
                <div className="micro-row">
                  <span>
                    <MapPin size={15} /> Meerut, Uttar Pradesh
                  </span>
                  <a href="mailto:swetakardam20@gmail.com">
                    <Mail size={15} /> swetakardam20@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sweta-kardam-436901323"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Users size={15} /> LinkedIn
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="about" className="light-section about-section">
          <div className="container">
            <SectionHeading eyebrow="A little context" title="About Me" />
            <div className="about-grid">
              <Reveal>
                <p className="lead-copy">
                  I build reliable full-stack products that turn a clear user
                  need into a working, measurable experience.
                </p>

                <p className="body-copy">
                  As a Computer Science undergraduate, I have shipped React and
                  Node.js applications with protected routes, REST APIs, MongoDB
                  data models, and responsive interfaces. My focus is on
                  reducing friction for users while keeping the underlying
                  system understandable and dependable.
                </p>
              </Reveal>
              <div className="highlight-stack">
                <Reveal>
                  <div className="highlight-card">
                    <Users />
                    <div>
                      <h3>Hackathon delivery</h3>
                      <p>
                        Contributed in a 6-member Smart India Hackathon team,
                        moving from problem framing to an accessible product
                        demo under deadline pressure.
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="highlight-card">
                    <GitBranch />
                    <div>
                      <h3>Production habits</h3>
                      <p>
                        Use Git branching, reusable components, and API-first
                        thinking to keep features easy to review, test, and
                        extend.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="dark-section skills-section">
          <div className="container">
            <SectionHeading
              eyebrow="Tools of the trade"
              title="Skills &amp; strengths"
              dark
            />
            <div className="skills-grid">
              {skillGroups.map(({ title, icon: Icon, items }) => (
                <Reveal key={title}>
                  <div className="skill-group">
                    <Icon size={25} />
                    <h3>{title}</h3>
                    <div className="skill-list">
                      {items.map((item) => (
                        <div className="skill-item" key={item.name}>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="light-section projects-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">Selected work</span>
                <h2>Projects with purpose.</h2>
              </div>
              <p>
                Small, considered products built to solve real problems and make
                everyday interactions a little better.
              </p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <Reveal key={project.name}>
                  <article className="project-card">
                    {project.badge && (
                      <span className="project-badge">{project.badge}</span>
                    )}
                    <div className="project-top">
                      <span className="project-index">0{index + 1}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.name}</h3>
                    <div className="project-stack">
                      {project.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <p>{project.description}</p>
                    <div className="project-links">
                      <a href="#contact">
                        {/* TODO: replace with live deployment URL */}Live Demo{" "}
                        <ExternalLink size={15} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub <GitBranch size={15} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="cream-soft-section">
          <div className="container experience-row">
            <SectionHeading
              eyebrow="The way I work"
              title="Curious by default."
            />
            <p className="experience-copy">
              I care about the details that make software feel dependable: clear
              communication, purposeful abstractions, accessible interactions,
              and a willingness to learn from every iteration.
            </p>
          </div>
        </section>

        <section id="education" className="dark-section education-section">
          <div className="container">
            <SectionHeading eyebrow="The foundation" title="Education" dark />
            <div className="timeline">
              <Reveal>
                <div className="timeline-item">
                  <span className="timeline-dot" />
                  <div>
                    <span className="timeline-meta">2024 — 2028</span>
                    <h3>Meerut Institute of Engineering and Technology</h3>
                    <p>B.Tech in Computer Science and Engineering</p>
                    <strong>CGPA: 7.5/10 · Expected Graduation: 2028</strong>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="timeline-item">
                  <span className="timeline-dot" />
                  <div>
                    <span className="timeline-meta">2022 — 2024</span>
                    <h3>M.S.S. Inter College</h3>
                    <p>Class XII: 87% (2024) · Class X: 86% (2022)</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="certifications"
          className="light-section certifications-section"
        >
          <div className="container">
            <SectionHeading
              eyebrow="Always learning"
              title="Certifications &amp; exposure"
            />
            <div className="cert-columns">
              <div>
                <span className="cert-label">Certifications</span>
                <div className="cert-grid">
                  {[
                    "MongoDB Basics for Students — MongoDB (Sep 2026)",
                    "Front-End Development — SoloLearn (Jan 2026)",
                    "Introduction to C Programming — SoloLearn (Jan 2026)",
                    "Introduction to Data Science — Simplilearn (Jan 2026)",
                    "Basics of Business Communication — Infosys",
                  ].map((cert) => (
                    <Reveal key={cert}>
                      <div className="cert-card">
                        <Check size={17} />
                        <span>{cert}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div>
                <span className="cert-label">Learning &amp; exposure</span>
                <div className="cert-grid">
                  <Reveal>
                    <div className="cert-card">
                      <MapPin size={17} />
                      <span>
                        Industrial Visit — Uniconverge Technologies, Noida
                      </span>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="dark-section contact-section">
          <div className="container contact-grid">
            <div>
              <SectionHeading
                eyebrow="Have a good idea?"
                title="Let’s build something together."
                dark
              />
              <p className="contact-intro">
                Whether it’s a product idea, a collaboration, or simply a
                conversation about technology, my inbox is open.
              </p>
              <div className="contact-details">
                <a href="mailto:swetakardam20@gmail.com">
                  <Mail /> swetakardam20@gmail.com
                </a>
                <span>
                  <MapPin /> Meerut, Uttar Pradesh
                </span>
                <a
                  href="https://www.linkedin.com/in/sweta-kardam-436901323"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch /> LinkedIn
                </a>
                <a
                  href="https://github.com/swetakardam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch /> GitHub
                </a>
              </div>
            </div>
            <Reveal>
              <form className="contact-form" onSubmit={submitForm} noValidate>
                <label>
                  Name
                  <input name="name" required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me a little about your idea..."
                  />
                </label>
                {formState === "error" && (
                  <p className="form-message error" role="alert">
                    Please complete all fields with a valid email address.
                  </p>
                )}
                {formState === "success" && (
                  <p className="form-message success" role="status">
                    Thanks — your message is ready to be connected to an
                    endpoint.
                  </p>
                )}
                <button
                  className="button button-terracotta"
                  type="submit"
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? (
                    <>
                      <LoaderCircle className="spin" size={16} /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      {scrolled && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp size={17} />
        </button>
      )}
      <footer className="footer dark-section">
        <div className="container footer-inner">
          <a href="#top" className="brand">
            Sweta <span>Kardam</span>
          </a>
          <div className="socials">
            <a href="mailto:swetakardam20@gmail.com" aria-label="Email">
              <Mail />
            </a>
            <a
              href="https://www.linkedin.com/in/sweta-kardam-436901323"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <GitBranch />
            </a>
            <a
              href="https://github.com/swetakardam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitBranch />
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Sweta Kardam · Designed &amp; built
            with intention.
          </p>
        </div>
      </footer>
    </div>
  );
}
