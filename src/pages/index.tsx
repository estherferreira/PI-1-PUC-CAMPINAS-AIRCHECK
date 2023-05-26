import Image from "next/image";
import style from "../styles/painel.module.css";

import Logo from "../../public/Logo.svg";
import Pen from "../../public/pen.svg";
import Delete from "../../public/delete.svg";
import Logout from "../../public/logout.svg";

import { IconWithText } from "@/components/IconWithText";
import { IncludeOption } from "@/components/IncludeOption";
import { Board } from "@/components/Board";

export default function Home() {

  return (
    <main className={style.main}>
      <div className="flex justify-between">
        <Image src={Logo} alt="Logo"></Image>
        <div className="flex gap-[4.1875rem]">
          <IconWithText href="/" src={Pen} alt="Pen" text="Alterar"></IconWithText>
          <IconWithText href="/" src={Delete} alt="Delete" text="Excluir"></IconWithText>
          <IconWithText href="/sair" src={Logout} alt="Logout" text="Sair"></IconWithText>
        </div>
      </div>
      <IncludeOption></IncludeOption>
      <Board name="Muito Ruim"></Board>
      <small>&copy; 2023 Aircheck</small>
    </main>
  );
}
