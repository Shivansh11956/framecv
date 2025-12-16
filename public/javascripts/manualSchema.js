export const portfolioSchema = {
  settings: {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "India",
    summary: "I am a full stack developer passionate about building scalable web applications and clean user experiences.",
    profileImage: "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
  },

  sections: {
    hero: {
      enabled: true,
      ctaButtons: [
        {
          text: "View Resume",
          url: "https://example.com/resume.pdf"
        },
        {
          text: "Contact Me",
          url: "mailto:john@example.com"
        }
      ]
    },

    about: {
      enabled: true,
      skills: {
        enabled: true,
        title: "Technical Skills",
        items: ["JavaScript", "Node.js", "Express", "MongoDB", "React"]
      }
    },

    experience: {
      enabled: true,
      title: "Work Experience",
      items: [
        {
          company: "Tech Corp",
          role: "Software Engineer",
          period: "Jan 2023 – Present",
          description: "Worked on backend APIs, authentication, and scalable services."
        }
      ]
    },

    projects: {
      enabled: true,
      title: "Featured Projects",
      items: [
        {
          title: "Portfolio Builder",
          description: "A resume-to-portfolio generator with live preview and shareable links.",
          tags: ["node", "express", "mongodb"],
          previewUrl: "https://example.com",
          repoUrl: "https://github.com/example/repo"
        }
      ]
    },

    education: {
      enabled: true,
      title: "Education",
      items: [
        {
          institution: "ABC University",
          degree: "B.Tech in Computer Science",
          period: "2021 – 2025"
        }
      ]
    },

    achievements: {
      enabled: true,
      title: "Achievements & Certifications",
      items: [
        {
          title: "Winner – Hackathon 2024",
          description: "Won first prize for building a resume automation platform."
        }
      ]
    },

    contact: {
      enabled: true,
      title: "Contact",
      email: "john@example.com",
      phone: "+91 9876543210",
      location: "India"
    },

    social: {
      enabled: true,
      items: [
        {
          platform: "linkedin",
          url: "https://linkedin.com/in/johndoe",
          icon: "linkedin"
        },
        {
          platform: "github",
          url: "https://github.com/johndoe",
          icon: "github"
        }
      ]
    }
  },

  navigation: {
    enabled: true,
    items: [
      { name: "Home", url: "#top" },
      { name: "Projects", url: "#projects" },
      { name: "Contact", url: "#contact" }
    ]
  },

  footer: {
    enabled: true,
    copyright: "© 2025 John Doe. All rights reserved."
  }
};
