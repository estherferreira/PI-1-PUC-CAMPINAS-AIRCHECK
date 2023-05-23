import Image from 'next/image'
import Link from 'next/link';
import style from './iconWithText.module.css'

interface IconWithTextProps {
    src: any;
    alt: string;
    text: string;
    href: string
}

export function IconWithText({ src, alt, text, href }: IconWithTextProps) {
    return (<Link href={href}>
        <div className={style.container}>
            <Image src={src} alt={alt}></Image>
            <span className={style.span}>{text}</span>
        </div></Link>);
}