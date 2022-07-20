import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const data = {
        email,
        password,
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        const response = await api.post('/authenticate', data);


        localStorage.setItem('token', response.data.token)

        console.log(response.data);

        navigate("/home")
    }

    function handleCadastrar() {
        navigate("/singUp")
    }

    return (
        <div>
            <section>
                <input
                    placeholder="Usuario"
                    value={email}
                    onChange={e => setEmail(e.target.value)}></input>

                <input
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)} ></input>

                <button type="submit" onClick={handleLogin}>Login</button>

                <button type="submit" onClick={handleCadastrar}>Cadastrar</button>
            </section>
        </div>
    )
}