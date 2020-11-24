"use strict";

const handlePage = () => {
    console.log(location.href)
    let page = location.href;
    page = page.split("/").slice(-1)[0];
    page = page.substring(0, page.indexOf(".html"));
    document.getElementById("menu-"+page).classList.add("menu-item-active");
}

const startCounting = () => {
    fetch('text')
        .then(response => response.json())
        .then(data => {
            // Do something with your data
            console.log(data);
        });
    var seconds = 0;
        this.timer = setInterval(function () {
        seconds++;
        document.getElementById("secondsLabel").innerText = seconds;

    }, 1000)
};

const focusInputBox = () => {
    document.getElementById("input-box").focus()
};

const stopCounting = () => {
    clearInterval(this.timer);
};

const saveScore = () => {
    const name = document.getElementById("name").value;
    console.log(name);
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