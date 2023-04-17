import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlippingComponent } from './search-flipping.component';

describe('SearchFlippingComponent', () => {
  let component: SearchFlippingComponent;
  let fixture: ComponentFixture<SearchFlippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFlippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFlippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
