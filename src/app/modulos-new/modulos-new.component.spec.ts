import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosNewComponent } from './modulos-new.component';

describe('ModulosNewComponent', () => {
  let component: ModulosNewComponent;
  let fixture: ComponentFixture<ModulosNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulosNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
