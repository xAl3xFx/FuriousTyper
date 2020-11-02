document.addEventListener("DOMContentLoaded", function() {
    var request = new XMLHttpRequest();

    request.open('GET', '/FuriousTyper/header.html', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;

            document.getElementById("header").innerHTML = resp;
        }
    };

    request.send();
});