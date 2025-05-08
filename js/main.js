// user enters a color name or hex
// api fetches the color data
// it will return rgb or lab to look for pantone api
// show the match, pantone color, hex, etc 

// api used = https://www.thecolorapi.com/

//get the color input field from the page
//get the button that the user clicks to search
//get the results area where we’ll show the color match
const colorInput = document.getElementById('colorInput')
const submitColorButton = document.getElementById('submitColor')
const resultsSection = document.getElementById('results')

// add an event listener for the submit color button
submitColorButton.addEventListener('click', handleColorSubmit)

// function for the submit button when click
function handleColorSubmit() {
  const userColor = colorInput.value.replace('#', '').trim()


//  clear previous results
resultsSection.textContent = ''


// fetch api 
fetch(`https://www.thecolorapi.com/id?hex=${userColor}`)
  .then(response => response.json())
  .then(colorData => {
    const rgb = colorData.rgb.value;
    const name = colorData.name.value;
    const hex = colorData.hex.value;
    const pantoneMatch = findPantoneMatch({
      r: colorData.rgb.r,
      g: colorData.rgb.g,
      b: colorData.rgb.b
    });

    //create a section in the html to create a swatch 
    const colorBox = document.createElement('div')
    colorBox.classList.add('color-box')
    colorBox.style.backgroundColor = hex
    // for the colorname 
    const namePara = document.createElement('p');
    namePara.textContent = `Color Name: ${name}`;
    //for the hex 
    const hexPara = document.createElement('p');
    hexPara.textContent = `Hex: ${hex}`;
    // for rgb
    const rgbPara = document.createElement('p');
    rgbPara.textContent = `RGB: ${rgb}`;
    // pantone
    const pantonePara = document.createElement('p');
    pantonePara.textContent = `Pantone Match (simulated): ${pantoneMatch}`;
    // loop to add elements 
    const elements = [colorBox, namePara, hexPara, rgbPara, pantonePara];
    for (let i = 0; i < elements.length; i++) {
      resultsSection.appendChild(elements[i]);
    }
  })
  .catch(error => {
    const errorPara = document.createElement('p');
    errorPara.textContent = 'Something went wrong. Try another color.';
    resultsSection.appendChild(errorPara);
    console.error(error);
  });
}

// function for rgb 
function findPantoneMatch(rgb) {
  const { r, g, b } = rgb
  if (r > 200 && g < 100 && b < 100) return "Pantone 186 C (Red)";
  if (r < 100 && g > 200 && b < 100) return "Pantone 354 C (Green)";
  if (r < 100 && g < 100 && b > 200) return "Pantone 2935 C (Blue)";
  if (r > 200 && g > 200 && b < 100) return "Pantone 101 C (Yellow)";
  return "Pantone Cool Gray 1 C (Neutral)";
}
