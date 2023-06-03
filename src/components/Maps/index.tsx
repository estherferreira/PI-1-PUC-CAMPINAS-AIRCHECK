import React, { useState } from "react";
import style from "./maps.module.css";

import { Search } from "@/components/Search";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useMediaQuery } from "react-responsive";

export function Maps() {
  const isWideScreen = useMediaQuery({ minWidth: 1500 });

  const containerStyle = {
    width: isWideScreen ? "65.7rem" : "54.9rem",
    height: "15rem",
    borderRadius: "0.434375rem",
  };

  const defaultCenter = {
    lat: -19.9167,
    lng: -43.9345,
  };

  const url = "http://127.0.0.1:3000";

  const [center, setCenter] = useState(defaultCenter);
  //Dados da API do ar
  const [data, setData] = useState(null);

  //Dados filtrados da API
  const [values, setValues] = useState({
    mp10: "",
    mp25: "",
    o3: "",
    co: "",
    no2: "",
    so2: "",
  });

  const selectValuesFromData = (responseData: any) => {
    const selectedValues = {
      mp10: responseData?.list[0]?.components?.pm10 ?? "",
      mp25: responseData?.list[0]?.components?.pm2_5 ?? "",
      o3: responseData?.list[0]?.components?.o3 ?? "",
      co: responseData?.list[0]?.components?.co ?? "",
      no2: responseData?.list[0]?.components?.no2 ?? "",
      so2: responseData?.list[0]?.components?.so2 ?? "",
    };

    console.log(selectedValues);
    return selectedValues;
  };

  const getAirQualityData = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=07662a6fafefbd49ee74cd23d116256f`
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);

        const selectedValues = selectValuesFromData(responseData);
        setValues(selectedValues);
      }
    } catch (error) {
      console.error("Erro ao obter os dados da qualidade do ar:", error);
    }
  };

  const handleSearch = async (city: any) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=AIzaSyCdGE6kIobB6FOWXaFOlRrbQP-Etst-O6c`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const { lat, lng } = location;

        setCenter({ lat, lng });
        getAirQualityData({ lat, lng });
      } else {
        console.log("Nenhuma localização encontrada");
      }
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.search}>
        <p>Qualidade do ar em...</p>
        <Search onSearch={handleSearch} />
      </div>

      <LoadScript googleMapsApiKey="AIzaSyCdGE6kIobB6FOWXaFOlRrbQP-Etst-O6c">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>

      {/* {data && (
        <div>
          <h2>Dados da qualidade do ar</h2>
          <p>{JSON.stringify(data)}</p>
        </div>
      )} */}
    </div>
  );
}
