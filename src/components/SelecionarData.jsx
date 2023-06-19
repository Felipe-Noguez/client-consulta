import {useEffect, useState} from "react";

export const SelecionarData = ({getDataHora}) => {
    const [dataHoraConsulta, setDataHoraConsulta] = useState('')

    useEffect(() => {
        getDataHora(dataHoraConsulta)
    }, [dataHoraConsulta])

    return (
        <>
            <input
                type='datetime-local'
                value={dataHoraConsulta}
                onChange={event => setDataHoraConsulta(event.target.value)}
                required
            />
        </>
    )
}