const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index, direction = 1) {
  const prev = slides[current];
  const next = slides[index];

  gsap.to(prev, {
    opacity: 0,
    scale: 1.05,
    duration: 0.6,
    ease: "power2.out"
  });

  gsap.fromTo(
    next,
    { opacity: 0, scale: 1 },
    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
  );

  prev.classList.remove("active");
  next.classList.add("active");
  current = index;
}

document.getElementById("next").addEventListener("click", () => {
  const nextIndex = (current + 1) % slides.length;
  showSlide(nextIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
});

/* Fade-up animations */
gsap.from(".fade-up", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15
});
