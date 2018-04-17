import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hopitalService: HospitalService,
              public _medicoService: MedicoService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService ) {
                activatedRoute.params.subscribe( params => {
                  let id = params['id'];

                  if ( id !== 'nuevo') {
                    this.cargar_medico(id);

                  }
                });
               }

  ngOnInit() {
    this._hopitalService.cargarHospitales().subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    });


    this._modalUploadService.notificacion
    .subscribe( resp => {
      this.medico.img = resp.medico.img;
    });
  }
  guardarMedico(f: NgForm) {

    if ( f.invalid ) {
      return ;
    }

    this._medicoService.guardarMedico(this.medico)
    .subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }
  cambioHospital( id: string) {
    this._hopitalService.obtenerHospital(id)
    .subscribe( hospital => this.hospital = hospital);
  }

  cargar_medico(id: string) {
    this._medicoService.cargarMedico(id).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }
  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
