import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  ocultar_modal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage(archivo: File) {
    if ( !archivo) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      Swal('No Valido', 'Solo se permite imagenes', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {
      this._modalUploadService.notificacion.emit(resp);
      this.ocultar_modal();
    })
    .catch( resp => {
      console.log('error:', resp);
    });
  }
}
