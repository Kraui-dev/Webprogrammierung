import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Stage } from 'stage-js/platform/web';

declare var stageAnimation: any;

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.css']
})
export class GameLogicComponent implements OnInit {

  @ViewChild('gameCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
 
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
        // for(let i =0;i<28;i++){
        //   this.ctx.fillStyle = i%2===0?"green":"blue";
        //   this.ctx.fillRect(10*i + 2, 0, 10, 10);
        //   this.ctx.stroke();
        // }
        
        let dot = new Image();
        dot.src = '../../assets/dot.png';
        dot.width = 28;
        dot.height = 31;
        dot.onload = () => {
          this.ctx.drawImage(dot, 10 + 2, 10 - 2);
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
