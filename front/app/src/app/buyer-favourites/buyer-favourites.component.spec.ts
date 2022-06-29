import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerFavouritesComponent } from './buyer-favourites.component';

describe('BuyerFavouritesComponent', () => {
  let component: BuyerFavouritesComponent;
  let fixture: ComponentFixture<BuyerFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
