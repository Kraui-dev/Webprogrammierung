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

  private ctx: CanvasRenderingContext2D;

  private redGhost: GameObject;
  private orangeGhost: GameObject;
  private turquioseGhost: GameObject;
  private pinkGhost: GameObject;
  private pacMan: GameObject;
  private isGameRunning: boolean;

  constructor() { }

  ngOnInit() {
    //import { Stage } from 'stage-js/platform/web';
    var x = require('stage-js/platform/web');
    console.log(x);
    // this.ctx = this.canvas.nativeElement.getContext('2d');
        
    // this.create2DField();

    //     for(let i = 0; i < 31;i++){
    //       for(let j = 0;j < 28; j++){
            
    //         if (this.matrixField[i][j] == 1){
    //           let img = new Image();
    //           img.src = '../../assets/pellet.png';
    //           img.width = 28;
    //           img.height = 31;
    //           img.onload = () => {
    //             this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //         }
    //       }

    //     //   if (this.matrixField[i][j] == 2){
    //     //     let img = new Image();
    //     //     img.src = '../../assets/test_pellet.png';
    //     //     img.width = 28;
    //     //     img.height = 31;
    //     //     img.onload = () => {
    //     //       this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //     //   }
    //     // }

    //         if (this.matrixField[i][j] == 3){
    //           let img = new Image();
    //           img.src = '../../assets/pink_ghost.png';
    //           img.width = 28;
    //           img.height = 31;
    //           img.onload = () => {
    //             this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //         }
    //       }

    //         if (this.matrixField[i][j] == 4){
    //           let img = new Image();
    //           img.src = '../../assets/red_ghost.png';
    //           img.width = 28;
    //           img.height = 31;
    //           img.onload = () => {
    //             this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //         }
    //       }

    //         if (this.matrixField[i][j] == 5){
    //           let img = new Image();
    //           img.src = '../../assets/orange_ghost.png';
    //           img.width = 28;
    //           img.height = 31;
    //           img.onload = () => {
    //             this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //         }
    //       }

    //         if (this.matrixField[i][j] == 6){
    //           let img = new Image();
    //           img.src = '../../assets/turquoise_ghost.png';
    //           img.width = 28;
    //           img.height = 31;
    //           img.onload = () => {
    //             this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
    //         }
    //       }
            
    //       }
    //     }

    //     this.initializeGame();
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
    let turquioseThread = new Promise(() => this.startGhost(turqoiseGhost));
    let orangeThread = new Promise(() => this.startGhost(orangeGhost));
    let pinkThread = new Promise(() => this.startGhost(pinkGhost));
  }

  startGhost(ghost: GameObject){
    let nextMove = this.getNextGhostMove(ghost);
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

  if (this.matrixField[nextGamePosition.xPosition][nextGamePosition.yPosition] == 1){
      return false;
  }
  else{
    return true;
  }
}

  movePacMan(){
    
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

export class GamePosition{
  public xPosition: number;
  public yPosition: number;

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
 