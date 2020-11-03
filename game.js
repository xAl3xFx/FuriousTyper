this.currentWord = "";
this.timerStarted = false;
this.correctWords = 0;
this.wrongWords = 0;
this.wpm = 0;
this.secondsPassed = 0;

function init(){
    const text = document.getElementById("text-box").innerText;
    this.currentWord = text.split(" ").filter(el => el !== "")[0];

    const inputElement = document.getElementById("input-box");
    inputElement.addEventListener("keydown", function(e){handleBackspace(e)} );
    inputElement.addEventListener("input", function (e) {handleInputChange(e)});
}

function renderTimer() {
    var c = document.getElementById("timer");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    ctx.beginPath();
    ctx.font = "35px Arial";
    ctx.arc(75, 75, 70, 1.5 * Math.PI, 3.5 * Math.PI);
    ctx.fillText(60, 55, 85);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff1e6";
    ctx.stroke();
}

function startTimer() {
    //When timer is started, it means that the user has started typing
    //so we need to remove the blinking caret
    const blinkingCaret = document.getElementById("blinking-cursor");
    blinkingCaret.parentElement.removeChild(blinkingCaret);

    this.timerStarted = true;
    let startAngleCoef = 1.5;
    //100 because when setInterval fires for first time, at least 100 seconds would have passed
    let tenthsPassed = 100;

    const timer = setInterval(function () {
        var c = document.getElementById("timer");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 150, 150);
        ctx.beginPath();
        ctx.font = "35px Arial";
        ctx.arc(75, 75, 70, startAngleCoef * Math.PI, 3.5 * Math.PI);
        ctx.fillText(60 - this.secondsPassed, 55, 85);
        ctx.stroke();
        startAngleCoef += 0.003333333;
        if(tenthsPassed === 900){
            this.secondsPassed++;
            tenthsPassed = 0;
        }else{
            tenthsPassed += 100;
        }

        if(this.secondsPassed === 61) clearInterval(timer);
    }, 100);
}

//Handler for written word
//Increment wrong/right word counter
//Calculate WPM
function handleWordWritten(wordCorrect){
    //Update correct/wrong words count
    wordCorrect ? this.correctWords ++ : this.wrongWords ++;

    //Calculate WPM
    this.wpm = parseInt(this.correctWords / (this.secondsPassed / 60)) || 0;

    //Set WPM label
    document.getElementById("wpm").innerText = this.wpm;

}

//Function to handle backspace
function handleBackspace(event){
    //Check if backspace is pressed
    if(event.key === "Backspace"){
        //Get input word from user
        const inputValue = document.getElementById("input-box").innerText;

        //If input is empty -> return
        if (!inputValue) return;

        const lastChar = inputValue[inputValue.length - 1];
        //Decide if current character should be inserted in the text.
        if(this.currentWord[inputValue.length - 1] === lastChar && isWordValid(true)){
            //Get current text
            const text = document.getElementById("text-box").innerText;

            //Insert the deleted character to the text
            const newText = lastChar + text;
            document.getElementById("text-box").innerText = newText;
        }

        //Finally validate word and apply styles
        fixInputStyle(true);
    }
}

function handleSpace(){
    //Get input word from user
    let inputValue = document.getElementById("input-box").innerText;

    //Important to prevent deleting next word.
    if(inputValue.length === 0) return;

    //If user input = " " then return
    if((inputValue.length === 1 && inputValue.charCodeAt(0) === 160) || inputValue.charAt(0) === " ") return 0;

    //Remove last char because it is the space that has just been pressed
    inputValue = inputValue.substr(0, inputValue.length - 1);

    //Word is correct
    if(inputValue === this.currentWord){
        //Add this word to the prev container
        const prevWordsContainer = document.getElementById("previous-box");
        const wordSpan = document.createElement("span");
        wordSpan.innerText = inputValue;
        prevWordsContainer.appendChild(wordSpan);

        //Clear text from input box
        document.getElementById("input-box").innerText = "";

        //Trim remaining text
        const remainingText = document.getElementById("text-box").innerText;
        document.getElementById("text-box").innerText = remainingText.substr(remainingText.indexOf(" ") + 1)

        handleWordWritten(true);

        //Set next word
        init();
    }else{
        //Then the word is incorrect
        //Take user's input and add it to prev container and start next word
        const prevWordsContainer = document.getElementById("previous-box");
        const wordSpan = document.createElement("span");
        wordSpan.innerText = inputValue;
        wordSpan.style.textDecoration = "line-through";
        prevWordsContainer.appendChild(wordSpan);

        //Clear text from input box
        document.getElementById("input-box").innerText = "";

        //Trim remaining text
        const remainingText = document.getElementById("text-box").innerText;
        document.getElementById("text-box").innerText = remainingText.substr(remainingText.indexOf(" ") + 1)

        handleWordWritten(false);

        //Set next word
        init();
    }
}

