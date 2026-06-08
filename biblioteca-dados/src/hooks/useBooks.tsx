import { useState, useEffect,  } from 'react';
import type { FormEvent } from 'react';

interface Livro {
    id: number;
    titulo: string;
    disponivel: boolean;
}

export function useBooks() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [idInput, setIdInput] = useState('');
    const [tituloInput, setTituloInput] = useState('');

    // 1. Carregar livros iniciais (antigo seeBooks.tsx)
    useEffect(() => {
        const carregarLivrosIniciais = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const resposta = await fetch('http://127.0.0.1:8000/livros', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!resposta.ok) throw new Error('Erro ao buscar livros.');
                const dados = await resposta.json();
                setLivros(dados);
            } catch (erro) {
                console.error("Erro ao carregar, usando locais:", erro);
                setLivros([
                    { id: 1, titulo: "O Senhor dos Anéis", disponivel: true },
                    { id: 2, titulo: "Cálculo I", disponivel: true },
                    { id: 3, titulo: "Python Fluente", disponivel: true }
                ]);
            }
        };
        carregarLivrosIniciais();
    }, []);

    // 2. Recarregar lista (antigo reloadList.tsx)
    const recarregarListaManual = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const resposta = await fetch('http://127.0.0.1:8000/livros', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resposta.ok) {
                const dados = await resposta.json();
                setLivros(dados);
            }
        } catch (erro) {
            console.error("Erro ao recarregar:", erro);
        }
    };

    // 3. Adicionar Livro (antigo addBooks.tsx)
    const adicionarLivro = async (e: FormEvent) => {
        e.preventDefault();

        if (!idInput || !tituloInput) {
            alert("Por favor, preencha o ID e o título do livro.");
            return;
        } 

        try {
            const token = localStorage.getItem('token'); 
            const novoLivroCorpo = {
                id: parseInt(idInput),
                titulo: tituloInput
            };

            const resposta = await fetch('http://127.0.0.1:8000/livros/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(novoLivroCorpo)
            });

            if (resposta.status === 403) {
                alert("Ação negada! Apenas bibliotecários podem cadastrar livros.");
                return;
            }

            if (!resposta.ok) throw new Error('Falha ao registrar livro.');

            alert("Livro adicionado com sucesso!");
            setIdInput('');
            setTituloInput('');
            recarregarListaManual();
        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar. Certifique-se de que o backend está rodando.");
        }
    };

    // Devolvemos o estado e as funções para o componente usar
    return {
        livros,
        idInput,
        setIdInput,
        tituloInput,
        setTituloInput,
        recarregarListaManual,
        adicionarLivro
    };
}