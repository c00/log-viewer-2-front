import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlMessageComponent } from './sql-message.component';

describe('SqlMessageComponent', () => {
  let component: SqlMessageComponent;
  let fixture: ComponentFixture<SqlMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
