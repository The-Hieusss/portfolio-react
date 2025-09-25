import { useEffect, useState } from "react";
import Carousel from "./Carousel";

const education = [
	{
		logo: "/images/asulogo.jpeg",
		school: "Arizona State University",
		degree: "Bachelor of Science | Computer Science: Software Engineering",
		location: "Tempe - Arizona",
		date: "2023 - 2027",
		id: "asu",
	},
	{
		logo: "/images/wiscologo.jpg",
		school: "Wisconsin Lutheran High School",
		degree: "",
		location: "Milwaukee - Wisconsin",
		date: "2019 - 2023",
		id: "wisco",
	},
	{
		logo: "/images/tdnlogo.svg",
		school: "Tran Dai Nghia High School For The Gifted",
		degree: "",
		location: "Ho Chi Minh City - Vietnam",
		date: "2016 - 2019",
		id: "tdn",
	},
];

const experience = [
	{
		logo: "/images/movedcars.png",
		title: "Software Engineer Intern",
		company: "MoveCars.com",
		date: "Jan 2025 - Present",
	},
	{
		logo: "/images/viagslogo.png",
		title: "Software Engineer Intern",
		company: "Vietnam Airlines",
		date: "Jun 2024 - Aug 2024",
	},
	{
		logo: "/images/eximbank.ico",
		title: "Software Engineer Intern",
		company: "Vietnam Export Import Commercial Joint Stock Bank",
		date: "Jun 2024 - Aug 2024",
	},
	{
		logo: "/images/rhlogo.jpeg",
		title: "Website Developer",
		company: "RoomieHub, LLC",
		date: "May 2024 - Aug 2024",
	},
	{
		logo: "/images/ttlogo.png",
		title: "Website Developer Intern",
		company: "Thuan Thien Techonosolution Joint-Stock Company",
		date: "May 2023 - Aug 2023",
	},
];

const programmingLanguages = [
	"javascript.png",
	"csharp.png",
	"html.png",
	"css.png",
	"java.png",
	"typescript.png",
	"c++.png",
	"c.png",
	"sql.png",
	"matlab.svg",
	"python.png",
	"ruby.svg",
];

const awards = [
	{
		logo: "/images/asulogo.jpeg",
		title: "Kaplan International Scholarship",
		org: "Arizona State University",
		date: "Fall 2023",
		location: "Tempe - Arizona",
	},
	{
		logo: "/images/asulogo.jpeg",
		title: "New American University Scholarship",
		org: "Arizona State University",
		date: "Fall 2023",
		location: "Tempe - Arizona",
	},
	{
		logo: "/images/asulogo.jpeg",
		title: "Dean's List",
		org: "Arizona State University",
		date: "Fall 2023",
		location: "Tempe - Arizona",
	},
	{
		logo: "/images/CollegeBoard.png",
		title: "AP Scholar with Distinction",
		org: "College Board",
		date: "Summer 2023",
		location: "",
	},
];

const leadership = [
	{
		logo: "/images/vinasubanner.jpg",
		title: "President",
		company: "Vietnamese Student Union at ASU",
		date: "Aug 2024 - Present",
	},
];

const NAV_SECTIONS = [
	"education",
	"experience",
	"leadership",
	"skills",
	"awards",
] as const;

