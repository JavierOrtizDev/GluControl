import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calculadora-imc',
  templateUrl: './calculadora-imc.component.html',
  styleUrls: ['./calculadora-imc.component.css']
})
export class CalculadoraImcComponent {
  
  @Output() emitirAltura : EventEmitter<number> = new EventEmitter();
  @Output() emitirPeso : EventEmitter<number> = new EventEmitter();
  altura : number = 0;
  peso : number = 0;

  get imc(): number {
    let calculo = this.calcularIMC();
    if(calculo == Infinity || Number.isNaN(calculo)){
     return 0;
    }else{
     return Math.round(calculo);
    }
    
   }
   
   obtenerIMC(): string {
     const imc = this.calcularIMC();
     if (imc < 18.5) {
       return 'assets/figures/person_thin.png';
     } else if (imc >= 18.5 && imc < 28) {
       return 'assets/figures/person_normal.png';
     }else if(imc >= 28 && imc < 38){
       return 'assets/figures/person_fat.png';
     } else if (imc >= 38) {
       return 'assets/figures/person_ob.png';
     } else{
       return 'assets/figures/person_normal.png';
     }
   }
   imcColor(): string {
     const imc = this.calcularIMC();
     if (imc < 18.5) {
       return 'red';
     } else if (imc >= 18.5 && imc < 28) {
       return 'green';
     }else if(imc >= 28 && imc < 38){
       return 'yellow';
     } else if (imc >= 38) {
       return 'red';
     } else{
       return 'text-success';
     }
   }
 
   calcularIMC(): number {
     let alturaEnMetros = this.altura / 100;
     return this.peso / Math.pow(alturaEnMetros, 2);
   }


   enviarAltura(){
      this.emitirAltura.emit(this.altura);
   }
    enviarPeso(){
      this.emitirPeso.emit(this.peso); 
    }
}
