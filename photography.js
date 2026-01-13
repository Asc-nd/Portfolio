document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const images = document.querySelectorAll(".photos img");

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    lightbox.addEventListener("click", () => {
        closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImg.src = "";
        document.body.style.overflow = "";
    }
});
