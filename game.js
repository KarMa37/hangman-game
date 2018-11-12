let motto = "superman is superhero";
motto = motto.toLowerCase().split("");
let mottoHidden = "";
let lettersArray = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
let noHitIt = 0;

for (let i = 0; i < motto.length; i++) {
    motto[i] === " " ? mottoHidden = `${mottoHidden} ` : mottoHidden = `${mottoHidden}-`;
}

function showMotto() {
    document.getElementById("motto-id").innerHTML = mottoHidden;
}


function letters() {
    let alphabet = "";
    for (let i = 0; i < 26; i++) {
        let element = "letter_" + i;
        alphabet = alphabet + '<div class="letter-normal" id="' + element + '" onclick="checkIt(' + i + ')"><div class="greater-width">' + lettersArray[i] + '</div></div>';
    }
    document.getElementById("letters-id").innerHTML = alphabet;
    showMotto();
}

window.onload = letters;

String.prototype.changeDash = function (index, letter) {
    if (index > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, index) + letter + this.substr(index + 1);
    }
};


function checkIt(num) {
    let hitIt = false;
    let element = "letter_" + num;
    for (let i = 0; i < motto.length; i++) {
        if (motto[i] === lettersArray[num]) {
            mottoHidden = mottoHidden.changeDash(i, lettersArray[num]);
            hitIt = true;
        }
    }
    if (hitIt === true) {
        document.getElementById(element).classList.add('letter-green');
        showMotto();
    } else {
        document.getElementById(element).classList.add('letter-red');
        document.getElementById(element).setAttribute('onclick', '');
        noHitIt++;
        document.getElementById('graphic-id').classList.remove(`graphic_${noHitIt - 1}`);
        document.getElementById('graphic-id').classList.add(`graphic_${noHitIt}`);
    }

    if (motto.join("") === mottoHidden) {
        document.getElementById('letters-id').classList.remove('letters');
        document.getElementById('letters-id').classList.add('after-letters');
        document.getElementById('letters-id').innerHTML = '<p class="smaller">Perfect! This is it: </p>' + motto.join("") + '<br><br><span class="reset" onclick="location.reload()"> Play again</span>';
    }

    if (noHitIt >= 8) {
        document.getElementById('letters-id').classList.remove('letters');
        document.getElementById('letters-id').classList.add('after-letters');
        document.getElementById('letters-id').innerHTML = '<p class="smaller">Nope! It should be: </p>' + motto.join("") + '<br><br><span class="reset" onclick="location.reload()"> Play again</span>';
    }
}