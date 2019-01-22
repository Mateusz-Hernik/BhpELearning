import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiozDevelopingComponent } from './bioz-developing.component';

describe('BiozDevelopingComponent', () => {
  let component: BiozDevelopingComponent;
  let fixture: ComponentFixture<BiozDevelopingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiozDevelopingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiozDevelopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
