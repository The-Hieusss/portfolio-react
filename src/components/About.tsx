function About() {
  return (
    <section
      id="about-section"
      className="py-24 bg-gradient-to-b from-[#0a0402] via-[#120905] to-[#0a0402] relative overflow-hidden"
    >
      {/* Accent bar in fiery orange gradient */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          {/* Profile Image with custom orange border */}
          <div className="flex-1 flex justify-center">
            <div className="  relative flex flex-col items-center rounded-[8%] overflow-hidden shadow-2xl w-72 h-72 border-4 border-[#fa7636] bg-[#fa7636]">
              {/* Decorative Greek-style frame */}
              {/* <img
                src="/images/profile-border.svg"
                alt="Border"
                className="absolute top-4.5 left-0 w-full h-full z-10 pointer-events-none scale-[1.48] "
              /> */}

              {/* Profile image underneath */}
              <div className="w-full h-full relative  overflow-hidden ">
                <img
                  src="/images/profile2.jpeg"
                  alt="Profile"
                  className="object-cover w-full h-full z-0 "
                />
              </div>
            </div>
          </div>

          {/* About Text */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-[#fceee6] mb-8 font-sans leading-relaxed">
              Hi, I'm{" "}
              <span className="text-gold-gradient font-serif font-semibold">
                Huey Than
              </span>
              . I'm a learner, a leader, and a software engineer.
              <br />
              Currently studying at{" "}
              <span className="text-[#ffb48a] font-serif font-semibold">
                Arizona State University
              </span>
              , I've had the chance to work on exciting projects and
              internships, which has helped me enhance my skills in many areas
              such as problem-solving, team collaboration, and creativity.
              <br />
              <span className="block mt-4">
                My largest goal in life is to use my knowledge to help those
                that are less fortunate than I am.
              </span>
            </p>
            <a
              href="/Resume.pdf"
              // download="Resume.pdf"
              className="inline-block bg-gold-gradient text-[#0a0402] px-8 py-3 rounded-full font-serif font-bold shadow-lg hover:bg-[#ff9462] hover:text-[#0a0402] transition"
            >
              View & Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Decorative numbers with soft accent tone */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2"></span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2"></span>
    </section>
  );
}

export default About;
