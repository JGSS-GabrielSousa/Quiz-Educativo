window.addEventListener("load", () => {
    if(localStorage.getItem("number-of-questions") == null)
        localStorage.setItem("number-of-questions", "10");

    document.querySelector("#number-of-questions input").value = parseInt(localStorage.getItem("number-of-questions"));
    document.querySelector("#number-of-questions p").innerText = document.querySelector("#number-of-questions input").value;
});

document.querySelector("#number-of-questions input").addEventListener("input", () => {
    document.querySelector("#number-of-questions p").innerText = this.value;
});

document.querySelector("#number-of-questions input").addEventListener("change", () => {
    localStorage.setItem("number-of-questions", this.value);
});

window.addEventListener("beforeunload", function (event) {
    if(!reload)
        event.returnValue = "\o/";
});