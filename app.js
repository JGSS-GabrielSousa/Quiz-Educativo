const questions = [geografia,astronomia];

function credits_screen(){
    document.getElementById("main-menu-btns").style.display = "none";
    document.getElementById("credits").style.display = "grid";
}

function back_main_menu(){
    document.getElementById("main-menu-btns").style.display = "grid";
    document.getElementById("credits").style.display = "none";
}

function game_bootstrap(){
    ;
}

function get_questions(category){
    for(let i = 0; i < questions.length; i++){
        const element = questions[i];

        if(element[0] == category){
            alert("gdgd");
        }
    }

    shuffleArray();
}

function shuffleArray(array){
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}