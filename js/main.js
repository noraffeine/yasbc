document.addEventListener("DOMContentLoaded", () => {
    
    
    var letters = "efmu"; 
    
    var words = ["merciful", "perfumed", "farmhouse", "muffled", "furthermore", "motherfucker", "manufacturers", "magnifique", "manufactured", "fume", "masterful", "dumbfounded", "malfunctioned", "meaningful", "perfumes", "fumes", "manufacturer", "muffler", "fundamentals", "formulate", "misfortunes", "uniformed", "remorseful", "foursome", "shamefully", "fumble", "unfathomable", "unconfirmed", "referendum", "formulated", "mercifully", "camouflage", "mummified", "uncomfortable", "fundamentally", "fumigate", "fulfilment", "fundamental", "shameful", "uninformed", "fundamentalists", "perfume", "manufactures", "femur", "misfortune", "fumigated", "muffle", "fulfilment", "circumference", "fumbled", "camouflaged", "fundamentalist", "manufacture"];
    //var words = ["fume","farmhouse","femur"]
    var currentWordArr = [];
    var availablePoints = 0;
    var keyBox = document.getElementById("key-box")
    keyBox.classList.add("animate__animated");
    var pointsDisplay = document.getElementById("points-text")
    var progressBar = document.getElementById("bar-show")
    var numWordsFound = document.getElementById("words-found")
    var wordColumnsDisplay = document.getElementById("word-columns")
    //var cursor = document.getElementById("cursor")
    keyBox.textContent = '|';
    keyBox.classList.add("blinking-cursor");
    var gottenPoints = 0;
    var foundWords = [];
    var pointsMap = {};
    words.forEach(w => {
        let points = calculatePoints(w, letters);
        pointsMap[w] = points
        availablePoints = availablePoints + points
        });
    console.log(pointsMap)
    console.log(availablePoints)
    console.log(words.length)



    createSquares(letters);
    var help_modal = document.getElementById("instructions-container")
    var helpButton = document.getElementById("help-button")
    var span = document.getElementsByClassName("close")[0];
    helpButton.onclick = function() {
        help_modal.style.display = "block";

      }
      
      // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     help_modal.style.display = "none";
    //   }
      
      // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == help_modal) {
            help_modal.style.display = "none";
        }
      }
    window.addEventListener("keyup", checkKeyPressed, false);

    function checkKeyPressed(evt) {
        if (foundWords.length < words.length){
            if (evt.keyCode == "13") {
                handleSubmitWord();
                return;
            }
            if (evt.keyCode == "8") {
                handleDeleteLetter();
                return;
            }
            else{
                char = String.fromCharCode(evt.keyCode).toLowerCase()
                if(/[a-z]/.test(char)){
                    updateCurrentWord(char)
                    keyBox.classList.remove("blinking-cursor");
                }
            }
        }   
    }


    function updatePoints(word){
        let points = pointsMap[word]
        gottenPoints = gottenPoints + points
        animatePoints(points);

        pointsDisplay.textContent = gottenPoints;
        if (foundWords.length == 1){
            numWordsFound.textContent = `You have found ${foundWords.length} word`
        }
        if (foundWords.length > 1){
            numWordsFound.textContent = `You have found ${foundWords.length} words`
        }
        
        let progress = (gottenPoints/availablePoints)*100;
        progressBar.style.width = `${progress}%`

    }

    function updateCurrentWordDisplay(){
        let currentWord = currentWordArr.join('')
        keyBox.textContent = currentWord;
    }
    function updateCurrentWord(char){
        currentWordArr.push(char);
        updateCurrentWordDisplay();
    }
    function handleDeleteLetter(){
        if(currentWordArr.length >0){
            currentWordArr.pop()
            updateCurrentWordDisplay();
        }
    }
    function revertDisplay(){
        //revert keybox back to blinking cursor display
        keyBox.classList.add("blinking-cursor");
        keyBox.textContent = '|';
    }
    function sortDisplay(){
        //Sort the found words alphabetically
        foundWords.sort()
        for (var i = 0; i < foundWords.length; i++){
            let w = document.getElementById("w" + String(i+1))
            w.textContent = foundWords[i]
        }
    }
    function updateFoundWordsDisplay(word){
        let li = document.createElement("li");
        wordColumnsDisplay.appendChild(li)
        let w = document.createElement("span");
        w.setAttribute("id", "w" + String(foundWords.length));
        w.classList.add("found-word");
        w.textContent = word;
        li.appendChild(w)
    }
    function handleSubmitWord(){
        let currentWord = currentWordArr.join('')
        currentWordArr = []; 
        if(words.includes(currentWord)){
            foundWords.push(currentWord) 
            updateFoundWordsDisplay();
            sortDisplay();
            updatePoints(currentWord);

            if(foundWords.length < words.length){
                const timeout = setTimeout(revertDisplay, 850);
            }
            if(foundWords.length == words.length){
                keyBox.textContent = 'completed';
            }
            
        }
        if(!words.includes(currentWord)){
            animateWrong();
            const timeout = setTimeout(revertDisplay, 850);
        }
        

    }
    function checkWord(){

    }

    const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = element;

        node.classList.add(animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(animationName);
        resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
    const animatekek = (element, animationName) =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const node = element;
        node.classList.add(animationName);
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(animationName);
        resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
    function animateWrong(){
        animateCSS(keyBox, 'headShake')
    }

    function animatePoints(points){
        let el = document.getElementById("plus");
        el.textContent = `+${points}`
        animatekek(el, "k1Animate")
    }

    function createSquares(letters){
        const gameBoard = document.getElementById("letter-board")
        for (var i = 0; i < letters.length; i++){
                var c = letters.charAt(i);
                let Square = document.createElement("div");
                Square.classList.add("square");
                Square.setAttribute("id", String(i+1));
                Square.textContent = c;
                gameBoard.appendChild(Square)
            }
    };
    function calculatePoints(w, letters){
        let letterCount = {};
        //let map = {4:1, 5:1, 6:1, 7:2, 8:2, 9:2, 10:3, 11:3, 12:3, 9:)
        let points = 0;
        for (var i = 0; i < letters.length; i++){
            letterCount[letters[i]] = 0;
        }
        for (var i = 0; i < w.length; i++){
            if (letters.includes(w[i])){
                letterCount[w[i]] = letterCount[w[i]]+1;
                points = points + 1;
            } 
        }
        
        if (w.length == 4){
            points = points + 1;
        }
        if (w.length > 4){
            points = points + (w.length - 3);
        }
        return points - letters.length

    }
});