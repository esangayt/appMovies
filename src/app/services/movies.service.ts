import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PeliculaDetalle, RespuestaCredits, RespuestaMDB} from "../interfaces/interfaces";
import {environment} from "../../environments/environment";


const URL = environment.url
const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  http = inject(HttpClient)
  private pupularesPage = 0;
  constructor() {
  }

  private executeQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    // 0 es el día anterior, lo que sería el último día del mes anterior
    //Obtiene el último día del mes actual
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    //Los meses trabaja en 0
    const mes = hoy.getMonth() + 1;

    let mesString;
    if (mes < 10) {
      mesString = '0' + mes;
    }else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.executeQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.pupularesPage++;
    return this.executeQuery<RespuestaMDB>(`/discover/movie?sort_by=popularity.desc&page=${this.pupularesPage}`);
  }

  getPeliculaDetalle(id: number) {
    return this.executeQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }
  getActoresPelicula(id: number) {
    return this.executeQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.executeQuery<any>(`/search/movie?query=${texto}`);
  }
}
