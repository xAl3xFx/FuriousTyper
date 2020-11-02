var activeItem = "play";

function handleMenuClick(item){
    //Remove active style for previous item
    document.getElementById("menu-"+activeItem).classList.remove("menu-item-active");

    //Add active style for new item
    document.getElementById("menu-"+item).classList.add("menu-item-active");

    //Set new selected item
    activeItem = item;
}

function startCounting(){
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
}

function focusInputBox() {
    document.getElementById("input-box").focus()
}

function stopCounting(){
    clearInterval(this.timer);
}

