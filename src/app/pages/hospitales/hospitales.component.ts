import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  total: number = 0;
  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) {
    this.carga_hospitales();
   }

  ngOnInit() {
    this._modalUploadService.notificacion.subscribe( () => this.carga_hospitales());
  }

  carga_hospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
      this.total = this.hospitales.length;
    });
  }

  crear_hospital() {
    Swal( {
      title: 'Nombre del Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonClass: 'btn btn-success',
      allowOutsideClick: () => !Swal.isLoading()
    }).then( resp => {
       let nombre: string = resp.value;

       this._hospitalService.crearHospital(resp.value)
       .subscribe( (hospital: any) => {

         Swal('Correcto', `El hospital ${hospital.hospital.nombre} ha sido creado con exito`, 'success');
         this.carga_hospitales();
       });
    });
  }

  borrar_hospital(hospital: Hospital) {
    Swal({
      title: '¿Estas seguro?',
      text: `Estas apunto de eliminar el ${hospital.nombre}`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!',
      confirmButtonClass: 'btn btn-success'
    }).then( borrar => {
      console.log(borrar);
      if ( borrar.dismiss) {
        return;
      }
      if ( borrar.value) {
        this._hospitalService.borrarHospital(hospital._id)
        .subscribe( (resp: any) => {
          Swal('Correcto', `El Hospital ${hospital.nombre} ha sido eliminado`, 'success');
          this.carga_hospitales();
        });
      }
    });
  }

  buscar_hospital(termino: string) {

    if ( termino.length <= 0) {
      this.carga_hospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino)
    .subscribe( (resp: any) => {

      this.hospitales = resp.hospitales;
    });
  }

  actualizar_hospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe( resp => {
      Swal('Correcto', `El ${resp.nombre} ha sido guardado exitosamente`, 'success');
    });
  }

  actualizar_imagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
