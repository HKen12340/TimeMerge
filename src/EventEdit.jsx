import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EventEdit(){
  const { id } = useParams();
  const [Content,SetContent] = useState();
  const [EventName, setEventNameText] = useState("");
  const [Descriptoin, setDescriptoin] = useState("");
  const [MailText, setMailText] = useState("");
  const navigate = useNavigate();

  const fetchEventData = async () => {
    const url = 'http://127.0.0.1:8000/api/show?id='+id;
    try {
      const res = await fetch(url);
      const json = await res.json();
      SetContent(Object.entries(json));
      let resultData = Object.entries(json);
      setEventNameText(resultData[0][1][0]["event_name"])
      setDescriptoin(resultData[0][1][0]["description"])
      setMailText(resultData[0][1][0]["mail_text"]);
    } catch (e) {
      console.log("error", e);
    }
}

  useEffect(()=>{
    fetchEventData(); //呼び出し
  }, []);


  if (!Content) {
    return <div>Loading...</div>;
  }

  const event = Content[0][1][0];
  
  if(!event) {
    return <div>入力されたIDは存在しないかすでに削除されています</div>;
  }

  const  SubmitEevnts = () => {
    const postData = {
      'name':EventName,
      'description':Descriptoin,
      'mail_text':MailText,
      'url':id
    }

    console.log(JSON.stringify(postData))

     fetch("http://127.0.0.1:8000/api/update",{
      method: 'put',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    }) .then((response) => {
          navigate("/show/"+ id);
    }) .catch(error => {
        console.log(error)
     });

  }

  return(
    <div>
        {Content === undefined ? "" : 
          <div>
            <form method="put">
              <label htmlFor="">イベント名</label>
              <input type="text" id="eventName" defaultValue={EventName} 
              onChange={(e) => setEventNameText(e.target.value)}/>
              <label htmlFor="" >説明</label>
              <textarea  id="descriptoin" defaultValue={Descriptoin}
               onChange={(e) => setDescriptoin(e.target.value)}></textarea>
               <label htmlFor="">メール本文</label>
               <input type="text"  defaultValue={MailText} 
                onChange={(e) => setMailText(e.target.value)}  />
              <input type="button" onClick={SubmitEevnts} defaultValue="送信" />
            </form>    
          </div>
        }
    </div>
  )
}
export default EventEdit;