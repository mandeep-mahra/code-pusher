import './App.css';
import SubmitPage from './components/submitpage.js';
import Submissions from './components/submissions.js';

export default function App( props ) {
  return(
    <>
      {(props.submit)?
        <SubmitPage/>:<Submissions/>}
    </>
  )
}


