import Image from "next/image";
import style from "../styles/painel.module.css";

import Logo from "../../public/Logo.svg";
import Pen from "../../public/pen.svg";
import Delete from "../../public/delete.svg";
import Logout from "../../public/logout.svg";

import { IconWithText } from "@/components/IconWithText";
import { IncludeOption } from "@/components/IncludeOption";
import { TabsTable } from "@/components/TabsTable";
import { HalfDonutChart } from "@/components/HalfDonut";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#002062] h-[100vh] py-[4.8125rem] px-[9.25rem] gap-[4rem]">
      <div className="flex justify-between">
        <Image src={Logo} alt="Logo"></Image>
        <div className="flex gap-[4.1875rem]">
          <IconWithText src={Pen} alt="Pen" text="Alterar"></IconWithText>
          <IconWithText src={Delete} alt="Delete" text="Excluir"></IconWithText>
          <IconWithText src={Logout} alt="Logout" text="Sair"></IconWithText>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.leftSide}>
          <IncludeOption></IncludeOption>
          <TabsTable></TabsTable>
        </div>
        <div className={style.rightSide}>
          <HalfDonutChart value={30}></HalfDonutChart>
        </div>
      </div>
    </main>
  );
}
