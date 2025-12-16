const express = require('express');
const app = express();
const path = require('path');

const fs = require("fs");                   
const { PDFExtract } = require("pdf.js-extract");
const pdfExtract = new PDFExtract();

const multer = require("multer");

const PORTFOLIO_SCHEMA = require('./public/javascripts/portfolioSchema')
const MANUAL_SCHEMA = require('./public/javascripts/manualSchema')
const upload = multer({ dest: "uploads/" });
const { nanoid } = require("nanoid");
const Build = require("./models/build");


require("dotenv").config();
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_KEY });



let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const { decode } = require('punycode/');
const {  mongoose } = require('mongoose');
const session = require("express-session");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);



app.use(session({
  secret: "framecv-secret",
  resave: false,
  saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.render('index')
})
app.post("/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.send("No file uploaded");

  
    const data = await pdfExtract.extract(req.file.path);
    const resumeText = data.pages
      .map(p => p.content.map(c => c.str).join(" "))
      .join("\n");

    
    const schemaStructure = {
      settings: {
        name: "Full Name",
        title: "Current Job Title",
        location: "City, Country",
        summary: "Short professional bio (2-3 sentences)",
        profileImage: ""
      },
      sections: {
        hero: {
          enabled: true,
          ctaButtons: [{enabled:"", text: "Text for the buttons according to the content", url: "url of the location" }]
        },
        about: {
          enabled: true,
          skills: {
            enabled: true,
            title: "Technical Skills",
            items: ["Skill 1", "Skill 2"] 
          }
        },
        experience: {
          enabled: true,
          title: "Work Experience",
          items: [{
            company: "Company Name",
            role: "Job Title",
            period: "Start - End Date",
            description: "Key responsibilities and achievements"
          }]
        },
        projects: {
          enabled: true,
          title: "Featured Projects",
          items: [{
            title: "Project Name",
            description: "What it does and tech stack used",
            tags: ["React", "Node"],
            previewUrl: "",
            repoUrl: ""
          }]
        },
        education: {
          enabled: true,
          title: "Education",
          items: [{
            institution: "University Name",
            degree: "Degree Name",
            period: "Years"
          }]
        },
        achievements: {
            enabled: true,
            title: "Achievements",
            items: [{ title: "Award Name", description: "Details" }]
        },
        contact: {
          enabled: true,
          title: "Contact",
          email: "email@example.com",
          phone: "+1234567890",
          location: "City, Country"
        },
        social: {
            enabled: true,
            items: [{ platform: "LinkedIn", url: "", icon: "linkedin" }]
        }
      },
      navigation: {
        enabled: true,
        items: [{ name: "Home", url: "/" }]
      },
      footer: {
        enabled: true,
        copyright: "© 2024"
      }
    };

  
    const prompt = `
      You are a resume → portfolio JSON converter.

      STRICT RULES:
      1. Output ONLY valid JSON. No markdown. No comments.
      2. Follow the TARGET JSON EXACTLY. Do NOT change key names, nesting, spelling, casing.
      3. Only fill fields using resume content — unknown fields must be "" (empty string), NOT null.
      4. Arrays must stay arrays.
      5. DO NOT invent new fields not present in the schema.
      6. DO NOT remove fields even if resume is missing info.
      7. Tags must be lowercase technology names found in resume.
      8. Give appropriate role in the settings.title according to the resume content
      9. Give default location of India in settings.location if you cannot find the location from resume content
      10. this is the default profile image url 'https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg'
      11. Give footer's copyright value like © 2025 Name from resume. All rights reserved.
      12. Give dummy url in each url's if you cannot find the exact
      13. Give default location of India if you cannot find exact location
      14. In achievement's item's title give it a description in the title itself including all the points like anyone would write in a resume
      15. Give dummy repo url like 'https://www.github.com/repo-name' and dummy preview url like 'https://www.preview.com'
      16. Make the enabled to false in each section if items in that section is not present
      17. in the ctaButtons 
      18. in the cta buttons there can be maximum of 2 buttons(example : get in touch,contact, view resume)
      19. According to your knowledge add descriptions in each achievement's description
      20. Experience section must NOT include any education entries.
      21. Education must remain only inside the education section.
      22. If items in respective section is not present, set the enabled field for that section to false
      23. In setting's title give professional position title according to the skills in the resume, assuming for which position resume refers to
      ### TARGET JSON SHAPE (DO NOT MODIFY KEYS):
      ${JSON.stringify(schemaStructure, null, 2)}

      ### RESUME:
      ${resumeText}
      `;


    console.log("Sending to Groq...");

    
    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant", 
        messages: [
            { role: "system", content: "You are a precise JSON extractor." },
            { role: "user", content: prompt }
        ],
        temperature: 0.1, 
        response_format: { type: "json_object" }
    });

    let aiText = response.choices[0].message.content;

   
    aiText = aiText.replace(/```json|```/g, "").trim();

   
    let json = JSON.parse(aiText);
    

    if (json.portfolioSchema) {
        json = json.portfolioSchema;
    }

    req.session.portfolioData = json;
  

    console.log( JSON.stringify(json, null, 2))

    res.send(`
    <script>
        sessionStorage.clear();
        sessionStorage.setItem("portfolioData", '${JSON.stringify(json).replace(/'/g, "\\'")}');
        window.location.href = "/builder";
    </script>
    `);


  } catch (err) {
    console.error("Error Parsing Resume:", err);
    res.status(500).send("Error processing resume: " + err.message);
  }
});

app.get("/builder", (req, res) => {

   
    if (!req.session.portfolioData) {
        return res.redirect("/");
    }

  
    const isFirstLoad = !req.session.builderOpened;
    req.session.builderOpened = true; 

    res.render("builder", {
        data: isFirstLoad ? req.session.portfolioData : null
    });
});


app.get("/preview", (req, res) => {
    res.render("preview");
});
app.post("/build", async (req, res) => {
  try {
    const portfolioData = req.body.portfolioData;

    if (!portfolioData) {
      return res.status(400).json({ error: "No portfolio data sent" });
    }

    const buildId = nanoid(10);

    await Build.create({
      buildId,
      portfolioData
    });

    res.json({
      url: `${process.env.BASE_URL}/build/${buildId}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Build failed" });
  }
});

app.get("/build/:id", async (req, res) => {
  const build = await Build.findOne({ buildId: req.params.id });

  if (!build) {
    return res.status(404).send("Build not found");
  }

  res.render("build", {
    portfolioData: build.portfolioData
  });
});





app.listen(3000,()=>{
    console.log('running');
});