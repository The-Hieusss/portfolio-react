
function About() {
  return (
    <section
      id="about-section"
      className="relative bg-[#0a0402] py-24"
      aria-labelledby="about-heading"
    >
      <div className="absolute left-0 top-0 h-2 w-full bg-gold-gradient" />

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-[#fa7636]/20 bg-[#120905]">
            <img
              src="/images/profile1.jpg"
              alt="Portrait of Hieu Than"
              className="h-[28rem] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#ffb48a]">About Me</p>
            <h2
              id="about-heading"
              className="mt-4 text-4xl font-serif font-bold text-gold-gradient md:text-5xl"
            >
              I build thoughtful software with a practical eye for design.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-[#e5d1c4]">
              <p>
                I’m Hieu Than, a software engineering student at Arizona State University focused on
                building products that are clear, useful, and reliable.
              </p>
              <p>
                My work spans web, mobile, and AI-oriented projects. I care about clean interfaces,
                strong technical foundations, and making ideas feel polished in real use.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/Resume.pdf"
                className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 font-serif font-bold text-[#0a0402] transition hover:opacity-90"
              >
                View Resume
              </a>
              <a
                href="#contact-section"
                className="inline-flex items-center justify-center rounded-full border border-[#fa7636]/30 px-6 py-3 text-[#fceee6] transition hover:border-[#fa7636]/60"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
