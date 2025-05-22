function exibirMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.classList.remove("hidden");

    setTimeout(() => {
        mensagem.classList.add("hidden");
    }, 3000);
}

function validarLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Usuário e senha fixos para validação
    const usuarioValido = "admin";
    const senhaValida = "1234";

    if (usuario === usuarioValido && senha === senhaValida) {
        exibirMensagem("Login realizado com sucesso!", "sucesso");
        // Redirecionar para a página inicial
        window.location.href = "pizzaria.html";
    } else {
        exibirMensagem("Usuário ou senha inválidos!", "erro");
    }
}