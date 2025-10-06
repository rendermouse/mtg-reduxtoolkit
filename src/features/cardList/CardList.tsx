import type { JSX } from "react"
import type { CardData } from "./cardListAPISlice"
import Card from "../card/Card";
import { useGetCardListQuery, selectCurrentSetCode } from "./cardListAPISlice"
import { useAppSelector } from "../../app/hooks"

const CardList = (): JSX.Element | null => {

    const currentSetCode = useAppSelector(selectCurrentSetCode)
    const { data, isError, isLoading, isSuccess } = useGetCardListQuery(currentSetCode ?? 'AER');
        
        if (isError) {
        return (
            <div>
            <h1>There was an error!!!</h1>
            </div>
        )
        }
    
        if (isLoading) {
        return (
            <div>
            <h1>Loading...</h1>
            </div>
        )
        }
    
        if (isSuccess) {
        return (
            <div className="CardList">
                <div className="CardContainer">                          
                    {data.cards.map(
                        (card: CardData, index: number) => {
                            return (
                                card.imageUrl && <Card cardData={card} className='cardWrap' key={index} />
                            )
                        }
                    )}
                </div>
            </div>
        );
    }
    return null;
}

export default CardList;