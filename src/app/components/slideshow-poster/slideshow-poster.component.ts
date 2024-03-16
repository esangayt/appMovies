import {Component, inject, Input, OnInit} from '@angular/core';
import {Pelicula} from "../../interfaces/interfaces";
import {DetalleComponent} from "../detalle/detalle.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() movies: Pelicula[] = [];
  modalCtrl=inject(ModalController)

  constructor() { }

  ngOnInit() {}
  async verDetalle(id:number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}