document.addEventListener("DOMContentLoaded", () => {
    
    
    var letters = "efmu"; 
    
    var words = ["merciful", "perfumed", "farmhouse", "muffled", "furthermore", "motherfucker", "manufacturers", "magnifique", "manufactured", "fume", "masterful", "dumbfounded", "malfunctioned", "meaningful", "perfumes", "fumes", "manufacturer", "muffler", "fundamentals", "formulate", "misfortunes", "uniformed", "remorseful", "foursome", "shamefully", "fumble", "unfathomable", "unconfirmed", "referendum", "formulated", "mercifully", "camouflage", "mummified", "uncomfortable", "fundamentally", "fumigate", "fulfilment", "fundamental", "shameful", "uninformed", "fundamentalists", "perfume", "manufactures", "femur", "misfortune", "fumigated", "muffle", "fulfilment", "circumference", "fumbled", "camouflaged", "fundamentalist", "manufacture"];
    var currentword = '';
    var availablePoints = 0;
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