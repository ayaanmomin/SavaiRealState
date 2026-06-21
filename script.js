

function showPage(id, tabEl, fromMob) {
  
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");

  
  document.querySelectorAll(".nav-tab").forEach((t) => {
    t.classList.remove("active");
    if (t.dataset.page === id) t.classList.add("active");
  });

  
  document.querySelectorAll(".mob-tab").forEach((t) => {
    t.classList.remove("active");
    if (t.dataset.page === id) t.classList.add("active");
  });

  if (fromMob) closeMobNav();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openMobNav() {
  document.getElementById("mobNav").classList.add("open");
  document.body.style.overflow = "hidden"; 
}

function closeMobNav() {
  document.getElementById("mobNav").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobNav();
});

const properties = [
  {
    id: 1,
    type: "residential",
    name: "3 BHK Apartment",
    location: "Indirapuram, Ghaziabad",
    price: "₹58 Lakh",
    beds: 3,
    baths: 2,
    area: "1450 sq ft",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=75",
  },
  {
    id: 2,
    type: "residential",
    name: "2 BHK Ready to Move",
    location: "Vaishali, Ghaziabad",
    price: "₹42 Lakh",
    beds: 2,
    baths: 2,
    area: "1050 sq ft",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75",
  },
  {
    id: 3,
    type: "commercial",
    name: "Retail Shop Space",
    location: "Kaushambi, Ghaziabad",
    price: "₹35 Lakh",
    beds: null,
    baths: 1,
    area: "600 sq ft",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75",
  },
  {
    id: 4,
    type: "residential",
    name: "4 BHK Independent Villa",
    location: "Raj Nagar Ext., Ghaziabad",
    price: "₹1.2 Cr",
    beds: 4,
    baths: 3,
    area: "2800 sq ft",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75",
  },
  {
    id: 5,
    type: "plot",
    name: "Residential Plot",
    location: "Siddharth Vihar, Ghaziabad",
    price: "₹28 Lakh",
    beds: null,
    baths: null,
    area: "200 sq yd",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75",
  },
  {
    id: 6,
    type: "commercial",
    name: "Office Space",
    location: "Sector 63, Noida",
    price: "₹75 Lakh",
    beds: null,
    baths: 2,
    area: "1200 sq ft",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=75",
  },
];

function renderProps(filter) {
  const grid = document.getElementById("propsGrid");
  const list =
    filter === "all" ? properties : properties.filter((p) => p.type === filter);

  grid.innerHTML = list
    .map(
      (p) => `
    <div class="prop-card">
      <img class="prop-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="prop-body">
        <span class="prop-badge">${p.type}</span>
        <div class="prop-name">${p.name}</div>
        <div class="prop-loc"><i class="ti ti-map-pin"></i>${p.location}</div>
        <div class="prop-details">
          ${p.beds ? `<span class="prop-detail"><i class="ti ti-bed"></i>${p.beds} BHK</span>` : ""}
          ${p.baths ? `<span class="prop-detail"><i class="ti ti-bath"></i>${p.baths} Bath</span>` : ""}
          <span class="prop-detail"><i class="ti ti-ruler"></i>${p.area}</span>
        </div>
        <div class="prop-price">${p.price} <span>onwards</span></div>
        <button class="deal-btn"
          data-prop-name="${p.name}"
          data-prop-loc="${p.location}"
          onclick="openDeal(this.dataset.propName, this.dataset.propLoc)"
        >Make a Deal →</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function filterProps(type, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProps(type);
}

renderProps("all");

function openDeal(name, location) {
  
  const propName = name + " " + location;
  document.getElementById("modalPropName").textContent = propName;
  document.getElementById("dealProperty").value = propName;
  document.getElementById("dealSubject").value =
    "Deal Enquiry: " + propName + " Savai Real Estate";
  document.getElementById("dealMsg").textContent = "";
  document.getElementById("dealModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("dealModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("dealModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function openMap() {
  window.open("https://maps.app.goo.gl/VNarRmZe4ouwiWhX8", "_blank");
}

function handleForm(formId, msgId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const msg = document.getElementById(msgId);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msg.textContent = "Sending…";
    msg.style.color = "var(--gold)";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();

      if (data.success) {
        msg.textContent = "✓ Sent! We will contact you shortly.";
        msg.style.color = "#4caf50";
        form.reset();
        if (formId === "dealForm") setTimeout(closeModal, 2000);
      } else {
        msg.textContent = "Something went wrong. Please try WhatsApp.";
        msg.style.color = "#e24b4a";
      }
    } catch {
      msg.textContent = "Network error. Please try again.";
      msg.style.color = "#e24b4a";
    }
  });
}

handleForm("homeContactForm", "homeContactMsg");
handleForm("listForm", "listMsg");
handleForm("contactForm", "contactMsg");
handleForm("dealForm", "dealMsg");

(function () {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.scrollY;
    
    if (scrolled < window.innerHeight) {
      
      heroBg.style.transform = "translateY(" + scrolled * 0.18 + "px)";
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true },
  );
})();
