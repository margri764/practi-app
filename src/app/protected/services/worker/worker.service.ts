import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private worker: Worker;

  constructor() {
    this.worker = new Worker('./web-worker', { type: 'module' });
  }

  calculateTotalInBackground(detalleItems: any[]): Promise<number> {
    return new Promise((resolve) => {
      this.worker.onmessage = ({ data }) => {
        resolve(data);
      };

      this.worker.postMessage({ detalleItems });
    });
  }

}