fetch("https://api.github.com/repos/Asc-nd/Portfolio/commits?per_page=1")
    .then(response => response.json())
    .then(data => {
        const date = new Date(data[0].commit.committer.date);
        document.getElementById("last-updated").textContent =
            date.toLocaleDateString();
    })
    .catch(error => {
        console.error("Error fetching commit data:", error);
    });