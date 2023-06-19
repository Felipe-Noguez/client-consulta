import axios from "axios";
import {useState} from "react";
import {Rodape} from "../components/Rodape.jsx";

export const CadastrarPaciente = () => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')

    async function handleSubmit() {
        const dadosPaciente = {
            nome: nome,
            telefone: telefone
        }
        axios.post('http://localhost:8080/paciente/cadastrar-paciente', dadosPaciente)
            .then(response => {
                setNome('')
                setTelefone('')
                alert("Paciente cadastrado com sucesso!")
            })
            .catch(error => {
                console.log(error)
            })
        console.log(nome)
        console.log(telefone)
    }

    return(
        <div>
            <h2>Cadastrar Paciente</h2>
            <form style={{display:'flex', flexDirection:'column', gap: 16}}>
                <label>Nome</label>
                <input type="text" name="paciente" value={nome} onChange={event => setNome(event.target.value)}/>
                <label>Telefone</label>
                <input type="text" name="telefone" value={telefone}
                       onChange={event => setTelefone(event.target.value)}/>
                <button type="button" onClick={handleSubmit}>Cadastrar Paciente</button>
            </form>
            <Rodape/>
        </div>
    )
}