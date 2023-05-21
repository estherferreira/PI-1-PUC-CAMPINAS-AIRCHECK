import style from "./includeOption.module.css";

import { TitleAndDescription } from "../TitleAndDescription";
import { Button } from "../Button";
import { FloatingLabel } from "../FloatingLabel";

export function IncludeOption() {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <TitleAndDescription
          title="Como está o ar hoje?"
          text="Preencha os valores para cada parâmetro e verifique como está o ar"
        ></TitleAndDescription>
        <Button text="Enviar dados"></Button>
      </div>

          <div className={style.rightSide}>
            <div className="flex flex-col gap-[2rem]">
              <FloatingLabel text="MP10"></FloatingLabel>
              <FloatingLabel text="MP2.5"></FloatingLabel>
              <FloatingLabel text="O3"></FloatingLabel>
            </div>

            <div className="flex flex-col gap-[2rem]">
              <FloatingLabel text="CO"></FloatingLabel>
              <FloatingLabel text="NO2"></FloatingLabel>
              <FloatingLabel text="SO2"></FloatingLabel>
            </div>
          </div>
    </div>
  );
}
