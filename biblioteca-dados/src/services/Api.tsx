
let bancoDeDadosSimulado = [
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { titulo: "O Código da Vinci", autor: "Dan Brown" }
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

    
    postLivro: (novoLivro: { titulo: string; autor: string }): Promise<{ status: number }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                bancoDeDadosSimulado.push(novoLivro);
                resolve({ status: 201 }); 
            }, ATRASO_REDE);
        });
    }
};