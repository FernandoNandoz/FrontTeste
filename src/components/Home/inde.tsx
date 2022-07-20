import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api";

export function Home() {
    const [nickName, setNickName] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    const bearer_token = "Bearer " + token

    console.log(bearer_token)

    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    useEffect(() => {
        api.get("/user/profile", config).then(response => {
            setNickName(response.data.nickName)

            console.log(response.data)
        })
    }, [])

    function handleConnectWallet() {
        navigate("/connectWallet")
    }

    function handleClose() {
        navigate("/login")
    }

    return (
        <div>
            <h1>Seja Bem Vindo a Home!!</h1>

            <h1>-----------------------------</h1>

            <h1>{nickName}</h1>

            <h1>-----------------------------</h1>

            <button type="button" onClick={handleConnectWallet}>ConnectWallet</button>

            <button type="button" onClick={handleClose}>Sair</button>
        </div>
    )
}