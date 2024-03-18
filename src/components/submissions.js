import { useEffect, useState } from "react"

const judge0LangIds = {
    "C++" : 76,
    "Java" : 91,
    "JavaScript" : 93,
    "Python" : 71
}

export default function Submissions(){
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKENDSERVERURL+"/submissionList")
        .then((res)=> res.json())
        .then((res)=> setData(res));
    }, [])
    return(
        <div className="min-vh-100 contain  d-flex flex-column justify-content-center align-items-center">
            <h4 className="mt-4">Submission List</h4>
            <table className="table subListContain">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Time</th>
                <th scope="col">Language</th>
                <th scope="col">Code</th>
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
                        <td>{entry.result}</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    )
}