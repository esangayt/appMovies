import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlideshowBackdropComponent} from "./slideshow-backdrop/slideshow-backdrop.component";
import {PipesModule} from "../pipes/pipes.module";
import { register } from 'swiper/element/bundle';
import {IonicModule} from "@ionic/angular";
import {SlideshowPosterComponent} from "./slideshow-poster/slideshow-poster.component";
import {SlideshowParesComponent} from "./slideshow-pares/slideshow-pares.component";
import {DetalleComponent} from "./detalle/detalle.component";

register();

@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
