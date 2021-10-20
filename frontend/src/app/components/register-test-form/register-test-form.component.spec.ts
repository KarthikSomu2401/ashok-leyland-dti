import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTestFormComponent } from './register-test-form.component';

describe('RegisterTestFormComponent', () => {
  let component: RegisterTestFormComponent;
  let fixture: ComponentFixture<RegisterTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
