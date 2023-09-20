import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsQR from "jsqr";
import { CookieService } from 'ngx-cookie-service';
import { getDataLS } from 'src/app/protected/Storage';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/protected/services/order/order.service';


@Component({
  selector: 'app-server-url',
  templateUrl: './server-url.component.html',
  styleUrls: ['./server-url.component.scss']
})
export class ServerUrlComponent implements OnInit, OnDestroy {

  
  @ViewChild('videoElement') videoElement!: ElementRef;

  qrData : string = '';
  private cameraStream: MediaStream | null = null;
  showCamera : boolean = true;
  myForm!: FormGroup;
  showInput : boolean = false;
  phone :  boolean = false;
  confirm : boolean = false;
  urlError : string = ''


  constructor(
                private fb: FormBuilder, 
                private authService : AuthService,
                private orderService : OrderService,
                private localStorageService : LocalStorageService,
                private articleService : ArticlesService,
                private router : Router,
  ) {

  (screen.width <= 600) ? this.phone = true : this.phone = false;


    this.myForm = this.fb.group({

      url:  ['', [Validators.required, Validators.pattern(/^(http|https):\/\/.*\/$/)]],
    });
    
   }


  ngOnInit(): void {
   console.log( this.authService.getUrl() );
  }

  async encender() {
    try {
      this.showCamera = true;
      this.showInput = false;
      this.myForm.get('url')?.setValue('');
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
          }
          this.setBaseURL(codigoQR.data);
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
        track.stop(); 
      });
      this.cameraStream = null; 
    }
  }

  close(){
    this.showCamera = false;
    this.qrData = '';
    this.showInput = false;
    this.apagarCamara();
    this.myForm.get('url')?.setValue('');
    
  }

  ngOnDestroy(): void {
    this.apagarCamara();
    this.close();
  }



  getUrl(){
    this.showInput = true;
    this.showCamera = false;
    this.qrData = '';

  }

  setBaseURL(url:string){
    this.authService.setBaseUrl(url);
    this.orderService.setBaseUrl(url);
    this.articleService.setBaseUrl(url);
    this.localStorageService.saveStateToLocalStorage( url, 'baseUrl');
    
  }
  
  continue(){

    this.confirm = true;
    setTimeout(()=>{ this.router.navigateByUrl('/login')}, 500);
  }

  sendUrl() {
    const urlControl = this.myForm.get('url') ;
  
    // Marcar el campo URL como tocado
    urlControl?.markAsTouched();
  
    if (urlControl?.invalid) {
      if (urlControl?.errors?.['required']) {
        // El campo URL es requerido
        this.urlError = 'Este campo es requerido.';
      } else if (urlControl?.errors?.['pattern']) {
        // La URL tiene un formato incorrecto
        this.urlError = 'La URL debe comenzar con http o https y terminar en "/"';
      }
      
      return;
    }
  
    const baseUrl = urlControl?.value;
      
      this.confirm = true;
      this.setBaseURL(baseUrl);
  
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 500);
    }
  





}
