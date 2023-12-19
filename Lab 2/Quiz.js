function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

function question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

let questions = [
    new question("Javascript supports", ["Functions", "XHTML", "CSS", "XML"], "Functions"),
    new question("Which language is used for styling web pages", ["HTML", "JQuery", "XML", "CSS"], "CSS"),
    new question("Which is not a JS Framework", ["Express.js", "JQuery", "Django", "Node.js"], "Django"),
    new question("Which is used to connect to database", ["PHP", "HTML", "JS", "All"], "PHP"),
    new question("Which defines structure of a webpage", ["HTML", "XHTML", "XML", "CSS"], "HTML")
]

quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length
}

quiz.prototype.getQuestionsByIndex = function () {
    return this.questions[this.questionIndex]
}

question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice
}

quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionsByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

let quizz = new quiz(questions);
function loadQuestions() {
    if (quizz.isEnded()) {
        showScore();
    } else {
        let questionText = document.getElementById("question");
        questionText.innerHTML = quizz.getQuestionsByIndex().text
        let choices = quizz.getQuestionsByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice" + i)
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i])
        }
        showProgress();
    }

}

function handleOptionButton(id, choice) {
    let btn = document.getElementById(id);
    btn.onclick = function () {
        quizz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showProgress() {
    let currentQues = quizz.questionIndex + 1;
    let elements = document.getElementById("progress");
    elements.innerHTML = `Question ${currentQues} of ${quizz.questions.length}`;
}

function showScore() {
    let quizEnded = "<header><h1>Result</h1></header>"
    quizEnded += "<h2>Your Scores is : " + quizz.score + " <br/>  Percentage is: " + (quizz.score / questions.length * 100) + "</h2>";
    document.getElementById("box").innerHTML = quizEnded;

}

loadQuestions();