import Image from 'next/image'
import style from './iconWithText.module.css'

interface IconWithTextProps {
    src: any;
    alt: string;
    text: string;
}

export function IconWithText({ src, alt, text}: IconWithTextProps) {
    return(<div className={style.container}>
    <Image src={src} alt={alt}></Image>
    <span className={style.span}>{text}</span>
    </div>);
}