
# Nano Coin

Sistema para gestão de usuários e suas movimentações financeiras.


## Pré Requisitos


- **Angular** 14.0.4 ou superior
- **Node.js** 16.14.2 ou superior
- **MySQL** 5.7 à 8.0
- **Servidor WEB ¹** Apache ou Nginx



## Credenciais de Acesso

**Usuário**: admin **Senha**: admin
## Migrate

Definir os parâmtros de conexão com o banco de dados em **nano-coin-api/db/config/config.json**


```bash
  cd nano-coin-api/db
  npx sequelize-cli db:migrate --env production
```
## Rodando localmente

**Instalação das bibliotecas**

```bash
  cd nano-coin-app
  npm install

  cd nano-coin-api
  npm install
```


**Iniciar API**

```bash
  cd nano-coin-api
  node index
```

**Iniciar APP**

```bash
  cd nano-coin-app
  ng serve
```

O sistema ficará disponível em http://localhost:4200







## Deploy

**Configuração do ambiente de produção**

Editar o arquivo **nano-coin-app/src/environments/environment.prod.ts**

```ts
export const environment = {
  production: true,
  apiUrl:'http://ip:port/api',
  clientSecret: '4vYTH90kwVM2WkdLkbqknaMHnMo6'
};
```




Para fazer o deploy do App execute



```bash
  cd nano-coin-app
  ng build
```

Os arquivos ficaram disponíveis em **nano-coin-app/dist** e prontos a serem enviados ao servidor web.

## Configuração servidor web

Documentação completa disponível em https://angular.io/guide/deployment

**Apache**


Adicionar ao .htaccess

```bash
  RewriteEngine On 
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR] 
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d 
    RewriteRule ^ - [L] 
  
    
    RewriteRule ^ /index.html
```

**Nginx**



Adicionar ao virtual host

```bash
  try_files $uri $uri/ /index.html;
```


## Observações

**¹** Servidor web necessário apenas em casos de deploy da aplicação.

