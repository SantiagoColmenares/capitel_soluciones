document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll("h1, p, a").forEach(element => {
        observer.observe(element);
    });
});


function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("hidden");
    setTimeout(() => {
        modal.classList.add("opacity-100");
        modal.classList.remove("opacity-0");
        modal.querySelector("div").classList.add("scale-100");
        modal.querySelector("div").classList.remove("scale-90");
    }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    modal.querySelector("div").classList.add("scale-90");
    modal.querySelector("div").classList.remove("scale-100");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}


document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-10");
                entry.target.classList.add("opacity-100", "translate-y-0");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("section > div").forEach(el => observer.observe(el));
});