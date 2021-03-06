const startFunction = (function () {
    let motto = "";
    const categories = [
        ["fight club", "gladiator", "star wars", "alice in wonderland", "the godfather", "inception", "terminator", "equilibrium"],
        ["fallout", "neverhood", "civilization", "starcraft", "the witcher", "metal gear solid", "wolfenstein", "carmageddon"],
        ["gdynia", "kuala lumpur", "tegucigalpa", "las palmas", "barcelona", "reykjavik", "tashkent", "longyearbyen"]
    ];
    let chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    motto = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    console.log(motto);
    motto = motto.toLowerCase().split("");

    let mottoHidden = "";
    const lettersArray = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
    let noHitIt = 0;
    const maxHits = 7;

    const sounds = {
        positive: new Audio('music/positive.wav'),
        negative: new Audio('music/negative.wav')
    };

    let graphicWrapper = document.getElementById('graphic-id');
    let mottoWrapper = document.getElementById('motto-id');
    let lettersWrapper = document.getElementById('letters-id');
    let categoryName = document.getElementById('category-name');

    (function () {
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML = "Chosen category is film";
        } else if (chosenCategory === categories[1]) {
            categoryName.innerHTML = "Chosen category is game";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "Chosen category is city";
        }
    })();

    for (let i = 0; i < motto.length; i++) {
        motto[i] === " " ? mottoHidden = `${mottoHidden} ` : mottoHidden = `${mottoHidden}-`;
    }

    function showMotto() {
        mottoWrapper.innerHTML = mottoHidden;
    }

    (function letters() {
        let alphabet = "";
        for (let i = 0; i < 26; i++) {
            let element = `letter_${i}`;
            alphabet = `${alphabet}<div class="letter-normal" id="${element}" onclick="startFunction.checkIt(${i})"><div class="greater-width">${lettersArray[i]}</div></div>`;
        }
        lettersWrapper.innerHTML = alphabet;
        showMotto();
    })();

    String.prototype.changeDash = function (index, letter) {
        if (index > this.length - 1) {
            return this.toString();
        } else {
            return this.substr(0, index) + letter + this.substr(index + 1);
        }
    };

    let checkIt = function (num) {
        let hitIt = false;
        let element = "letter_" + num;
        let buttonsWrapper = document.getElementById(element);
        for (let i = 0; i < motto.length; i++) {
            if (motto[i] === lettersArray[num]) {
                mottoHidden = mottoHidden.changeDash(i, lettersArray[num]);
                hitIt = true;
            }
        }
        if (hitIt) {
            buttonsWrapper.classList.add('letter-green');
            sounds.positive.play();
            showMotto();
        } else {
            buttonsWrapper.classList.add('letter-red');
            buttonsWrapper.setAttribute('onclick', '');
            sounds.negative.play();
            noHitIt++;
            graphicWrapper.classList.remove(`graphic_${noHitIt - 1}`);
            graphicWrapper.classList.add(`graphic_${noHitIt}`);
        }

        if (motto.join("") === mottoHidden) {
            lettersWrapper.classList.remove('letters');
            lettersWrapper.classList.add('after-letters');
            lettersWrapper.innerHTML = '<p class="smaller">Perfect! This is it: </p>' + motto.join("") + '<br><br><span class="reset" onclick="location.reload()"> Play again</span>';
        } else if (noHitIt > maxHits) {
            lettersWrapper.classList.remove('letters');
            lettersWrapper.classList.add('after-letters');
            lettersWrapper.innerHTML = '<p class="smaller">Nope! It should be: </p>' + motto.join("") + '<br><br><span class="reset" onclick="location.reload()"> Play again</span>';
        }
    };
    return {
        checkIt: checkIt
    };
})();