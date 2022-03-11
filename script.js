const slider = document.querySelector(".slider");
const bullet = document.querySelector(".bullet");
const sketchContainer = document.querySelector(".sketch-container");
const black = document.querySelector(".black");
const gradual = document.querySelector(".gradual");
const rainbow = document.querySelector(".rainbow");
const erase = document.querySelector(".erase");
const reset = document.querySelector(".reset");
let colorStatus = "black";

// Sets the bullet value to the initial HTML slider value (35) when the page loads
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

function changeDivColor(e){
    if (colorStatus === "black" || colorStatus === "white") {
        e.target.style.backgroundColor = colorStatus;
    }
    else if (colorStatus === "gradual"){
        console.log(e.target.style.backgroundColor);
        if (!e.target.style.backgroundColor){
            e.target.style.backgroundColor = "rgb(230, 230, 230)";
            console.log(e.target.style.backgroundColor);
        }
        else{
            let colorString = e.target.style.backgroundColor;
            let cutColorString = colorString.slice(colorString.indexOf("(") + 1 , colorString.indexOf(")"));
            let colorArray = cutColorString.split(", ");
            console.log(colorArray);
            colorArray.forEach(function (colorVal, colorIndex){
                if (Number(colorVal) > 30){
                    colorArray[colorIndex] = Number(colorVal) - 25;
                }
                else{
                    colorArray[colorIndex] = 0;
                }
                console.log(colorVal);
            })
            e.target.style.backgroundColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
            console.log(e.target.style.backgroundColor);
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

function defineColor(e){
    if (e.target.classList.contains('black')){
        colorStatus = "black";
    }
    else if (e.target.classList.contains('gradual')){
        colorStatus = "gradual";
    }
    else if (e.target.classList.contains('rainbow')){
        colorStatus = "rainbow";
    }
    else if (e.target.classList.contains('erase')){
        colorStatus = "white";
    }
}


generateDivs();

slider.addEventListener('input',generateDivs);

black.addEventListener('click',defineColor);
gradual.addEventListener('click',defineColor);
rainbow.addEventListener('click',defineColor);
erase.addEventListener('click',defineColor);

reset.addEventListener('click',generateDivs);

// let miniDivLength = `${100/slider.value}%`;
// Width of each mini div in pixels. Obtained with (sketch container width) / number of divs
// let miniDivWidth = Number(getComputedStyle(sketchContainer).getPropertyValue('width').slice(0,-2)) / slider.value;
// div.setAttribute('class','mini-div');
// div.style.width = miniDivLength;
// div.style.height = miniDivLength;
// div.style.gridTemplateColumns = ""

