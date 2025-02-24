import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardSmallComponent } from './book-card-small.component';

describe('BookCardSmallComponent', () => {
  let component: BookCardSmallComponent;
  let fixture: ComponentFixture<BookCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardSmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
