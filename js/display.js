class Display {
    
    constructor() {
        this.scoreCounter = document.getElementById('score');
        this.highscoreCounter = document.getElementById('highscore');
        this.stageCounter = document.getElementById('stage');
        this.mainBtn = document.getElementById('btn-mainBtn');
    }

    setScore(){
        this.scoreCounter.innerText = game.score;
    }

    setTurn(turn){
        if(game.started) {
            this.mainBtn.innerText = (turn) ? "Reproduce the sequence!" : "Memorize the sequence!";
        }
        else if(game.lose) {
            this.mainBtn.innerText = "Game over! Restart the game";
        }
        else {
            this.mainBtn.innerText = "Start game";
        }
    }

    lighting(button, lighting){
        if(lighting) {
            button.style.opacity = 1;
        }
        else {
            button.style.opacity = 0.8;
        }
    }

    lightOnAll(){
        for (let i = 0; i < 4; i++) {
            let btn = game.selectBtn(i);
            this.lighting(btn[0], true);
            btn[0].style.cursor = 'pointer';
        }
        game.mainBtn.style.width = '102px';
        game.mainBtn.style.height = '102px';
    }

    lightOffAll(){
        for (let i = 0; i < 4; i++) {
            let btn = game.selectBtn(i);
            this.lighting(btn[0], false);
            btn[0].style.cursor = 'initial';
        }
        game.mainBtn.style.width = '110px';
        game.mainBtn.style.height = '110px';
    }

    pressButton(btnChange, bool){
        if(bool) {
            btnChange[0].style.top = btnChange[2];
            btnChange[0].style.left = btnChange[3];
            btnChange[0].style.zIndex = 2;
        }
        else {
            
            btnChange[0].style.top = 0;
            btnChange[0].style.left = 0;
            setTimeout(function() {
                btnChange[0].style.zIndex = 3;
            }, 400)
        }
    }

    setStage(){
        this.stageCounter.innerText = game.stage;
    }
    
    setHighscore(){
        this.highscoreCounter.innerText = game.highscore;
    }
}