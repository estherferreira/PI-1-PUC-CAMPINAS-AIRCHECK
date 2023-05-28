import style from "./board.module.css";
import React, { useState, useEffect, useRef } from "react";

import { Maps } from "@/components/Maps";
import { Divider } from "@chakra-ui/react";
import { TitleAndDescription } from "../TitleAndDescription";

import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

interface BoardProps {
  name: string;
  effect: string;
}

export function Board({ name, effect }: BoardProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  let value = 0;

  useEffect(() => {
    let effect = "";

    if (name === "Bom") {
      value = 1;
    } else if (name === "Moderado") {
      value = 0.75;
    } else if (name === "Ruim") {
      value = 0.5;
    } else if (name === "Muito Ruim") {
      value = 0.25;
    } else {
      value = 0;
    }

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
              <span className={name === "Bom" ? style.ItemActive : style.item}>
                Bom
              </span>
              <span className={name === "Moderado" ? style.ItemActive : ""}>
                Moderado
              </span>
              <span className={name === "Ruim" ? style.ItemActive : ""}>
                Ruim
              </span>
              <span className={name === "Muito Ruim" ? style.ItemActive : ""}>
                Muito Ruim
              </span>
              <span className={name === "Péssimo" ? style.ItemActive : ""}>
                Péssimo
              </span>
            </div>
            <Divider
              orientation="horizontal"
              className={style["css-1upb9tn"]}
            />
          </header>

          <div>
            <p className={style.effects}>{effect}</p>
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
