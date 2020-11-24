"use strict";

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
        //Add omouseover event listener to fetch definition
        tooltip.addEventListener("mouseover",  () => fetchDefinition(word.innerText));

        //Create span for the tooltipText
        const tooltipText = document.createElement("span");
        //Set style for the element
        tooltipText.classList.add("tooltip-text");
        //Set id for this element
        tooltip.setAttribute("id", `${word.innerText}-tooltip`);
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

//Function which fetches definition of a word from the Wordnik API
function fetchDefinition(word){
    //First check if the definition has already been fetchd
    //If so -> return
    if(document.getElementById(`${word}-tooltip`).innerText !== "View") return;


    const APIKey = "5ns9momoyv3b2af81kb1p5g3yc5nn3ccwpmrnjtssetblfipv";
    const data = new Promise((resolve, reject) => {
        fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${APIKey}`)
            .then(response => resolve(response.json()))
            .catch(err => {
                console.log(`Definition for ${word} could not be fetched.`);
                reject(err);
            });

    });

    data.then(response =>{
        const ul = "<ul>"
        //Iterate through all definitions and build HTML which will be applied to the tooltip
        let result = response.reduce((acc, elem) => {
            return acc += "<li>" + elem.text + "</li>";
        }, ul);

        result += "</ul>";
        document.getElementById(`${word}-tooltip`).innerHTML = result;

    })

}