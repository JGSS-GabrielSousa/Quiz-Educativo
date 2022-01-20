var questions = [astronomia,geografia,geral,historia];

var actualQuestions;

let points = 0;
let actualQ = 0;
let totalQ = 0;

inQuestionDelay = false;

const MAX_QUESTIONS = 10;


function change_screen(screen){
    switch (screen) {
        case "main-menu":
            document.getElementById("main-menu-btns").style.display = "grid";
            document.getElementById("credits").style.display = "none";
            break;

        case "credits":
            document.getElementById("main-menu-btns").style.display = "none";
            document.getElementById("credits").style.display = "grid";
            break;

        case "game":
            document.getElementById("main-menu-btns").style.display = "none";
            document.getElementById("select-category").style.display = "flex";
            select_category_HTML();
            break;

        case "end":
            document.getElementById("question").style.display = "none";
            document.getElementById("end-screen").style.display = "flex";
            break;
    
        default:
            break;
    }
}

function game_bootstrap(){
    document.getElementById("select-category").style.display = "none";
    document.getElementById("question").style.display = "flex";

    question_HTML();
}

function select_category_HTML(){
    for(let i = 0; i < questions.length; i++){
        const element = questions[i];

        document.getElementById("select-category-options").innerHTML += `
            <button id="btn${i}" onclick="LoadGameCategory('${element[0]}')"">
                <p>${element[0]}</p>
            </button>
        `;
    }
}

function question_HTML(){
    document.getElementById("question").innerHTML = `
        <h3>Pergunta ${actualQ+1} de ${totalQ}</h3>
        <h2>${actualQuestions[0].pergunta}</h2>
        <div id="options">
            <button id="btn1" onclick="ChoiceQuestion('A')">
                <p>${actualQuestions[0].A}</p>
            </button>

            <button id="btn2" onclick="ChoiceQuestion('B')">
                <p>${actualQuestions[0].B}</p>
            </button>

            <button id="btn3" onclick="ChoiceQuestion('C')">
                <p>${actualQuestions[0].C}</p>
            </button>

            <button id="btn4" onclick="ChoiceQuestion('D')">
                <p>${actualQuestions[0].D}</p>
            </button>
        </div>
    `;
    inQuestionDelay = false;
}

function ChoiceQuestion(selected){
    if(inQuestionDelay)
        return;

    let correct = false;

    if(actualQuestions[0].Correta == "A" || actualQuestions[0].Correta == "a"){
        document.querySelector("#options #btn1").classList.add("correct");

        if(selected == "A")
            correct = true;
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "B" || actualQuestions[0].Correta == "b"){
        document.querySelector("#options #btn2").classList.add("correct");

        if(selected == "B")
            correct = true;
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "C" || actualQuestions[0].Correta == "c"){
        document.querySelector("#options #btn3").classList.add("correct");

        if(selected == "C")
            correct = true;
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "D" || actualQuestions[0].Correta == "d"){
        document.querySelector("#options #btn4").classList.add("correct");

        if(selected == "D")
            correct = true;
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
    }

    if(correct == true){
        points++;
        PlaySound("correct");
    }
    else{
        PlaySound("wrong");
    }

    actualQuestions.splice(0, 1);
    actualQ++;
    inQuestionDelay = true;
    if(actualQ >= totalQ){
        setTimeout(EndScreen, 2000);
    }
    else{
        setTimeout(question_HTML, 2000);
    }
}

function EndScreen(){
    change_screen("end");

    if(points == totalQ){
        document.getElementById("end-screen").innerHTML += `<h2>Parabéns!!! Você acertou todas as questões!</h2>`;
    }
    else if(points == 0){
        document.getElementById("end-screen").innerHTML += `<h2>Infelizmente você não acertou nenhuma questão :(</h2>`;
    }
    else if(points == 1){
        document.getElementById("end-screen").innerHTML += `<h2>Você acertou ${points} questão!</h2>`;
    }
    else{
        document.getElementById("end-screen").innerHTML += `<h2>Você acertou ${points} questões!</h2>`;
    }

    document.getElementById("end-screen").innerHTML += `<button onclick='document.location.reload("true")'>Reiniciar</button>`;
}

function LoadGameCategory(category){
    data = get_questions(category);
    actualQuestions = data;
    totalQ = actualQuestions.length;

    game_bootstrap();
}

function get_questions(category){
    let data;
    for(let i = 0; i < questions.length; i++){
        const element = questions[i];

        if(element[0] == category){
            data = element;
            break;
        }
    }

    data.splice(0, 1);
    data = shuffleArray(data);

    if(data.length > MAX_QUESTIONS)
        data = data.splice(0, MAX_QUESTIONS)

    return data;
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

function PlaySound(name){
    const sound = new Audio("sound/"+name+".mp3");
    sound.volume = 0.2;
    sound.play();
}