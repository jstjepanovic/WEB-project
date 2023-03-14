import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoardGameComponent } from './manage-board-game.component';

describe('ManageBoardGameComponent', () => {
  let component: ManageBoardGameComponent;
  let fixture: ComponentFixture<ManageBoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBoardGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
