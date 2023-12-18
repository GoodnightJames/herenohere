const images = [
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/01.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/02.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/03.jpg?raw=true',
    // Assuming 5 and 6 are also in the Images folder
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/04.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/05.jpg?raw=true',
    'https://github.com/GoodnightJames/herenohere/blob/main/Images/06.jpg?raw=true',
];

let sequenceIndex = 0; // Start with the first image
const imageElement = document.getElementById('current-image');

function preloadImages(urls, allImagesLoadedCallback) {
    let loadedCounter = 0;
    urls.forEach(function(url) {
        let img = new Image();
        img.onload = function() {
            loadedCounter++;
            if (loadedCounter === urls.length) {
                allImagesLoadedCallback();
            }
        };
        img.src = url;
    });
}

function getNextIndex() {
    // Increment or decrement the sequenceIndex based on the current image and sequence
    if (sequenceIndex === 2) {
        sequenceIndex++;
    } else if (sequenceIndex === 5) {
        sequenceIndex -= 2;
    } else if (sequenceIndex === 3 && direction === -1) {
        sequenceIndex--;
    } else {
        sequenceIndex += direction;
    }
}

function updateImage() {
    getNextIndex();
    
    let nextImageSrc = images[sequenceIndex];
    let newImage = new Image();
    newImage.onload = function() {
        imageElement.src = nextImageSrc;
    };
    newImage.src = nextImageSrc;
    
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
