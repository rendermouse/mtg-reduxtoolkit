import "./Card.scss"
import type { CardData } from "../cardList/cardListAPISlice"
import { useRef, useState } from "react";

interface CardProps {
  cardData: CardData;
  className?: string;
}

const Card: React.FC<CardProps> = ({ cardData }) => {

    const ref = useRef(null);
    const isVisible = true;
    const [selected, setSelected] = useState(false);
    const toggleCard = (card:CardData) => {        
        console.log('>> toggleCard');
        setSelected(!selected);
        console.log(card);
    }

    const urlCss = cardData.imageUrl ? 'url(' + cardData.imageUrl + ')' : '';

    return(
        <div className={selected ? 'cardWrap active' : 'cardWrap'} ref={ref} onClick={() => toggleCard(cardData)}>
            <div className="cardTop" style={isVisible ? {backgroundImage: urlCss} : undefined}></div>
            <div className="cardBot" style={isVisible ? {backgroundImage: urlCss} : undefined}></div>
        </div>
    )
}

export default Card;