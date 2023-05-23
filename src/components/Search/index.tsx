import { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../../public/Search.svg";
import XCircle from "../../../public/Button.svg";
import style from "./search.module.css";

type SearchProps = {
  onSearch: Function;
};

export function Search({ onSearch }: SearchProps) {
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex bg-[#F7F9FB10] rounded-2xl gap-[8rem] py-[0.5rem] px-[0.9rem] items-center">
      <div className="flex gap-[0.25rem]">
        <Image className={style.invert} src={SearchIcon} alt=""></Image>
        <input
          type="text"
          className="font-normal font-['Inter'] text-sm bg-inherit w-full outline-none placeholder:text-[#ffffff50] text-[#fff]"
          placeholder="Pesquisar"
          value={text}
          onChange={handleInputChange}
        />
      </div>
      <Image
        className={style.xCircle}
        src={XCircle}
        alt=""
        onClick={() => setText("")}
      ></Image>
    </div>
  );
}
