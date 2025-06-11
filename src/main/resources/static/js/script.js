// script.js

let editingCandidaturaId = null;

async function carregarCandidaturas() {
    const listaCandidaturas = document.getElementById('lista-candidaturas');
    listaCandidaturas.innerHTML = '';

    try {
        const response = await fetch('/candidaturas');

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const candidaturas = await response.json();

        if (candidaturas.length === 0) {
            listaCandidaturas.innerHTML = '<tr><td colspan="4">Nenhuma candidatura encontrada.</td></tr>';
        } else {
            candidaturas.forEach(candidatura => {
                const tr = document.createElement('tr');

                const tdVaga = document.createElement('td');
                tdVaga.textContent = candidatura.title;
                tr.appendChild(tdVaga);

                const tdEmpresa = document.createElement('td');
                tdEmpresa.textContent = candidatura.company;
                tr.appendChild(tdEmpresa);

                const tdStatus = document.createElement('td');
                let badgeClass = '';
                switch(candidatura.status) {
                    case 'ANALISE': badgeClass = 'bg-info text-dark'; break;
                    case 'ENTREVISTA': badgeClass = 'bg-primary'; break;
                    case 'OFERTA': badgeClass = 'bg-success'; break;
                    case 'REJEITADO': badgeClass = 'bg-danger'; break;
                    case 'FINALIZADO': badgeClass = 'bg-secondary'; break;
                    default: badgeClass = 'bg-secondary';
                }
                tdStatus.innerHTML = `<span class="badge ${badgeClass}">${candidatura.status.replace('_', ' ')}</span>`;
                tr.appendChild(tdStatus);

                const tdAcoes = document.createElement('td');
                tdAcoes.classList.add('text-center');

                const btnAtualizar = document.createElement('button');
                btnAtualizar.classList.add('btn', 'btn-sm', 'btn-success', 'me-2');
                btnAtualizar.textContent = 'Atualizar';
                btnAtualizar.onclick = () => {
                    editingCandidaturaId = candidatura.id;
                    document.getElementById('nomeVaga').value = candidatura.title;
                    document.getElementById('empresa').value = candidatura.company;
                    document.getElementById('statusVaga').value = candidatura.status;

                    document.getElementById('modalAdicionarCandidaturaLabel').textContent = 'Atualizar Candidatura';
                    document.querySelector('#formCandidatura button[type="submit"]').textContent = 'Salvar Alterações';
                    document.querySelector('#formCandidatura button[type="submit"]').classList.remove('btn-warning');
                    document.querySelector('#formCandidatura button[type="submit"]').classList.add('btn-success');

                    const myModal = new bootstrap.Modal(document.getElementById('modalAdicionarCandidatura'));
                    myModal.show();
                };
                tdAcoes.appendChild(btnAtualizar);

                const btnExcluir = document.createElement('button');
                btnExcluir.classList.add('btn', 'btn-sm', 'btn-danger');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.onclick = async () => {
                    if (confirm(`Tem certeza que deseja excluir a candidatura para: ${candidatura.title} (${candidatura.company})?`)) {
                        try {
                            const response = await fetch(`/candidaturas/${candidatura.id}`, {
                                method: 'DELETE'
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                throw new Error(`Erro ao excluir candidatura! Status: ${response.status}. Detalhes: ${errorData.message || 'Erro desconhecido.'}`);
                            }

                            console.log('Candidatura excluída com sucesso:', candidatura.id);
                            carregarCandidaturas();

                        } catch (error) {
                            console.error('Erro ao excluir candidatura:', error);
                            alert('Ocorreu um erro ao excluir a candidatura. Verifique o console para mais detalhes.');
                        }
                    }
                };
                tdAcoes.appendChild(btnExcluir);

                tr.appendChild(tdAcoes);
                listaCandidaturas.appendChild(tr);
            });
        }

    } catch (error) {
        console.error('Erro ao carregar candidaturas:', error);
        listaCandidaturas.innerHTML = '<tr><td colspan="4">Erro ao carregar candidaturas.</td></tr>';
    }
}

document.addEventListener('DOMContentLoaded', carregarCandidaturas);

const addButton = document.querySelector('.btn-warning');
if (addButton) {
    addButton.addEventListener('click', () => {
        // Reseta o modal para o estado de "Adicionar" antes de abri-lo
        editingCandidaturaId = null;
        document.getElementById('modalAdicionarCandidaturaLabel').textContent = 'Adicionar Nova Candidatura';
        document.querySelector('#formCandidatura button[type="submit"]').textContent = 'Salvar Candidatura';
        document.querySelector('#formCandidatura button[type="submit"]').classList.remove('btn-success');
        document.querySelector('#formCandidatura button[type="submit"]').classList.add('btn-warning');
        document.getElementById('formCandidatura').reset(); // Limpa os campos

        const myModal = new bootstrap.Modal(document.getElementById('modalAdicionarCandidatura'));
        myModal.show();
    });
}

const formCandidatura = document.getElementById('formCandidatura');
if (formCandidatura) {
    formCandidatura.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nomeVagaInput = document.getElementById('nomeVaga').value;
        const empresaInput = document.getElementById('empresa').value;
        const statusVagaInput = document.getElementById('statusVaga').value;

        const dadosCandidatura = {
            title: nomeVagaInput,
            company: empresaInput,
            status: statusVagaInput
        };

        try {
            let url = '/candidaturas';
            let method = 'POST';

            if (editingCandidaturaId) {
                url = `/candidaturas/${editingCandidaturaId}`;
                method = 'PUT';
                dadosCandidatura.id = editingCandidaturaId;
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosCandidatura)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ao salvar candidatura! Status: ${response.status}. Detalhes: ${errorData.message || 'Erro desconhecido.'}`);
            }

            console.log('Candidatura salva/atualizada com sucesso:', await response.json());

            const myModal = bootstrap.Modal.getInstance(document.getElementById('modalAdicionarCandidatura'));
            if (myModal) {
                myModal.hide();
            }

            // Reseta o formulário e a variável de edição
            formCandidatura.reset();
            editingCandidaturaId = null;
            document.getElementById('modalAdicionarCandidaturaLabel').textContent = 'Adicionar Nova Candidatura';
            document.querySelector('#formCandidatura button[type="submit"]').textContent = 'Salvar Candidatura';
            document.querySelector('#formCandidatura button[type="submit"]').classList.remove('btn-success');
            document.querySelector('#formCandidatura button[type="submit"]').classList.add('btn-warning');

            carregarCandidaturas();

        } catch (error) {
            console.error('Erro ao adicionar/atualizar candidatura:', error);
            alert('Ocorreu um erro ao salvar/atualizar a candidatura. Verifique o console para mais detalhes.');
        }
    });
}