import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
@Injectable()
export class MedicoService {

  totalMedicos: number;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    // http://localhost:3000/medico
    let url = `${URL_SERVICIOS}/medico`;
    return this.http.get(url).map( (resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    });
  }

  buscarMedico(termino: string) {
    // http://localhost:3000/busqueda/coleccion/medicos/test
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url).map( (resp: any) => resp.medicos);

  }

  borrarMedico(id: string) {
    // http://localhost:3000/medico/5ac926d91df12c1a84ade98e?token=
    let url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).map( (resp: any) => {
      Swal('Médico borrado', `El médico ${resp.medico.nombre} ha sido eliminado`, 'success');
      return resp;
    });
  }

  guardarMedico(medico: Medico) {
    // http://localhost:3000/medico?token=
    let url = `${URL_SERVICIOS}/medico`;
    if (medico._id) {
      // modificando
      url += `/${medico._id}?token=${this._usuarioService.token}`;
      return this.http.put(url, medico)
             .map( (resp: any) => {
              Swal('Medico actualizado', `${medico.nombre}`, 'success');
              return resp.medico;
             });
    } else {
      // creando
      url += `?token=${this._usuarioService.token}`;
      return this.http.put(url, medico)
      .map( (resp: any) => {
        Swal('Medico creado', `El Médico ${medico.nombre} ha sido creado`, 'success');
        return resp.medico;
      });
    }
  }
  cargarMedico(id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url)
    .map( (resp: any) => resp.medico );
  }
}
