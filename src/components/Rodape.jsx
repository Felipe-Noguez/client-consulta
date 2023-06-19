import {Link} from "react-router-dom";

export const Rodape = () => {
    return (
        <footer style={{
            display: "flex",
            gap: 64,
            justifyContent: "center",
            position: "absolute",
            bottom: 32,
            right: 32,
            fontSize: 16
        }}>
            <Link to="/">
                <button type='button' style={{backgroundColor: "red"}}>
                    Sair
                </button>
            </Link>
        </footer>
    )
}