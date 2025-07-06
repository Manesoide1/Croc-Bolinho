// Função para criar e gerenciar a navbar móvel
function setupNavbar() {
    // Criar a estrutura da navbar
    const navbar = document.createElement('div');
    navbar.className = 'navbar-mobile';
    
    navbar.innerHTML = `
        <div class="menu-icon">
            <span class="logo-text">Croc Bolinho</span>
            <i class="bi bi-list"></i>
        </div>
        <div class="mobile-links">
            <a href="#beneficios">Porque comprar?</a>
            <a href="#depoimentos">Opiniões</a>
            <a href="#pedido">Faça seu pedido!</a>
        </div>
    `;
    
    // Inserir a navbar como primeiro elemento do body
    document.body.insertBefore(navbar, document.body.firstChild);
    
    // Adicionar o evento de clique para mostrar/esconder o menu
    const menuIcon = navbar.querySelector('.menu-icon');
    const mobileLinks = navbar.querySelector('.mobile-links');
    
    menuIcon.addEventListener('click', () => {
        mobileLinks.classList.toggle('active');
    });
    
    // Fechar o menu quando um link é clicado
    const links = navbar.querySelectorAll('.mobile-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileLinks.classList.remove('active');
        });
    });
}

// Executar a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupNavbar);