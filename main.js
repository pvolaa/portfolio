// Année du pied de page
document
    .querySelectorAll(".year")
    .forEach(el => el.textContent = new Date().getFullYear());

// Menu burger
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
    burger.addEventListener("click", () => {
        const open = navLinks
            .classList
            .toggle("open");
        burger.setAttribute("aria-expanded", open);
    });
    navLinks.addEventListener("click", e => {
        if (e.target.tagName === "A") 
            navLinks
                .classList
                .remove("open");
        }
    );
}

// Bordure de la barre de navigation au défilement
const navbar = document.getElementById("navbar");
if (navbar) 
    window.addEventListener(
        "scroll",
        () => navbar.classList.toggle("scrolled", window.scrollY > 10),
        {passive: true}
    );

// Apparition des éléments .reveal (et déclenchement des barres de compétences)
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e
                .target
                .classList
                .add("visible");
            io.unobserve(e.target);
        }
    }), {threshold: 0.15});
    items.forEach(el => io.observe(el));
} else {
    items.forEach(el => el.classList.add("visible"));
}

// Impression du CV
const printBtn = document.getElementById("printCv");
if (printBtn) 
    printBtn.addEventListener("click", () => window.print());

// Formulaire : validation puis ouverture de la messagerie
const form = document.getElementById("contactForm");
if (form) {
    const msg = document.getElementById("formMsg");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const nom = form
                .nom
                .value
                .trim(),
            email = form
                .email
                .value
                .trim(),
            texte = form
                .message
                .value
                .trim();
        if (nom.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || texte.length < 10) {
            msg.textContent = "Vérifiez votre nom, votre e-mail et saisissez un message d'au moins 10 caractè" +
                    "res.";
            msg.className = "form-msg err";
            return;
        }
        msg.textContent = "Ouverture de votre messagerie…";
        msg.className = "form-msg ok";
        const sujet = encodeURIComponent(form.sujet.value + " – " + nom);
        const corps = encodeURIComponent(texte + "\n\n" + nom + " (" + email + ")");
        window.location.href = "mailto:pcondeey@gmail.com?subject=" + sujet +
                "&body=" + corps;
    });
}