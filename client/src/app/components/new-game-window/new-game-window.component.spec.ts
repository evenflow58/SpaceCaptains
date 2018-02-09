import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameWindowComponent } from './new-game-window.component';

describe('NewGameWindowComponent', () => {
  let component: NewGameWindowComponent;
  let fixture: ComponentFixture<NewGameWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
