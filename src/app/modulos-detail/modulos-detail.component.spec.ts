import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosDetailComponent } from './modulos-detail.component';

describe('ModulosDetailComponent', () => {
  let component: ModulosDetailComponent;
  let fixture: ComponentFixture<ModulosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulosDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
