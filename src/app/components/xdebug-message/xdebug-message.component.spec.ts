import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XdebugMessageComponent } from './xdebug-message.component';

describe('XdebugMessageComponent', () => {
  let component: XdebugMessageComponent;
  let fixture: ComponentFixture<XdebugMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XdebugMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XdebugMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
