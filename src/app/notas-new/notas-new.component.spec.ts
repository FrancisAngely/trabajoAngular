import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaNewComponent } from './notas-new.component';

describe('NotasNewComponent', () => {
  let component: NotaNewComponent;
  let fixture: ComponentFixture<NotaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotaNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
