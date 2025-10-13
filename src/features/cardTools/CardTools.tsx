import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectManaFilter, setManaFilter } from './CardToolsSlice';

function CardTools () {
    // const [cmcList, setCmcList] = useState([true,true,true,true,true,true,true,true,true,true]);

    const manaFilter = useAppSelector(selectManaFilter);
    const dispatch = useAppDispatch();

    const onManaChange = (e: BaseSyntheticEvent) => {
        const value = Number(e.target.value);
        // create a new copy and toggle the selected index
        const next = [...manaFilter];
        next[value] = !next[value];
        dispatch(setManaFilter(next));
    }

    return (
        <div className="CardTools">
            <div>
                Mana: 
                <input type="checkbox" value="0" name="mana-0" checked={manaFilter[0]} onChange={onManaChange}/>
                <label htmlFor="0">0</label>
                <input type="checkbox" id="1" value="1" name="mana-1" checked={manaFilter[1]} onChange={onManaChange}/>
                <label htmlFor="1">1</label>
                <input type="checkbox" id="2" value="2" name="mana-2" checked={manaFilter[2]} onChange={onManaChange}/>
                <label htmlFor="1">2</label>
                <input type="checkbox" id="3" value="3" name="mana-3" checked={manaFilter[3]} onChange={onManaChange}/>
                <label htmlFor="1">3</label>
                <input type="checkbox" id="4" value="4" name="mana-4" checked={manaFilter[4]} onChange={onManaChange}/>
                <label htmlFor="1">4</label>
                <input type="checkbox" id="5" value="5" name="mana-5" checked={manaFilter[5]} onChange={onManaChange}/>
                <label htmlFor="1">5</label>
                <input type="checkbox" id="6" value="6" name="mana-6" checked={manaFilter[6]} onChange={onManaChange}/>
                <label htmlFor="1">6</label>
                <input type="checkbox" id="7" value="7" name="mana-7" checked={manaFilter[7]} onChange={onManaChange}/>
                <label htmlFor="1">7</label>
                <input type="checkbox" id="8" value="8" name="mana-8" checked={manaFilter[8]} onChange={onManaChange}/>
                <label htmlFor="1">8</label>
                <input type="checkbox" id="9" value="9" name="mana-9" checked={manaFilter[9]} onChange={onManaChange}/>
                <label htmlFor="1">9</label>
            </div>
        </div>
    );
}

export default CardTools;