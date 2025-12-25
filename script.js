document.addEventListener("DOMContentLoaded", () => {

  const produtos = [
    {
      nome: "Calça Social Feminina",
      descricao: "Elegante e confortável para o dia a dia.",
      preco: "R$ 129,90",
      imagem: [
        "assets/img/calca-feminina-frente.jpg",
        "assets/img/calca-feminina-lado.jpg",
        "assets/img/calca-feminina-costas.jpg"
      ],
      whatsapp: "Calça Social Feminina"
    },
    {
      nome: "Calça Social Masculina",
      descricao: "Modelo clássico com ótimo caimento.",
      preco: "R$ 149,90", 
      imagem: "assets/img/calca-masculina.jpg",
      whatsapp: "Calça Social Masculina"
    },
    {
      nome: "Saia Social",
      descricao: "Ideal para trabalho e eventos.",
      preco: "R$ 99,90",
      imagem: "assets/img/saia-social.jpg",
      whatsapp: "Saia Social"
    }
  ];

  const container = document.getElementById("produtos");

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

const imagens = Array.isArray(produto.imagem)
  ? produto.imagem
  : [produto.imagem];

card.innerHTML = `
  <div class="carousel" data-imagens='${JSON.stringify(imagens)}'>
    <button class="prev" onclick="trocarImagem(this, -1)">‹</button>

    <img src="${imagens[0]}"
         alt="${produto.nome}"
         data-index="0"
         onclick="abrirImagem('${imagens[0]}')">

    <button class="next" onclick="trocarImagem(this, 1)">›</button>
  </div>

  <h3>${produto.nome}</h3>
  <p>${produto.descricao}</p>
  <span class="preco">${produto.preco}</span>
  <button onclick="comprar('${produto.whatsapp}')">Comprar</button>
`;



    container.appendChild(card);
  });

});

// 👇 FUNÇÃO GLOBAL
window.comprar = function (produto) {
  const numero = "5599999999999"; // WhatsApp real
  const mensagem = `Olá! Tenho interesse no produto: ${produto}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
};
window.abrirImagem = function (src) {
  const modal = document.getElementById("modalImagem");
  const imgModal = document.getElementById("imagemModal");

  imgModal.src = src;
  modal.style.display = "flex";
};

document.querySelector(".fechar").onclick = function () {
  document.getElementById("modalImagem").style.display = "none";
};

document.getElementById("modalImagem").onclick = function (e) {
  if (e.target.id === "modalImagem") {
    this.style.display = "none";
  }
};

window.trocarImagem = function (botao, direcao) {
  const carousel = botao.closest(".carousel");
  const img = carousel.querySelector("img");

  const imagens = JSON.parse(carousel.dataset.imagens);
  let index = parseInt(img.dataset.index);

  index += direcao;

  if (index < 0) index = imagens.length - 1;
  if (index >= imagens.length) index = 0;

  img.src = imagens[index];
  img.dataset.index = index;
};

