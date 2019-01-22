import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WppDevelopingComponent } from './wpp-developing.component';

describe('WppDevelopingComponent', () => {
  let component: WppDevelopingComponent;
  let fixture: ComponentFixture<WppDevelopingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WppDevelopingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WppDevelopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
