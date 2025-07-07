function About() {
  return (
    <section
      id="about-section"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Gold gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          {/* Profile Image with gold border and shadow */}
          <div className="flex-1 flex justify-center">
            <div className="relative rounded-full overflow-hidden shadow-2xl w-72 h-72 border-4 border-yellow-400 bg-black">
              <img
                src="/images/profile1.jpg"
                alt="Profile"
                className="object-cover w-full h-full  transition duration-500"
              />
              {/* Gold ring effect */}
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400 pointer-events-none" />
            </div>
          </div>
          {/* About Text */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-sans leading-relaxed">
              Hi, I'm{" "}
              <span className="text-gold-gradient font-serif font-semibold">
                Huey Than
              </span>
              . I'm a learner, a leader, and a software engineer.
              <br />
              Currently studying at{" "}
              <span className="text-yellow-300 font-serif font-semibold">
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
              download="Resume.pdf"
              className="inline-block bg-gold-gradient text-black px-8 py-3 rounded-full font-serif font-bold shadow-lg hover:bg-yellow-500 hover:text-black transition"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
      {/* Decorative large numbers in the background */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2">
        07
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2">
        24
      </span>
    </section>
  );
}

export default About;
