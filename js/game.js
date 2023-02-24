class Game {
    
    constructor(){
        this.highscore = 0;
        this.lose = false;
        this.green = document.getElementById('btn-green');
        this.greenShadow = document.querySelector("#btn-green + .btn-behind");
        this.red = document.getElementById('btn-red');
        this.redShadow = document.querySelector("#btn-red + .btn-behind");
        this.yellow = document.getElementById('btn-yellow');
        this.yellowShadow = document.querySelector("#btn-yellow + .btn-behind");
        this.blue = document.getElementById('btn-blue');
        this.blueShadow = document.querySelector("#btn-blue + .btn-behind");
        this.mainBtn = document.getElementById('btn-mainBtn');
        this.btnReset = document.getElementById('btn-reset');
        this.mainBtn.addEventListener('click', e => {
            if(!this.started) {
                this.started = true;
                this.lose = false;
                this.gameOn();
            }
        });
        // create EventListener for all color buttons
        for (let i = 0; i < 4; i++) {
            let btn = this.selectBtn(i);
            btn[0].addEventListener('click', e => {
                if(this.started && this.turn) {
                    this.sequenceTest(i);
                }
            });
        }
        this.btnReset.addEventListener('click', e => {
            this.reset();
        });

        this.init();
    }
    init() {
        // reset the game except the highscore
        this.score = 0;
        this.stage = 1;
        this.sequence = [];
        this.playerSequence = [];
        this.turn = true;
        this.sequencePosition = 0;
        this.started = false;
        this.speed = 1;
    }

    incrementScore(){
        this.score++;
        display.setScore();
    }

    incrementStage(){
        this.stage++;
        display.setStage();
    }

    speedUp(){
        this.speed += 0.1;
    }

    setTurn(turn){
        this.turn = turn;
        display.setTurn(turn);
    }

    generateColor() {
        let rand = Math.floor(Math.random()*4);
        this.sequence.push(rand);
    }

    sequenceTest(value) {
        let btnChange = this.selectBtn(value);
            display.pressButton(btnChange, true);
            btnChange[4].play();
            setTimeout(function() {
            display.pressButton(btnChange, false);
        }, 200);
        this.playerSequence[this.sequencePosition] = value;
        // losing
        if(this.playerSequence[this.sequencePosition] != this.sequence[this.sequencePosition]) {
            if(this.score > this.highscore) {
                this.highscore = this.score;
                display.setHighscore();
            }
            this.lose = true;
            this.reset();
        }
        // winning
        else {
            this.incrementScore();
            this.sequencePosition++;
            // when the stage is completed
            if(this.playerSequence.length == this.sequence.length) {
                this.setTurn(false);
                setTimeout(() => {
                    this.sequencePosition = 0;
                    this.playerSequence = [];
                    this.incrementStage();
                    this.speedUp();
                    this.gameOn();
                }, 500)
            }
        }
    }

    selectBtn(value) {
        let btnChange = [];
        switch(value) {
            case 0:
                btnChange[0] = this.green;
                btnChange[1] = this.greenShadow;
                btnChange[2] = '5px'; // top
                btnChange[3] = '5px'; // left
                btnChange[4] = new Audio('sounds/do.wav');
                break;
            case 1:
                btnChange[0] = this.red;
                btnChange[1] = this.redShadow;
                btnChange[2] = '5px'; // top
                btnChange[3] = '-5px'; // left
                btnChange[4] = new Audio('sounds/re.wav');
                break;
            case 2:
                btnChange[0] = this.yellow;
                btnChange[1] = this.yellowShadow;
                btnChange[2] = '-5px'; // top
                btnChange[3] = '5px'; // left
                btnChange[4] = new Audio('sounds/mi.wav');
                break;
            case 3:
                btnChange[0] = this.blue;
                btnChange[1] = this.blueShadow;
                btnChange[2] = '-5px'; // top
                btnChange[3] = '-5px'; // left
                btnChange[4] = new Audio('sounds/fa.wav');
                break;
        }
        return btnChange;
    }

    playSequence(value) {
        let btnChange = this.selectBtn(value);
            display.lighting(btnChange[0], true);
            btnChange[4].play();
        setTimeout(function() {
            display.lighting(btnChange[0], false);
        }, 500/this.speed);

    }

    gameOn() {
        this.setTurn(false);
        this.generateColor();
        let i = 0;
        display.lightOffAll();
            var interv = setInterval(() => {
                this.playSequence(this.sequence[i]);
                i++;
                if(i == this.sequence.length) {
                    clearInterval(interv);
                    setTimeout(() => {
                        display.lightOnAll();
                        this.setTurn(true);
                    }, 1000/this.speed)
                    
                }
            }, 1000/this.speed);
    }
    reset() {
        if(this.turn === true) {
            this.init();
            display.lightOffAll();
            display.setTurn();
            display.setScore();
            display.setStage();
        }
    }
}