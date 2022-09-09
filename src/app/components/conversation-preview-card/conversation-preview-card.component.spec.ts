import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPreviewCardComponent } from './conversation-preview-card.component';

describe('ConversationPreviewCardComponent', () => {
  let component: ConversationPreviewCardComponent;
  let fixture: ComponentFixture<ConversationPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationPreviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
