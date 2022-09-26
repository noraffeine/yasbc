document.addEventListener("DOMContentLoaded", () => {
    
    
    var letters = "efmu"; 
    
    var words = ["merciful", "perfumed", "farmhouse", "muffled", "furthermore", "motherfucker", "manufacturers", "magnifique", "manufactured", "fume", "masterful", "dumbfounded", "malfunctioned", "meaningful", "perfumes", "fumes", "manufacturer", "muffler", "fundamentals", "formulate", "misfortunes", "uniformed", "remorseful", "foursome", "shamefully", "fumble", "unfathomable", "unconfirmed", "referendum", "formulated", "mercifully", "camouflage", "mummified", "uncomfortable", "fundamentally", "fumigate", "fulfilment", "fundamental", "shameful", "uninformed", "fundamentalists", "perfume", "manufactures", "femur", "misfortune", "fumigated", "muffle", "fulfilment", "circumference", "fumbled", "camouflaged", "fundamentalist", "manufacture"];
    var currentWordArr = [];
    var availablePoints = 0;
    var keyBox = document.getElementById("key-box")
    var pointsDisplay = document.getElementById("points-text")
    var progressBar = document.getElementById("bar-show")
    var numWordsFound = document.getElementById("words-found")
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
    window.addEventListener("keyup", checkKeyPressed, false);

    function checkKeyPressed(evt) {
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
            }
        }
    }
    function updateCurrentWordDisplay(){
        let currentWord = currentWordArr.join('')
        keyBox.textContent = currentWord;
    }

    function updatePoints(word){
        gottenPoints = gottenPoints + pointsMap[word]

        pointsDisplay.textContent = gottenPoints;
        if (foundWords.length == 1){
            numWordsFound.textContent = `You have found ${foundWords.length} word`
        }
        if (foundWords.length > 1){
            numWordsFound.textContent = `You have found ${foundWords.length} words`
        }
        
        let progress = (gottenPoints/availablePoints)*100;
        console.log(progress)
        progressBar.style.width = `${progress}%`
        console.log(progressBar.style)
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

    function handleSubmitWord(){
        let currentWord = currentWordArr.join('')
        currentWordArr = []; 
        if(words.includes(currentWord)){
            console.log("correct")
            foundWords.push(currentWord)
            updateCurrentWordDisplay();
            updatePoints(currentWord);

        }
        }
    
    function checkWord(){

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