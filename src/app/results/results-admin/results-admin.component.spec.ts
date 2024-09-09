import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAdminComponent } from './results-admin.component';

describe('ResultsAdminComponent', () => {
  let component: ResultsAdminComponent;
  let fixture: ComponentFixture<ResultsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
