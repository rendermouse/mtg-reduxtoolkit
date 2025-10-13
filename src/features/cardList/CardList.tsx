import type { JSX } from "react"
import { useState, useEffect, useRef } from 'react'
import type { CardData } from "./cardListAPISlice"
import Card from "../card/Card";
import { useGetCardListQuery, selectCurrentSetCode } from "./cardListAPISlice"
import { useAppSelector } from "../../app/hooks"
import CardTools from "../cardTools/CardTools";
import { selectManaFilter } from "../cardTools/CardToolsSlice";

const CardList = (): JSX.Element | null => {

    const currentSetCode = useAppSelector(selectCurrentSetCode)
    const manaFilter = useAppSelector(selectManaFilter);

    // accumulated cards across pages
    const [cards, setCards] = useState<CardData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
    const { data, isError, isLoading, isSuccess } = useGetCardListQuery({ setCode: currentSetCode ?? 'AER', page, pageSize: 50 });
    const containerRef = useRef<HTMLDivElement | null>(null);

    // trigger first load when currentSetCode changes
    useEffect(() => {
        setCards([]);
        setPage(1);
    }, [currentSetCode]);

    // when data arrives, append the cards to the current list
    useEffect(() => {
        if (!data) return;
        const incoming = data.cards ?? [];
        if (incoming.length === 0) {
            setShowLoadMore(false);
            return;
        } else {
            setShowLoadMore(true);
        }
        setCards((prev: CardData[]) => [...prev, ...incoming]);
    }, [data]);
        
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
                <CardTools />
                <div className="CardContainer" ref={(el: HTMLDivElement | null): void => { containerRef.current = el; }}>                          
                    {cards
                        .filter((card: CardData) => {
                            const raw = Number(card.cmc);
                            const cmc = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
                            const idx = Math.min(Math.max(cmc, 0), manaFilter.length - 1);
                            return manaFilter[idx];
                        })
                        .map((card: CardData, index: number) => {
                            return card.imageUrl && <Card cardData={card} className='cardWrap' key={index} />
                        })}
                </div>
                {showLoadMore &&  (
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                        <button disabled={isLoading} onClick={() => setPage(p => p + 1)}>
                            {isLoading ? 'Loading...' : 'Load more'}
                        </button>
                    </div>
                )}
            </div>
        );
    }
    return null;
}

export default CardList;