import axios from "axios";
import {useEffect, useState} from "react";
import {SelecionarEspecialidade} from "../components/SelecionarEspecialidade.jsx";
import dayjs from "dayjs";
import {SelecionarData} from "../components/SelecionarData";
import {Rodape} from "../components/Rodape.jsx";

export const CancelarConsulta = () => {
    const [exibirPacientes, setExibirPacientes] = useState([])
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState([])
    const [dataHoraConsultaSelecionada, setDataHoraConsultaSelecionada] = useState('')
    const [paginacao, setPaginacao] = useState(0)

    async function reagendarConsulta(idConsulta, idPaciente) {
        let dataFormatada = dayjs(dataHoraConsultaSelecionada).format('DD-MM-YYYY HH:mm:ss')
        if (!dataHoraConsultaSelecionada || !especialidadeSelecionada) return alert("Os campos não pode estar vazios")
        const dadosConsulta = {
            especialidade: especialidadeSelecionada,
            dataHoraConsulta: dataFormatada,
            idConsulta: idConsulta,
            idPaciente: idPaciente
        }
        await axios.put(`http://localhost:8080/consulta/atualizar-consulta?idConsulta=${idConsulta}`, dadosConsulta)
            .then(response => {
                alert("Consulta atualizada com sucesso")
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

    async function cancelarConsulta(idPaciente) {
        let param = idPaciente;
        await axios.delete(`http://localhost:8080/consulta/cancelar-consulta?idConsulta=${param}`)
            .then(response => {
                alert("Consulta removida com sucesso")
                window.location.reload(true)
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
        axios.get(`http://localhost:8080/consulta/listar-consultas?page=${paginacao}`)
            .then(response => {
                setExibirPacientes(response.data.elementos)
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
    }

    function avancarPagina() {
        setPaginacao(paginacao + 1)
    }

    function voltarPagina() {
        setPaginacao(paginacao - 1)
    }

    console.log(exibirPacientes)
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
                {exibirPacientes.map(consultaPaciente => (
                    <ul key={consultaPaciente.consultaDTO.idConsulta}>
                        <li>{consultaPaciente.pacienteDTO.nome}</li>
                        <li>{consultaPaciente.pacienteDTO.telefone}</li>
                        <SelecionarData getDataHora={getDataHora}/>
                        <SelecionarEspecialidade getEspecialidade={getEspecialidade}/>
                        <button
                            type="button"
                            onClick={() => reagendarConsulta(consultaPaciente.consultaDTO.idConsulta, consultaPaciente.pacienteDTO.idPaciente)}
                        >
                            Reagendar consulta
                        </button>
                        <button
                            style={{backgroundColor: "red"}}
                            type="button"
                            onClick={() => cancelarConsulta(consultaPaciente.consultaDTO.idConsulta)}
                        >
                            Cancelar consulta
                        </button>
                    </ul>
                ))}
            </div>
            <Rodape/>
        </div>
    )
}