import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistraradPage } from './registrarad.page';

describe('RegistraradPage', () => {
  let component: RegistraradPage;
  let fixture: ComponentFixture<RegistraradPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraradPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
