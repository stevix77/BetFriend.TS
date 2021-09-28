import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchBetComponent } from './launch-bet.component';

describe('LaunchBetComponent', () => {
  let component: LaunchBetComponent;
  let fixture: ComponentFixture<LaunchBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
