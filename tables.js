function generateTable(tableID, words) {
    const table = document.getElementById(tableID);
    const tbody = document.createElement("tbody");
    for(let currWord of words){
        const row = document.createElement("tr");
        const word = document.createElement("td");
        word.innerText = currWord;

        const definition = document.createElement("td");
        definition.innerText = "View";

        row.appendChild(word);
        row.appendChild(definition);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    table.style.display = "table";
}

function generateTables(passedWords) {
    generateTable('table-correct', passedWords.correct);
    generateTable('table-incorrect', passedWords.incorrect);
}