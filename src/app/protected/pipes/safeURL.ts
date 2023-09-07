


import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
 
@Pipe({
  name: 'safeURL'
})
export class SafeURL implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(url: any): any {
    // return this.sanitizer.bypassSecurityTrustHtml(url);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
 
}