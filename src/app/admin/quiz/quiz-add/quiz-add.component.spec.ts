import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizAddComponent } from './quiz-add.component';

describe('AdminQuizAddComponent', () => {
  let component: AdminQuizAddComponent;
  let fixture: ComponentFixture<AdminQuizAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminQuizAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuizAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
