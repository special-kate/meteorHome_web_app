import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSearchComponent } from './sell-search.component';

describe('SellSearchComponent', () => {
  let component: SellSearchComponent;
  let fixture: ComponentFixture<SellSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
