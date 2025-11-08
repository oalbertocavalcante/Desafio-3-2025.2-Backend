//função de mudar imagem pelo id e pela url
function mudarImagem(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function mudarTexto(id, texto) {
  document.getElementById(id).innerText = texto;
}

let listaPokemon = [];
let indicePokemon = 0;

async function carregarPokemonsAPI() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292";
  
  const resposta = await fetch(url);
  const dados = await resposta.json();
  
  listaPokemon = dados.results;
  
  mostrarPokemonAtual();
}

async function obterDetalhePokemon(nome) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + nome;
  
  const resposta = await fetch(url);
  const dados = await resposta.json();
  
  return dados;
}

async function mostrarPokemonAtual() {
  const pokemonAtual = listaPokemon[indicePokemon];
  const detalhe = await obterDetalhePokemon(pokemonAtual.name);
  
  let imagemUrl = detalhe.sprites.front_default;
  
  if (!imagemUrl) {
    imagemUrl = "../assets/missingno.png";
  }
  
  mudarTexto("nome", pokemonAtual.name);
  mudarImagem("imagemPokemon", imagemUrl);
}

function pokemonAnterior() {
  indicePokemon = indicePokemon - 1;
  
  if (indicePokemon < 0) {
    indicePokemon = listaPokemon.length - 1;
  }
  
  mostrarPokemonAtual();
}

function pokemonProximo() {
  indicePokemon = indicePokemon + 1;
  
  if (indicePokemon >= listaPokemon.length) {
    indicePokemon = 0;
  }
  
  mostrarPokemonAtual();
}

carregarPokemonsAPI();
