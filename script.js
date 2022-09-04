// controle de interface
let seuVotoPara = document.querySelector('.v-1-1 span');
let cargo = document.querySelector('.v-1-2 span');
let descricao = document.querySelector('.v-1-4');
let legenda = document.querySelector('.v-2');
let lateral = document.querySelector('.v-1-right');
let digitos = document.querySelector('.v-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

const etapas = data;
const votos = [];

function comecarVotacao() {
  let etapa = etapas[etapaAtual];

  let numerosHtml = '';
  numero = '';
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numerosHtml += '<div class="numero indicador"></div>';
    } else {
      numerosHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  legenda.style.display = 'none';
  lateral.innerHTML = '';
  digitos.innerHTML = numerosHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];

  let candidato = etapa.candidatos.filter((i) => {
    if (i.numero === numero) {
      return true;
    } else {
      return false;
    }
  });

  if (candidato.length > 0) {
    candidato = candidato[0];

    seuVotoPara.style.display = 'block';
    legenda.style.display = 'block';
    if (etapa.titulo === 'PREFEITO') {
      descricao.innerHTML = `Nome: ${candidato.name}</br>Partido: ${candidato.partido}</br>Vice: ${candidato.vice}`;
    } else {
      descricao.innerHTML = `Nome: ${candidato.name}</br>Partido: ${candidato.partido}`;
    }

    let fotosHtml = '';
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="v-1-img small"><img src="assets/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="v-1-img"><img src="assets/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = 'block';
    legenda.style.display = 'block';
    descricao.innerHTML = `<div class="aviso indicador">VOTO NULO</div>`;
  }
}

function clicou(n) {
  let campoDigito = document.querySelector('.numero.indicador');

  if (campoDigito !== null) {
    campoDigito.innerHTML = n;

    numero = `${numero}${n}`;
    campoDigito.classList.remove('indicador');

    if (campoDigito.nextElementSibling) {
      campoDigito.nextElementSibling.classList.add('indicador');
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
  votoBranco = true;
  numero = '';

  seuVotoPara.style.display = 'block';
  legenda.style.display = 'block';
  descricao.innerHTML = `<div class="aviso indicador">VOTO EM BRANCO</div>`;
  digitos.innerHTML = '';
  lateral.innerHTML = '';
}

function corrige() {
  comecarVotacao();
}

function confirma() {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;

    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco',
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;

    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero,
    });
  }

  if (votoConfirmado === true) {
    etapaAtual++;

    if (etapas[etapaAtual] !== undefined) {
      comecarVotacao();
    } else {
      document.querySelector(
        '.visor'
      ).innerHTML = `<div class="fim indicador">FIM</div>`;
      console.log(votos);
    }
  }
}

comecarVotacao();

function tabela() {
  var container = document.querySelector('.tabela');
  container.innerHTML = [
    '<table>',
    '<thead>',
    '<tr>',
    '<th>Cargos</th>',
    '<th>Números</th>',
    '</tr>',
    '</thead>',
    '<tbody>',
    '<tr>',
    '<td>Vereador(a)</td>',
    '<td> 11122, 88777, 92525, 12212, 98598, 82228 </td>',
    '</tr>',
    '<tr>',
    '<td>Prefeito(a)</td>',
    '<td> 12, 46 </td>',
    '</tr>',
    '</tbody>',
    '</table>',
  ].join('\n');
}

tabela();
