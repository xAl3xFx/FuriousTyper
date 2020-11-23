
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

