import { Component } from '@angular/core';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss']
})
export class FirmaComponent {


  constructor(private signaturePad: SignaturePad) {
   
  }

  public signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 200
  };

  

  drawComplete() {
    // will be notified when the signature draw is complete
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified when the signature draw will start
    console.log('begin drawing');
  }
  
}
