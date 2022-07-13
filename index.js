let prevScreen = "";
let currScreen = "";
let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.'];


let arr = document.querySelectorAll(".keys .col");
for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function () {
        sound();
        calculate(this.innerHTML);
    })
}

addEventListener('keydown', function (event) {
    sound();
    calculate(event.key);
})



let arr2 = document.querySelectorAll(".history-btn .col");
arr2[0].addEventListener('click', function () {
    sound();
    let element = document.querySelector('.history');
    element.style.padding = '0px';
    element.style.height = '0px';
    let history = document.querySelector('.keys');
    history.style.padding = '25px 10px';
    history.style.height = '400px';
})
arr2[1].addEventListener('click', function () {
    sound();
    document.querySelector(".history-content").innerHTML = '';
})




let history;
function func() {
    history = document.querySelectorAll(".his-ele");
    for (let i = 0; i < history.length; i++) {
        history[i].addEventListener('click', function () {
            sound();
            prevScreen = this.querySelectorAll('div')[0].innerHTML;
            currScreen = this.querySelectorAll('div')[1].innerHTML;
            document.querySelector(".previous-screen").innerHTML = prevScreen;
            document.querySelector(".current-screen").innerHTML = currScreen;
        })
    }
}


function calculate(eventKey) {
    if(currScreen == 'Infinity' || currScreen == 'NaN' || currScreen == 'Syntax error' || currScreen == 'undefined'){
        prevScreen = '';
        document.querySelector(".previous-screen").innerHTML = prevScreen;
        currScreen = '';
    }
    if (eventKey == '=' || eventKey == 'Enter') {
        prevScreen = currScreen;
        try {
            currScreen = String(eval(currScreen));
        } catch (error) {
            currScreen = "Syntax error";
        }
        document.querySelector(".previous-screen").innerHTML = prevScreen;
        document.querySelector(".history-content").innerHTML += "<div class='his-ele'><div>" + prevScreen + "</div><div>" + currScreen + "</div><hr></div>";
        func();
    } else if (eventKey == 'AC' || (eventKey == 'Backspace' && currScreen == "")) {
        currScreen = '';
        prevScreen = '';
        document.querySelector(".previous-screen").innerHTML = prevScreen;
    } else if (eventKey == 'C' || eventKey == 'Backspace') {
        currScreen = currScreen.slice(0, currScreen.length - 1);
    } else if (eventKey == 'His') {
        let element = document.querySelector('.keys');
        element.style.padding = '0px';
        element.style.height = '0px';
        let history = document.querySelector('.history');
        history.style.padding = '12px 5px';
        history.style.height = '400px';
    } else if (keys.includes(eventKey)) {
        currScreen += eventKey;
    }
    document.querySelector(".current-screen").innerHTML = currScreen;
}


function sound() {
    new Audio("audio/click.mp3").play();
}