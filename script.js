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

    // Width of each mini div in pixels. Obtained with (sketch container width) / number of divs
    let miniDivWidth = Number(getComputedStyle(sketchContainer).getPropertyValue('width').slice(0,-2)) / slider.value;

    /// Create mini-divs
    for (let i = 0; i < slider.value; i++){
        for (let j = 0; j < slider.value; j++){
            const div = document.createElement('div');
            div.setAttribute('class','mini-div');
            div.style.width = `${miniDivWidth}px`;
            div.style.height = `${miniDivWidth}px`;
            sketchContainer.appendChild(div);
        }
    }
}
generateDivs(slider.value);

slider.addEventListener('input',generateDivs);


