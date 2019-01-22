import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpInstructionComponent } from './bp-instruction.component';

describe('BpInstructionComponent', () => {
  let component: BpInstructionComponent;
  let fixture: ComponentFixture<BpInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
