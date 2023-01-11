
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  {
  myForm!: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      nombre    : new FormControl('', [Validators.required, Validators.minLength(8)]),
      apellidos : new FormControl('', [Validators.required, Validators.minLength(8)])})
  }

 
    
    onSubmit():void{
      
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
