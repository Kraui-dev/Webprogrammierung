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
  enumField: GameFieldTypes[][];

  private ctx: CanvasRenderingContext2D;

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
    this.createEnumField();
    this.drawGameField();
    this.drawPacMan();
    let self = this;
    document.addEventListener('keydown', function(e: KeyboardEvent){
        self.keyboardInput(e);
    });
       // this.initializeGame();
  }

  drawPacMan(){
    this.pacMan = new GameObject(2, 1);
    this.pacMan.moveDirection = MoveDirection.Right;
    let img = new Image();
    img.src = '../../assets/dot.png';
    img.width = 28;
    img.height = 31;
    
    img.onload = () => {
      this.ctx.drawImage(img, this.pacMan.xPosition * 10 - 1,  this.pacMan.yPosition * 10 - 3.5);
      console.log(this.pacMan.yPosition)
    }
  }

  keyboardInput(event: KeyboardEvent) {
    // PRESS LEFT ARROW
    if (event.keyCode == 37) {
      console.log("left key pressed");
      this.movePacMan(MoveDirection.Left);
    }
    // PRESS UP ARROW
    else if (event.keyCode == 38) {
      this.movePacMan(MoveDirection.Up);
    }
    // PRESS RIGHT ARROW
    else if (event.keyCode == 39) {
      console.log("right key pressed");
      this.movePacMan(MoveDirection.Right);
    }
    // PRESS DOWN ARROW
    else if (event.keyCode == 40) {
      console.log("down key pressed");
      this.movePacMan(MoveDirection.Down)
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

  createEnumField(){

    this.enumField = [];

    for(let i = 0; i < 31;i++){
      for(let j = 0;j < 28;j++){

        this.enumField[i] = [];

        switch(this.matrixField[i][j]){
          case(0): {
            this.enumField[i][j] = 5;
            //this.enumField[i][j] = GameFieldTypes.Wall;

            break;
          }
          case(1): {
            this.enumField[i][j] = GameFieldTypes.Pellet;

            break;
          }
          case(2): {
            this.enumField[i][j] = GameFieldTypes.Free;

            break;
          }
          case(3): {
            this.enumField[i][j] = GameFieldTypes.PacMan;

            break;
          }
          case(4): {
            this.enumField[i][j] = GameFieldTypes.Ghost;

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
    this.initializeGhosts();
  }

  initializeGhosts(){
    let redGhost = new GameObject(14, 15);
    let turqoiseGhost = new GameObject(14, 15);
    let orangeGhost = new GameObject(14, 15);
    let pinkGhost = new GameObject(14, 15);

    let redThread = new Promise(() => this.startGhost(redGhost));
    // let turquioseThread = new Promise(() => this.startGhost(turqoiseGhost));
    // let orangeThread = new Promise(() => this.startGhost(orangeGhost));
    // let pinkThread = new Promise(() => this.startGhost(pinkGhost));
  }

  startGhost(ghost: GameObject){
    while(ghost.isRunning){
    (async () =>{
        await this.delay(1000);

      });

      let nextMove = this.getNextGhostMove(ghost);

      //do movement hier
    }
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

    if (this.enumField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isUpDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition;
    let yPosition = gameObject.yPosition - 1;

    if (this.enumField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isLeftDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition - 1;
    let yPosition = gameObject.yPosition;

    if (this.enumField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

  isRightDirectionAvailable(gameObject: GameObject){
    let xPosition = gameObject.xPosition + 1;
    let yPosition = gameObject.yPosition;

    if (this.enumField[yPosition][xPosition] != 0){
      return true;
    }

    return false;
  }

getNewMovePosition(gameObject: GameObject){
  let nextGamePosition = new GamePosition(gameObject.xPosition, gameObject.yPosition);

  switch(gameObject.moveDirection){
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

  if (this.matrixField[nextGamePosition.xPosition][nextGamePosition.yPosition] != 0){
      return false;
  }
  else{
    return true;
  }
}

  movePacMan(direction: MoveDirection){
    this.doAnimation();
    this.doMovementPacMan(direction);
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
    }
    else{

    }
  

    this.getNextPacManMove();

    return true;
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

  getNextPacManMove(){

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
 