import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhpServicePriceComponent } from './bhp-service-price.component';

describe('BhpServicePriceComponent', () => {
  let component: BhpServicePriceComponent;
  let fixture: ComponentFixture<BhpServicePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhpServicePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhpServicePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
