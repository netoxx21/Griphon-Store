document.addEventListener("DOMContentLoaded", () => { 

  const produtos = [
    {
      nome: "Calça Social Feminina",
      descricao: "Elegante e confortável para o dia a dia.",
      preco: "R$ 40,00",
      cores: {
        preta:[
        "assets/img/calca-feminina-frente.jpg",
        "assets/img/calca-feminina-lado.jpg",
        "assets/img/calca-feminina-costas.jpg"
      ],
        azul:[
        "assets/img/calca-feminina-azul-frente.jpg",
        "assets/img/calca-feminina-azul-lado.jpg"
      ],
    },
      whatsapp: "Calça Social Feminina"
    },
    {
      nome: "Calça Social Masculina",
      descricao: "Modelo clássico com ótimo caimento.",
      preco: "R$ 30,00", 
      imagem: [
        "assets/img/calca-masculina.jpg",
        "assets/img/calca-masculina-costa.jpg"
      ],
      whatsapp: "Calça Social Masculina"
    },
    {
      nome: "Calça Social Masculina em Alfaiataria",
      descricao: "Modelo clássico com ótimo caimento.",
      preco: "R$ 40,00", 
      imagem: [
        "assets/img/calca-alfaiataria.jpg",
        "assets/img/calca-alfaiataria-lado.jpg",
        "assets/img/calca-alfaiataria-costas.jpg"
      ],
      whatsapp: "Calça Social Masculina"
    },
    {
      nome: "Saia Social",
      descricao: "Ideal para trabalho e eventos.",
      preco: "R$ 35,00",
      imagem: "assets/img/saia-social.jpg",
      whatsapp: "Saia Social"
    }
  ];

  const container = document.getElementById("produtos");

  produtos.forEach(produto => {

    const card = document.createElement("div");
    card.classList.add("card");

    const cores = produto.cores || null;
const imagensPadrao = cores ? produto.cores.preta : produto.imagem;
const imagens = Array.isArray(imagensPadrao) ? imagensPadrao : [imagensPadrao];

card.innerHTML = `
  <div class="carousel" data-imagens='${JSON.stringify(imagens)}'>
    <button class="prev" onclick="trocarImagem(this, -1)">‹</button>

    <img src="${imagens[0]}"
         alt="${produto.nome}"
         data-index="0"
         onclick='abrirImagem(${JSON.stringify(imagens)}, 0)'>

    <button class="next" onclick="trocarImagem(this, 1)">›</button>
  </div>

  ${
    cores ? `
    <div class="cores">
      <span class="cor preta"
            onclick='trocarCor(this, ${JSON.stringify(produto.cores.preta)})'></span>
      <span class="cor azul"
            onclick='trocarCor(this, ${JSON.stringify(produto.cores.azul)})'></span>
    </div>
    ` : ""
  }

  <h3>${produto.nome}</h3>
  <p>${produto.descricao}</p>
  <span class="preco">${produto.preco}</span>
  <button onclick="comprar('${produto.whatsapp}')">Comprar</button>
`;


    container.appendChild(card);
  });

  // 🔥 CONTROLE DO MODAL (AGORA NO LUGAR CERTO)
  const modal = document.getElementById("modalImagem");
  const fechar = document.querySelector(".fechar");

  if (fechar) {
    fechar.onclick = () => {
      modal.style.display = "none";
    };
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target.id === "modalImagem") {
        modal.style.display = "none";
      }
    };
  }
});


// ================= FUNÇÕES GLOBAIS =================

window.comprar = function (produto) {
  const numero = "5599999999999";
  const mensagem = `Olá! Tenho interesse no produto: ${produto}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
};

let imagensModal = [];
let indiceModal = 0;

window.abrirImagem = function (imagens, indiceInicial) {
  imagensModal = imagens;
  indiceModal = indiceInicial;

  const modal = document.getElementById("modalImagem");
  const imgModal = document.getElementById("imagemModal");

  imgModal.src = imagensModal[indiceModal];
  modal.style.display = "flex";
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

window.trocarImagemModal = function (direcao) {
  indiceModal += direcao;

  if (indiceModal < 0) {
    indiceModal = imagensModal.length - 1;
  }

  if (indiceModal >= imagensModal.length) {
    indiceModal = 0;
  }

  document.getElementById("imagemModal").src =
    imagensModal[indiceModal];
};

window.trocarCor = function (elemento, novasImagens) {
  const card = elemento.closest(".card");
  const carousel = card.querySelector(".carousel");
  const img = carousel.querySelector("img");

  carousel.dataset.imagens = JSON.stringify(novasImagens);
  img.src = novasImagens[0];
  img.dataset.index = 0;
};