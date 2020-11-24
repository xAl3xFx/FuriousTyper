"use strict";

const loadHighScores = () => {

    if(!window.localStorage.highscores){
        document.getElementById("highscore-table").style.display = "none";
        document.getElementById("highscore-error").innerText = "There are no highs cores yet";
        document.getElementById("highscore-error").style.display = "flex";
        return;
    }

    let highScores = JSON.parse(window.localStorage.highscores);

    function comparator(a,b){
        if(a.score > b.score){
            return -1;
        }else if(b.score > a.score){
            return 1;
        }else{
            return a.accuracy > b.accuracy ? -1 : 1;
        }
    }

    highScores = highScores.sort(comparator);

    const table = document.getElementsByTagName("table")[0];
    const tbody = table.querySelector("tbody");

    let result = "";
    let counter = 1;
    for(let score of highScores){
        result += "<tr>";
        result += `<td> ${counter++} </td>`
        result += `<td> ${score.name} </td>`
        result += `<td> ${score.score} </td>`
        result += `<td> ${score.accuracy} </td>`
        result += `<td> ${score.correctWords} </td>`
        result += `<td> ${score.wrongWords} </td>`
        result += `<td> ${new Date(score.dateAndTime).toLocaleString()} </td>`
        result += "</tr>"
    }

    tbody.innerHTML = result;
};