import React, { useEffect, useState } from 'react'
import TableReport from './TableReport'
import styles from "./index.module.css";
import ReportService from '../../services/ReportService';

export default function ReportPage() {
    const [data,setData]=useState([]);
    useEffect(() => {
        ReportService.getReports().then((response)=>setData(response.data));
    }, []);
    const exportData=()=>{
        // const xls=new XlsExport(data,"title");
        // xls.exportToXLS("export.xlsx",true);
    }

    return (
        <>
            <div className={styles["board-container"]}>
            <div className={styles.title}>Report</div>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger' onClick={()=>exportData()}>Export</button>
                    
                </div>
                <TableReport data={data}></TableReport>
            </div>
            
        </>
    )
}
