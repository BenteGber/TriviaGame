function Stopwatch() {
    let time = 30;
    let interval;

    function update() {
        time--;
        var formattedTime = timeFormatter(time);

        $('#timer').html(formattedTime);
        return formattedTime;
    };
    function timeFormatter(time) {
        var countdown = time.toString();
        if (countdown.length < 2) {
            countdown = "0" + countdown;
        }
        return countdown;
    }

    this.isOn = false;

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update, 1000);
            this.isOn = true;
        }
    };
    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };
    this.reset = function () {
        time = 30;
    };
};

let watch = new Stopwatch();





function QuestionCard(x, question, correctAnswer, incorrectAnswers) {
    let div = $('#question');
    this.x = x;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = [incorrectAnswers];
    this.allAnswers = incorrectAnswers.concat([correctAnswer]);

    this.shuffleArray = function () {
        var array = this.allAnswers;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        this.allAnswers = array;
    };

    this.checkAnswer = function (button) {
        watch.stop();
        watch.reset();
        if (button === this.correctAnswer) {
            this.displayCongratulations();
        } else {
            this.displayCorrectAnswer();
        }
    };

    this.displayImage = function () {
        this.shuffleArray();
        div.html(`<h2> ${question} </h2> 
        <button type= "button" id="cardButton1" class= "btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[0])" value ="${this.allAnswers[0]}">${this.allAnswers[0]}</button>
        <button type= "button" id="cardButton2" class= "btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[1])" value ="${this.allAnswers[1]}">${this.allAnswers[1]}</button>
        <button type= "button" id="cardButton3" class="btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[2])" value ="${this.allAnswers[2]}">${this.allAnswers[2]}</button>
        <button type= "button" id="cardButton4" class="btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[3])" value ="${this.allAnswers[3]}">${this.allAnswers[3]}</button>`)
    };
    this.displayCorrectAnswer = function () {
        div.html(`<h2>Uh-oh... the correct answer was ${this.correctAnswer}. Don't worry you got this next one.</h2>`);
    };
    this.displayCongratulations = function () {
        div.html(`<h2>Great Job!</h2>`);
    }




}

let card1 = new QuestionCard("1", "What is God?", "Man", ["Real", "Omnipitent", "Forgiving"]);


let totalCorrect = 0;
let totalWrong = 0;



function startGame() {
    watch.start();
    card1.displayImage();

}


