import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchhomeComponent } from './searchhome.component';

describe('SearchhomeComponent', () => {
  let component: SearchhomeComponent;
  let fixture: ComponentFixture<SearchhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
