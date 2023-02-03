import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';

export default function ProjectProgressBar() {
  
  const completion = parseInt(useSelector(state => state.forms.numberOfInputCompleted))
  const notification = useSelector(state => state.forms.notification)
  console.log("Completion value:" + completion)
  return(
    <>
      <span> Form Progress : {notification} </span>
      <ProgressBar 
        animated 
        now={Math.ceil(completion/6*100)}
        label={`${Math.ceil(completion/6*100)}%`}
        style={{
          "margin-bottom": "2vh"
        }}
      />
    </>
  )
}
