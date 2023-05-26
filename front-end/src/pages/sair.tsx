import style from "../styles/sair.module.css"
import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/Logo.svg";

export default function Sair() {
    return (<div className={style.container}>
        <Image src={Logo} alt="Logotipo"></Image>
        <Link href="/"><button className={style.loginPage}>Bem-vindo de volta!</button></Link>
    </div>);
}