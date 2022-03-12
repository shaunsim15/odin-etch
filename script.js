// Creates a text bullet over the slider which shows the grid dimensions
function showSliderValue() {
    bullet.textContent = `${slider.value} x ${slider.value}`;
    let bulletPosition = (slider.value - (slider.max - slider.min) / 2) / slider.max; // bulletPosition ranges from -0.5 to +0.5
    bullet.style.left = `${bulletPosition * getSliderCSSWidth()}px`; // Sets the left position of the bullet
}

// Gets the width (defined in CSS) of the slider element
function getSliderCSSWidth() {
    return (Number(getComputedStyle(slider).getPropertyValue('width').slice(0,-2)));
}

// Generates a fresh grid of divs based on the current slider value
function generateDivs(){
    // Remove any child nodes that are alrd there
    while (sketchContainer.hasChildNodes()) {
        sketchContainer.removeChild(sketchContainer.lastChild);
      }

    let totalSquares = slider.value*slider.value;
    let squaresPerSide = slider.value;
    let fractionString = "";

    // Define length and width of each square (fractional units)
    for (let i = 0; i < squaresPerSide; i++){
        fractionString = fractionString + "1fr "; // could also say + "auto ";
    }
    sketchContainer.style.gridTemplateColumns = fractionString;
    sketchContainer.style.gridTemplateRows = fractionString;

    /// Create mini-divs
    for (let i = 0; i < totalSquares; i++){
        const div = document.createElement('div');
        div.addEventListener('mouseenter',changeDivColor);
        sketchContainer.appendChild(div);
    }
}

// Changes the color of the div to either black, gradual, rainbow or white(erase) based on the colorStatus
function changeDivColor(e){
    if (colorStatus === "black" || colorStatus === "white") {
        e.target.style.backgroundColor = colorStatus;
    }
    else if (colorStatus === "gradual"){

        // If the backgroundColor is an empty string / null / undefined (falsy value), make the cell 10% black.
        if (!e.target.style.backgroundColor){
            e.target.style.backgroundColor = "rgb(230, 230, 230)";
        }
        // Else if the backgroundColor has an existing color, extract these r,g,b values and return them 10% blacker.
        else{
            let colorString = e.target.style.backgroundColor;
            let cutColorString = colorString.slice(colorString.indexOf("(") + 1 , colorString.indexOf(")"));
            let colorArray = cutColorString.split(", ");

            // Function either subtracts 25 from an r,g,b value, OR, if value is too low, set it to 0 to avoid -ve numbers
            colorArray.forEach(function (colorVal, colorIndex){
                if (Number(colorVal) > 30){
                    colorArray[colorIndex] = Number(colorVal) - 25;
                }
                else{
                    colorArray[colorIndex] = 0;
                }
            })
            e.target.style.backgroundColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
        }
    }
    else if (colorStatus === "rainbow"){
        let redVal = Math.floor(Math.random()*256);
        let greenVal = Math.floor(Math.random()*256);
        let blueVal = Math.floor(Math.random()*256);
        let rainbowColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
        e.target.style.backgroundColor = rainbowColor;
    }
}

// Updates the colorStatus value and updates button pressed appearance based on what button the user has pressed
function defineColor(e){
    if (e.target.classList.contains('black')){
        colorStatus = "black";
        black.classList.add('active');
        gradual.classList.remove('active');
        rainbow.classList.remove('active');
        erase.classList.remove('active');
    }
    else if (e.target.classList.contains('gradual')){
        colorStatus = "gradual";
        black.classList.remove('active');
        gradual.classList.add('active');
        rainbow.classList.remove('active');
        erase.classList.remove('active');
    }
    else if (e.target.classList.contains('rainbow')){
        colorStatus = "rainbow";
        black.classList.remove('active');
        gradual.classList.remove('active');
        rainbow.classList.add('active');
        erase.classList.remove('active');
    }
    else if (e.target.classList.contains('erase')){
        colorStatus = "white";
        black.classList.remove('active');
        gradual.classList.remove('active');
        rainbow.classList.remove('active');
        erase.classList.add('active');
    }
}

// Define important elements with variables and set initial pen type to black
const slider = document.querySelector(".slider");
const bullet = document.querySelector(".bullet");
const sketchContainer = document.querySelector(".sketch-container");
const black = document.querySelector(".black");
const gradual = document.querySelector(".gradual");
const rainbow = document.querySelector(".rainbow");
const erase = document.querySelector(".erase");
const reset = document.querySelector(".reset");
let colorStatus = "black";
black.classList.add('active');

// Sets the bullet value to the initial HTML slider value (35) when the page loads
bullet.textContent = `${slider.value} x ${slider.value}`;

// Sets the bullet value to the live slider value when user input is registered
slider.addEventListener('input',showSliderValue)

// Generates div grid when page loads the 1st time, and subsequently whenever the slider value is changed
generateDivs();
slider.addEventListener('input',generateDivs);

// Updates the colorStatus value based on what button the user has pressed
black.addEventListener('click',defineColor);
gradual.addEventListener('click',defineColor);
rainbow.addEventListener('click',defineColor);
erase.addEventListener('click',defineColor);

// Make cursor change to pointer when hovering over button
black.style.cursor = "pointer";
gradual.style.cursor = "pointer";
rainbow.style.cursor = "pointer";
erase.style.cursor = "pointer";
reset.style.cursor = "pointer";

// When reset button is pressed, resets the div grid by generating a fresh grid
reset.addEventListener('click',generateDivs);