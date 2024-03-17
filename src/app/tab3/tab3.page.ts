import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {DataLocalService} from "../services/data-local.service";
import {Genre, Pelicula, PeliculaDetalle} from "../interfaces/interfaces";
import {MoviesService} from "../services/movies.service";
import {SlideshowPosterComponent} from "../components/slideshow-poster/slideshow-poster.component";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  localServices = inject(DataLocalService)
  moviesService = inject(MoviesService)
  peliculas: PeliculaDetalle[]= []
  generos: Genre[] = []

  favoritoGenero: any[] = [];
  constructor() {}

  // async ngOnInit() {
  //   this.peliculas = await this.localServices.cargarPeliculas()
  //   this.generos = await this.moviesService.cargarGeneros()
  //   this.pelisPorGenero(this.generos, this.peliculas)
  // }

  async ionViewWillEnter() {
    this.peliculas = await this.localServices.cargarPeliculas()
    this.generos = await this.moviesService.cargarGeneros()
    this.pelisPorGenero(this.generos, this.peliculas)
  }

  async onModalClosed() {
   await this.ionViewWillEnter()
  }


  //se ejecute cada vez que la pagina entre

  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]  ) {
    this.favoritoGenero = [];
    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres!.find( genre => genre.id === genero.id );
        })
      });
    });
    console.log(this.favoritoGenero);
  }

}
