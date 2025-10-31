<h1 align="center" style="font-weight: bold;">Sistema de Biblioteca Acadêmica 📚</h1>

<div align="center">

  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" />
  <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />

</div>

<br>

<p align="center">
 <a href="#resumo">Visão Geral</a> • 
 <a href="#tech">Tecnologias</a> • 
 <a href="#funcionalidades">Funcionalidades</a> • 
  <a href="#demo">Demonstração</a> •
 <a href="#exec">Execução</a> •
 <a href="#conclusão">Conclusão</a> •
 <a href="#dev">Desenvolvedor</a>
</p>

<h2 id="resumo">🧭 Visão Geral</h2>

O Sistema de Biblioteca Acadêmica é um aplicativo desenvolvido para facilitar a interação e o gerenciamento de uma biblioteca acadêmica.

Ele permite o controle de livros, reservas, empréstimos e devoluções, tornando o processo mais eficiente tanto para os funcionários quanto para os estudantes.

Esse projeto foi realizado no 4° semestre do curso de CC da FEI para as disciplinas de:
   - Desenvolvimento de Aplicativos Móveis
   - Engenharia de Software

<h2 id="tech">🛠️ Tecnologias</h2>

- <b>Front-end</b>:
   - TypeScript / JavaScript
   - React Native com Expo
   - Axios
   - Expo Router
   - Expo Image Picker
   - Async Storage
- <b>Back-end</b>:
   - Java 25
   - Spring Boot
   - Spring Data
   - JPA/Hibernate
- <b>Banco de Dados</b>:
   - MySQL
- <b>Infraestrutura</b>:
   - Docker / Docker Compose

<h2 id="funcionalidades">⚙️ Funcionalidades</h2>

- <b>Login e Cadastro de Usuários e Administradores 🔒</b>:
   - Login e cadastro com nome, email e senha, e opção para privilégios de admin.
- <b>Gerenciamento do Acervo de Livros 📘</b>:
   - Cadastro, edição e exclusão de livros, com título, autor, descrição e imagem (capa).
- <b>Upload de Imagem para cada Livro 📸</b>:
   - Upload de imagem da galeria do celular, ou foto da câmera.
- <b>Listagem e Busca de Livros 🔍</b>:
   - Consulta do acervo, busca por título ou autor, visualização de detalhes do livro.
- <b>Registro e Consulta de Empréstimos 📅</b>:
   - Reserva/Empréstimo de livros disponíveis, devolução e histórico de empréstimos passados.
- <b>Listagem de Empréstimos Atrasados⏰</b>:
   - Visualização de todos empréstimos do sistema não devolvidos no período.

<h2 id="demo">🎥 Demonstração</h2>

<div align="center" style="display: flex; justify-content: center; gap: 150px; flex-wrap: wrap;">
  
  <div style="text-align: center;">
    <h3>Adicionar um livro</h3>
    <img src="./assets/Adicionar Livro.gif" width="300" height="450" alt="Add livro">
  </div>

  <div style="text-align: center;">
    <h3>Consultar empréstimos e devolver um livro</h3>
    <img src="./assets/Consultar Emprestimo.gif" width="300" height="450" alt="Consultar Emprestimo">
  </div>

</div>

<h2 id="exec">🚀 Instalação e Execução</h2>

<h3>Pré-Requisitos</h3>

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- Expo Go (app no Celular)

<h3>Clonando</h3>

O primeiro passo é clonar o projeto para o seu computador com o seguinte comando no terminal:

```bash
git clone https://github.com/AllanDC1/biblioteca-academica.git
```

<h3>Alterar IP</h3>

Depois de clonado, abra o arquivo `api.ts` no caminho `biblioteca-frontend\services\api.ts`, em qualquer editor de texto, e altere a variável `ip` com o IPv4 do seu dispositivo

```bash
const ip = "192.168.0.0"; // Substitua aqui pelo o IPv4 do seu dispositivo
```

<h3>Buildar e Rodar</h3>

Depois disso tudo, basta ir na raíz do diretório recém-criado, e executar no terminal o comando:

```bash
docker compose up --build
```

<h3>Acessar o Aplicativo</h3>

Após o docker buildar e executar o projeto, um QR code será mostrado no terminal, leia ele pelo aplicativo do Expo Go, e o app já deve carregar e funcionar!

<h3>Observações</h3>

Caso o backend não consiga se conectar ao BD na primeira vez, pare a execução e rode o container novamente com:

```bash
docker compose up
```

<h2 id="conclusão">💡 Aprendizados e Próximos Passos</h2>

O desenvolvimento desse projeto foi ótimo para colocar aprendizados de frontend com React Native em prática, fazer uso de novas tecnologias e bibliotecas, e entender a comunicação de um aplicativo Full Stack, principalmente no ambiente mobile.

Algumas das bibliotecas novas que explorei foram:
 - O Axios para a comunicação entre o aplicativo e a API. Essa biblioteca facilitou bastante a conexão do front com o backend e o envio e recebimento de dados, tornando as requisições bem simples.
 - E também o Expo Image Picker, que permitiu adicionar as funcionalidades de selecionar imagens diretamente da galeria, ou de tirar uma foto em tempo real do dispositivo. Foi essencial o uso dessa biblioteca para gerar uma interação mais real, e além disso, foi super fácil de implementar, com poucas configurações e linhas de código.

Os próximos passos do projeto seriam melhorias na interface de usuário e a implementação de novas funcionalidades, como notificações para o usuário, geração de multas para empréstimos atrasados, geração de relatórios e estatísticas, avaliação de livros, doação de livros, entre outras ideias criativas.

<h2 id="dev">🌐 Desenvolvedor</h2>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/AllanDC1">
         <img src="https://avatars.githubusercontent.com/u/162832747?v=4" width="100px;" alt="Allan Donetti Calen"/><br>
         <sub>
            <b>Allan Donetti Calen</b>            
         </sub>
      </a>       
  </tr>
</table>