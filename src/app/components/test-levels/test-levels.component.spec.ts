import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLevelsComponent } from './test-levels.component';

describe('TestLevelsComponent', () => {
  let component: TestLevelsComponent;
  let fixture: ComponentFixture<TestLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
