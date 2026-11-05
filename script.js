const pecasIniciais = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖']
];

let tabuleiroData = [];
let casaSelecionada = null;
let vezDasBrancas = true;

const elTabuleiro = document.getElementById('tabuleiro');
const elStatus = document.getElementById('status');

function criarTabuleiro() {
  elTabuleiro.innerHTML = '';
  tabuleiroData = JSON.parse(JSON.stringify(pecasIniciais));
  casaSelecionada = null;
  vezDasBrancas = true;
  elStatus.innerText = 'Vez das BRANCAS';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const casa = document.createElement('div');
      casa.classList.add('casa');
      casa.classList.add((r + c) % 2 === 0 ? 'clara' : 'escura');
      casa.dataset.linha = r;
      casa.dataset.coluna = c;
      casa.addEventListener('click', aoClicarNaCasa);
      elTabuleiro.appendChild(casa);
    }
  }
  atualizarTabuleiro();
}

function atualizarTabuleiro() {
  const casas = document.querySelectorAll('.casa');
  casas.forEach(casa => {
    const r = casa.dataset.linha;
    const c = casa.dataset.coluna;
    casa.innerText = tabuleiroData[r][c];
    casa.classList.remove('selecionada');
  });

  if (casaSelecionada) {
    const idx = casaSelecionada.r * 8 + casaSelecionada.c;
    casas[idx].classList.add('selecionada');
  }
}

function aoClicarNaCasa(e) {
  const r = parseInt(e.target.dataset.linha);
  const c = parseInt(e.target.dataset.coluna);
  const peca = tabuleiroData[r][c];

  if (casaSelecionada) {
    if (casaSelecionada.r === r && casaSelecionada.c === c) {
      casaSelecionada = null;
    } else {
      tabuleiroData[r][c] = tabuleiroData[casaSelecionada.r][casaSelecionada.c];
      tabuleiroData[casaSelecionada.r][casaSelecionada.c] = '';
      casaSelecionada = null;
      vezDasBrancas = !vezDasBrancas;
      elStatus.innerText = vezDasBrancas ? 'Vez das BRANCAS' : 'Vez das PRETAS';
    }
  } else {
    if (peca !== '') {
      casaSelecionada = { r, c };
    }
  }
  atualizarTabuleiro();
}

// Inicia o jogo assim que o script carrega
criarTabuleiro();
