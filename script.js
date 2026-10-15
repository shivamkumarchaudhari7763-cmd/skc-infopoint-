const portalData = {
  latest: [
    {title:"नई सरकारी योजनाओं और सेवाओं की जानकारी — आधिकारिक पोर्टल पर देखें", category:"अपडेट", date:"लिंक देखें", url:"https://www.india.gov.in/"},
    {title:"आधार से जुड़ी सेवाओं और अपडेट के लिए UIDAI पोर्टल", category:"सेवा", date:"आधिकारिक", url:"https://uidai.gov.in/"},
    {title:"डिजिटल सेवाओं और ऑनलाइन आवेदन की जानकारी", category:"ऑनलाइन सेवा", date:"आधिकारिक", url:"https://www.digitalindia.gov.in/"},
    {title:"किसान योजनाओं और कृषि सेवाओं की जानकारी", category:"किसान", date:"आधिकारिक", url:"https://pmkisan.gov.in/"},
    {title:"छात्रवृत्ति से संबंधित जानकारी के लिए National Scholarship Portal", category:"शिक्षा", date:"आधिकारिक", url:"https://scholarships.gov.in/"}
  ],
  jobs: [
    {title:"सरकारी नौकरियों की आधिकारिक सूचनाएँ — National Career Service", category:"नौकरी", date:"आधिकारिक", url:"https://www.ncs.gov.in/"},
    {title:"केंद्र सरकार की भर्ती सूचनाओं के लिए UPSC की वेबसाइट देखें", category:"UPSC", date:"आधिकारिक", url:"https://upsc.gov.in/"},
    {title:"स्टाफ सिलेक्शन कमीशन की भर्ती और नोटिस", category:"SSC", date:"आधिकारिक", url:"https://ssc.gov.in/"},
    {title:"रेलवे भर्ती से जुड़ी सूचनाओं के लिए RRB पोर्टल", category:"रेलवे", date:"आधिकारिक", url:"https://www.rrbcdg.gov.in/"},
    {title:"बिहार सरकार की आधिकारिक वेबसाइट पर विभागीय सूचनाएँ देखें", category:"बिहार", date:"आधिकारिक", url:"https://state.bihar.gov.in/"}
  ],
  results: [
    {title:"UPSC परीक्षा परिणाम और आधिकारिक घोषणाएँ", category:"रिजल्ट", date:"आधिकारिक", url:"https://upsc.gov.in/"},
    {title:"SSC परीक्षा परिणाम और नोटिस", category:"रिजल्ट", date:"आधिकारिक", url:"https://ssc.gov.in/"},
    {title:"बिहार विद्यालय परीक्षा समिति की आधिकारिक वेबसाइट", category:"बिहार बोर्ड", date:"आधिकारिक", url:"https://secondary.biharboardonline.com/"},
    {title:"राष्ट्रीय परीक्षा एजेंसी के परिणाम और घोषणाएँ", category:"परीक्षा", date:"आधिकारिक", url:"https://nta.ac.in/"}
  ],
  admit: [
    {title:"UPSC परीक्षा से संबंधित एडमिट कार्ड और परीक्षा नोटिस", category:"एडमिट कार्ड", date:"आधिकारिक", url:"https://upsc.gov.in/"},
    {title:"SSC परीक्षा के प्रवेश-पत्र और परीक्षा अपडेट", category:"एडमिट कार्ड", date:"आधिकारिक", url:"https://ssc.gov.in/"},
    {title:"रेलवे भर्ती परीक्षा की आधिकारिक सूचनाएँ", category:"रेलवे", date:"आधिकारिक", url:"https://www.rrbcdg.gov.in/"},
    {title:"NTA परीक्षा के एडमिट कार्ड और उम्मीदवार सूचना", category:"परीक्षा", date:"आधिकारिक", url:"https://nta.ac.in/"}
  ],
  admissions: [
    {title:"बिहार के विश्वविद्यालयों और उच्च शिक्षा की जानकारी", category:"प्रवेश", date:"आधिकारिक", url:"https://state.bihar.gov.in/"},
    {title:"कॉलेज और विश्वविद्यालय से जुड़ी UGC की जानकारी", category:"उच्च शिक्षा", date:"आधिकारिक", url:"https://www.ugc.gov.in/"},
    {title:"राष्ट्रीय छात्रवृत्ति पोर्टल पर छात्रवृत्ति आवेदन", category:"छात्रवृत्ति", date:"आधिकारिक", url:"https://scholarships.gov.in/"}
  ],
  schemes: [
    {title:"PM-KISAN योजना — पात्रता और लाभ की जानकारी", category:"किसान योजना", date:"आधिकारिक", url:"https://pmkisan.gov.in/"},
    {title:"आयुष्मान भारत PM-JAY — योजना की आधिकारिक जानकारी", category:"स्वास्थ्य", date:"आधिकारिक", url:"https://pmjay.gov.in/"},
    {title:"सरकारी योजनाओं की जानकारी — National Portal of India", category:"योजनाएँ", date:"आधिकारिक", url:"https://www.india.gov.in/"},
    {title:"बिहार सरकार की योजनाएँ और विभागीय सेवाएँ", category:"बिहार", date:"आधिकारिक", url:"https://state.bihar.gov.in/"}
  ]
};

const listIds = {latest:"latestList",jobs:"jobsList",results:"resultsList",admit:"admitList",admissions:"admissionsList",schemes:"schemesList"};
let activeQuery = "";
const expanded = new Set();

function renderList(key) {
  const target = document.getElementById(listIds[key]);
  if (!target) return;
  const all = portalData[key] || [];
  const filtered = all.filter(item => (item.title + " " + item.category).toLocaleLowerCase("hi").includes(activeQuery.toLocaleLowerCase("hi")));
  const visible = expanded.has(key) ? filtered : filtered.slice(0, 5);
  target.innerHTML = "";
  if (!visible.length) {
    target.innerHTML = '<li class="no-results">कोई मिलती-जुलती जानकारी नहीं मिली। दूसरे शब्द से खोजें।</li>';
    return;
  }
  visible.forEach(item => {
    const li = document.createElement("li");
    li.className = "update-item";
    const bullet = document.createElement("span");
    bullet.className = "bullet";
    bullet.setAttribute("aria-hidden","true");
    const content = document.createElement("div");
    content.className = "update-content";
    const link = document.createElement("a");
    link.className = "update-title";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.title;
    const meta = document.createElement("div");
    meta.className = "update-meta";
    const category = document.createElement("span");
    category.className = "update-category";
    category.textContent = item.category;
    const date = document.createElement("span");
    date.textContent = "↗ " + item.date;
    meta.append(category,date);
    content.append(link,meta);
    li.append(bullet,content);
    target.appendChild(li);
  });
}

function renderAll() {
  Object.keys(listIds).forEach(renderList);
}
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  activeQuery = document.getElementById("searchInput").value.trim();
  renderAll();
  const firstPanel = document.querySelector(".content-grid");
  firstPanel.scrollIntoView({behavior:"smooth",block:"start"});
});
document.querySelectorAll("[data-show-all]").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.showAll;
    if (expanded.has(key)) expanded.delete(key); else expanded.add(key);
    renderList(key);
    button.textContent = expanded.has(key) ? "कम देखें ↑" : "सभी देखें ↗";
  });
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderAll();
