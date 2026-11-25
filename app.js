const seedEvents = [
 {id:1,title:"Build Night: Web Edition",category:"Technology",date:"2026-12-04",venue:"Innovation Lab",description:"A hands-on evening to build, share and learn with fellow makers.",icon:"💻"},
 {id:2,title:"Open Mic & Poetry",category:"Arts",date:"2026-12-07",venue:"Student Activity Centre",description:"Bring a poem, a song or simply come along to enjoy the performances.",icon:"🎤"},
 {id:3,title:"Campus 5K Run",category:"Sports",date:"2026-12-10",venue:"University Sports Ground",description:"Get moving, meet new people and finish strong together.",icon:"🏃"},
 {id:4,title:"Culture Connect",category:"Culture",date:"2026-12-14",venue:"Central Lawn",description:"Celebrate the many cultures, stories and traditions on campus.",icon:"🌏"},
 {id:5,title:"Career Starter Workshop",category:"Career",date:"2026-12-17",venue:"Seminar Hall 2",description:"Practical tips for resumes, interviews and your first internship.",icon:"🚀"},
 {id:6,title:"Design Thinking Jam",category:"Technology",date:"2026-12-20",venue:"Design Studio",description:"Team up to turn everyday campus problems into fresh ideas.",icon:"💡"}
];
const clubs = [
 {name:"Tech Society",icon:"💻",desc:"Build projects, explore emerging tech and learn together."},
 {name:"Creative Collective",icon:"🎨",desc:"A home for design, photography, art and creative expression."},
 {name:"Sports Union",icon:"⚽",desc:"Find a team, stay active and compete in friendly matches."},
 {name:"Culture Circle",icon:"🌍",desc:"Share traditions, celebrate diversity and make connections."}
];
const $ = id => document.getElementById(id);
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let events = read("cc_events", seedEvents);
let user = read("cc_user", null);
let registrations = read("cc_registrations", []);
let joinedClubs = read("cc_clubs", []);
let authMode = "signin";
const save = () => { localStorage.setItem("cc_events",JSON.stringify(events)); localStorage.setItem("cc_user",JSON.stringify(user)); localStorage.setItem("cc_registrations",JSON.stringify(registrations)); localStorage.setItem("cc_clubs",JSON.stringify(joinedClubs)); };
const dateLabel = value => new Date(value+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2400);}
function render(){
 $("welcomeText").textContent=user?`Hi, ${user.name.split(" ")[0]}`:"Welcome, Guest";
 $("authButton").textContent=user?"Sign out":"Sign in";
 $("eventCount").textContent=events.length;$("clubCount").textContent=clubs.length;$("myCount").textContent=registrations.length;
 const term=$("searchInput").value.toLowerCase(), category=$("categoryFilter").value;
 const shown=events.filter(e=>(category==="All"||e.category===category)&&(e.title+" "+e.description+" "+e.venue).toLowerCase().includes(term));
 $("eventGrid").innerHTML=shown.length?shown.map(e=>`<article class="event-card"><div class="event-cover">${e.icon||"✨"}</div><div class="event-body"><span class="tag">${e.category}</span><h3>${escapeHTML(e.title)}</h3><div class="event-meta"><span>📅 ${dateLabel(e.date)}</span><span>📍 ${escapeHTML(e.venue)}</span></div><p>${escapeHTML(e.description)}</p><button class="btn btn-small" data-register="${e.id}">${registrations.includes(e.id)?"Registered ✓":"Register now"}</button></div></article>`).join(""):"<p class='empty-state'>No events match your search. Try another keyword or category.</p>";
 $("clubGrid").innerHTML=clubs.map(c=>`<article class="club-card"><div class="club-icon">${c.icon}</div><h3>${c.name}</h3><p>${c.desc}</p><button class="text-button" data-club="${c.name}">${joinedClubs.includes(c.name)?"Joined ✓":"Join club →"}</button></article>`).join("");
 $("myRegistrations").innerHTML=registrations.length?registrations.map(id=>{const e=events.find(x=>x.id===id);return e?`<div class="registration-row"><div><b>${escapeHTML(e.title)}</b><small>${dateLabel(e.date)} · ${escapeHTML(e.venue)}</small></div><span>✓</span></div>`:"";}).join(""):"<div class='empty-state'>No registrations yet. Explore events to get started.</div>";
 $("profilePanel").innerHTML=user?`<b>${escapeHTML(user.name)}</b><p class="muted">${escapeHTML(user.email)}</p><p class="muted">${escapeHTML(user.department||"Department not added")} · ${escapeHTML(user.year||"Year not added")}</p>`:"<div class='empty-state'>Sign in to view your student profile.</div>";
 $("feedbackEvent").innerHTML=events.map(e=>`<option value="${e.id}">${escapeHTML(e.title)}</option>`).join("");
}
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("authButton").addEventListener("click",()=>{if(user){user=null;save();render();toast("You have signed out.");}else{authMode="signin";$("authTitle").textContent="Sign in";$("switchAuth").textContent="Create account";$("authName").closest("label").hidden=true;$("authDepartment").closest("label").hidden=true;$("authDialog").showModal();}});
$("switchAuth").addEventListener("click",()=>{authMode=authMode==="signin"?"signup":"signin";$("authTitle").textContent=authMode==="signup"?"Create your account":"Sign in";$("switchAuth").textContent=authMode==="signup"?"I already have an account":"Create account";$("authName").closest("label").hidden=authMode==="signin";$("authDepartment").closest("label").hidden=authMode==="signin";$("authName").required=authMode==="signup";});
$("authForm").addEventListener("submit",e=>{if(e.submitter?.classList.contains("close"))return;e.preventDefault();const email=$("authEmail").value.trim();if(authMode==="signup"||!user){user={name:$("authName").value.trim()||email.split("@")[0],email,department:$("authDepartment").value.trim(),year:""};}else{user.email=email;user.name=$("authName").value.trim()||email.split("@")[0];}save();$("authDialog").close();$("authForm").reset();render();toast("Welcome to CampusConnect!");});
$("searchInput").addEventListener("input",render);$("categoryFilter").addEventListener("change",render);
$("eventGrid").addEventListener("click",e=>{const b=e.target.closest("[data-register]");if(!b)return;if(!user){toast("Please sign in first.");$("authButton").click();return;}const id=Number(b.dataset.register);if(registrations.includes(id)){toast("You are already registered.");return;}registrations.push(id);save();render();toast("You're registered. See you there!");});
$("clubGrid").addEventListener("click",e=>{const b=e.target.closest("[data-club]");if(!b)return;if(!user){toast("Please sign in to join a club.");$("authButton").click();return;}const name=b.dataset.club;if(joinedClubs.includes(name))joinedClubs=joinedClubs.filter(x=>x!==name);else joinedClubs.push(name);save();render();toast(joinedClubs.includes(name)?`You joined ${name}.`:`You left ${name}.`);});
$("createEventButton").addEventListener("click",()=>{if(!user){toast("Please sign in to create an event.");$("authButton").click();return;}$("eventDialog").showModal();});
$("eventForm").addEventListener("submit",e=>{e.preventDefault();const item={id:Date.now(),title:$("newEventName").value.trim(),category:$("newEventCategory").value,date:$("newEventDate").value,venue:$("newEventVenue").value.trim(),description:$("newEventDescription").value.trim(),icon:"✨"};if(item.date<new Date().toISOString().slice(0,10)){toast("Choose a future date.");return;}events.unshift(item);save();$("eventDialog").close();$("eventForm").reset();render();toast("Your event has been published.");});
$("editProfileButton").addEventListener("click",()=>{if(!user){toast("Please sign in first.");$("authButton").click();return;} $("profileName").value=user.name;$("profileDepartment").value=user.department||"";$("profileYear").value=user.year||"";$("profileDialog").showModal();});
$("profileForm").addEventListener("submit",e=>{e.preventDefault();user.name=$("profileName").value.trim();user.department=$("profileDepartment").value.trim();user.year=$("profileYear").value.trim();save();$("profileDialog").close();render();toast("Profile updated.");});
$("feedbackForm").addEventListener("submit",e=>{e.preventDefault();if(!user){toast("Please sign in to submit feedback.");return;}const feedback=read("cc_feedback",[]);feedback.push({eventId:Number($("feedbackEvent").value),rating:Number($("feedbackRating").value),comment:$("feedbackText").value.trim(),email:user.email});localStorage.setItem("cc_feedback",JSON.stringify(feedback));$("feedbackText").value="";$("feedbackMessage").textContent="Thanks! Your feedback has been saved on this device.";});
render();
