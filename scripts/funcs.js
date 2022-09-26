function hideElements(ids){
    ids.forEach(e => {
        document.getElementById(e).style.display = "none";
    });
}

function shuffleArray(array){
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function playSound(name){
    const sound = new Audio("sound/"+name+".mp3");
    sound.volume = 0.2;
    sound.play();
}