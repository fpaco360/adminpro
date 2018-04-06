import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
     this.cargar_ajustes(); }

  guardar_ajustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargar_ajustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }
  aplicarTema(tema: string) {
    // tslint:disable-next-line:prefer-const
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardar_ajustes();
  }
}

interface Ajustes {
 temaUrl: string;
 tema: string;

}
