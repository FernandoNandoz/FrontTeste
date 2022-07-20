import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";


export function NewUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [nickName, setNickName] = useState('');

    const navigate = useNavigate();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            password,
            walletAddress,
            nickName,
        };

        try {
            console.log(data)

            const response = await api.post('/user/create', data)

            alert(`Usuário: ${response.data.nickName}, cadastrado com sucesso!!!`);

        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }

    function handleGoBack() {
        navigate("/login")
    }

    return (
        <div>
            <section>
                <form onSubmit={handleLogin}>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} >
                    </input>

                    <input
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)} >
                    </input>

                    <input
                        placeholder="Nickname"
                        value={nickName}
                        onChange={e => setNickName(e.target.value)} >
                    </input>

                    <button type="submit">Cadastrar</button>
                </form>

                <button type="submit" onClick={handleGoBack}>Voltar</button>
            </section>
        </div>
    )
}