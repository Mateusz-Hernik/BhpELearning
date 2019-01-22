import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpozServicePriceComponent } from './ppoz-service-price.component';

describe('PpozServicePriceComponent', () => {
  let component: PpozServicePriceComponent;
  let fixture: ComponentFixture<PpozServicePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpozServicePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpozServicePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
