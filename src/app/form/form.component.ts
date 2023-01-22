
import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  myForm!: FormGroup;
  @ViewChild('canvasRef', { static: false }) canvasRef: any;
  private cx: CanvasRenderingContext2D;
   isDrawing = false;
   canvasWidth = 400;
   canvasHeight =500;
   private points: Array<any> = [];


  constructor(private formService: FormService) {
    this.myForm = new FormGroup({
      nombre    : new FormControl('', [Validators.required, Validators.minLength(4)]),
      apellidos : new FormControl('', [Validators.required, Validators.minLength(4)])})
  }
 
  ngAfterViewInit(): void {
    this.render();
  }
  
  onSubmit():void{
      
    if(this.canvasRef) {
      let canvasEl = this.canvasRef.nativeElement;
      // Obtener la imagen en formato base64
      const imageData = canvasEl.toDataURL();
      // Crear el cuerpo de la solicitud
      const body = {
        firma: imageData,
        nombre:"Antonio",
        apellido:"Ponce Vela"
      };
      this.formService.sendPost(body);
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

  @HostListener('touchstart',['$event'])
onTouchStart = (e:any) =>{
    if(e.target.id === 'canvasId'){
      this.isDrawing = true;
       this.points = [];
    }
  }

  @HostListener('touchend',['$event'])
onTouchEnd = (e:any) =>{
    if(e.target.id === 'canvasId'){
      this.isDrawing = false;
    }
  }

  @HostListener('touchmove',['$event'])
  onTouchMove = (e:any) =>{
    if(e.target.id === 'canvasId' && this.isDrawing){
      const canvasEl: any = this.canvasRef.nativeElement;
      const rect = canvasEl.getBoundingClientRect();
      const prevPos = {
        x: e.changedTouches[0].clientX - rect.left,
        y: e.changedTouches[0].clientY - rect.top
      };
      this.writeSingle(prevPos);
    }
  }

  
  public clearCanvas(){
    this.cx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
    


    getValidarNombre() {
      return {
        'is-invalid': this.myForm.get('nombre')?.invalid && this.myForm.get('nombre')?.touched,
        'is-valid': this.myForm.get('nombre')?.valid && this.myForm.get('nombre')?.touched
      };
    }

    getValidarApellidos(){
      return {
        'is-invalid': this.myForm.get('apellidos')?.invalid && this.myForm.get('apellidos')?.touched,
        'is-valid': this.myForm.get('apellidos')?.valid && this.myForm.get('apellidos')?.touched
      }
    }
}
