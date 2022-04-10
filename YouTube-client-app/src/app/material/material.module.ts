import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';

const MaterialComponents = [
  MatSliderModule,
  MatInputModule,
];

@NgModule({
  imports: MaterialComponents,
  exports: MaterialComponents,
})
export class MaterialModule { }
