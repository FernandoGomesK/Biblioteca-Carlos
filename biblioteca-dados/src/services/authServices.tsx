export const authService = {
    login: async (username: string, password: string) => {
        const bodyDados = new URLSearchParams();
        bodyDados.append('username', username);
        bodyDados.append('password', password);

        const resposta = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: bodyDados.toString(),
        });

        if (!resposta.ok) throw new Error('Falha na autenticação');
        return resposta.json();
    }
};