import ExperienceCard, { TExperienceData } from "./components/experience-card";

const ExperienceData: TExperienceData[] = [
  {
    workInfo: {
      title: "IT Support",
      subtitle: "ICT E-Library - City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "March 2025",
      endDate: "June 2025",
      imageData: {
        src: "/images/experiences/internship-gentri.webp",
        alt: "General Trias Official Seal",
      },
    },
    additionalInfo: {
      description:
        "Provided comprehensive IT support and technical assistance to library users while managing ICT E-Library resources and maintaining computer systems. Developed and implemented a centralized digital platform that streamlined access to library resources, significantly improving user accessibility and overall experience for community members.",
      skills: [
        "Technical Support",
        "Web Development",
        "Digital Resource Management",
        "UI/UX Design",
      ],
      workTags: ["IT Support", "Library Management", "Digital Resources"],
      project: {
        projectOutputLink: "https://e-cplgt.netlify.app/",
      },
    },
  },
  {
    workInfo: {
      title: "Crawling Structured Description",
      subtitle: "Telus International AI",
      location: "Tampere, Finland",
      startDate: "August 2023",
      endDate: "December 2023",
      imageData: {
        src: "/images/experiences/telus-official-logo.png",
        alt: "Telus International AI Logo",
      },
    },
    additionalInfo: {
      description:
        "Evaluating structured description of a product page and identify its main description. To extract product information (e.g., description, product details, features, specification/dimensions, material/ingredients, etc...) accurately which will be used in the future assessments of the webpage.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
      workTags: ["Data Annotation", "Remote Work", "Web Evaluation"],
    },
  },
];

const Experiences = () => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-y-8 gap-x-4 py-24 items-start justify-items-center max-w-7xl m-auto">
      {ExperienceData &&
        ExperienceData.map((experienceData, index) => (
          <ExperienceCard key={index} experienceData={experienceData} />
        ))}
    </section>
  );
};

export default Experiences;
