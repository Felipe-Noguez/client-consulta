import axios from "axios";
import {useEffect, useState} from "react";
import {SelecionarEspecialidade} from "../components/SelecionarEspecialidade.jsx";
import dayjs from "dayjs";
import {SelecionarData} from "../components/SelecionarData";

export const CadastrarConsulta = () => {
    const [exibirPacientes, setExibirPacientes] = useState([])
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState([])
    const [dataHoraConsultaSelecionada, setDataHoraConsultaSelecionada] = useState('')
    const [totalElementos, setTotalElementos] = useState(0)
    const [paginacao, setPaginacao] = useState(0)

    async function agendarConsulta(idPaciente) {
        let dataFormatada = dayjs(dataHoraConsultaSelecionada).format('DD-MM-YYYY HH:mm:ss')
        console.log(dataFormatada)
        if (!dataHoraConsultaSelecionada || !especialidadeSelecionada) return alert("Os campos não pode estar vazios")
        const dadosConsulta = {
            especialidade: especialidadeSelecionada,
            dataHoraConsulta: dataFormatada,
            idPaciente: idPaciente
        }
        await axios.post('http://localhost:8080/consulta/cadastrar-consulta', dadosConsulta)
            .then(response => {
                alert("Consulta cadastrada com sucesso")
                console.log(response)
            })
            .catch(error => {
                    console.log(error)
                    if (error.response.data.message) {
                        alert(error.response.data.message)
                    } else {
                        alert(error.response.data.errors[0])
                    }
                }
            )
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/paciente/listar-pacientes?page=${paginacao}`)
            .then(response => {
                setExibirPacientes(response.data.elementos)
                setTotalElementos(response.data.totalElementos)
                console.log(response.data.totalElementos)
            })
            .catch(error => {
                console.error(error)
            })
    }, [paginacao])

    function getEspecialidade(especialidade) {
        setEspecialidadeSelecionada(especialidade)
    }

    function getDataHora(dataHora) {
        setDataHoraConsultaSelecionada(dataHora)
        console.log(dataHora)
    }

    function avancarPagina() {
        setPaginacao(paginacao + 1)
    }

    function voltarPagina() {
        setPaginacao(paginacao - 1)
    }

    return (
        <div>
            <h2>Cadastrar Consulta</h2>
            <div>
                <h1>Lista de Pacientes</h1>
                <div>
                    <button
                        disabled={(paginacao <= 0) ? true : false}
                        onClick={voltarPagina}>Página anterior
                    </button>
                    <button onClick={avancarPagina}>Próxima página
                    </button>
                </div>
                {exibirPacientes.map(paciente => {
                    return (
                        <ul key={paciente.idPaciente}>
                            <li>{paciente.nome}</li>
                            <li>{paciente.telefone}</li>
                            <SelecionarData getDataHora={getDataHora}/>
                            <SelecionarEspecialidade getEspecialidade={getEspecialidade}/>
                            <button type="button" onClick={() => agendarConsulta(paciente.idPaciente)}>Agendar consulta
                            </button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}