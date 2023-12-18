// Updated image URLs to the correct public path
const images = [
    'https://storage.cloud.google.com/herenohere-intro/1.jpg',
    'https://storage.cloud.google.com/herenohere-intro/2.jpg',
    'https://storage.cloud.google.com/herenohere-intro/3.jpg',
    'https://storage.cloud.google.com/herenohere-intro/4.jpg'
];

let sequenceIndex = 0;
const imageElement = document.getElementById('current-image');
imageElement.src = images[sequenceIndex]; // Load the first image initially

function updateImage() {
    sequenceIndex = (sequenceIndex + 1) % images.length;
    let nextImageSrc = images[sequenceIndex];
    
    let newImage = new Image();
    newImage.onload = () => {
        imageElement.src = nextImageSrc;
        setTimeout(() => {
            imageElement.style.opacity = 1;
        }, 250); // Start fading in the new image before the old one completely fades out
    };
    newImage.src = nextImageSrc;
}

setInterval(updateImage, 1500); // Update the image every second