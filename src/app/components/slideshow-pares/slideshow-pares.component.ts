import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Pelicula} from "../../interfaces/interfaces";
import {DetalleComponent} from "../detalle/detalle.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() movies: Pelicula[] = [];
  @Output() cargarMas: EventEmitter<void> = new EventEmitter();
  modalCtrl=inject(ModalController)

  constructor() {
  }

  ngOnInit() {
    console.log("_")
  }

  onClick() {
    console.log('clicked');
    this.cargarMas.emit();
  }

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
