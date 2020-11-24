"use strict";

const handlePage = () => {
    let page = location.href;
    page = page.split("/").slice(-1)[0];
    page = page.substring(0, page.indexOf(".html"));
    document.getElementById("menu-"+page).classList.add("menu-item-active");
};

const focusInputBox = () => {
    document.getElementById("input-box").focus()
};

const stopCounting = () => {
    clearInterval(this.timer);
};

const saveScore = () => {
    const name = document.getElementById("name").value;
    if(name.toLowerCase() === name){
        document.getElementById("error-message").innerText = "Name must contain at least one capital letter!"
    }else{
        document.getElementsByClassName("modal-wrapper")[0].style.display = "none";
        const highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        highscores.push({
            name: name,
            score: wpm,
            accuracy: parseInt(correctWords * 100 / ( correctWords + wrongWords)) || 0,
            wrongWords: wrongWords,
            correctWords: correctWords,
            dateAndTime: new Date()
        });

        window.localStorage.setItem('highscores', JSON.stringify(highscores));
    }
};