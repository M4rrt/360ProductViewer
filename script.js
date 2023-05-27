
const viewer = document.getElementById("viewer");
var currentIndex = 0;
var isScrolling = false;
var dragStartX = 0;
var dragStart = false;
var dragThreshold = 15;
var imagesEl = viewer.getElementsByTagName("img");
var images = [];

for (var i = 0; i < imagesEl.length; i++) {
  images.push(imagesEl[i]);
}

console.log(images);


// Exibe a primeira imagem
images[currentIndex].style.display = "block";

// Função para exibir a imagem atual
function showImage(index,hiddeImage) {
    images[hiddeImage].style.display= "none";
    images[index].style.display = "block";
}

// Função para exibir a imagem anterior
function showPreviousImage() {
    hiddeImage = currentIndex
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex,hiddeImage);
}

// Função para exibir a próxima imagem
function showNextImage() {
    hiddeImage = currentIndex
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex, hiddeImage);
}

// Function to handle side scroll event with delay
function onSideScroll(event) {
    var delta = Math.sign(event.deltaY);

    if (!isScrolling) {
        isScrolling = true;

        if (delta > 0) {
            showNextImage();
        } else if (delta < 0) {
            showPreviousImage();
        }

        setTimeout(function () {
            isScrolling = false;
        }, 5); // Adjust the delay time (in milliseconds) as needed
    }
}

// Function to handle drag event
function onDragStart(event) {
    dragStart = true;
    dragStartX = event.clientX;
}

function onDragMove(event) {
    if (dragStart) {
        var dragCurrentX = event.clientX;
        var deltaX = dragCurrentX - dragStartX;

        if (Math.abs(deltaX) >= dragThreshold) {
            if (deltaX > 0) {
                var steps = Math.floor(deltaX / dragThreshold);
                for (var i = 0; i < steps; i++) {
                    showNextImage();
                }
            } else if (deltaX < 0) {
                var steps = Math.floor(Math.abs(deltaX) / dragThreshold);
                for (var i = 0; i < steps; i++) {
                    showPreviousImage();
                }
            }

            dragStartX = dragCurrentX;
        }
    }
}

function onDragEnd(event) {
    dragStart = false;
    var dragEndX = event.clientX;
    var deltaX = dragEndX - dragStartX; 

    if (deltaX > dragThreshold) {
        showPreviousImage();
    } else if (deltaX < -dragThreshold) {
        showNextImage();
    }
}

function preventScroll(event) {
    event.preventDefault();
}



// Event listener for side scrolling
viewer.addEventListener("wheel", onSideScroll);
viewer.addEventListener("mousedown", onDragStart);
viewer.addEventListener("mousemove", onDragMove);
viewer.addEventListener("mouseup", onDragEnd);
viewer.addEventListener("mouseleave", onDragEnd);
viewer.addEventListener("wheel", preventScroll);