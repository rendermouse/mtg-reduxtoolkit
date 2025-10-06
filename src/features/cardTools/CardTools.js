import React, { useState, useEffect } from 'react';
import eventBus from "../../EventBus";

function CardTools () {

    const [cmcList, setCmcList] = useState([true,true,true,true,true,true,true,true,true,true]);
    const [searchText, setSearchText] = useState('');

    useEffect( () => {
        console.log('>> cardTools useEffect()');

        eventBus.on("chooseSet", onSetChange);

    }, []);

    const onSetChange = (e) => {
        setSearchText('');
    }

    const onManaChange = (e) => {

        console.log('>> onManaChange');

        var tempList = [...cmcList];
        if (e) {
            tempList[parseInt(e.target.value)] = e.target.checked;
        }
        setCmcList(tempList);

        var evtString = '';
        var count = 0;
        for (var i=0; i<tempList.length; i++) {
            if (tempList[i]) {
                count ++;
                if (count > 1) {
                    evtString += '|';
                }
                evtString += i;
            }
        }
        eventBus.dispatch("cmc", { message: evtString });
    }

    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const doSearch = (e) => {
        eventBus.dispatch("search", { message: searchText });
    }

    return (
        <div className="CardTools">
            <div>
                Mana: 
                <input type="checkbox" value="0" name="mana-0" checked={cmcList[0]} onChange={onManaChange}/>
                <label htmlFor="0">0</label>
                <input type="checkbox" id="1" value="1" name="mana-1" checked={cmcList[1]} onChange={onManaChange}/>
                <label htmlFor="1">1</label>
                <input type="checkbox" id="2" value="2" name="mana-2" checked={cmcList[2]} onChange={onManaChange}/>
                <label htmlFor="1">2</label>
                <input type="checkbox" id="3" value="3" name="mana-3" checked={cmcList[3]} onChange={onManaChange}/>
                <label htmlFor="1">3</label>
                <input type="checkbox" id="4" value="4" name="mana-4" checked={cmcList[4]} onChange={onManaChange}/>
                <label htmlFor="1">4</label>
                <input type="checkbox" id="5" value="5" name="mana-5" checked={cmcList[5]} onChange={onManaChange}/>
                <label htmlFor="1">5</label>
                <input type="checkbox" id="6" value="6" name="mana-6" checked={cmcList[6]} onChange={onManaChange}/>
                <label htmlFor="1">6</label>
                <input type="checkbox" id="7" value="7" name="mana-7" checked={cmcList[7]} onChange={onManaChange}/>
                <label htmlFor="1">7</label>
                <input type="checkbox" id="8" value="8" name="mana-8" checked={cmcList[8]} onChange={onManaChange}/>
                <label htmlFor="1">8</label>
                <input type="checkbox" id="9" value="9" name="mana-9" checked={cmcList[9]} onChange={onManaChange}/>
                <label htmlFor="1">9</label>
            </div>
            {/* <div>
                <input type="text" name="searchText" value={searchText} onChange={onSearchChange}/><button onClick={doSearch}>GO</button>
            </div> */}
        </div>
    );
}

export default CardTools;