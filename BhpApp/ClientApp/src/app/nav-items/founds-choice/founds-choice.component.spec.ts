import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundsChoiceComponent } from './founds-choice.component';

describe('FoundsChoiceComponent', () => {
  let component: FoundsChoiceComponent;
  let fixture: ComponentFixture<FoundsChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundsChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundsChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
