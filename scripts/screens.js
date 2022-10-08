function change_screen(screen){
    document.getElementById("main-menu").style.display = "none";

    switch (screen) {
        case "main-menu":
            hideElements(["credits","instructions","options","select-category"]);
            document.getElementById("main-menu").style.display = "grid";
            document.getElementById("title").innerText = "Quiz Educativo";
            document.getElementById("title").style.display = "block";
            break;

        case "instructions":
            document.getElementById("instructions").style.display = "block";
            document.getElementById("title").innerText = "Instruções";
            break;

        case "options":
            document.getElementById("options").style.display = "block";
            document.getElementById("title").innerText = "Opções";
            break;

        case "credits":
            document.getElementById("credits").style.display = "flex";
            document.getElementById("title").innerText = "Créditos";
            break;

        case "select-category":
            hideElements(["game-container"]);
            document.getElementById("select-category").style.display = "flex";
            document.getElementById("title").innerText = "Quiz Educativo";
            select_category_HTML();
            break;

        case "game-bootstrap":
            hideElements(["select-category","title"]);
            document.getElementById("game-container").style.display = "flex";
            question_HTML();
            break;

        case "end":
            hideElements(["game-container"]);
            document.getElementById("end-screen").style.display = "block";
            document.getElementById("title").style.display = "block";
            break;
    }
}

function endScreen(){
    change_screen("end");

    if(points == totalQuestions){
        document.getElementById("end-screen").innerHTML += `<h2>Parabéns!!! Você acertou todas as questões!</h2><h2>Você é Fera!!!</h2>`;
    }
    else if(points == 0){
        document.getElementById("end-screen").innerHTML += `<h2>Infelizmente você não acertou nenhuma questão :(</h2>`;
    }
    else{
        document.getElementById("end-screen").innerHTML += `<h2>Você acertou ${points} de ${totalQuestions} questões (${parseInt((points/totalQuestions)*100)}%)!</h2>`;
    }

    document.getElementById("end-screen").innerHTML += `<button onclick='document.location.reload("true")'>Reiniciar</button>`;
}