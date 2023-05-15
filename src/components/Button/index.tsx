import style from './button.module.css'
import Link from 'next/link'

interface ButtonProps {
    text: string;
}

export function Button({ text }: ButtonProps) {
    return(
        <button className={style.button}>{text}</button>
    );
}