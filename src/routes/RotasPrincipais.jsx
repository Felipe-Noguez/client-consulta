import {Route, Routes} from "react-router-dom"
import {PaginaInicial} from "../pages/PaginaInicial";
import {CadastrarPaciente} from "../pages/CadastrarPaciente";
import {CadastrarConsulta} from "../pages/CadastrarConsulta";

export const RotasPrincipais = () => {
    return (
        <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/cadastrar-paciente" element={<CadastrarPaciente />} />
            <Route path="/cadastrar-consulta" element={<CadastrarConsulta />} />
        </Routes>
    )
}