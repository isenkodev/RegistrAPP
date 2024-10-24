import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaprofesoresPage } from './listaprofesores.page';

describe('ListaprofesoresPage', () => {
  let component: ListaprofesoresPage;
  let fixture: ComponentFixture<ListaprofesoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaprofesoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
