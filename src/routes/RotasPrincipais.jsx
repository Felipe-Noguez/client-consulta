import {Route, Routes} from "react-router-dom"
import {PaginaInicial} from "../pages/PaginaInicial";
import {CadastrarPaciente} from "../pages/CadastrarPaciente";
import {CadastrarConsulta} from "../pages/CadastrarConsulta";
import {CancelarConsulta} from "../pages/CancelarConsulta";

export const RotasPrincipais = () => {
    return (
        <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/cadastrar-paciente" element={<CadastrarPaciente />} />
            <Route path="/cadastrar-consulta" element={<CadastrarConsulta />} />
            <Route path="/cancelar-consulta" element={<CancelarConsulta />} />
        </Routes>
    )
}