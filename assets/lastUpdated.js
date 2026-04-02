document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.split("/").pop() || "index.html";

    fetch(`https://api.github.com/repos/Asc-nd/Portfolio/commits?path=${path}&per_page=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const commitDate = new Date(data[0].commit.committer.date);

                const element = document.getElementById("last-updated");
                if (element) {
                    element.textContent = commitDate.toLocaleString();
                }
            }
        })
        .catch(error => console.error("Error:", error));
});