$(document).ready(function() {
    // Seleciona os elementos do DOM com jQuery
    const $inputBox = $('#input-box');
    const $listContainer = $('#list-container');

    // Função para adicionar uma tarefa
    function addTask() {
        // Verifica se o campo de entrada está vazio
        if ($inputBox.val() === '') {
            alert("You must write something!"); // Alerta se o campo estiver vazio
        } else {
            // Cria um novo elemento <li> e define seu conteúdo
            const $li = $('<li></li>').text($inputBox.val());
            // Cria um elemento <span> para o botão de exclusão e define seu conteúdo
            const $span = $('<span>\u00D7</span>');
            // Adiciona o <span> ao <li>
            $li.append($span);
            // Adiciona o <li> ao contêiner da lista
            $listContainer.append($li);
        }
        // Limpa o campo de entrada
        $inputBox.val('');
        // Salva os dados no localStorage
        saveData();
    }

    // Adiciona ouvintes de eventos aos elementos da lista
    $listContainer.on('click', 'li', function() {
        // Alterna a classe 'checked' ao clicar no <li>
        $(this).toggleClass('checked');
        // Salva os dados no localStorage
        saveData();
    });

    $listContainer.on('click', 'span', function(event) {
        // Remove o elemento pai <li> ao clicar no <span>
        $(this).parent().remove();
        // Salva os dados no localStorage
        saveData();
        // Impede a propagação do evento de clique para o <li> pai
        event.stopPropagation();
    });

    // Função para salvar os dados no localStorage
    function saveData() {
        // Armazena o conteúdo HTML do contêiner da lista no localStorage
        localStorage.setItem('data', $listContainer.html());
    }

    // Função para mostrar as tarefas salvas ao carregar a página
    function showTask() {
        // Define o conteúdo HTML do contêiner da lista com os dados salvos no localStorage
        $listContainer.html(localStorage.getItem('data') || '');
    }

    // Adiciona um ouvinte de evento ao botão de adicionar tarefa
    $('#add-button').on('click', addTask);

    // Exibe as tarefas salvas ao carregar a página
    showTask();
});

