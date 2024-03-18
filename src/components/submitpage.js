import { useState } from "react";
import logo from "../resources/logo.png";
import App from '../App.js'

const judge0LangIds = {
    "C++" : 76,
    "Java" : 91,
    "JavaScript" : 93,
    "Python" : 71
}


export default function SubmitPage(){
    const [name, setName] = useState("");
    const [lang, setLang] = useState("C++");
    const [stdin, setStdin] = useState("");
    const [code, setCode] = useState("");
    const [done, setDone] = useState(false);
    
    async function uploadData(token){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if(token === null)
            token = "Error";
        const raw = JSON.stringify({
            "name": name,
            "lang": lang,
            "stdin": stdin,
            "code": code,
            "result":token
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(process.env.REACT_APP_BACKENDSERVERURL + "/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => setDone(true))
        .catch((error) => console.error(error));
    }

    async function resolveToken(token){
        const url = 'https://judge0-ce.p.rapidapi.com/submissions/'+token+'?base64_encoded=false&fields=*';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd27416aaefmsh9ffbe40b3afc4d5p1125f4jsne5be79526ad7',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            uploadData(result.stdout);
            
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        e.disabled = true;
        // getting result from judge0api
        const myHeaders = new Headers();
        myHeaders.append("X-RapidAPI-Key", "d27416aaefmsh9ffbe40b3afc4d5p1125f4jsne5be79526ad7");
        myHeaders.append("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "source_code": code,
            "language_id": judge0LangIds[lang],
            "stdin": stdin
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*", requestOptions)
        .then((response) => response.json())
        .then((res) => {
            resolveToken(res.token);
        })
        .catch((error) => console.error(error));
        
    }
    return(
    !done?
    <>
      <div className='contain min-vh-100 d-flex justify-content-center align-items-center flex-column'>
        <div className = "form-box p-5 rounded-4 shadow d-flex justify-content-center flex-column align-items-center" >
        <img className = "logo" src = {logo}/>
        <div className='inputform w-100'>
          <form className = "d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-between'> 
              <div>
                <input onChange={(e)=>{setName(e.target.value)}} id="Name" className='form-control ' placeholder="Name" required />
              </div>
              <div className="form-group col-md-4 w-25">
                <select onChange={(e)=>{setLang(e.target.value)}} id="inputState" className="form-control" defaultValue="C++">
                  <option >C++</option>
                  <option>Java</option>
                  <option>JavaScript</option>
                  <option>Python</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-3 w-100 justify-content-between">
                <div>
                    <label htmlFor="code" className='mt-3'>Code</label>
                    <textarea onChange={(e)=>{setCode(e.target.value)}} id="code" type="box" className = "code form-control" spellCheck = "false" required/>
                </div>
                <div>
                    <label htmlFor="inputType" className='mt-3'>Input</label>
                    <textarea onChange={(e)=>{setStdin(e.target.value)}} id="inputType" className='codearea code form-control' spellCheck = "false" required/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={(e) => handleSubmit(e)} type="submit" className='bg-primary text-light mt-2 form-control mt-3 w-25'>Submit</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>:
    <App submit = {false}/>
    )
}