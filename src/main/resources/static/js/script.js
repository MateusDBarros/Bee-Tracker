
document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://bee-tracker-api.onrender.com/candidaturas'; // Verifique se a porta corresponde ao seu backend Spring Boot

    // --- Função para exibir Toasts ---
    function showToast(message, type = 'success') {
        const toastContainer = document.querySelector('.toast-container');
        const toastId = `toast-${Date.now()}`;
        const bgColorClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';

        const toastHtml = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgColorClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);

        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: 5000 }); // Toast some em 5 segundos
        toast.show();

        // Remove o toast do DOM após ele sumir para evitar acúmulo
        toastElement.addEventListener('hidden.bs.toast', function () {
            toastElement.remove();
        });
    }

    // --- Lógica para a página de Login (index.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            const email = emailInput.value;
            const password = passwordInput.value;

            // Suas credenciais fixas para acesso local
            const correctEmail = 'admin@gmail.com';
            const correctPassword = 'javinha';

            if (email === correctEmail && password === correctPassword) {
                showToast('Login bem-sucedido!', 'success');
                setTimeout(() => { // Pequeno atraso para o toast aparecer antes de redirecionar
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                showToast('Email ou senha incorretos. Tente novamente.', 'error');
            }
        });
    }

    // --- Lógica para o Modal Adicionar/Editar Candidatura (vagas.html) ---
    const btnAdicionarCandidatura = document.querySelector('[data-bs-toggle="modal"]');
    const formCandidatura = document.getElementById('formCandidatura');
    const listaCandidaturas = document.getElementById('lista-candidaturas');
    const modalAdicionarEditarLabel = document.getElementById('modalAdicionarCandidaturaLabel');
    let editingOfferId = null; // Variável para armazenar o ID da oferta que está sendo editada

    if (btnAdicionarCandidatura) {
        btnAdicionarCandidatura.addEventListener('click', function() {
            // Abre o modal para adicionar
            modalAdicionarEditarLabel.textContent = 'Adicionar Nova Candidatura';
            formCandidatura.reset();
            editingOfferId = null; // Garante que não estamos em modo de edição
            const modalAdicionarCandidatura = new bootstrap.Modal(document.getElementById('modalAdicionarCandidatura'));
            modalAdicionarCandidatura.show();
        });
    }

    // Função para renderizar ou atualizar uma linha da tabela
    function renderOrUpdateOfferRow(offer) {
        const existingRow = document.querySelector(`tr[data-id="${offer.id}"]`);
        if (existingRow) {
            // Atualiza uma linha existente
            existingRow.innerHTML = `
                <td>${offer.title}</td>
                <td>${offer.company}</td>
                <td><span class="status-badge status-${offer.status}">${offer.status.replace(/_/g, ' ')}</span></td>
                <td class="text-center">
                    <button class="btn btn-info btn-sm me-2 btn-edit" data-id="${offer.id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-id="${offer.id}">Excluir</button>
                </td>
            `;
        } else {
            // Adiciona uma nova linha
            const newRow = document.createElement('tr');
            newRow.dataset.id = offer.id; // Armazena o ID no atributo data-id da linha
            newRow.innerHTML = `
                <td>${offer.title}</td>
                <td>${offer.company}</td>
                <td><span class="status-badge status-${offer.status}">${offer.status.replace(/_/g, ' ')}</span></td>
                <td class="text-center">
                    <button class="btn btn-info btn-sm me-2 btn-edit" data-id="${offer.id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-id="${offer.id}">Excluir</button>
                </td>
            `;
            listaCandidaturas.appendChild(newRow);
        }
    }

    // Função para carregar candidaturas do backend (GET)
    function loadOffers() {
        listaCandidaturas.innerHTML = ''; // Limpa a lista atual

        fetch(API_BASE_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(offers => {
                offers.forEach(offer => renderOrUpdateOfferRow(offer));
            })
            .catch(error => {
                console.error('Erro ao carregar candidaturas:', error);
                showToast('Erro ao carregar candidaturas. Tente novamente.', 'error');
            });
    }

    // Carrega as candidaturas ao carregar a página vagas.html
    if (listaCandidaturas) {
        loadOffers();
    }

    if (formCandidatura && listaCandidaturas) {
        formCandidatura.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('nomeVaga').value;
            const company = document.getElementById('empresa').value;
            const status = document.getElementById('statusVaga').value;

            const offerData = {
                title: title,
                company: company,
                status: status
            };

            let fetchMethod = 'POST';
            let fetchUrl = API_BASE_URL;

            if (editingOfferId) { // Se estiver editando
                fetchMethod = 'PUT';
                fetchUrl = `${API_BASE_URL}/${editingOfferId}`;
                offerData.id = editingOfferId; // Adiciona o ID para a requisição PUT
            }

            fetch(fetchUrl, {
                method: fetchMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || `Erro HTTP! Status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                showToast(`Candidatura ${editingOfferId ? 'atualizada' : 'adicionada'} com sucesso!`, 'success');
                renderOrUpdateOfferRow(data); // Renderiza/atualiza a linha com os dados do backend
                editingOfferId = null; // Reseta o ID de edição
            })
            .catch(error => {
                console.error(`Erro ao ${editingOfferId ? 'atualizar' : 'salvar'} candidatura:`, error);
                showToast(`Erro ao ${editingOfferId ? 'atualizar' : 'salvar'} candidatura: ${error.message || 'Verifique os dados.'}`, 'error');
            })
            .finally(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalAdicionarCandidatura'));
                modal.hide();
                formCandidatura.reset();
            });
        });
    }

    // --- Lógica para os botões Editar e Excluir ---
    if (listaCandidaturas) {
        listaCandidaturas.addEventListener('click', function(event) {
            const target = event.target;

            // Editar Candidatura (GET para popular, PUT para salvar)
            if (target.classList.contains('btn-edit')) {
                editingOfferId = target.dataset.id; // Pega o ID da linha

                fetch(`${API_BASE_URL}/${editingOfferId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Erro HTTP! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(offer => {
                        // Popula o modal com os dados da oferta
                        document.getElementById('nomeVaga').value = offer.title;
                        document.getElementById('empresa').value = offer.company;
                        document.getElementById('statusVaga').value = offer.status;

                        modalAdicionarEditarLabel.textContent = 'Editar Candidatura';
                        const modalAdicionarCandidatura = new bootstrap.Modal(document.getElementById('modalAdicionarCandidatura'));
                        modalAdicionarCandidatura.show();
                    })
                    .catch(error => {
                        console.error('Erro ao carregar dados para edição:', error);
                        showToast('Erro ao carregar dados para edição. Tente novamente.', 'error');
                    });
            }
            // Excluir Candidatura (DELETE)
            else if (target.classList.contains('btn-delete')) {
                const idToDelete = target.dataset.id;
                if (confirm(`Tem certeza que deseja excluir a candidatura com ID: ${idToDelete}?`)) {
                    fetch(`${API_BASE_URL}/${idToDelete}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(errorMessage => {
                                throw new Error(`Erro HTTP! Status: ${response.status} - ${errorMessage}`);
                            });
                        }
                        showToast(`Candidatura com ID: ${idToDelete} excluída com sucesso!`, 'success');
                        target.closest('tr').remove(); // Remove a linha da tabela
                    })
                    .catch(error => {
                        console.error('Erro ao excluir candidatura:', error);
                        showToast(`Erro ao excluir candidatura: ${error.message || 'Tente novamente.'}`, 'error');
                    });
                }
            }
        });
    }
});
