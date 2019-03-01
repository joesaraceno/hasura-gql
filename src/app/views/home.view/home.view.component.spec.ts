import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home.ViewComponent } from './home.view.component';

describe('Home.ViewComponent', () => {
  let component: Home.ViewComponent;
  let fixture: ComponentFixture<Home.ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home.ViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home.ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
