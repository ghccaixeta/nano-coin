import { Funcionario } from "src/app/funcionario/model/funcionario";

export class Movimentacao{
    id!: number;
    tipo_movimentacao!: string;
    valor!: number;
    observacao!: string
    funcionario_id!: number;
    administrador_id!: number
    Funcionario!: Funcionario;
    createdAt!: string;
    updatedAt!: string;
}