document.addEventListener("DOMContentLoaded", function() {
    const headerSection = document.getElementById('headerSection');
    const img = document.getElementById('artImgUrl');

    // Crea un'istanza di Color Thief
    const colorThief = new ColorThief();

    // Carica l'immagine
    img.onload = function() {
        // Ottieni il colore dominante dall'immagine
        const dominantColor = colorThief.getColor(img);

        // Imposta lo sfondo del selettore dell'intestazione
        const rgbaColor1 = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.5)`;
        const rgbaColor2 = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.8)`;
        headerSection.style.background = `linear-gradient(180deg, ${rgbaColor1}, ${rgbaColor2})`;
    };

    // Imposta l'URL dell'immagine
    img.crossOrigin = 'Anonymous';
    img.src = './asset/Img/download.jpeg';
});
