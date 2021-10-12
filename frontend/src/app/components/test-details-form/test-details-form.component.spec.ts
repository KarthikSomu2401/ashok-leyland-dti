import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsFormComponent } from './test-details-form.component';

describe('TestDetailsFormComponent', () => {
  let component: TestDetailsFormComponent;
  let fixture: ComponentFixture<TestDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
