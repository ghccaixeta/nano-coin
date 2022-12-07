import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMovimentacao'
})
export class FormatMovimentacaoPipe implements PipeTransform {

  transform(value: string ){
    
    if(value === 'saida'){
      return 'SAÍDA'
    }else{
      return(value.toUpperCase())
    }

  }

}
