import style from "../styles/alterar.module.css";
import Image from "next/image";
import Link from "next/link";

import { IconWithText } from "@/components/IconWithText";
import { EditableTable } from "@/components/EditableTable/editableTable";

import Pen from "../../public/pen.svg";
import Delete from "../../public/delete.svg";
import Logout from "../../public/logout.svg";

export default function Alterar() {
  const backgroundColor = '#fafafa';
  return (
    <main className={style.main}>
      <div className="flex justify-between">
        <Link href={"/"}>
          <Image src="/black-logo.png" alt="Logo" width={169.895} height={28.0696}></Image>
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
      <EditableTable></EditableTable>
    </main>
  );
}
