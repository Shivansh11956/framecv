export const portfolioSchema = {
  settings: {
    name: "",
    title: "",
    location: "",
    summary: "",
    profileImage: ""
  },
  sections: {
    hero: {
      enabled: true,
      ctaButtons: [
        {
          text: "",
          url: ""
        }
      ]
    },
    about: {
      enabled: true,
      skills: {
        enabled: true,
        title: "Technical Skills",
        items: []
      }
    },
    experience: {
      enabled: false,
      title: "Work Experience",
      items: [
        {
          company: "",
          role: "",
          period: "",
          description: ""
        }
      ]
    },
    projects: {
      enabled: true,
      title: "Featured Projects",
      items: [
        {
          title: "",
          description: "",
          tags: [],
          previewUrl: "",
          repoUrl: ""
        }
      ]
    },
    education: {
      enabled: true,
      title: "Education",
      items: [
        {
          institution: "",
          degree: "",
          period: ""
        }
      ]
    },
    achievements: {
      enabled: true,
      title: "Achievements & Certifications",
      items: [
        {
          title: "",
          description: ""
        }
      ]
    },
    contact: {
      enabled: true,
      title: "Contact",
      email: "",
      phone: "",
      location: ""
    },
    social: {
      enabled: true,
      items: [
        {
          platform: "",
          url: "",
          icon: ""
        }
      ]
    }
  },
  navigation: {
    enabled: true,
    items: [
      {
        name: "",
        url: ""
      }
    ]
  },
  footer: {
    enabled: true,
    copyright: ""
  }
};
