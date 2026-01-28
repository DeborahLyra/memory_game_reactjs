# 🧠 Jogo da Memória

Projeto de **Jogo da Memória** desenvolvido com **React, TypeScript e Tailwind CSS**, permitindo ao usuário escolher o **tamanho do tabuleiro** e a **categoria das cartas**.

Este projeto foi criado com foco em **aprendizado de lógica**, **boas práticas em React** e **organização de estado**, sendo ideal para portfólio e estudos.

---

## 🎮 Funcionalidades

* ✅ Escolha do tamanho do tabuleiro:

  * Pequeno: **5 x 4** (20 cartas)
  * Médio: **6 x 5** (30 cartas)
  * Grande: **8 x 7** (56 cartas)

* ✅ Escolha de categorias:

  * Animais 🐶
  * Plantas 🌱
  * Objetos 📦
  * (estrutura pronta para novas categorias)

* ✅ Lógica completa de jogo:

  * Embaralhamento automático
  * Comparação de pares
  * Bloqueio de cliques indevidos
  * Manutenção de cartas acertadas

* ✅ Interface responsiva e estilizada com Tailwind

---

## 🛠️ Tecnologias Utilizadas

* **React**
* **TypeScript**
* **Tailwind CSS**
* **Vite** (ou CRA, dependendo do setup)

---

## 📦 Estrutura do Projeto

```
/src
 ├── components
 │    └── MemoryGame.tsx
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

---

## 🧩 Como funciona o jogo

1. O usuário escolhe:

   * o tamanho do tabuleiro
   * a categoria das cartas

2. O jogo:

   * seleciona a quantidade necessária de pares
   * duplica os valores
   * embaralha as cartas

3. O jogador pode virar **apenas duas cartas por vez**

4. Se as cartas forem iguais:

   * permanecem abertas

5. Se forem diferentes:

   * são fechadas após um pequeno delay

---

## ▶️ Como executar o projeto

```bash

npm install

npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

## 🎨 Estilização

O projeto utiliza **Tailwind CSS**, permitindo:

* fácil ajuste de layout
* cartas maiores para grids grandes
* grid dinâmico baseado no tamanho escolhido

---

## 👩‍💻 Autora

Deborah Prado Lyra
Desenvolvedora Front-end

Projeto desenvolvido para fins educacionais e portfólio.

---

✨ Sinta-se à vontade para clonar, estudar e evoluir este projeto!
