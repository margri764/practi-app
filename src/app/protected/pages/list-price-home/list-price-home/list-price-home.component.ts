import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-price-home',
  templateUrl: './list-price-home.component.html',
  styleUrls: ['./list-price-home.component.scss']
})
export class ListPriceHomeComponent implements OnInit {

  general: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  selectList( option : string ){

    switch (option) {
      case 'general':
                    this.general = !this.general;
        
        break;
    
      default:
        break;
    }

  }
}
