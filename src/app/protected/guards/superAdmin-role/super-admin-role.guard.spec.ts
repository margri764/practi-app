import { TestBed } from '@angular/core/testing';
import { SuperAdminRoleGuard } from './super-admin-role.guard';
import { MatDialog } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

describe('SuperAdminRoleGuard', () => {
  let guard: SuperAdminRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: MatDialog, useValue: {} },
        provideMockStore({ initialState: {} })
      ]
    });
    guard = TestBed.inject(SuperAdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
