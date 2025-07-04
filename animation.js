    document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-animation-wrap]").forEach((container) => {
      gsap.set(container, { opacity: 1 });

      const animationDuration =
        parseFloat(container.getAttribute("data-animation-duration")) || 1;

      const elements = Array.from(container.querySelectorAll("[data-animation]"))
        .filter((el) => el.getAttribute("data-animation")?.trim() !== "")
        .sort(
          (a, b) =>
            parseFloat(a.getAttribute("data-animation")) -
            parseFloat(b.getAttribute("data-animation"))
        );

      const totalElements = elements.length;
      const staggerTime = animationDuration / totalElements;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          x: (i, el) => {
            const type = el.getAttribute("data-animation-type") || "slide-bottom";
            return type === "slide-left"
              ? "-2rem"
              : type === "slide-right"
              ? "2rem"
              : 0;
          },
          y: (i, el) => {
            const type = el.getAttribute("data-animation-type") || "slide-bottom";
            return type === "slide-bottom"
              ? "2rem"
              : type === "slide-up"
              ? "-2rem"
              : type === "slide-down"
              ? "2rem"
              : 0;
          },
          scale: (i, el) => {
            const type = el.getAttribute("data-animation-type") || "slide-bottom";
            return type === "scale-down" ? 0.8 : type === "scale-up" ? 1.2 : 1;
          },
          rotate: (i, el) => {
            const type = el.getAttribute("data-animation-type") || "slide-bottom";
            return type === "rotate" ? 45 : 0;
          },
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: staggerTime,
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    document.querySelectorAll("[data-animation-reset]").forEach((resetEl) => {
      resetEl.addEventListener("click", () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 700);
      });
    });
});
