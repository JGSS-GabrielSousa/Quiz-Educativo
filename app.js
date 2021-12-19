var questions = [astronomia,geografia];

var actualQuestions;

let points = 0;
let actualQ = 0;
let totalQ = 0;

function credits_screen(){
    document.getElementById("main-menu-btns").style.display = "none";
    document.getElementById("credits").style.display = "grid";
}

function back_main_menu(){
    document.getElementById("main-menu-btns").style.display = "grid";
    document.getElementById("credits").style.display = "none";
}

function game_bootstrap(){
    document.getElementById("main-menu-btns").style.display = "none";
    document.getElementById("select-category").style.display = "flex";

    select_category_HTML();
}

function game_bootstrap2(){
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
}

function ChoiceQuestion(selected){
    if(actualQuestions[0].Correta == "A" || actualQuestions[0].Correta == "a"){

        if(selected == "A"){
            points++;
            document.querySelector("#options #btn1").classList.add("correct");
        }
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "B" || actualQuestions[0].Correta == "b"){
        document.querySelector("#options #btn2").classList.add("correct");

        if(selected == "B"){
            points++;
            document.querySelector("#options #btn2").classList.add("correct");
        }
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "C" || actualQuestions[0].Correta == "c"){
        if(selected == "C"){
            points++;
            document.querySelector("#options #btn3").classList.add("correct");
        }
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#options #btn4").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "D" || actualQuestions[0].Correta == "d"){
        if(selected == "D"){
            points++;
            document.querySelector("#options #btn4").classList.add("correct");
        }
        else if(selected == "B")
            document.querySelector("#options #btn2").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#options #btn3").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#options #btn1").classList.add("wrong");
    }

    actualQuestions.splice(0, 1);

    actualQ++;

    if(actualQ >= totalQ){
        setTimeout(EndScreen, 1000);
    }
    else{
        setTimeout(question_HTML, 1000);
    }
}

function EndScreen(){
    alert("Você Fez: "+points+" pontos");
    setTimeout(()=>{
        document.location.reload(true);
    }, 1000);
}

function LoadGameCategory(category){
    data = get_questions(category);
    actualQuestions = data;
    totalQ = actualQuestions.length;

    game_bootstrap2();
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