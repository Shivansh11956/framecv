
let currentMode = "editor";  
let currentDevice = "desktop"; 

const editorPanel = document.getElementById("editorPanel");
const previewArea = document.getElementById("previewArea");
const previewFrame = document.getElementById("previewFrame");
const sidebar = document.getElementById("sidebar");

function openSection(name, el){
  document.querySelectorAll(".tab-icon").forEach(i=>i.classList.remove("active"));
  el.classList.add("active");

  document.querySelectorAll(".section").forEach(s=>s.style.display="none");
  document.getElementById("sec-" + name).style.display = "block";
}

function setMode(mode, el){
  currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  applyMode();
}

function setDevice(d, el){
  currentDevice = d;
  document.querySelectorAll(".dev-btn").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  applyDevice();
}

function applyMode(){
  const isMobile = window.innerWidth <= 820;

  if(currentMode === "editor"){
    if(isMobile){
      sidebar.style.display = "flex";
      editorPanel.style.display = "block";
      previewArea.style.display = "none";
    } else {
      sidebar.style.display = "flex";
      editorPanel.style.display = "block";
      previewArea.style.display = "flex";
    }

    
    document.querySelector(".device-toggle").style.display =
      isMobile ? "none" : "flex";

  } else {
    
    editorPanel.style.display = "none";
    previewArea.style.display = "flex";

    
    document.querySelector(".device-toggle").style.display = "none";

    
    sidebar.style.display = "none";
}

  applyDevice();
}

function applyDevice(){
  if(currentDevice === "desktop"){
    previewFrame.style.width = "100%";
    previewFrame.style.margin = "0";
    previewFrame.style.borderRadius = window.innerWidth <= 820 ? "0" : "8px";
  } else {
    const w = Math.min(420, window.innerWidth - 40);
    previewFrame.style.width = w + "px";
    previewFrame.style.margin = "20px auto";
    previewFrame.style.borderRadius = "18px";
  }
}

window.addEventListener("resize", applyMode);


previewFrame.srcdoc = "<html><body style='margin:0;background:#fff;font-family:system-ui'></body></html>";

applyMode();
let skillsaddbtn = document.querySelector('#skillsaddbtn');
let skillscontainer = document.querySelector('#sec-skills')
skillsaddbtn.addEventListener('click',()=>{
    const row = document.createElement("div");
    row.className = "form-row";
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.gap = "7px";

    row.innerHTML = `
        <input type="text" value="New Skill">
        <span class="remove-btn" style="padding: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #dd524b; border-radius: 11px;">
            <i class="bi bi-x-lg"></i>
        </span>
    `;
    skillscontainer.appendChild(row);
})
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const row = btn.closest(".form-row");
    if (row) row.remove();
});


function addProject() {
    const container = document.getElementById("sec-projects");

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <div class="project-header" style="padding-left:0;">
            <span>VISE - Investment Tracking and Analytics Suite</span>
            <span class="delete-card"><i class="bi bi-trash"></i></span>
        </div>

        <label>Title</label>
        <input type="text" value="VISE - Investment Tracking and Analytics">

        <label>Description</label>
        <textarea rows="3">Monitor mutual funds, bonds, and fixed deposits. Enables automated tracking based on NAV targets and maturity dates, with email alerts.</textarea>

        <label>Preview URL</label>
        <input type="text" value="https://example.com/vise-website">

        <label>Repository URL</label>
        <input type="text" value="https://example.com/vise-repo">

        <div class="tags-row" style="display:flex; flex-direction:row; align-items:center; justify-content:space-between; padding:0; margin-bottom:15px;">
            <span>Tags</span>
            <span class="add-tag-btn">＋ Add</span>
        </div>

        <div class="tags-list" style="padding:0;">
            ${createTagItem("NodeJS")}
            ${createTagItem("ExpressJS")}
            ${createTagItem("MongoDB")}
        </div>
    `;

    container.appendChild(card);
}


function createTagItem(name = "New Tag") {
    return `
        <div class="tag-item" style="padding-left:0; padding-right:0; display:flex; flex-direction:row; gap:7px; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <input type="text" value="${escapeHtml(name)}" style="margin-top:0; margin-bottom:0; flex:1; min-width:0;"/>
            <span class="remove-tag" style="padding:10px; display:flex; justify-content:center; align-items:center; cursor:pointer; color:#dd524b; border-radius:11px;">
                <i class="bi bi-x-lg"></i>
            </span>
        </div>
    `;
}


function escapeHtml(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}


document.addEventListener("click", function (e) {

    
    const delCardBtn = e.target.closest(".delete-card");
    if (delCardBtn) {
        const card = delCardBtn.closest(".project-card");
        if (card) card.remove();
        return;
    }

  
    const addTagBtn = e.target.closest(".add-tag-btn");
    if (addTagBtn) {
        const card = addTagBtn.closest(".project-card");
        if (!card) return;
        const list = card.querySelector(".tags-list");
        if (!list) return;

        
        const tagName = "New Tag";
        if (tagName === null) return;

        
        list.insertAdjacentHTML("beforeend", createTagItem(tagName.trim() || "New Tag"));
        return;
    }

    
    const removeTagBtn = e.target.closest(".remove-tag");
    if (removeTagBtn) {
        const tagItem = removeTagBtn.closest(".tag-item");
        if (tagItem) tagItem.remove();
        return;
    }
});

function addExperience() {
    const container = document.getElementById("sec-experience");

    const card = document.createElement("div");
    card.className = "experience-card";

    card.innerHTML = `
        <div class="experience-header" style="padding-left:0;">
            <span>New Company</span>
            <span class="delete-card"><i class="bi bi-trash"></i></span>
        </div>

        <label>Company</label>
        <input type="text" value="New Company">
        <label>Position</label>
        <input type="text" value="Position Title">
        <label>Period</label>
        <input type="text" value="MM/YYYY-Present">
        <label>Description</label>
        <textarea rows="3">Description of your role and responsibilities..</textarea>
    `;

    container.appendChild(card);
}

document.addEventListener("click", function (e) {

    
    const delCardBtn = e.target.closest(".delete-card");
    if (delCardBtn) {
        const card = delCardBtn.closest(".experience-card");
        if (card) card.remove();
        return; 
    }
});

