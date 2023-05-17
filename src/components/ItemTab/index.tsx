import Link from "next/link";
import style from "./itemTab.module.css";

interface ItemTabProps {
  option: string;
  selected?: boolean;
}

export function ItemTab({ option, selected }: ItemTabProps) {
  return (
    <span className={selected ? style.ItemActive : style.menuItem}>
      {option}
    </span>
  );
}
