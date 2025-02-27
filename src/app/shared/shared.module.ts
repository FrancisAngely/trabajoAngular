import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,  // No es necesario importar AppRoutingModule aquí
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule { }
