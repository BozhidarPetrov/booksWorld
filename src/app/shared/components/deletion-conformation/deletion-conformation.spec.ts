import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionConformationComponent } from './deletion-conformation';

describe('DeletionConformationComponent', () => {
  let component: DeletionConformationComponent;
  let fixture: ComponentFixture<DeletionConformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletionConformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletionConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
