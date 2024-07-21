import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EventEdit(){
  const { id } = useParams();
  const [Content,SetContent] = useState();
  const [update,setUpdata]=useState(false)
  const [EventName, setEventNameText] = useState("");
  const [Descriptoin, descriptoinText] = useState("");

  const navigate = useNavigate();

  const fetchEventData = async () => {
    const url = 'http://127.0.0.1:8000/api/show?id='+id;
    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      SetContent(Object.entries(json));
      console.log(Content[0][1][0]["event_name"])
      setEventNameText(Content[0][1][0]["event_name"])
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

  //JSONデータを分割代入
  const {event_name, description, join_user, event_date} = event; 

  const SubmitEevnts = () => {
    let eventName = document.getElementById('eventName').value;
    let descriptoin = document.getElementById('descriptoin').value;
    //let mailText = document.getElementById('mailText').value;
  
    const postData = {
      'name':eventName,
      'description':descriptoin,
      'url':id
    }
    
      fetch("http://127.0.0.1:8000/api/update",{
        method: 'post',
        body:JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },  
      }) .then((response) => {
          navigate("/show/"+ id);
          setUpdata(update?false:true);
      })
  }

  return(
    <div>
        {Content === undefined ? "" : 
          <div>
            <form>
              <label htmlFor="">イベント名</label>
              <input type="text" id="eventName" value={EventName}/>
              <label htmlFor="" >説明</label>
              <textarea  id="descriptoin" value={description}></textarea>
              <input type="text" />
              <input type="submit" onClick={SubmitEevnts} value="送信" />
            </form>    
          </div>
        }
    </div>
  )
}
export default EventEdit;