import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhpTrainingComponent } from './bhp-training.component';

describe('BhpTrainingComponent', () => {
  let component: BhpTrainingComponent;
  let fixture: ComponentFixture<BhpTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhpTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhpTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
