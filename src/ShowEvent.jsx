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
        console.log(Content[0][1][0]["join_user"][0]["join_flag"]);
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
           <tr>
            <th>日程</th>
            {/* <th>　〇　</th><th>　△　</th><th>　✕　</th> */}
            {
              Content[0][1][0]["join_user"].map((con,index) => (
                  <th>{Content[0][1][0]["join_user"][index]["name"]}</th>
              ))
            }
            </tr>
           {
            Content[0][1][0]["event_date"].map((con,index1) => (              
              <tr className='table'>
                <td>{Content[0][1][0]["event_date"][index1]["date"]}</td>
                {
                    Content[0][1][0]["join_user"].map((con2,index2) => (
                      <td key={index2}>{
                        Content[0][1][0]["join_user"][index2]["join_flag"][index1]["join_flag"] === 1 ? "〇" : "✕" 
                        }</td>
                    ))
                }
              </tr>              
            ))
           }
           </table>
           <input type="text" />
           <textarea name="" id=""></textarea>
         </div>
        } 
    </div>
  );
}

export default ShowEvent;