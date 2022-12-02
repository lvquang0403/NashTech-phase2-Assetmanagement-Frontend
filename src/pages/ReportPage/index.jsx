import React, { useEffect, useState } from 'react'
import TableReport from './TableReport'
import styles from "./index.module.css";
import ReportService from '../../services/ReportService';

import * as XLSX from "xlsx";
import { Loading } from "notiflix/build/notiflix-loading-aio";

export default function ReportPage() {
    const [data,setData]=useState([]);
    useEffect(() => {
        Loading.standard("Loading...");
        ReportService.getReports()
            .then((response)=>{
                setData(response.data)
                Loading.remove();
            })
            .catch((error)=>{
                console.log(error);
                Loading.remove();
            });
    }, []);
    const exportData=()=>{
        var data = document.getElementById("tbl");
        var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
        XLSX.write(excelFile, { bookType: 'xlsx', bookSST: true, type: 'base64' });
        XLSX.writeFile(excelFile, 'report.xlsx');

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
