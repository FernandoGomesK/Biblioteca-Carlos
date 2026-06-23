import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    ano: number;
    categoria: string;
    disponivel: boolean;
}

// 1. O hook agora recebe a 'ordem' como parâmetro, com o padrão 'asc'
export function useBooks(ordem: string = 'asc') {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [idInput, setIdInput] = useState('');
    const [tituloInput, setTituloInput] = useState('');
    const [autorInput, setAutorInput] = useState('');
    const [anoInput, setAnoInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');
    
    
    useEffect(() => {
        const carregarLivrosIniciais = async () => {
            try {
                const token = localStorage.getItem('token'); 
                
                const resposta = await fetch(`http://127.0.0.1:8000/livros/ordenar?ordem=${ordem}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!resposta.ok) throw new Error('Erro ao buscar livros.');
                const dados = await resposta.json();
                setLivros(dados);
            } catch (erro) {
                console.error("Erro ao carregar, usando locais:", erro);
                setLivros([
                    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, categoria: "Fantasia", disponivel: true },
                    { id: 2, titulo: "Cálculo I", autor: "James Stewart", ano: 2001, categoria: "Exatas", disponivel: true },
                    { id: 3, titulo: "Python Fluente", autor: "Luciano Ramalho", ano: 2015, categoria: "Tecnologia", disponivel: true }
                ]);
            }
        };
        carregarLivrosIniciais();
    }, [ordem]);

    
    const recarregarListaManual = async () => {
        try {
            const token = localStorage.getItem('token'); 
            
            const resposta = await fetch(`http://127.0.0.1:8000/livros/ordenar?ordem=${ordem}`, {
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

    
    const adicionarLivro = async (e: FormEvent) => {
        e.preventDefault();

        if (!idInput || !tituloInput || !autorInput || !anoInput || !categoriaInput) {
            alert("Por favor, preencha o ID e o título do livro.");
            return;
        } 

        try {
            const token = localStorage.getItem('token'); 
            const novoLivroCorpo = {
                id: parseInt(idInput),
                titulo: tituloInput,
                autor: autorInput,
                ano: anoInput,
                categoria: categoriaInput
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
            setAutorInput('');
            setAnoInput('');
            setCategoriaInput('');
            recarregarListaManual(); 
        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar. Certifique-se de que o backend está rodando.");
        }
    };

    
    return {
        livros,
        idInput,
        setIdInput,
        tituloInput,
        setTituloInput,
        autorInput,
        setAutorInput,
        anoInput,
        setAnoInput,
        categoriaInput,
        setCategoriaInput,
        recarregarListaManual,
        adicionarLivro
    };
}