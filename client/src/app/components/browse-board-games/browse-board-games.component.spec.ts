import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBoardGamesComponent } from './browse-board-games.component';

describe('BrowseBoardGamesComponent', () => {
  let component: BrowseBoardGamesComponent;
  let fixture: ComponentFixture<BrowseBoardGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseBoardGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseBoardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
