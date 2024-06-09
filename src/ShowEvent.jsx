import './App.css';
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowEvent() {
  const { id } = useParams();
  const [Content,SetContent] = useState("");

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/show?id='+id) 
    .then(response => {
      return response.json();  
    })
    .then(data => {
      SetContent(Object.entries(data))
      console.log(data)
      //console.log(Content[0][1])
    })
    // .catch(error => {
    //   console.error(error);  
    // });
  },[])
  
  //   let test = Content;
   

  return (
    <div>
      ShowEvent!!
      {id}
    </div>
  );

}

export default ShowEvent;