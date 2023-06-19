import {Link} from "react-router-dom";

export const Cabecalho = () => {
    return(
        <header style={{
            display:'flex',
            gap: 64,
            justifyContent:"center",
            position:"absolute",
            top: 32,
            left: 0,
            right: 0,
            fontSize: 32
        }}>
            <Link to="/">Página inicial</Link>
            <Link to="/cadastrar-paciente">Cadastrar Paciente</Link>
            <Link to="/cadastrar-consulta">Cadastrar Consulta</Link>
            <Link to="/cancelar-consulta">Reagendar/Cancelar Consulta</Link>
        </header>
    )
}