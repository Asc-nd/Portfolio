document.addEventListener("DOMContentLoaded", () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    function createLazyImage(photo, container) {
        const img = document.createElement('img');
        img.dataset.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.classList.add('lazy');
        img.onload = () => img.classList.add('loaded');
        container.appendChild(img);
        imageObserver.observe(img);
    }

    // Load digital photos
    fetch('images/digital.json')
        .then(response => response.json())
        .then(data => {
            const digitalDiv = document.getElementById('digital');
            data.forEach(photo => createLazyImage(photo, digitalDiv));
        })
        .catch(error => console.error('Error loading digital photos:', error));

    // Load film photos
    fetch('images/film.json')
        .then(response => response.json())
        .then(data => {
            const filmDiv = document.getElementById('film');
            data.forEach(photo => createLazyImage(photo, filmDiv));
        })
        .catch(error => console.error('Error loading film photos:', error));

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG" && e.target.parentElement.classList.contains("photos")) {
            lightboxImg.src = e.target.src || e.target.dataset.src;
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
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
