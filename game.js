let motto = "superman is superhero";
motto = motto.toUpperCase().split("");
let mottoHidden = "";

for (let i = 0; i < motto.length; i++) {
    motto[i] === " " ? mottoHidden = `${mottoHidden} ` : mottoHidden = `${mottoHidden}-`;
}

function showMotto() {
    document.getElementById("motto-id").innerHTML = mottoHidden;
}

function letters() {
    let alphabet = "";
    let lettersArray = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
    for (let i = 0; i < 25; i++) {
        alphabet = alphabet + '<div class="letter"><div class="greater-width">'+lettersArray[i]+'</div></div>';
    }
    document.getElementById("letters-id").innerHTML = alphabet;
    showMotto();
}

window.onload = letters;