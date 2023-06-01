import style from "../styles/alterar.module.css";
import Image from "next/image";
import Link from "next/link";

import { IconWithText } from "@/components/IconWithText";
import { EditableTable } from "@/components/EditableTable/editableTable";

import Pen from "../../public/pen.svg";
import Logout from "../../public/logout.svg";
import Head from "next/head";

export default function Alterar() {
  const backgroundColor = "#fafafa";
  return (
    <main className={style.main}>
      <Head>
        <title>Alterar | Aircheck</title>
      </Head>
      <div className="flex justify-between">
        <Link href={"/"}>
          <Image
            src="/black-logo.png"
            alt="Logo"
            width={169.895}
            height={28.0696}
          ></Image>
        </Link>
        <div className="flex gap-[4.1875rem]">
          <IconWithText
            href="/alterar"
            src={Pen}
            alt="Pen"
            text="Alterar"
            backgroundColor={backgroundColor}
          ></IconWithText>
          <IconWithText
            href="/sair"
            src={Logout}
            alt="Logout"
            text="Sair"
            backgroundColor={backgroundColor}
          ></IconWithText>
        </div>
      </div>
      <div className={style.page}>
        <EditableTable></EditableTable>
        <small className="text-[#000]">&copy; 2023 Aircheck</small>
      </div>
    </main>
  );
}
