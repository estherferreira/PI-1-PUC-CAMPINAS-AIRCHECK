import style from "./includeOption.module.css";
import { ChangeEvent, useState } from "react";
type OnDataSubmittedCallback = () => void;

import { TitleAndDescription } from "../TitleAndDescription";
import { Button } from "../Button";
import { FloatingLabel } from "../FloatingLabel";

export function IncludeOption({ onDataSubmitted }: { onDataSubmitted: OnDataSubmittedCallback }) {
  const url = "http://127.0.0.1:3000";
  const [requestStatus, setRequestStatus] = useState("");
  const [formValues, setFormValues] = useState({
    mp10: "",
    mp25: "",
    o3: "",
    co: "",
    no2: "",
    so2: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    await fetch(`${url}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          onDataSubmitted();
          setRequestStatus("success");
        } else {
          setRequestStatus("error");
        }
      })
      .catch((error) => {
        console.log("Erro na solicitação", error);
        setRequestStatus("error");
      });
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <TitleAndDescription
          title="Como está o ar hoje?"
          text="Preencha os valores para cada parâmetro e verifique como está o ar"
        ></TitleAndDescription>
        <div className="flex flex-col gap-[1rem]">
          <Button text="Enviar dados" onClick={handleSubmit}></Button>
          {requestStatus === "success" && <p className="text-[13px]">Amostra enviada!</p>}
          {requestStatus === "error" && <p className="text-[13px]">Erro ao enviar a amostra!</p>}
        </div>
      </div>

      <div className={style.rightSide}>
        <div className="flex flex-col gap-[2rem]">
          <FloatingLabel
            text="MP10"
            name="mp10"
            value={formValues.mp10}
            onChange={handleChange}
          ></FloatingLabel>
          <FloatingLabel
            text="MP2.5"
            name="mp25"
            value={formValues.mp25}
            onChange={handleChange}
          ></FloatingLabel>
          <FloatingLabel
            text="O3"
            name="o3"
            value={formValues.o3}
            onChange={handleChange}
          ></FloatingLabel>
        </div>

        <div className="flex flex-col gap-[2rem]">
          <FloatingLabel
            text="CO"
            name="co"
            value={formValues.co}
            onChange={handleChange}
          ></FloatingLabel>
          <FloatingLabel
            text="NO2"
            name="no2"
            value={formValues.no2}
            onChange={handleChange}
          ></FloatingLabel>
          <FloatingLabel
            text="SO2"
            name="so2"
            value={formValues.so2}
            onChange={handleChange}
          ></FloatingLabel>
        </div>
      </div>
    </div>
  );
}
