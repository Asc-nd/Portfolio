document.addEventListener("DOMContentLoaded", () => {
    // Load digital photos
    fetch('digital.json')
        .then(response => response.json())
        .then(data => {
            const digitalDiv = document.getElementById('digital');
            data.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.src;
                img.alt = photo.alt;
                digitalDiv.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading digital photos:', error));

    // Load film photos
    fetch('film.json')
        .then(response => response.json())
        .then(data => {
            const filmDiv = document.getElementById('film');
            data.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.src;
                img.alt = photo.alt;
                filmDiv.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading film photos:', error));

    // Existing lightbox code (updated for dynamic images)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Use event delegation for dynamically added images
    document.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG" && e.target.parentElement.classList.contains("photos")) {
            lightboxImg.src = e.target.src;
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
