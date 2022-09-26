const categories = [astronomia,corpo_humano,futebol,geografia,geral,historia];

var actualQuestions;

let points = 0;
let totalQuestions = 0;
let number_of_questions = 10;

let inQuestionDelay = false;

function select_category_HTML(){
    document.getElementById("select-category-options").innerHTML = "";

    for(let i = 0; i < categories.length; i++){
        const element = categories[i];

        document.getElementById("select-category-options").innerHTML += `
            <button onclick="loadCategory('${element[0]}')"">
                <p>${element[0]}</p>
            </button>
        `;
    }
}

function question_HTML(){
    let html = `
        <h3>Pergunta ${totalQuestions-actualQuestions.length+1} de ${totalQuestions}</h3>
        <h2>${actualQuestions[0].pergunta}</h2>
    `;

    if(actualQuestions[0].nome_imagem != ""){
        html += `<img src="img/questions/${actualQuestions[0].nome_imagem}.jpg">`;
    }

    let qOrder = shuffleArray(["A","B","C","D"]); 

    html += '<div id="question-options">';
    for(let i = 0; i < qOrder.length; i++) {

        html += `
            <button id="btn${qOrder[i]}" onclick="choiceQuestion('${qOrder[i]}')">
                <p>${actualQuestions[0][qOrder[i]]}</p>
            </button>
        `;
    }
    html += '</div>';

    document.getElementById("question").innerHTML = html;
    inQuestionDelay = false;
}

function choiceQuestion(selected){
    if(inQuestionDelay)
        return;

    let correct = false;

    if(actualQuestions[0].Correta == "A" || actualQuestions[0].Correta == "a"){
        document.querySelector("#question-options #btnA").classList.add("correct");

        if(selected == "A")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btnB").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btnC").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btnD").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "B" || actualQuestions[0].Correta == "b"){
        document.querySelector("#question-options #btnB").classList.add("correct");

        if(selected == "B")
            correct = true;
        else if(selected == "A")
            document.querySelector("#question-options #btnA").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btnC").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btnD").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "C" || actualQuestions[0].Correta == "c"){
        document.querySelector("#question-options #btnC").classList.add("correct");

        if(selected == "C")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btnB").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#question-options #btnA").classList.add("wrong");
        else if(selected == "D")
            document.querySelector("#question-options #btnD").classList.add("wrong");
    }
    else if(actualQuestions[0].Correta == "D" || actualQuestions[0].Correta == "d"){
        document.querySelector("#question-options #btnD").classList.add("correct");

        if(selected == "D")
            correct = true;
        else if(selected == "B")
            document.querySelector("#question-options #btnB").classList.add("wrong");
        else if(selected == "C")
            document.querySelector("#question-options #btnC").classList.add("wrong");
        else if(selected == "A")
            document.querySelector("#question-options #btnA").classList.add("wrong");
    }

    if(correct == true){
        points++;
        playSound("correct");
    }
    else{
        playSound("wrong");
    }

    actualQuestions.splice(0, 1);
    inQuestionDelay = true;
    if(actualQuestions.length == 0){
        setTimeout(endScreen, 2000);
    }
    else{
        setTimeout(question_HTML, 2000);
    }
}

function loadCategory(category){
    let data = get_questions(category);
    actualQuestions = data;
    totalQuestions = actualQuestions.length;

    change_screen("game-bootstrap");
}

function get_questions(category){
    let data;
    for(let i = 0; i < categories.length; i++){
        const element = categories[i];

        if(element[0] == category){
            data = element;
            break;
        }
    }

    data.splice(0, 1);
    data = shuffleArray(data);

    number_of_questions = document.querySelector("#number-of-questions input").value;
    if(data.length > number_of_questions)
        data = data.splice(0, number_of_questions)

    return data;
}