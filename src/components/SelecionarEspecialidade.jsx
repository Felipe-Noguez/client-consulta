import {useEffect, useState} from "react";

export const SelecionarEspecialidade = ({getEspecialidade}) => {
    const [especialidade, setEspecialidade] = useState('')

    useEffect(() => {
        getEspecialidade(especialidade)
    }, [especialidade])

    return (
        <>
            <select
                value={especialidade}
                onChange={event => setEspecialidade(event.target.value)}
                required
            >
                <option hidden value="">Selecione especialidade</option>
                <option value="Clíníco Geral">Clínico Geral</option>
                <option value="Oftalmologista">Oftalmologista</option>
                <option value="Dentista">Dentista</option>
            </select>
        </>
    )
}