import style from "./button.module.css";
import Link from "next/link";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  );
}