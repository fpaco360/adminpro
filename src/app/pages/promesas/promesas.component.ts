import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
     this.contarTres().then(
      mensaje => console.log('Termino la promesa', mensaje)
    ).catch(
      error => console.error('error en la promesa', error)
    );
  }

  ngOnInit() {
  }

  contarTres(): Promise <boolean> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise ( ( resolve, reject ) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log('contador', contador);
        if (contador === 3) {
          resolve (true );
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
