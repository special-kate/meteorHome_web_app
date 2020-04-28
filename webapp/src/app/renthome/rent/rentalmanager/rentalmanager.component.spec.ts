import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalmanagerComponent } from './rentalmanager.component';

describe('RentalmanagerComponent', () => {
  let component: RentalmanagerComponent;
  let fixture: ComponentFixture<RentalmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
