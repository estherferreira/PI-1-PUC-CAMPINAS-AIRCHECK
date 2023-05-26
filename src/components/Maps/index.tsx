import React, { useState } from "react";
import style from "./maps.module.css";

import { Search } from "@/components/Search";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useMediaQuery } from 'react-responsive';

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

  const [center, setCenter] = useState(defaultCenter);

  //Busca a localização geográfica de uma cidade usando a API de Geocoding do Google Maps
  const handleSearch = async (city: string) => {
    try {
      //A função "fetch faz uma requisição HTTP para o endpoint da API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=AIzaSyCdGE6kIobB6FOWXaFOlRrbQP-Etst-O6c`
      );
      //A resposta HTTP é convertida em um objeto JavaScript usando o método json() da resposta
      const data = await response.json();

      if (data.results.length > 0) {
        //Os dados do primeiro resultado são armazenados em "location"
        const location = data.results[0].geometry.location;

        //Ao desestruturar o objeto "location" as variáveis lat e lng são extraídas
        const { lat, lng } = location;

        //A função esses valores para atualizar o estado center e mostrar a nova localização
        setCenter({ lat, lng });
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
        <span>Qualidade do ar em...</span>
        <Search onSearch={handleSearch} />
      </div>

      <LoadScript googleMapsApiKey="AIzaSyCdGE6kIobB6FOWXaFOlRrbQP-Etst-O6c">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
