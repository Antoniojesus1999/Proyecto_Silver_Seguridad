import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService implements AfterViewInit {

  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  public sendPost(body: { firma: String; nombre: string; apellido: string; }) {
  
    console.log(body);

  
    body.firma = body.firma.replace(/^data:image\/\w+;base64,/, "");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    this.http.post<any>('http://localhost:8080/api/mail', JSON.stringify(body), httpOptions ).subscribe({
      next: data => {
        //this.postId = data.id;
      },
      error: error => {
        //this.errorMessage = error.message;
        console.error('Error detectado!', error);
      }
    });

  }

  stringToBytes(string: string): Uint8Array {
    return new TextEncoder().encode(string);
  }
  
}
