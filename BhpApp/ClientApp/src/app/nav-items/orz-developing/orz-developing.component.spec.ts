import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrzDevelopingComponent } from './orz-developing.component';

describe('OrzDevelopingComponent', () => {
  let component: OrzDevelopingComponent;
  let fixture: ComponentFixture<OrzDevelopingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrzDevelopingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrzDevelopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
