import style from "./includeOption.module.css";

import { TitleAndDescription } from "../TitleAndDescription";
import { Button } from "../Button";
import { FloatingLabel } from "../FloatingLabel";

export function IncludeOption() {
  return (
    <div className="flex bg-[#2268F3] p-[3rem] rounded-[0.434375rem] justify-between">
      <div className="flex flex-col gap-[2.75rem]">
        <TitleAndDescription
          title="Como está o ar hoje?"
          text="Me ajude com algumas informações!"
        ></TitleAndDescription>
        <Button text="Enviar dados"></Button>
      </div>

          <div className="flex gap-[1rem] items-center">
            <div className="flex flex-col gap-[1rem]">
              <FloatingLabel text="MP10"></FloatingLabel>
              <FloatingLabel text="MP2.5"></FloatingLabel>
              <FloatingLabel text="O3"></FloatingLabel>
            </div>

            <div className="flex flex-col gap-[1rem]">
              <FloatingLabel text="CO"></FloatingLabel>
              <FloatingLabel text="NO2"></FloatingLabel>
              <FloatingLabel text="SO2"></FloatingLabel>
            </div>
          </div>
    </div>
  );
}
