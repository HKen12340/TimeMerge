import './App.css';
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

 function ShowEvent() {
  const { id } = useParams();
  const [Content,SetContent] = useState();

  useEffect(()=>{
    const fetchEventData = async () => {
      const url = 'http://127.0.0.1:8000/api/show?id='+id;
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
        SetContent(Object.entries(json));
        console.log(Content[0]);
      } catch (e) {
        console.log("error", e);
      }
  }

  fetchEventData(); //呼び出し
  }, []);

  return (
    <div>
     URL：http://localhost:3000/show/{id}
       {Content === undefined ? "" : 
         <div>
           <h1>{Content[0][1][0]["event_name"]}</h1>
           <p>{Content[0][1][0]["description"]}</p>           
           <table className='table'>
           {
            Content[0][1][0]["event_date"].map((con,index) => (
              <tr className='table'><td>{Content[0][1][0]["event_date"][index]["date"]}</td></tr>
            ))
           }
           </table>
         </div>
        } 
    </div>
  );
}

export default ShowEvent;