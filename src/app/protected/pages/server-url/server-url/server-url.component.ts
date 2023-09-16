import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsQR from "jsqr";


@Component({
  selector: 'app-server-url',
  templateUrl: './server-url.component.html',
  styleUrls: ['./server-url.component.scss']
})
export class ServerUrlComponent implements OnInit {

  
  @ViewChild('videoElement') videoElement!: ElementRef;

  qrData : any;
  private cameraStream: MediaStream | null = null;
  showCamera : boolean = true;
  myForm!: FormGroup;
  showInput : boolean = false;
  phone :  boolean = false;

  constructor(
                private fb: FormBuilder,
  ) {

  (screen.width <= 600) ? this.phone = true : this.phone = false;


    this.myForm = this.fb.group({

      url:  [ '', [Validators.required]],
    });
    
   }

  ngOnInit(): void {
    // this.encender()
  }

  async encender() {
    try {
      this.showCamera = true;
      this.showInput = false;
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.videoElement.nativeElement.srcObject = stream;
      this.cameraStream = stream;
      this.empezarLecturaQR(); // No necesitas pasar el stream aquí
    } catch (error) {
      console.error('Error al acceder a la cámara: ', error);
    }
  }
  
  empezarLecturaQR() { // No necesitas pasar el stream como argumento
    const video = this.videoElement.nativeElement; // Utiliza el elemento de video existente
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    video.onloadedmetadata = () => {
      video.play();
  
      const leerQR = () => {
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
        const codigoQR = jsQR(imageData!.data, imageData!.width, imageData!.height);
  
        if (codigoQR) {
          this.qrData = codigoQR.data;
          if (this.qrData) {
            this.apagarCamara();
            this.showCamera = false;
            console.log('deberi apágar');
          }
          console.log('Código QR detectado:', codigoQR.data);
        }
  
        requestAnimationFrame(leerQR);
      };
  
      // canvas.width = video.videoWidth;
      // canvas.height = video.videoHeight;
  
      // video.parentElement?.appendChild(canvas);
  
      leerQR();
    };
  }
  

  apagarCamara() {
    if (this.cameraStream) {
      const tracks = this.cameraStream.getTracks();
      tracks.forEach(track => {
        track.stop(); // Detener cada pista de la cámara
      });
      this.cameraStream = null; // Limpiar la referencia al flujo de cámara
    }
  }

  close(){
    this.showCamera = false;
    this.qrData = null;
    this.showInput = false;
    
  }

  onSaveForm(){
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  getUrl(){
    this.showInput = true;
    this.showCamera = false;
    this.qrData = null;

  }

}