//Function to handle text insertion
function handleInputChange(event){
    //First, start the timer if not started.
    if(!this.timerStarted){
        startTimer();
    }

    //Get input word from user
    const inputValue = document.getElementById("input-box").innerText;

    //Check if backspace is pressed
    //If so return because we have
    //Different handler for backspace
    if(event.inputType === "deleteContentBackward") return;

    //Check if input value is space
    else if(event.data.charAt(0) === " " || event.data.charCodeAt(0) === 160){
        //If user input is just equal to " " return and clear input
        if((inputValue.length === 1 && inputValue.charCodeAt(0) === 160) || inputValue.charAt(0) === " ") {
            document.getElementById("input-box").innerText = "";
            return 0;
        }

        //Else handle space
        handleSpace();
    }

    //Get last character
    const lastChar = inputValue[inputValue.length - 1];

    //Get current text
    const text = document.getElementById("text-box").innerText;

    //Get first character
    const firstChar = text[0];

    //Compare user's last character and current text's first character
    if(isWordValid(false) && (lastChar === firstChar || (firstChar.charCodeAt(0) === 32 && lastChar.charCodeAt(0) === 160))){
        //Remove first character from text
        const newText = text.substr(1);

        //Set new text
        document.getElementById("text-box").innerText = newText;
    }

    //Finally validate word and apply styles
    fixInputStyle(false);
}

//Function to validate if the word that user is currently typing is correct substring of the word that he is typing.
//${backSpace} - This parameter is used to determine whether to compare with the input length or input length - 1
//Because when text is being written/inserted, handleInputChange function is fired when the input is updated, a.k.a
//It uses the updated value of the input, while when handleBackspace is fired it is using the outdated one.
function isWordValid(backSpace){
    const inputValue = document.getElementById("input-box").innerText;

    //If the word is longer than the actual word it is wrong.
    if(inputValue.length > this.currentWord.length) return false;

    //Word is complete
    if(inputValue === this.currentWord) return true;

    let diff;
    if(backSpace)
        diff = findFirstDiffPos(inputValue.substr(0, inputValue.length - 1), this.currentWord);
    else
        diff = findFirstDiffPos(inputValue, this.currentWord);

    if (backSpace){
        return diff === inputValue.length - 1;
    }
    return diff === inputValue.length;

}

//Function to manage input style /*whether line through or normal */
//${backSpace} - This parameter is required for isWordValid function.
function fixInputStyle(backSpace){
    const wordValid = isWordValid(backSpace);
    const inputElement = document.getElementById("input-box");
    //Input is correct
    if(wordValid){
        //Input has wrong style
        if(inputElement.classList.contains("wrong")){
            //Remove wrong style
            inputElement.classList.remove("wrong");
        }
    }
    //Input is incorrect
    else{
        //Input hasn't wrong style
        if(!inputElement.classList.contains("wrong")){
            //Add wrong style
            inputElement.classList.add("wrong");
        }
    }
}

//Function to compare two strings and find first differing character
function findFirstDiffPos(a, b){
    const shorterLength = Math.min(a.length, b.length);

    for (let i = 0; i < shorterLength; i++){
        if (a[i] !== b[i]) return i;
    }

    if (a.length !== b.length) return shorterLength;

    return -1;
}