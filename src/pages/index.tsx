import Image from "next/image";
import style from "../styles/painel.module.css";

import React, { useState, useEffect } from "react";

import Logo from "../../public/Logo.svg";
import Pen from "../../public/pen.svg";
import Delete from "../../public/delete.svg";
import Logout from "../../public/logout.svg";

import { IconWithText } from "@/components/IconWithText";
import { IncludeOption } from "@/components/IncludeOption";
import { Board } from "@/components/Board";

export default function Home() {
  const [data, setData] = useState({ classification: ["", ""] });
  const [classfication, setclassfication] = useState("");
  const [effects, seteffects] = useState("");

  const url = "http://127.0.0.1:3000";

  useEffect(() => {
    fetch(`${url}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setclassfication(data.classification[0]);
        seteffects(data.classification[1]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className={style.main}>
      <div className="flex justify-between">
        <Image src={Logo} alt="Logo"></Image>
        <div className="flex gap-[4.1875rem]">
          <IconWithText
            href="/alterar"
            src={Pen}
            alt="Pen"
            text="Alterar"
          ></IconWithText>
          <IconWithText
            href="/"
            src={Delete}
            alt="Delete"
            text="Excluir"
          ></IconWithText>
          <IconWithText
            href="/sair"
            src={Logout}
            alt="Logout"
            text="Sair"
          ></IconWithText>
        </div>
      </div>
      <IncludeOption></IncludeOption>
      <Board name={`${classfication}`} effect={`${effects}`}></Board>
      <small>&copy; 2023 Aircheck</small>
    </main>
  );
}
