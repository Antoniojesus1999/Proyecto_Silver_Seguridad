import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService implements  AfterViewInit{

  constructor(private http:HttpClient) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

    public sendPost(body: { image: any; nombre: string; apellido: string; }){
    

      body.image = this.stringToBytes(body.image);
      console.log(body);

     // Enviar la solicitud al servidor
    this.http.post<any>('http://localhost:8080/api/mail', { body}).subscribe({
      next: data => {
          //this.postId = data.id;
      },
      error: error => {
          //this.errorMessage = error.message;
          console.error('Error detectado!', error);
      }
  })
    
  }

  stringToBytes(string: string): Uint8Array {
    return new TextEncoder().encode(string);
  }
  /*base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = this.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private atob(base64: string): string {
    return new TextDecoder().decode(new Uint8Array(this.base64ToBinary(base64)));
  }

  private base64ToBinary(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }*/
}
