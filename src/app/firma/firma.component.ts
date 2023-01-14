import { AfterViewInit, Component, HostListener,  OnInit,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss']
})
export class FirmaComponent implements OnInit, AfterViewInit{

  @ViewChild('canvasRef', { static: false }) canvasRef: any;
   private cx: CanvasRenderingContext2D;
   isDrawing = false;
   canvasWidth = 300;
   canvasHeight = 200;
   private points: Array<any> = [];
  

  constructor() {

  }
  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void {
    this.render();
  }
  
  @HostListener('mousedown',['$event'])
  onMouseDown = (e:any) =>{
    if(e.target.id === 'canvasId'){
      this.isDrawing = true;
       this.points = [];
    }
  }

  @HostListener('mouseup',['$event'])
  onMouseUp = (e:any) =>{
    if(e.target.id === 'canvasId'){
      this.isDrawing = false;
    }
  }

  @HostListener('mousemove',['$event'])
  onMouseMove = (e:any) =>{
    if(e.target.id === 'canvasId' && this.isDrawing){
      console.log(e);
      this.write(e);
    }
  }

  private render():any{
    const canvasEl = this.canvasRef.nativeElement;
    console.log(canvasEl);
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.canvasWidth;
    canvasEl.height = this.canvasHeight;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

  }

  private write(res):any{
    const canvasEl: any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    };

    this.writeSingle(prevPos);
  }

  private writeSingle = (prevPos) => {
    this.points.push(prevPos);
    if (this.points.length>3) {
      const prevPos = this.points[this.points.length -1];
      const currentPos = this.points[this.points.length -2];
      this.drawOnCanvas(prevPos,currentPos);
      
    }
  }

  private drawOnCanvas(prevPos: any, currentPos:any){
    if (!this.cx) {
      return;
    }
    this.cx.beginPath();
    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }
}
