import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }

   estaLogueado() {
     return (this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);


    this.usuario = usuario;
    this.token = token;

   }
   log_out() {
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');

     this.token = '';
     this.usuario = null;
     this.router.navigate(['/login']);
   }

  loginGoogle(token: string) {
    let url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, {token})
    .map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

   login(usuario: Usuario, recordar: boolean) {

    if ( recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
     let url = URL_SERVICIOS + '/login';
     return this.http.post(url, usuario)
     .map((resp: any) => {
       localStorage.setItem('id', resp.id);
       localStorage.setItem('token', resp.token);
       localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

       this.guardarStorage(resp.id, resp.token, resp.usuario);
       return true;
     });
   }

   crearUsuario(usuario: Usuario) {

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      Swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    });
   }

   actualizarUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;

     return this.http.put(url, usuario).map((resp: any) => {
       this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
      Swal('Listo', 'Los datos del usuario han sido actualizado', 'success');
      return true;
     });
   }

   cambiarImagen(file: File, id: string) {
     this._subirArchivoService.subirArchivo(file, 'usuarios', id)
     .then( (resp: any) => {
       this.usuario.img = resp.usuario.img;
       Swal('Imagen actualizada', this.usuario.nombre, 'success');
       this.guardarStorage(id, this.token, this.usuario);
     })
     .catch(resp => {
       console.log(resp);
     });
   }

}
