import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;
  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios());
  }

cargarUsuarios () {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
    this.total = resp.total;
    this.usuarios = resp.usuarios;
    this.cargando = false;

  });
}
cambiarDesde(valor: number) {
  let desde = this.desde + valor;

  if ( desde >= this.total) {
    return;
  }
  if ( desde < 0) {
    return ;
  }
  this.desde += valor;
  this.cargarUsuarios();
}

buscarUsuario(termino: string) {
  if (termino.length <= 0) {
    this.cargarUsuarios();
    return;
  }
  this.cargando = true;
  this._usuarioService.buscarUsuario(termino)
  .subscribe( (usuarios: Usuario[]) => {
    console.log(usuarios);
    this.usuarios = usuarios;
    this.cargando = false;
  });
}

borrar_usuario(usuario: Usuario) {
  if ( usuario._id === this._usuarioService.usuario._id) {
    Swal('Accion no valida', 'No puedes borrarte a ti mismo', 'error');
    return;
  }
  Swal({
    title: '¿Estas seguro?',
    text: `Estas a punto de eliminar a ${usuario.nombre}`,
    type: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok!'
  })
  .then((borrar) => {
    if ( borrar.dismiss ) {
      return;
    }
    if (borrar.value) {

      this._usuarioService.borrarUsuario(usuario._id).subscribe( (resp: any) => {
      Swal('Correcto', `${resp.usuario.nombre} ha sido eliminado`, 'success' );
      this.cargarUsuarios();
    });
    }
  });
}

guardar_usuario(usuario: Usuario) {
  this._usuarioService.actualizarUsuario(usuario)
  .subscribe();
}

MostrarModal(id: string) {
this._modalUploadService.mostrarModal('usuarios', id);
}

}
