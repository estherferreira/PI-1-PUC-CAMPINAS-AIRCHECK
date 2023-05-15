import style from './titleAndDescription.module.css'

interface TitleAndDescriptionProps {
    title: string;
    text: string;
}

export function TitleAndDescription({ title, text }: TitleAndDescriptionProps) {
    return (
        <div className={style.container}>
            <h1 className={style.title}>{title}</h1>
            <p className={style.text}>{text}</p>
        </div>
    );
}