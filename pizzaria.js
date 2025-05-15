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

    const sections = {
        home: document.getElementById('home'),
        menu: document.getElementById('menu'),
        add: document.getElementById('add')
    };

    const buttons = {
        home: document.getElementById('btnHome'),
        menu: document.getElementById('btnMenu'),
        order: document.getElementById('btnOrder'),
        about: document.getElementById('btnAbout'),
        add: document.getElementById('btnAdd'),
    };

    const pizzaMenu = document.getElementById('pizzaMenu');
    const addPizzaForm = document.getElementById('addPizzaForm');

    addPizzaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('pizzaName').value.trim();
    const ingredients = document.getElementById('pizzaDescription').value.trim();
    const price = parseFloat(document.getElementById('pizzaPrice').value);
    const image = document.getElementById('pizzaImage').value.trim();

    if (!name || !ingredients || isNaN(price) || !image) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    else{
        alert(`Pizza "${name}" adicionada com sucesso!`);
        const newPizza = {
        id: pizzas.length + 1,
        name,
        ingredients,
        price,
        image
    };

    pizzas.push(newPizza);
    AddPizzaCard(newPizza);
    loadPizzaOptions();
    addPizzaForm.reset();
    }
});

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


    // Mostra uma seção e esconde as outras
    function showSection(sectionToShow) {
        Object.values(sections).forEach(section => {
            section.classList.add('hidden');
        });
        sections[sectionToShow].classList.remove('hidden');
    }

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
    buttons.add.addEventListener('click', () => {
showSection('add');
});

    // Inicialização
    loadMenu();
    loadPizzaOptions();
    showSection('home');
});