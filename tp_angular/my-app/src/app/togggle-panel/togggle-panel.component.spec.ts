import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggglePanelComponent } from './togggle-panel.component';

describe('ToggglePanelComponent', () => {
  let component: ToggglePanelComponent;
  let fixture: ComponentFixture<ToggglePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggglePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggglePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
