import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-banner-register', // Reemplaza 'app-banner-register' con el selector real de BannerRegisterComponent
  template: '', // Puedes dejar el template vacío o agregar contenido simulado para las pruebas
})

export class MockBannerRegisterComponent {}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, MockBannerRegisterComponent, ],
      imports: [MatBottomSheetModule, MatDialogModule, HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
