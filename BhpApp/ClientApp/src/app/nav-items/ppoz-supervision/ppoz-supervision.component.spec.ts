import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpozSupervisionComponent } from './ppoz-supervision.component';

describe('PpozSupervisionComponent', () => {
  let component: PpozSupervisionComponent;
  let fixture: ComponentFixture<PpozSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpozSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpozSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
