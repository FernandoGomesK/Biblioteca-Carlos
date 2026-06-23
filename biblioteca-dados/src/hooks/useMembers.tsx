import { useState } from 'react';
import type { FormEvent } from 'react';

export function useMembers(onSuccess: () => void, onCloseModal: () => void) {
    const [usernameInput, setUsernameInput] = useState('');
    const [roleInput, setRoleInput] = useState('usuario'); // "usuario" inicia selecionado por padrão

    const adicionarMembro = async (e: FormEvent) => {
        e.preventDefault();

        if (!usernameInput) {
            alert("Por favor, introduza o nome de usuário.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            
            // Corpo esperado para cadastrar um usuário (Username e Role)
            const novoMembroCorpo = {
                username: usernameInput,
                role: roleInput
            };

            // Criaremos esse endpoint no Python a seguir!
            const resposta = await fetch('http://127.0.0.1:8000/usuarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(novoMembroCorpo)
            });

            if (resposta.status === 403) {
                alert("Ação negada! Apenas bibliotecários podem cadastrar membros.");
                return;
            }

            if (!resposta.ok) {
                const erroDados = await resposta.json();
                throw new Error(erroDados.detail || 'Falha ao registrar membro.');
            }

            alert(`Membro "${usernameInput}" cadastrado com sucesso!`);
            
            // Limpa o formulário e atualiza a tabela automaticamente
            setUsernameInput('');
            setRoleInput('usuario');
            onSuccess();     // Atualiza a listagem de membros na tela
            onCloseModal();  // Fecha a janela pop-up
        } catch (erro) {
            console.error(erro);
            alert("Erro ao logar. Verifique as credenciais ou o servidor.");
        }
    };

    return {
        usernameInput,
        setUsernameInput,
        roleInput,
        setRoleInput,
        adicionarMembro
    };
}