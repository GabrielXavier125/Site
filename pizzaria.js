document.addEventListener('DOMContentLoaded', function() {
    // Dados das pizzas
    const pizzas = [
        { id: 1, name: 'Margherita', ingredients: 'Molho de tomate, mussarela, manjericão fresco e tomate', price: 39.90, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 2, name: 'Calabresa', ingredients: 'Molho de tomate, mussarela, calabresa fatiada e cebola', price: 44.90, image: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 3, name: 'Pepperoni', ingredients: 'Molho de tomate, mussarela e pepperoni', price: 49.90, image: 'https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 4, name: 'Quatro Queijos', ingredients: 'Molho de tomate, mussarela, provolone, parmesão e gorgonzola', price: 54.90, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 5, name: 'Portuguesa', ingredients: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas e pimentão', price: 49.90, image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { id: 6, name: 'Frango com Catupiry', ingredients: 'Molho de tomate, mussarela, frango desfiado e catupiry', price: 54.90, image: 'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ];

    // Elementos do DOM
    const sections = {
        home: document.getElementById('home'),
        menu: document.getElementById('menu'),
        order: document.getElementById('order'),
        about: document.getElementById('about')
    };

    const buttons = {
        home: document.getElementById('btnHome'),
        menu: document.getElementById('btnMenu'),
        order: document.getElementById('btnOrder'),
        about: document.getElementById('btnAbout')
    };

    const pizzaMenu = document.getElementById('pizzaMenu');
    const pizzaSelect = document.getElementById('pizza');
    const orderForm = document.getElementById('orderForm');

    // Carrega o cardápio
    function loadMenu() {
        pizzaMenu.innerHTML = '';
        pizzas.forEach(pizza => {
            const pizzaCard = document.createElement('div');
            pizzaCard.className = 'pizza-card';
            pizzaCard.innerHTML = `
                <img src="${pizza.image}" alt="${pizza.name}" class="pizza-img">
                <h3>${pizza.name}</h3>
                <p>${pizza.ingredients}</p>
                <p class="price">R$ ${pizza.price.toFixed(2)}</p>
            `;
            pizzaMenu.appendChild(pizzaCard);
        });
    }

    // Preenche o select de pizzas no formulário
    function loadPizzaOptions() {
        pizzaSelect.innerHTML = '<option value="">-- Selecione --</option>';
        pizzas.forEach(pizza => {
            const option = document.createElement('option');
            option.value = pizza.id;
            option.textContent = `${pizza.name} - R$ ${pizza.price.toFixed(2)}`;
            pizzaSelect.appendChild(option);
        });
    }

    // Mostra uma seção e esconde as outras
    function showSection(sectionToShow) {
        Object.values(sections).forEach(section => {
            section.classList.add('hidden');
        });
        sections[sectionToShow].classList.remove('hidden');
    }

    // Event listeners para os botões do menu
    buttons.home.addEventListener('click', () => showSection('home'));
    buttons.menu.addEventListener('click', () => {
        loadMenu();
        showSection('menu');
    });
    buttons.order.addEventListener('click', () => {
        loadPizzaOptions();
        showSection('order');
    });
    buttons.about.addEventListener('click', () => showSection('about'));

    // Envio do formulário de pedido
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const pizzaId = document.getElementById('pizza').value;
        const size = document.getElementById('size').value;
        const notes = document.getElementById('notes').value;
        
        const selectedPizza = pizzas.find(p => p.id == pizzaId);
        
        if (!selectedPizza) {
            alert('Por favor, selecione uma pizza');
            return;
        }
        
        // Aqui você normalmente enviaria os dados para um servidor
        alert(`Pedido realizado com sucesso!\n\n${name}, seu pedido de pizza ${selectedPizza.name} (${getSizeName(size)}) foi recebido e chegará em aproximadamente 45 minutos.\n\nTotal: R$ ${calculatePrice(selectedPizza.price, size).toFixed(2)}`);
        
        // Limpa o formulário
        orderForm.reset();
    });

    // Funções auxiliares
    function getSizeName(size) {
        const sizes = {
            'P': 'Pequena',
            'M': 'Média',
            'G': 'Grande',
            'F': 'Família'
        };
        return sizes[size] || 'Média';
    }

    function calculatePrice(basePrice, size) {
        const multipliers = {
            'P': 0.7,
            'M': 1,
            'G': 1.3,
            'F': 1.6
        };
        return basePrice * (multipliers[size] || 1);
    }

    // Inicialização
    loadMenu();
    loadPizzaOptions();
    showSection('home');
});