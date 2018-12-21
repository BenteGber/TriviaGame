function Stopwatch() {
    let time = 5;
    let interval;

    function update() {
        time == 0 ? this.timeOut(time) : time--;
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
        time = 25;
    };
};





let watch = new Stopwatch();

function QuestionCard(x, question, correctAnswer, incorrectAnswers) {
    let div = $('#question');

    // The x is used to track which card it is and iis used for calling specific functions dynamically
    this.x = x;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = [incorrectAnswers];
    this.allAnswers = incorrectAnswers.concat([correctAnswer]);
    // Randomizes answers position
    this.shuffleArray = function () {
        // used Durstenfeld shuffle 
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

        this.x === "5" ? button = this.correctAnswer : turnCounter++;
        if (button === this.correctAnswer) {
            totalCorrect++;
            this.displayCongratulations();
            // The x value is used to reference displayNextCard global function 
            setTimeout(function () { displayNextCard(x); }, 3000);

        } else {
            totalWrong++;
            this.displayCorrectAnswer();
            setTimeout(function () { displayNextCard(x); }, 3000);

        }
    };

    this.displayImage = function () {
        watch.start();
        this.shuffleArray();
        // This is where the second utility of the x variable comes into play
        div.html(`<h2> ${question} </h2> 
        <button type= "button" id="cardButton1" class= "btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[0])" value ="${this.allAnswers[0]}">${this.allAnswers[0]}</button>
        <button type= "button" id="cardButton2" class= "btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[1])" value ="${this.allAnswers[1]}">${this.allAnswers[1]}</button>
        <button type= "button" id="cardButton3" class="btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[2])" value ="${this.allAnswers[2]}">${this.allAnswers[2]}</button>
        <button type= "button" id="cardButton4" class="btn btn-primary btn-lg btn-block" onclick="card${x}.checkAnswer(card${x}.allAnswers[3])" value ="${this.allAnswers[3]}">${this.allAnswers[3]}</button>`)

    };                                                                                                                                                              // this ties the checkAnswer function and allAnswer functions to  the specific Instance of the questionCard object.
    this.displayCorrectAnswer = function () {
        div.html(`<h2>Uh-oh... the correct answer was ${this.correctAnswer}.</h2>`);
    };
    this.displayCongratulations = function () {
        div.html(`<h2>Great Job!</h2>`);
    };

};







let card1 = new QuestionCard("1", "Which of these behavior changes makes the biggest impact on reudcing your carbon footprint?", "Eating more plants and less meat", ["Driving an electric car", "Installing solar panels on your home", "Recycling"]);
let card2 = new QuestionCard("2", "Which of these technologies is projected to have the biggest impact on cleaning up our powergrid?", "Wind Turbines (Onshore)", ["Photovoltaics (Solar Panels)", "Geothermal", "Nuclear Power"]);
let card3 = new QuestionCard("3", "Providing education to this group is a key to reducing global Carbon emissions", "Girls", ["Boys", "The Elderly", "Corporate Leaders"]);
let card4 = new QuestionCard("4", "This practice aims to plant carbon absorbing forrests where there previously was none:", "Afforestation", ["Deforrestation", "Silvopasture", "Tree Intercropping"]);
let card5 = new QuestionCard("5", "This is an affordable and easy step you can take to reduce your own carbon footprint:", "Swithcing to LED lighting", ["Walking to work or school", "Eating vegetarian 1-2 days a week", "Using a reuseable Water bottle"]);

let totalCorrect = 0;
let totalWrong = 0;
let totalUnanswered = 0;
// added turnCounter and Unanswered to accomiodate timeouts between questions. 
let turnCounter = 0;

function displayStats() {
    watch.stop();
    watch.reset();
    $('#question').html(`
    <h2>Total Correct:  ${totalCorrect}</h2>
    <h2>Total Wrong:  ${totalWrong}</h2>
    <h2>Total Unanswered:  ${totalUnanswered}</h2>
    <h3> Restart Game?</h3>
    <button type= "button" id="" class="btn btn-primary btn-lg btn-block" onclick="startGame()" value ="">Restart Game</button>
    <h2>Learn more at <a href="https://www.drawdown.org/">Drawdown.org</a></h2>`)
};
function timeOut(time) {
    if (time == 0) {
        watch.reset();
        watch.stop();
        totalUnanswered++;
        turnCounter++;
        let turn = turnCounter + "";
        $('#question').html(`<h2>Looks like you ran out of time :(<h2>`);
        setTimeout(function () { displayNextCard(turn); }, 3000);

    }
}
// The switch case tests each Card's "x" value to determine which card should be callled next
function displayNextCard(xVal) {
    switch (xVal) {
        case "1":
            card2.displayImage();
            break;
        case "2":
            card3.displayImage();
            break;
        case "3":
            card4.displayImage();
            break;
        case "4":
            card5.displayImage();
            break;
        default:
            displayStats();

    }
};

function startGame() {

    card1.displayImage();



};


