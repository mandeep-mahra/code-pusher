import { useEffect, useState } from "react";
import App from '../App.js';


export default function Submissions(){
    const [data, setData] = useState([]);
    const [done, setDone] = useState(true);
    
    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKENDSERVERURL+"/submissionList")
        .then((res)=> res.json())
        .then((res)=> {
            res.reverse();
            res.map((curr) => {
                const time = new Date(curr.timeStamp);
                curr.timeStamp = time.toLocaleString();
            })
            setData(res)
        });
    }, [])
    
    return(
        (done)?
        <div className="min-vh-100 contain  d-flex flex-column justify-content-center align-items-center">
            <h4 className="mt-4">Submission List</h4>
            <button onClick={()=> setDone(false)} className="btn btn-primary btn-sm mb-2">Home</button>
            <table className="table subListContain">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
                <th scope="col">Language</th>
                <th scope="col">Code</th>
                <th scope="col">stdin</th>
                <th scope="col">Result</th>
                </tr>
            </thead>
            <tbody>
                
                {data.map((entry, index) => 
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{entry.userName}</td>
                        <td>{entry.timeStamp}</td>
                        <td>{entry.codeLanguage}</td>
                        <td>{entry.code.substr(0, 100)} {(entry.code.length > 100)?"...":""}</td>
                        <td>{entry.stdin}</td>
                        <td>{entry.result.substr(0, 100)} {(entry.code.length > 100)?"...":""}</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>:
        <App submit = {true}/>
    )
}