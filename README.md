# Bee Tracker

### Acompanhe Suas Candidaturas de Processos Seletivos com Facilidade!
 Bem-vindo ao Bee Tracker, um aplicativo desenvolvido para te ajudar a manter o controle das suas candidaturas em processos seletivos. Criado com a intenção de aprimorar habilidades em desenvolvimento Fullstack, o Bee Tracker oferece uma interface simples e intuitiva para você gerenciar suas oportunidades de carreira, desde a aplicação até o resultado final.

#### Este projeto não só é uma ferramenta útil, mas também um laboratório prático para explorar a integração entre tecnologias de frontend e backend, culminando em uma implantação via Docker.

# 🚀 Tecnologias Utilizadas
O Bee Tracker foi construído utilizando as seguintes tecnologias:

### Backend
* Spring Boot: Framework Java robusto para construção de aplicações web e RESTful APIs.
* H2 Database: Um banco de dados em memória e baseado em arquivo, ideal para desenvolvimento e testes, garantindo persistência local dos dados das suas candidaturas.
* Spring Data JPA: Facilita a interação com o banco de dados, abstraindo grande parte do código de acesso a dados.
* Maven: Ferramenta de automação de construção e gerenciamento de dependências.
Frontend
* HTML5: Estrutura e conteúdo das páginas web.
* CSS3: Estilização e design da aplicação, com um tema limpo e funcional.
* JavaScript: Lógica de interação do lado do cliente, incluindo o consumo da API RESTful do backend.
* Bootstrap 5: Framework de UI para design responsivo e componentes pré-estilizados, garantindo uma boa experiência em diferentes dispositivos.

### Implantação
* Docker: Utilizado para empacotar a aplicação Spring Boot em um container, facilitando a implantação e garantindo a portabilidade do ambiente.

## ✨ Funcionalidades
Com o Bee Tracker, você pode:

* Login Simples: Acesse a aplicação com um login local básico (configurável no script.js).
* Listar Candidaturas: Visualize todas as suas candidaturas em uma tabela organizada.
* Adicionar Nova Candidatura: Registre novas vagas, informando o nome da vaga, empresa e o status atual.
* Editar Candidaturas Existentes: Atualize os detalhes de uma candidatura, incluindo o status (Em Análise, Entrevista, Oferta, Rejeitado, Finalizado).
* Excluir Candidaturas: Remova candidaturas que não são mais relevantes.
* Notificações Toast: Receba feedback visual elegante e não intrusivo para ações de sucesso ou erro.

### 🛠️ Como Executar o Projeto
Para rodar o Bee Tracker em sua máquina, siga os passos abaixo:

### Pré-requisitos
* Java Development Kit (JDK) 17 ou superior
* Maven 3.x
* Docker (opcional, para rodar via container)