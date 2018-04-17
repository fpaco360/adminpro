import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../service.index';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalService {

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
    console.log('Listo servicio de hospital');
  }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {

    let url = `${URL_SERVICIOS}/hospital/${id}`;
     return this. http.get(url).map( (resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url);
  }

  crearHospital(nombre: string, img?: string) {
    // http://localhost:3000/hospital?token
    let hospital: Hospital = {
      nombre: nombre,
      img: img,
    };
    let url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;
     return this.http.post(url, hospital);
  }

  buscarHospital(termino: string) {
    // http://localhost:3000/busqueda/coleccion/usuarios/test
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    // http://localhost:3000/hospital/5ac9152a49eef62b64da7e92?token
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this._usuarioService.token}`;

    return this.http.put(url, hospital).map( (resp: any) => resp.hospital);
  }
}
