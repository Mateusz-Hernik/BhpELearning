import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpozTutorialComponent } from './ppoz-tutorial.component';

describe('PpozTutorialComponent', () => {
  let component: PpozTutorialComponent;
  let fixture: ComponentFixture<PpozTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpozTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpozTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
