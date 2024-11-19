import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsigregisPage } from './asigregis.page';

describe('AsigregisPage', () => {
  let component: AsigregisPage;
  let fixture: ComponentFixture<AsigregisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigregisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
