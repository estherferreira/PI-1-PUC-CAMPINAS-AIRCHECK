import React from "react";
import style from "./tabsTable.module.css";
import { Divider } from "@chakra-ui/react";
import { ItemTab } from "../ItemTab";

export function TabsTable() {
  return (
    <>
      <header className={style.header}>
        <div className={style.content}>
          <ItemTab option="Boa"></ItemTab>
          <ItemTab option="Moderada"></ItemTab>
          <ItemTab option="Ruim"></ItemTab>
          <ItemTab option="Muito Ruim"></ItemTab>
          <ItemTab option="Péssima"></ItemTab>
        </div>
        <Divider orientation="horizontal" className={style["css-1upb9tn"]} />
      </header>

      <div>
        <p>Tudo está bem</p>
      </div>
    </>
  );
}
