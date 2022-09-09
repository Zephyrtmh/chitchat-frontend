import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCardDisplayComponent } from './message-card-display.component';

describe('MessageCardDisplayComponent', () => {
  let component: MessageCardDisplayComponent;
  let fixture: ComponentFixture<MessageCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCardDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
