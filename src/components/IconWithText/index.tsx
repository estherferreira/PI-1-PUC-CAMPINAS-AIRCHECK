import Image from "next/image";
import Link from "next/link";
import style from "./iconWithText.module.css";

interface IconWithTextProps {
  src: any;
  alt: string;
  text: string;
  href: string;
  backgroundColor?: string;
}

export function IconWithText({
  src,
  alt,
  text,
  href,
  backgroundColor,
}: IconWithTextProps) {
  const textColorClassName =
    backgroundColor === "#fafafa" ? style.black : style.span;

  return (
    <Link href={href}>
      <div className={style.container}>
        <Image
          className={backgroundColor === "#fafafa" ? style.blackIcon : style.span}
          src={src}
          alt={alt}
        />
        <p className={textColorClassName}>{text}</p>
      </div>
    </Link>
  );
}
