import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ethers, Wallet } from "ethers";
import { Console } from "console";

export function SyncWallet() {
    const [account, setAccount] = useState('');
    const [rigCoin, setRigCoin] = useState('');
    const [blastCoin, setBlastCoin] = useState('');
    const [resultPost, setResultPost] = useState('');

    const [rigCoin_InGame, setRigCoin_InGame] = useState('');
    const [blastCoin_InGame, setBlastCoin_InGame] = useState('');

    const navigate = useNavigate();

    const escutaTestR = localStorage.getItem('testRig');
    const escutaTestB = localStorage.getItem('testBlast');


    useEffect(() => {
        const byToken = localStorage.getItem('token');
        const _byToken = ("Bearer " + byToken)

        api.get("/user/balance", { headers: { Authorization: _byToken } }).then(response => {
            setRigCoin(response.data.rigCoin_InGame)
            setBlastCoin(response.data.blastCoin_InGame)
        });


    }, [escutaTestR, escutaTestB])


    async function handleWallet(event: FormEvent) {
        event.preventDefault();

        // A Web3Provider wraps a standard Web3 provider, which is
        // what MetaMask injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", [0]);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        const signer = provider.getSigner()

        console.log("Account:", await signer.getAddress());

        const data = {
            walletAddress: await signer.getAddress(),
            blastCoin: 100,
            rigCoin: 600,
            ecologicCoin: 100,
        };

        setAccount(data.walletAddress)

        const dataWallet = {
            walletAddress: data.walletAddress
        }

        const byToken = localStorage.getItem('token');

        const _byToken = ("Bearer " + byToken)

        await api.post("/user/connect/wallet", dataWallet, { headers: { Authorization: _byToken } })
    }

    async function depositRigCoin(event: FormEvent) {
        event.preventDefault();

        const byToken = localStorage.getItem('token');

        const _byToken = ("Bearer " + byToken)


        const data = {
            rigCoin_InGame
        }

        api.post("/user/deposit/rigcoin", data, { headers: { Authorization: _byToken } })
            .then(response => {
                if (response.data.status == true) {
                    setResultPost("RigCoin depositado com sucesso!")

                    localStorage.setItem('testRig', response.data.result)
                }
            })
    }

    async function depositBlastCoin(event: FormEvent) {
        event.preventDefault();

        const byToken = localStorage.getItem('token');

        const _byToken = ("Bearer " + byToken)


        const data = {
            blastCoin_InGame,
        }

        api.post("/user/deposit/blastcoin", data, { headers: { Authorization: _byToken } })
            .then(response => {
                if (response.data.status == true) {
                    setResultPost("BlastCoin depositado com sucesso!")

                    localStorage.setItem('testBlast', response.data.result)

                    console.log(response.data.blastCoin_InGame);
                }
            })
    }

    function handleGoBack() {
        navigate("/home")
    }

    return (
        <div>
            <section>
                <h1>{account}</h1>

                <button type="submit" onClick={handleWallet}>Connect now</button>


                <h1>{resultPost}</h1>

                <h1>{`Rig Coin: ${rigCoin}`}</h1>

                <h1>{`Blast Coin: ${blastCoin}`}</h1>

                <h1>-------------------------------------------------------------------------------</h1>

                <input
                    placeholder="Rig Coin: Deposit"
                    value={rigCoin_InGame}
                    onChange={e => setRigCoin_InGame(e.target.value)} >
                </input>

                <button type="submit" onClick={depositRigCoin}>Deposit RigCoin</button>

            </section>

            <section>

                <h1>-------------------------------------------------------------------------------</h1>

                <input
                    placeholder="Blast Coin: Deposit"
                    value={blastCoin_InGame}
                    onChange={e => setBlastCoin_InGame(e.target.value)} >
                </input>

                <button type="submit" onClick={depositBlastCoin}>Deposit BlastCoin</button>

            </section>

            <section>
                <h1>-------------------------------------------------------------------------------</h1>

                <button type="submit" onClick={handleGoBack}>Voltar</button>
            </section>
        </div >
    )
}