import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  constructor() {

    this.subscripcion = this.regresaObservable().
    subscribe(
      numero => console.log('subs', numero),
      error => console.log('error en el obs', error),
      () => console.log('el obs ha terminado')
    );
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('la pagina se ha cerrado');
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable <any> {
    return  new Observable( observer => {
      let contador = 0;


      let intervalo = setInterval( () => {

        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   observer.error('error en el obs');
        // }

      }, 500);
    }).retry(2).map( (resp: any) => {
      return resp.valor;
    }).filter( (valor, index) => {
      if (valor % 2 === 1) {
        return true;
      } else {
        return false;
      }
    });
  }

}
