
let bancoDeDadosSimulado = [
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", genero: "Fantasia", ano: 1954 },
    { titulo: "O Código da Vinci", autor: "Dan Brown", genero: "Thriller", ano: 2003 },
    { titulo: "1984", autor: "George Orwell", genero: "Ficção Científica", ano: 1948 },
    { titulo: "Dom Casmurro", autor: "Machado de Assis", genero: "Romance", ano: 1899 },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", genero: "Fábula", ano: 1943 }
];


const ATRASO_REDE = 500;

export const apiMock = {
    
    getLivros: (): Promise<{ data: typeof bancoDeDadosSimulado }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                
                resolve({ data: [...bancoDeDadosSimulado] });
            }, ATRASO_REDE);
        });
    },

    
    postLivro: (novoLivro: { titulo: string; autor: string; genero: string; ano: number }): Promise<{ status: number }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                bancoDeDadosSimulado.push(novoLivro);
                resolve({ status: 201 }); 
            }, ATRASO_REDE);
        });
    }
};