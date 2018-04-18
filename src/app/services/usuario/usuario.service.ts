import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

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
      this.menu = JSON.parse(localStorage.getItem('menu'));

     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }

   guardarStorage(id: string, token: string, usuario: Usuario, menu: string) {

    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('token', token);


    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

   }
   log_out() {
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');
     this.token = '';
     this.usuario = null;
     this.menu = [];
     this.router.navigate(['/login']);
   }

  loginGoogle(token: string) {
    let url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, {token})
    .map( (resp: any) => {
      console.log(resp);
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
      //  localStorage.setItem('id', resp.id);
      //  localStorage.setItem('token', resp.token);
      //  localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

       this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
       return true;
     }).catch( err => {
       Swal('Error', err.error.mensaje, 'error');
      return Observable.throw( err);
     });
   }

   crearUsuario(usuario: Usuario) {

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      Swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }).catch( err => {
      Swal( err.error.mensaje, err.error.errors.message, 'error');
     return Observable.throw( err);
    });
   }

   actualizarUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;

     return this.http.put(url, usuario)
     .map((resp: any) => {
       if (usuario._id === this.usuario._id) {

         this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
       }
      Swal('Listo', 'Los datos del usuario han sido actualizado', 'success');
      return true;
     });
   }

   cambiarImagen(file: File, id: string) {
     this._subirArchivoService.subirArchivo(file, 'usuarios', id)
     .then( (resp: any) => {
       this.usuario.img = resp.usuario.img;
       Swal('Imagen actualizada', this.usuario.nombre, 'success');
       this.guardarStorage(id, this.token, this.usuario, this.menu);
     })
     .catch(resp => {
       console.log(resp);
     });
   }

   cargarUsuarios(desde: number = 0) {
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`;

    return this.http.get(url);
  }

  buscarUsuario( termino: string ) {
    // http://localhost:3000/busqueda/coleccion/medicos/rafa
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
     return this.http.get(url)
     .map( (resp: any) =>  resp.usuarios );
  }

  borrarUsuario ( id: string) {
    // http://localhost:3000/usuario/5ac8d72f357ad011c0eb026f?token=token
    let url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

}
