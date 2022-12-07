export class Funcionario{
    id!: number;
    nome_completo!: string;
    login!: string;
    senha!: string;
    saldo_atual = 0;
    administrador_id!: number;
    Funcionario!: Funcionario;
    createdAt!: string;
    updatedAt!: string;
}