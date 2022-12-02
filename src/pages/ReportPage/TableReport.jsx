import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './table.module.css'

export default function TableReport({data}) {
    const [col,setCol]=useState(0);
    const [listRecord,setListRecord]=useState([]);
    const handeSort=(field)=>{
        if (col===field) setListRecord(listRecord.slice().reverse());
        else setCol(field);
    }
    useEffect(() => {
        switch (col) {
            case 0:
                setListRecord(data.slice().sort((a,b)=>a.category.localeCompare(b.category)));
                break;
            case 1:
                setListRecord(data.slice().sort((a,b)=>a.total-b.total));
                break;
            case 2:
                setListRecord(data.slice().sort((a,b)=>a.assigned-b.assigned));
                break;
            case 3:
                setListRecord(data.slice().sort((a,b)=>a.available-b.available));
                break;
            case 4:
                setListRecord(data.slice().sort((a,b)=>a.notAvailable-b.notAvailable));
                break;
            case 5:
                setListRecord(data.slice().sort((a,b)=>a.waitingForRecycling-b.waitingForRecycling));
                break;
            case 6:
                setListRecord(data.slice().sort((a,b)=>a.recycled-b.recycled));
                break;        
            default:
                break;
        }
    }, [col,data]);

    return (

        <table id="tbl" className="table table-hover" style={{borderCollapse:"separate"}}>
            <thead>
                <tr>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(0)}>Category</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(1)}>Total</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(2)}>Assigned</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(3)}>Available</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(4)}>Not available</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(5)}>Waiting for recycling</th>
                    <th scope="col" className='border-dark' onClick={()=>handeSort(6)}>Recycled</th>
                </tr>
            </thead>
            <tbody>
                {listRecord.map((row,index)=>
                    <tr key={index}>
                        <td>{row.category}</td>
                        <td>{row.total}</td>
                        <td>{row.assigned}</td>
                        <td>{row.available}</td>
                        <td>{row.notAvailable}</td>
                        <td>{row.waitingForRecycling}</td>
                        <td>{row.recycled}</td>
                    </tr>

                )}
            </tbody>
        </table>
  )
}
