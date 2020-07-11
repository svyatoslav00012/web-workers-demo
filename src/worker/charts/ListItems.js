import React from "react";
import {Cdiv} from "../../App";

const Item = ({id, num, fib}) => (<div style={{display: 'flex'}}>
    <div style={{width: '20%', textAlign: 'center'}}>{id}</div>
    <div style={{width: '20%', textAlign: 'center'}}>{num}</div>
    <div style={{width: '60%', textAlign: 'center'}}>{fib}</div>
</div>)

const ListItems = ({items, title}) => {
    return (<div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Cdiv><h4>{title}</h4></Cdiv>
        <Item id={'ID'} num={'NUM'} fib={'FIB'}/>
        <div style={{overflowY: 'auto', flexGrow: 1}}>
        {items.map(({id, num, res}) => <Item key={id} id={id} num={num} fib={res}/>)}
        </div>
    </div>)
}

export default React.memo(ListItems);