export default function Resume() {
	const [active, setActive] = useState<(typeof NAV_SECTIONS)[number]>(
		"education"
	);

	// Scroll spy for side navigation
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (
					visible?.target?.id &&
					NAV_SECTIONS.includes(visible.target.id as any)
				) {
					setActive(visible.target.id as any);
				}
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
		);

		NAV_SECTIONS.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id="resume-section"
			className="relative overflow-hidden py-20 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402]"
		>
			{/* Decorative borders */}
			<div className="absolute inset-x-0 top-0 flex justify-between opacity-20 pointer-events-none">
				<img src="/images/greek-border.svg" alt="" className="h-12" />
				<img
					src="/images/greek-border.svg"
					alt=""
					className="h-12 rotate-180"
				/>
			</div>
			{/* Accent bar */}
			<div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />

			<div className="container mx-auto px-4 relative z-10">
				{/* Header row */}
				<div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
					<h1 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient drop-shadow-lg tracking-wider">
						Résumé
					</h1>
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noreferrer"
						className="bg-gold-gradient text-black px-6 py-2 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
					>
						Download PDF
					</a>
				</div>

				<div className="flex flex-col md:flex-row gap-12">
					{/* Sticky Navigation */}
					<nav className="md:w-1/4 mb-4 md:mb-0">
						<div className="sticky top-24 bg-[#0a0402]/50 backdrop-blur-sm rounded-2xl border border-[#fa7636]/20 p-4">
							<ul className="space-y-2">
								{NAV_SECTIONS.map((id) => {
									const label = id[0].toUpperCase() + id.slice(1);
									const isActive = active === id;
									return (
										<li key={id}>
											<a
												href={`#${id}`}
												className={`flex items-center gap-3 px-3 py-2 rounded-xl transition font-serif ${
													isActive
														? " text-black shadow"
														: "text-[#fceee6] hover:bg-[#120905]/70"
												}`}
											>
												<span
													className={`h-2 w-2 rounded-full ${
														isActive ? "bg-black" : "bg-[#ffb48a]"
													}`}
												/>
												<span
													className={`${
														isActive ? "font-bold" : "opacity-90"
													}`}
												>
													{label}
												</span>
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</nav>

					{/* Content */}
					<div className="md:w-3/4 space-y-16">
						{/* Education - Timeline */}
						<section
							id="education"
							aria-labelledby="education-heading"
							className="relative"
						>
							<h2
								id="education-heading"
								className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide"
							>
								Education
							</h2>
							<div className="relative pl-6">
								<div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#fa7636]/30" />
								<div className="space-y-6">
									{education.map((edu) => (
										<div
											key={edu.school}
											className="relative flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636]/40 transition p-6"
										>
											<span className="absolute -left-[22px] top-6 h-3 w-3 rounded-full bg-gold-gradient shadow" />
											<img
												src={edu.logo}
												alt={edu.school}
												className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
											/>
											<div>
												<h3
													id={edu.id}
													className="text-xl font-serif font-bold text-gold-gradient mb-1 tracking-wide"
												>
													{edu.school}
												</h3>
												{edu.degree && (
													<div className="text-[#ffb48a] font-sans text-sm mb-1 ">
														{edu.degree}
													</div>
												)}
												<div className="text-[#fceee6] text-sm">
													{edu.location}
												</div>
												<div className="text-xs text-[#d2bba8] mt-1">
													{edu.date}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* Experience - Timeline */}
						<section
							id="experience"
							aria-labelledby="experience-heading"
							className="relative"
						>
							<h2
								id="experience-heading"
								className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide"
							>
								Experience
							</h2>
							<div className="relative pl-6">
								<div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#fa7636]/30" />
								<div className="space-y-6">
									{experience.map((exp, i) => (
										<div
											key={i}
											className="relative flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636]/40 transition p-6"
										>
											<span className="absolute -left-[22px] top-6 h-3 w-3 rounded-full bg-gold-gradient shadow" />
											<img
												src={exp.logo}
												alt={exp.company}
												className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
											/>
											<div>
												<h3 className="text-xl font-serif font-bold text-gold-gradient mb-1 tracking-wide">
													{exp.title}
												</h3>
												<div className="text-[#ffb48a] font-sans mb-1">
													{exp.company}
												</div>
												<div className="text-sm text-[#d2bba8]">
													{exp.date}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* Leadership */}
						<section
							id="leadership"
							aria-labelledby="leadership-heading"
						>
							<h2
								id="leadership-heading"
								className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg"
							>
								Leadership
							</h2>
							<div className="grid sm:grid-cols-2 gap-6">
								{leadership.map((lead, i) => (
									<div
										key={i}
										className="group flex items-center gap-6 bg-[#120905]/90 rounded-2xl shadow-lg p-6 border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition"
									>
										<img
											src={lead.logo}
											alt={lead.company}
											className="w-16 h-16 object-contain rounded-lg shadow-md bg-white"
										/>
										<div>
											<h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-gold-gradient transition">
												{lead.title}
											</h3>
											<div className="text-[#ffb48a] font-serif">
												{lead.company}
											</div>
											<div className="text-sm text-[#d2bba8]">
												{lead.date}
											</div>
										</div>
									</div>
								))}
							</div>
						</section>

						{/* Skills */}
						<section id="skills" aria-labelledby="skills-heading">
							<h2
								id="skills-heading"
								className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg"
							>
								Programming Languages
							</h2>
							<div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-10">
								{programmingLanguages.map((img) => (
									<div
										key={img}
										className="flex flex-col items-center justify-center bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-xl p-4 shadow-lg hover:scale-110 hover:shadow-[0_0_10px_#fa7636]/60 transition-transform duration-300"
										title={img.replace(/\.(png|svg)/, "").toUpperCase()}
									>
										<img
											src={`/images/skills/${img}`}
											alt={img.replace(/\.(png|svg)/, "")}
											className="w-12 h-12 object-contain"
											loading="lazy"
										/>
										<span className="mt-2 text-xs text-[#fceee6] font-sans tracking-wide">
											{img.replace(/\.(png|svg)/, "").toUpperCase()}
										</span>
									</div>
								))}
							</div>

							<h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
								Frameworks & Libraries
							</h2>
							<div className="bg-[#120905]/60 border border-[#fa7636]/20 rounded-2xl p-4">
								<Carousel />
							</div>
						</section>

						{/* Awards */}
						<section id="awards" aria-labelledby="awards-heading">
							<h2
								id="awards-heading"
								className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide"
							>
								Awards
							</h2>
							<div className="relative pl-6">
								<div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#fa7636]/30" />
								<div className="space-y-6">
									{awards.map((award, i) => (
										<div
											key={i}
											className="relative flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636]/40 transition p-6"
										>
											<span className="absolute -left-[22px] top-6 h-3 w-3 rounded-full bg-gold-gradient shadow" />
											<img
												src={award.logo}
												alt={award.title}
												className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
											/>
											<div>
												<h3 className="text-lg font-serif font-bold text-gold-gradient mb-1">
													{award.title}
												</h3>
												<div className="text-[#ffb48a] font-sans mb-1">
													{award.org}
												</div>
												<div className="text-sm text-[#d2bba8]">
													{award.date}
												</div>
												{award.location && (
													<div className="text-sm text-[#fceee6] mt-1">
														{award.location}
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />

			{/* Bottom borders */}
			<div className="absolute inset-x-0 bottom-0 flex justify-between opacity-20 pointer-events-none">
				<img src="/images/greek-border.svg" alt="" className="h-12" />
				<img
					src="/images/greek-border.svg"
					alt=""
					className="h-12 rotate-180"
				/>
			</div>
		</section>
	);
}
