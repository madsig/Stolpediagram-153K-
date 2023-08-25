// model
const contentElement = document.getElementById('content');
let numbers = [7, 3, 1, 5, 8];
let chosenBar = "Ingen"; // Variabel for hvilken stolpe som er valgt
let inputValue = ''; // Variabel for hva som er skrevet i input-feltet
const disabled = ['', 'disabled']
let addDisabled = 0;
let chosenDisabled = 1;
let feedback = '';

// view
updateView();
function updateView() {
    chosenDisabled = chosenBar !== 'Ingen' ? 0 : 1
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i + 1);
    }
    contentElement.innerHTML = /*HTML*/`
        <svg id="chart" width="500" viewBox="0 0 301 102">
            ${svgInnerHtml}
        </svg><br/>
        Valgt stolpe: <i>${chosenBar}</i>
        <br />
        Verdi:
        <input type="number" min="1" max="10" oninput="inputValue = this.value" />
        <button id="addButton" ${disabled[addDisabled]}>Legg til stolpe</button><br />
        <button id="changeButton" ${disabled[chosenDisabled]}>Endre valgt stolpe</button>
        <button id="removeButton" ${disabled[chosenDisabled]}>Fjerne valgt stolpe</button>
        <div id="feedback">
            <p>${feedback}</p>    
        </div>
    `;
}

function createBar(number, barNo) {
    const width = 8;
    const spacing = 2;
    let x = (barNo - 1) * (width + spacing) + 1;
    if (x > 190) {
        addDisabled = 1;
        feedback = 'Max stolper nådd';
    }
    let barClass = chosenBar == barNo ? "class='selected'" : "";
    let height = number * 10;
    let y = 100 - height + 1;
    let color = calcColor(1, 10, barNo);

    return `<rect id="barNum${barNo}" data-bar="${barNo}" width="${width}" height="${height}"
            x="${x}" y="${y}" fill="${color}" ${barClass}></rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

// controller
contentElement.addEventListener("click", function (event) {
    const barNum = event.target.getAttribute("data-bar");

    if (barNum) handleClick(barNum);
    else if (event.target.id == 'addButton') addBar();
    else if (event.target.id == 'changeButton') changeBar();
    else if (event.target.id == 'removeButton') removeBar();
});


function handleClick(barNum) {
    if (chosenBar === barNum) {
        resetSelected();
        inputValue = '';
        updateView();
    }
    else {
        resetSelected();
        console.log(barNum);
        chosenBar = barNum;
        updateView();
    }
}


function addBar() {
    if (inputValue === '') {
        feedback = 'Ugyldig tall';
        resetSelected();
        updateView();
        return;
    }
    numbers.push(parseInt(inputValue));
    console.log(numbers);
    resetSelected();
    feedback = '';
    updateView();
}
function changeBar() {
    if (inputValue === '') {
        feedback = 'Ugyldig tall';
        resetSelected();
        updateView();
        return;
    }
    numbers[chosenBar - 1] = inputValue;
    resetSelected();
    feedback = '';
    updateView();
}
function removeBar() {
    numbers.splice(chosenBar - 1, 1);
    resetSelected();
    feedback = '';
    updateView();
}
function resetSelected() {
    chosenBar = "Ingen";
    inputValue = '';
}