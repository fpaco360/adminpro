import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  Medicos: Medico[] = [];

  constructor(public _medicosService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos().subscribe(resp => {
      this.Medicos = resp;
    });
  }

  buscar_medico(termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarMedico(termino)
    .subscribe(medico => this.Medicos = medico);
  }

  borrar_medico(medico: Medico) {
    this._medicosService.borrarMedico(medico._id).subscribe( () => this.cargarMedicos());
  }
}
