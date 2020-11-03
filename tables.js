function generateTable(tableID, words) {
    const table = document.getElementById(tableID);
    const tbody = document.createElement("tbody");
    for(let currWord of words){
        const row = document.createElement("tr");
        const word = document.createElement("td");
        word.innerHTML = currWord;

        //Create TD for the definition
        const definitionTD = document.createElement("td");
        //Create div for the tooltip container
        const tooltip = document.createElement("div");
        //Tooltip container's text
        tooltip.innerText = "View";
        //Add tooltip class to the element
        tooltip.classList.add("tooltip");

        //Create span for the tooltipText
        const tooltipText = document.createElement("span");
        //Set style for the element
        tooltipText.classList.add("tooltip-text");
        //Loader must be shown before the word's definition is fetched from the API
        const loader = document.createElement("div");
        loader.classList.add("loader");

        tooltipText.appendChild(loader);
        tooltip.appendChild(tooltipText)
        definitionTD.appendChild(tooltip);

        row.appendChild(word);
        row.appendChild(definitionTD);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    table.style.display = "table";
}

function generateTables(passedWords) {
    generateTable('table-correct', passedWords.correct);
    generateTable('table-incorrect', passedWords.incorrect);
}