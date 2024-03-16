import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { ParesPipe } from './pares.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    ParesPipe
  ],
  exports: [
    ImagePipe,
    ParesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
