import style from "./board.module.css";
import React, { useState, useEffect, useRef } from "react";

import { Maps } from "@/components/Maps";
import { Divider } from "@chakra-ui/react";
import { TitleAndDescription } from "../TitleAndDescription";

import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

interface BoardProps {
  name: string;
}

export function Board({ name }: BoardProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [effects, setEffect] = useState<String>("");

  let value = 0;

  useEffect(() => {
    let effect = "";

    if (name === "Boa") {
      value = 1;
      effect =
        "A qualidade do ar é considerada satisfatória e a poluição do ar apresenta pouco ou nenhum risco";
    } else if (name === "Moderada") {
      value = 0.75;
      effect =
        "Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada";
    } else if (name === "Ruim") {
      value = 0.5;
      effect =
        "Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde";
    } else if (name === "Muito Ruim") {
      value = 0.25;
      effect =
        "Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas)";
    } else {
      value = 0;
      effect =
        "Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis";
    }

    setEffect(effect);

    if (typeof window !== "undefined" && chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option: EChartsOption = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "75%"],
            radius: "90%",
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.2, "#FF5E7D"],
                  [0.4, "#FFC107"],
                  [0.6, "#FDDD60"],
                  [0.8, "#58D9F9"],
                  [1, "#7CFFB2"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 20,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "#fff",
                width: 5,
              },
            },
            axisLabel: {
              formatter: function () {
                return "";
              },
            },
            title: {
              offsetCenter: [0, "-10%"],
              fontSize: 20,
              color: "#fff",
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, "-35%"],
              valueAnimation: true,
              formatter: `${value * 100}%`,
              color: "inherit",
            },
            data: [
              {
                value: value,
                name: name,
              },
            ],
          },
        ],
      };
      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [value, name]);

  return (
    <div className={style.content}>
      <div className={style.leftSide}>
        <div className={style.tabsTable}>
          <header className={style.header}>
            <div className={style.itemTab}>
              <span className={name === "Boa" ? style.ItemActive : style.item}>
                Boa
              </span>
              <span className={name === "Moderada" ? style.ItemActive : ""}>
                Moderada
              </span>
              <span className={name === "Ruim" ? style.ItemActive : ""}>
                Ruim
              </span>
              <span className={name === "Muito Ruim" ? style.ItemActive : ""}>
                Muito Ruim
              </span>
              <span className={name === "Péssima" ? style.ItemActive : ""}>
                Péssima
              </span>
            </div>
            <Divider
              orientation="horizontal"
              className={style["css-1upb9tn"]}
            />
          </header>

          <div>
            <p className={style.effects}>{effects}</p>
          </div>
        </div>
        <Maps></Maps>
      </div>
      <div className={style.rightSide}>
        <TitleAndDescription title="O ar está..." text=""></TitleAndDescription>
        <div
          ref={chartRef}
          className="w-[400px] h-[400px] scale-90 mt-[-200px] mb-[-70px]"
        ></div>
      </div>
    </div>
  );
}
