import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosNewComponent } from './alumnos-new.component';

describe('AlumnosNewComponent', () => {
  let component: AlumnosNewComponent;
  let fixture: ComponentFixture<AlumnosNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnosNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
