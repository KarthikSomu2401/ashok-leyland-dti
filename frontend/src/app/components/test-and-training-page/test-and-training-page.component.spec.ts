import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAndTrainingPageComponent } from './test-and-training-page.component';

describe('TestAndTrainingPageComponent', () => {
  let component: TestAndTrainingPageComponent;
  let fixture: ComponentFixture<TestAndTrainingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAndTrainingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAndTrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
