import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCryptoComponent } from './display-crypto.component';

describe('DisplayCryptoComponent', () => {
  let component: DisplayCryptoComponent;
  let fixture: ComponentFixture<DisplayCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
