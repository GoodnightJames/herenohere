const images = [
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/1.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/2.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/3.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/4.jpg?raw=true'
  ];
  

let sequenceIndex = 0;
let direction = 1; // Direction of the sequence; 1 for forward, -1 for backward
const imageElement = document.getElementById('current-image');

function preloadImages(urls, allImagesLoadedCallback) {
    let loadedCounter = 0;
    let toBeLoadedNumber = urls.length;
    urls.forEach(function(url) {
        let img = new Image();
        img.onload = function() {
            loadedCounter++;
            if (loadedCounter === toBeLoadedNumber) {
                allImagesLoadedCallback();
            }
        };
        img.src = url;
    });
}

function updateImage() {
    sequenceIndex += direction;
    
    // Reverse direction at the ends of the sequence
    if (sequenceIndex >= images.length - 1 || sequenceIndex <= 0) {
        direction *= -1;
    }
    
    // Start loading next image
    let nextImageSrc = images[sequenceIndex];
    let newImage = new Image();
    newImage.onload = function() {
        // Swap the image source
        imageElement.src = nextImageSrc;
    };
    newImage.src = nextImageSrc;
    
    // Fade out and in
    imageElement.classList.add('fade');
    setTimeout(() => {
        imageElement.classList.remove('fade');
    }, 500); // Corresponds to the CSS transition duration
}

preloadImages(images, function() {
    imageElement.src = images[0]; // Load the first image initially
    imageElement.classList.remove('fade');
    setInterval(updateImage, 2000); // Update the image every 2 seconds
});
