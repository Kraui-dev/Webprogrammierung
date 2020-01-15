import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { join } from 'path';
//import { Stage } from 'stage-js/platform/web';

declare var stageAnimation: any;

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.css']
})
export class GameLogicComponent implements OnInit {

  @ViewChild('gameCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  matrixField: number[][];

  private pelletCounter: number;
  private ctx: CanvasRenderingContext2D;
  private playerDirection: MoveDirection;
  private redGhost: GameObject;
  private orangeGhost: GameObject;
  private turquioseGhost: GameObject;
  private pinkGhost: GameObject;
  private pacMan: GameObject;
  private isGameRunning: boolean;

  constructor() { }

  ngOnInit() {

    this.ctx = this.canvas.nativeElement.getContext('2d');
      
    this.create2DField();
    this.drawGameField();
    this.drawPacMan();
    this.playerDirection = MoveDirection.Right;
    let self = this;
    document.addEventListener('keydown', function(e: KeyboardEvent){
        self.keyboardInput(e);
    });
       this.initializeGame();
  }

  drawPacMan(){
    this.pacMan = new GameObject(2, 1);
    this.pacMan.moveDirection = MoveDirection.Right;
    let img = new Image();
    img.src = '../../assets/dot.png';
    img.width = 28;
    img.height = 31;
    
    img.onload = () => {
      this.ctx.drawImage(img, this.pacMan.xPosition * 10,  this.pacMan.yPosition * 10 - 3.5);
      console.log(this.pacMan.yPosition)
    }
  }

  keyboardInput(event: KeyboardEvent) {
    // PRESS LEFT ARROW
    if (event.keyCode == 37) {
      console.log("left key pressed");
      this.playerDirection = MoveDirection.Left;
    }
    // PRESS UP ARROW
    else if (event.keyCode == 38) {
      this.playerDirection = MoveDirection.Up;
    }
    // PRESS RIGHT ARROW
    else if (event.keyCode == 39) {
      console.log("right key pressed");
      this.playerDirection = MoveDirection.Right;
    }
    // PRESS DOWN ARROW
    else if (event.keyCode == 40) {
      console.log("down key pressed");
      this.playerDirection = MoveDirection.Down;
    }
 }

  drawGameField(){
        for(let i = 0; i < 31;i++){
          for(let j = 0;j < 28;j++){
            switch(this.matrixField[i][j]){

              case(0): {
    
                break;
              }
              case(1): {
                let img = new Image();
                img.src = '../../assets/pellet.png';
                img.width = 28;
                img.height = 31;
                img.onload = () => {
                  this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
                }

                break;
              }
              case(2): {
                let img = new Image();
                img.src = '../../assets/test_pellet.png';
                img.width = 28;
                img.height = 31;
                img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
                }
                break;
              }
              case(3): {
                let img = new Image();
                img.src = '../../assets/orange_ghost.png';
                img.width = 28;
                img.height = 31;
                img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
                }

                break;
              }
              case(4): {
                // let img = new Image();
                // img.src = '../../assets/dot.png';
                // img.width = 28;
                // img.height = 31;
                // img.onload = () => {
                // this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
                // }

                break;
              }
            }
          }
    }
  }

  create2DField(){
    this.matrixField = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,0,0,0,2,2,0,0,0,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,0,2,3,4,5,6,2,0,2,0,0,1,0,0,0,0,0,0],
      [2,2,2,2,2,2,1,2,2,2,0,0,0,0,0,0,0,0,2,2,2,1,2,2,2,2,2,2],
      [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
      [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
      [0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0],
      [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
      [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
      [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
      [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
  }

  initializeGame(){
    this.initializePacMan();
    this.initializeGhosts();
    this.pelletCounter = 0;
  }

  initializePacMan(){
    this.pacMan.isRunning = true;
    let pacManThread = new Promise(() => this.movePacMan());
  }

  initializeGhosts(){
    let redGhost = new GameObject(9, 15);
    let turqoiseGhost = new GameObject(12, 24);
    let orangeGhost = new GameObject(2, 1);
    let pinkGhost = new GameObject(24, 3);

    redGhost.moveDirection = MoveDirection.Up;
    redGhost.isRunning = true;

    turqoiseGhost.moveDirection = MoveDirection.Down;
    turqoiseGhost.isRunning = true;

    orangeGhost.moveDirection = MoveDirection.Right;
    orangeGhost.isRunning = true;

    pinkGhost.moveDirection = MoveDirection.Up;
    pinkGhost.isRunning = true;

    let redThread = new Promise(() => this.startGhost(redGhost));
    let turquioseThread = new Promise(() => this.startGhost(turqoiseGhost));
    let orangeThread = new Promise(() => this.startGhost(orangeGhost));
    let pinkThread = new Promise(() => this.startGhost(pinkGhost));
  }

  async startGhost(ghost: GameObject){
    while(ghost.isRunning){
      await this.delay(500);
      let oldPosition = new GamePosition(ghost.xPosition, ghost.yPosition);

      this.clearGhost(ghost, oldPosition);

      let nextMove = this.getNextGhostMove(ghost);

      ghost.moveDirection = nextMove.moveDirection;
      ghost.xPosition = nextMove.xPosition;
      ghost.yPosition = nextMove.yPosition;
      
      this.doGhostMovement(ghost);
    }
  }

  clearGhost(ghost: GameObject, oldPosition: GamePosition){
    let value = this.matrixField[oldPosition.yPosition][oldPosition.xPosition];

    if(value == 2){
      console.log("clear rect");
      this.ctx.clearRect(ghost.xPosition * 10 - 1, ghost.yPosition * 10 - 3.5, 17.5, 16);
      this.ctx.save();

      return;
    }

    if(value == 1){
      console.log("clear rect");
      this.ctx.clearRect(ghost.xPosition * 10 - 1, ghost.yPosition * 10 - 3.5, 17.5, 16);
      this.ctx.save();

      let img = new Image();
      img.src = '../../assets/pellet.png';
      img.width = 28;
      img.height = 31;
      img.onload = () => {
        this.ctx.drawImage(img, ghost.xPosition * 10 + 5,  ghost.yPosition * 10 + 2);
      }

      return;
    }

    // console.log("clear rect");
    // this.ctx.clearRect(ghost.xPosition * 10 - 1, ghost.yPosition * 10 - 3.5, 17.5, 16);
    // this.ctx.save();
    
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(ghost.xPosition * 10 - 1, ghost.yPosition * 10 - 3.5, 17.5, 16);
  }

  doGhostMovement(ghost: GameObject){
    // console.log("clear rect");
    // this.ctx.clearRect(ghost.xPosition * 10 - 2, ghost.yPosition * 10 - 3.5, 20, 16);
    // this.ctx.save();
    

    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(ghost.xPosition * 10 - 2, ghost.yPosition * 10 - 3.5, 20, 16);
    console.log("paint ghost");
    let img = new Image();
    img.src = '../../assets/pink_ghost.png';
    img.width = 28;
    img.height = 31;
    img.onload = () => {
      this.ctx.drawImage(img, ghost.xPosition * 10 - 2,  ghost.yPosition * 10 - 3.5);
    }

    this.ctx.restore();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getNextGhostMove(ghost: GameObject){
    if(this.isMovePossible(ghost)){
      return this.getNewMovePosition(ghost);
    }
    else{
      return this.getRandomMoveMent(ghost);
    }
  }

  getRandomMoveMent(ghost: GameObject){
    if(ghost.moveDirection == MoveDirection.Down || ghost.moveDirection == MoveDirection.Up){
      let isRightOk = this.isRightDirectionAvailable(ghost);
      let isLeftOk = this.isLeftDirectionAvailable(ghost);

      if(isRightOk){
        let position =  new GamePosition(ghost.xPosition + 1, ghost.yPosition);
        position.moveDirection = MoveDirection.Right;

        return position;
      }

      if (isLeftOk){
        let position =  new GamePosition(ghost.xPosition - 1, ghost.yPosition);
        position.moveDirection = MoveDirection.Left;

        return position;
      }

      if (ghost.moveDirection == MoveDirection.Down){
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition - 1);
        position.moveDirection = MoveDirection.Up;

        return position;
      }
      else{
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition + 1);
        position.moveDirection = MoveDirection.Down;

        return position;
      }
    }
    else{
      //other direction
      let isUpOk = this.isUpDirectionAvailable(ghost);
      let isDownOk = this.isDownDirectionAvailable(ghost);

      if(isUpOk){
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition - 1);
        position.moveDirection = MoveDirection.Up;

        return position;
      }

      if (isDownOk){
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition + 1);
        position.moveDirection = MoveDirection.Down;

        return position;
      }

      if (ghost.moveDirection == MoveDirection.Right){
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition - 1);
        position.moveDirection = MoveDirection.Left;

        return position;
      }
      else{
        let position =  new GamePosition(ghost.xPosition, ghost.yPosition + 1);
        position.moveDirection = MoveDirection.Right;

        return position;
      }
    }
  }

  isDownDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition;
    let yPosition = gameObject.yPosition + 1;

    if (this.matrixField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isUpDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition;
    let yPosition = gameObject.yPosition - 1;

    if (this.matrixField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isLeftDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition - 1;
    let yPosition = gameObject.yPosition;

    if (this.matrixField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isRightDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition + 1;
    let yPosition = gameObject.yPosition;

    if (this.matrixField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

getNewMovePosition(gameObject: GameObject){
  let nextGamePosition = new GamePosition(gameObject.xPosition, gameObject.yPosition);

  switch(gameObject.moveDirection){
    case(MoveDirection.Up): {
      nextGamePosition.yPosition--;
      nextGamePosition.moveDirection = MoveDirection.Up;
      break;
    }

    case(MoveDirection.Down): {
      nextGamePosition.yPosition++;
      nextGamePosition.moveDirection = MoveDirection.Down;
      break;
    }

    case(MoveDirection.Left): {
      nextGamePosition.xPosition--;
      nextGamePosition.moveDirection = MoveDirection.Left;
      break;
    }

    case(MoveDirection.Right): {
      nextGamePosition.xPosition++;
      nextGamePosition.moveDirection = MoveDirection.Right;
      break;
    }
  }

  return nextGamePosition;
}

isMovePossible(ghost: GameObject){

let nextGamePosition = new GamePosition(ghost.xPosition, ghost.yPosition);

  switch(ghost.moveDirection){
    case(MoveDirection.Up): {
      nextGamePosition.yPosition--;
      break;
    }

    case(MoveDirection.Down): {
      nextGamePosition.yPosition++;
      break;
    }

    case(MoveDirection.Left): {
      nextGamePosition.xPosition--;
      break;
    }

    case(MoveDirection.Right): {
      nextGamePosition.xPosition++;
      break;
    }
  }

  if (this.matrixField[nextGamePosition.yPosition][nextGamePosition.xPosition] == 0){
      return false;
  }
  else{
    return true;
  }
}

  async movePacMan(){
  console.log("pac Man is running")
    while(this.pacMan.isRunning){

      await this.delay(500);

      this.doAnimation();

      if(this.checkPacManCollision()){
        if (!this.pacMan.isRunning){

        }
      }

      this.doMovementPacMan(this.playerDirection);
    }
  }

  checkPacManCollision(){
    if(this.isGhostHit()){
      this.gameOver();

      return true;
    }

    if (this.isPelletAvailable()){
      this.gameWon();
      return true;
    }
    
    return false;
  }

  gameWon(){
    // game won
  }

  gameOver(){
    // do something
  }

  isPelletAvailable(){
    if (this.matrixField[this.pacMan.yPosition][this.pacMan.xPosition] == 1){
      this.pelletCounter++;
      //246
      this.matrixField[this.pacMan.yPosition][this.pacMan.xPosition] = 2;
      //hit

      if(this.pelletCounter == 246){
        return true;
      }
    } 

    return false;
  }

  isGhostHit(){
    if (this.pacMan.xPosition == this.redGhost.xPosition && this.pacMan.yPosition == this.redGhost.yPosition){
      return true;
    } 

    if (this.pacMan.xPosition == this.turquioseGhost.xPosition && this.pacMan.yPosition == this.turquioseGhost.yPosition){
      return true;
    } 

    if (this.pacMan.xPosition == this.orangeGhost.xPosition && this.pacMan.yPosition == this.orangeGhost.yPosition){
      return true;
    } 

    if (this.pacMan.xPosition == this.pinkGhost.xPosition && this.pacMan.yPosition == this.pinkGhost.yPosition){
      return true;
    } 

    return false;
  }

  doAnimation(){
    // requestAnimationFrame(this.doAnimation);
    console.log("clear rect");
    this.ctx.clearRect(this.pacMan.xPosition * 10 - 0.5, this.pacMan.yPosition * 10 - 3.5, 10 + 5, 10 + 5);
    this.ctx.save();

    console.log("paint pacMan");
    let img = new Image();
    img.src = '../../assets/dot.png';
    img.width = 28;
    img.height = 31;
    img.onload = () => {
      this.ctx.drawImage(img, this.pacMan.xPosition * 10,  this.pacMan.yPosition * 10 - 3.5);
    }

    this.ctx.restore();
  }

  doMovementPacMan(direction: MoveDirection){
    if(this.checkPacManMovePossible(direction)){
      let newPosition = this.changeMovePosition(this.pacMan, direction);

      this.pacMan.xPosition = newPosition.xPosition;
      this.pacMan.yPosition = newPosition.yPosition;

      this.pacMan.moveDirection = this.playerDirection;
    }
    else{
      if(this.checkPacManMovePossible(this.pacMan.moveDirection)){
        let newPosition = this.changeMovePosition(this.pacMan, this.pacMan.moveDirection);

        this.pacMan.xPosition = newPosition.xPosition;
        this.pacMan.yPosition = newPosition.yPosition;
      }
      else{
        let newPosition = this.reversePacManMovement();
        
        this.pacMan.xPosition = newPosition.xPosition;
        this.pacMan.yPosition = newPosition.yPosition;
      }
    }

    return true;
  }

  reversePacManMovement(){
    switch(this.pacMan.moveDirection){
      case(MoveDirection.Down): {
        this.pacMan.moveDirection = MoveDirection.Up;
        this.playerDirection = MoveDirection.Up;
        return new GamePosition(this.pacMan.xPosition, this.pacMan.yPosition - 1)
      }
      case(MoveDirection.Up): {
        this.pacMan.moveDirection = MoveDirection.Down;
        this.playerDirection = MoveDirection.Down;
        return new GamePosition(this.pacMan.xPosition, this.pacMan.yPosition + 1)
      }
      case(MoveDirection.Right): {
        this.pacMan.moveDirection = MoveDirection.Left;
        this.playerDirection = MoveDirection.Left;
        return new GamePosition(this.pacMan.xPosition - 1, this.pacMan.yPosition)
      }
      case(MoveDirection.Left): {
        this.pacMan.moveDirection = MoveDirection.Right;
        this.playerDirection = MoveDirection.Right;
        return new GamePosition(this.pacMan.xPosition + 1, this.pacMan.yPosition)
      }
    }

  }

  changeMovePosition(gameObject: GameObject, moveDirection: MoveDirection) {

    this.pacMan.moveDirection = moveDirection;

    switch(moveDirection){
      case(MoveDirection.Up): {
        return new GamePosition(gameObject.xPosition, gameObject.yPosition - 1);
        break;
      }
      case(MoveDirection.Down): {
        return new GamePosition(gameObject.xPosition, gameObject.yPosition + 1);
        break;
      }
      case(MoveDirection.Right): {
        return new GamePosition(gameObject.xPosition + 1, gameObject.yPosition);
        break;
      }
      case(MoveDirection.Left): {
        return new GamePosition(gameObject.xPosition - 1, gameObject.yPosition);
        break;
      }
    }
  }

  checkPacManMovePossible(direction: MoveDirection){

    let gamePosition;

    switch(direction){
      case(MoveDirection.Up): {
        gamePosition = new GamePosition(this.pacMan.xPosition, this.pacMan.yPosition - 1);

        break;
      }
      case(MoveDirection.Down): {
        gamePosition = new GamePosition(this.pacMan.xPosition, this.pacMan.yPosition + 1);
        break;
      }
      case(MoveDirection.Right): {
        gamePosition = new GamePosition(this.pacMan.xPosition + 1, this.pacMan.yPosition);
        break;
      }
      case(MoveDirection.Left): {
        gamePosition = new GamePosition(this.pacMan.xPosition - 1, this.pacMan.yPosition);
        break;
      }
    }

    if (this.matrixField[gamePosition.yPosition][gamePosition.xPosition] == 0){
      return false;
    }
    else{
      return true;
    }
  }
}


export class GameObject{
  public xPosition: number;
  public yPosition: number;
  public isRunning: boolean;
  public moveDirection: MoveDirection;

  constructor(x: number, y: number){
    this.xPosition = x;
    this.yPosition = y;
  }
}

export enum GameFieldTypes{
  Wall,
  Free,
  Pellet,
  Ghost,
  PacMan
}

export class GamePosition{
  public xPosition: number;
  public yPosition: number;
  public moveDirection: MoveDirection;

  constructor(x: number, y: number){
    this.xPosition = x;
    this.yPosition = y;
  }
}

export enum MoveDirection{
  Up,
  Down, 
  Left,
  Right
}
 