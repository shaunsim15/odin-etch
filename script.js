let slider = document.querySelector(".slider");
let bullet = document.querySelector(".bullet");
let sketchContainer = document.querySelector(".sketch-container");

// Sets the bullet value to the initial HTML slider value (45) when the page loads
bullet.textContent = `${slider.value} x ${slider.value}`;

// Sets the bullet value to the live slider value when user input is registered
slider.addEventListener('input',showSliderValue)


function showSliderValue() {
    bullet.textContent = `${slider.value} x ${slider.value}`;
    let bulletPosition = (slider.value - (slider.max - slider.min) / 2) / slider.max; // bulletPosition ranges from -0.5 to +0.5
    bullet.style.left = `${bulletPosition * getSliderCSSWidth()}px`; // Sets the left position of the bullet
}


// 
function getSliderCSSWidth() {
    return (Number(getComputedStyle(slider).getPropertyValue('width').slice(0,-2)));
}

function generateDivs(){
    // Remove any child nodes that are alrd there
    while (sketchContainer.hasChildNodes()) {
        sketchContainer.removeChild(sketchContainer.lastChild);
      }

    let totalSquares = slider.value*slider.value;
    let miniDivLength = `${100/slider.value}%`

    /// Create mini-divs
    for (let i = 0; i < totalSquares; i++){
        
        const div = document.createElement('div');
        div.style.width = miniDivLength;
        div.style.height = miniDivLength;
        sketchContainer.appendChild(div);
    }
}
generateDivs();

slider.addEventListener('input',generateDivs);

// Width of each mini div in pixels. Obtained with (sketch container width) / number of divs
// let miniDivWidth = Number(getComputedStyle(sketchContainer).getPropertyValue('width').slice(0,-2)) / slider.value;
// div.setAttribute('class','mini-div');

