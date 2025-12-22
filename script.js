const produtos = [
  {
    nome: "Calça Social Feminina",
    descricao: "Elegante e confortável para o dia a dia.",
    preco: "R$ 129,90",
    imagem: "https://via.placeholder.com/300x300",
    whatsapp: "Calça Social Feminina"
  },
  {
    nome: "Calça Social Masculina",
    descricao: "Modelo clássico com ótimo caimento.",
    preco: "R$ 149,90",
    imagem: "https://via.placeholder.com/300x300",
    whatsapp: "Calça Social Masculina"
  },
  {
    nome: "Saia Social",
    descricao: "Ideal para trabalho e eventos.",
    preco: "R$ 99,90",
    imagem: "https://via.placeholder.com/300x300",
    whatsapp: "Saia Social"
  }
];

const container = document.getElementById("produtos");

produtos.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <span class="preco">${produto.preco}</span>
    <button onclick="comprar('${produto.whatsapp}')">Comprar</button>
  `;

  container.appendChild(card);
});

function comprar(produto) {
  const numero = "5599999999999"; // coloque o WhatsApp real
  const mensagem = `Olá! Tenho interesse no produto: ${produto}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
alert("funcionou");