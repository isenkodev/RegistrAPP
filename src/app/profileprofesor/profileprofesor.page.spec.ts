import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileprofesorPage } from './profileprofesor.page';

describe('ProfileprofesorPage', () => {
  let component: ProfileprofesorPage;
  let fixture: ComponentFixture<ProfileprofesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileprofesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
