const fs = require('fs');
const path = require('path');

const digitalDir = path.join(__dirname, 'images', 'digital');
const filmDir = path.join(__dirname, 'images', 'film');

function generateJSON(dir, outputFile) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        const photos = files
            .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
            .map(file => ({
                src: `images/${path.basename(dir)}/${file}`,
                alt: path.parse(file).name
            }));
        fs.writeFileSync(outputFile, JSON.stringify(photos, null, 2));
        console.log(`Generated ${outputFile}`);
    });
}

generateJSON(digitalDir, 'digital.json');
generateJSON(filmDir, 'film.json');