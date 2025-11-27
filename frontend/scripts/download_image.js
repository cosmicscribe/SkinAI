
const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("c:/Users/anirb/Downloads/skin-ai/frontend/public/cyber_bg.jpg");
const request = https.get("https://i.ibb.co/RpGDGvfq/gradient-cyber-futuristic-background-23-2149117429.jpg", function (response) {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log("Download completed");
    });
});
