import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlippingComponent } from './flipping.component';

describe('FlippingComponent', () => {
  let component: FlippingComponent;
  let fixture: ComponentFixture<FlippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
