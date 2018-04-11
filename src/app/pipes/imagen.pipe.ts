import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor() {

  }

  transform(img: string, tipo: string = 'usuario'): any {
    let url = `${URL_SERVICIOS}/img`;

    if ( !img) {

      return url + '/usuarios/xxx';
    }
    if ( img.indexOf('https') >= 0) {
      return img;
    } else {

      switch (tipo) {
        case 'usuario':

         url = `${url}/usuarios/${img}`;
        break;
        case 'medico':
        url = `${url}/medicos/${img}`;
        break;
        case 'hospital':
        url = `${url}/hospitales/${img}`;
        break;
        default:
        console.log('tipo de imagen no existe usuarios|medicos|hospitales');
        url = url + '/usuarios/xxx';

      }
    }
    return url;
  }

}
