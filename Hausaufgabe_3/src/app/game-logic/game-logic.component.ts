import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { join } from 'path';
// import { Stage } from 'stage-js/platform/web';

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

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
//     this.ctx.beginPath();
//     this.ctx.lineWidth = 6;
//     this.ctx.strokeStyle = "red";
// this.ctx.rect(5, 5, 290, 140);
// this.ctx.stroke();
// this.ctx.beginPath();
//         for(let i =0;i<28;i++){
//           this.ctx.fillStyle = i%2===0?"green":"blue";
//           this.ctx.fillRect(10*i + 2, 0, 10, 10);
//           this.ctx.stroke();
//         }
        
this.create2DField();

//         let dot = new Image();
//         dot.src = '../../assets/dot.png';
//         dot.width = 28;
//         dot.height = 31;
//         dot.onload = () => {
//           this.ctx.drawImage(dot, 10 + 2, 20 - 2);
//         };
//         dot.onload = () => {
//           this.ctx.drawImage(dot, 200 + 2, 20 - 2);
//         };
//         dot.onload = () => {
//           this.ctx.drawImage(dot, 20 + 2, 20 - 2);
//         };
// let ghost = new Image();
// ghost.src = '../../assets/ghostpink.png';
// ghost.width = 28;
// ghost.height = 31;
// ghost.onload = () => {
//           this.ctx.drawImage(ghost, 30 + 2, 10 - 2);
//         }

        for(let i = 0; i < 31;i++){
          for(let j = 0;j < 28; j++){
            
            if (this.matrixField[i][j] == 1){
              let img = new Image();
              img.src = '../../assets/pellet.png';
              img.width = 28;
              img.height = 31;
              img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
            }
          }

          if (this.matrixField[i][j] == 2){
            let img = new Image();
            img.src = '../../assets/test_pellet.png';
            img.width = 28;
            img.height = 31;
            img.onload = () => {
              this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
          }
        }

            if (this.matrixField[i][j] == 3){
              let img = new Image();
              img.src = '../../assets/pink_ghost.png';
              img.width = 28;
              img.height = 31;
              img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
            }
          }

            if (this.matrixField[i][j] == 4){
              let img = new Image();
              img.src = '../../assets/red_ghost.png';
              img.width = 28;
              img.height = 31;
              img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
            }
          }

            if (this.matrixField[i][j] == 5){
              let img = new Image();
              img.src = '../../assets/orange_ghost.png';
              img.width = 28;
              img.height = 31;
              img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
            }
          }

            if (this.matrixField[i][j] == 6){
              let img = new Image();
              img.src = '../../assets/turquoise_ghost.png';
              img.width = 28;
              img.height = 31;
              img.onload = () => {
                this.ctx.drawImage(img, j * 10 + 5,  i * 10 + 2);
            }
          }
            
          }
        }
      
        // const image = new Image(28, 31);
        // image.onload = this.drawImageActualSize;
        // dotImage.widh
        // // image.src = './gameFieldPictures/dot.png';
        // this.ctx.drawImage(dotImage, 0, 0);
        // for(let i = 0; i < 28; i++){
        //   for (let j = 0; j < 31; i++){
        //     this.ctx.beginPath();
        //     this.ctx.fillStyle = i%2===0?"green":"blue";
        //     this.ctx.fillRect(28*i, 31*j, 45, 50);
        //     this.ctx.stroke();
        //   }
        // }
// this.loadBackground();
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

  drawImageActualSize(){
  }

  // Stage(stage) {
  //   stage.viewbox(300, 300, mode = 'in-pad')
  // });

  loadBackground(){
    // for(let i = 0; i < 45; i++){
    //   for (let j = 0; j < 50; i++){
    //     this.ctx.beginPath();
    //     this.ctx.fillRect(i, j, 2.8, 3.1)
    //     this.ctx.stroke();
    //   }
    // }
  }

}
