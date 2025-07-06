document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    const top = target.getBoundingClientRect().top + window.pageYOffset;
    const offset = window.innerHeight / 2 - target.offsetHeight / 2;
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    });
  });
});

const itens = document.querySelectorAll('.beneficio');
const areaTexto = document.getElementById('area-texto');

itens.forEach(item => {
  item.addEventListener('click', () => {
    itens.forEach(i => i.classList.remove('selecionado'));
    item.classList.add('selecionado');

    areaTexto.textContent = item.dataset.texto;
    areaTexto.classList.add('visivel'); // mostra com animação
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.beneficio')) {
    itens.forEach(i => i.classList.remove('selecionado'));
    areaTexto.classList.remove('visivel'); // esconde com animação
  }
});