document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for lazy loading (fallback for older browsers)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;  // Load the image
                img.classList.remove('lazy');  // Optional: remove lazy class for styling
                observer.unobserve(img);  // Stop observing once loaded
            }
        });
    });

    // Helper function to create lazy-loaded images
    function createLazyImage(photo, container) {
        const img = document.createElement('img');
        img.dataset.src = photo.src;  // Store src in data attribute
        img.alt = photo.alt;
        img.loading = 'lazy';  // Native lazy loading
        img.classList.add('lazy');  // Optional: for styling unloaded images
        container.appendChild(img);
        
        // Observe for intersection (fallback)
        imageObserver.observe(img);
    }

    // Load digital photos
    fetch('digital.json')
        .then(response => response.json())
        .then(data => {
            const digitalDiv = document.getElementById('digital');
            data.forEach(photo => createLazyImage(photo, digitalDiv));
        })
        .catch(error => console.error('Error loading digital photos:', error));

    // Load film photos
    fetch('film.json')
        .then(response => response.json())
        .then(data => {
            const filmDiv = document.getElementById('film');
            data.forEach(photo => createLazyImage(photo, filmDiv));
        })
        .catch(error => console.error('Error loading film photos:', error));

    // Existing lightbox code (updated for dynamic images)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Use event delegation for dynamically added images
    document.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG" && e.target.parentElement.classList.contains("photos")) {
            lightboxImg.src = e.target.src || e.target.dataset.src;  // Use src if loaded, else data-src
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
