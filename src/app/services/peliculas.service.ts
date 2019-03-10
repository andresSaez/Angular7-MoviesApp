import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey = '9a397eab925b55ad261e55fffd44efd4';
  private urlMoviedb = 'https://api.themoviedb.org/3';

  peliculas: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getCartelera() {

    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7);

    let desdeStr = `${ desde.getFullYear() }-${ desde.getMonth() + 1 }-${ desde.getDate() }`;
    let hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth() + 1 }-${ hasta.getDate() }`;

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&`
        + `api_key=${ this.apiKey }&language=en-US&page=1`;

    return this.http.get( url )
      .pipe(map( (res: any) => {
        return res['results'];
      } ));
  }

  getPopulares() {
    // let url = `${ this.urlMoviedb }/movie/popular?api_key=${ this.apiKey }&language=en-US&page=1`;
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&language=en-US&page=1`;

    return this.http.get( url )
      .pipe(map( (res: any) => {
        return res['results'];
      } ));
  }

  getPopularesNinos() {
    // let url = `${ this.urlMoviedb }/movie/popular?api_key=${ this.apiKey }&language=en-US&page=1`;
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc`
      + `&api_key=${ this.apiKey }&language=en-US&page=1`;

    return this.http.get( url )
      .pipe(map( (res: any) => {
        return res['results'];
      } ));
  }

  buscarPelicula( texto: string ) {
    // let url = `${ this.urlMoviedb }/movie/popular?api_key=${ this.apiKey }&language=en-US&page=1`;
    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&`
      + `&api_key=${ this.apiKey }&language=en-US&page=1`;

    return this.http.get( url )
      .pipe(map( (res: any) => {
        this.peliculas = res['results'];
        console.log(this.peliculas);
        return res['results'];
      } ));
  }

  getPelicula( id: number ) {

    let url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apiKey }`;

    return this.http.get( url )
      .pipe(map(res => res));
  }


}
