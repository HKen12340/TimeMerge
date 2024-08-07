import './App.css';
import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from 'react-spinners';

function EventEdit(){
  const { id } = useParams();
  const [Content,SetContent] = useState();
  const [EventName, setEventNameText] = useState("");
  const [Descriptoin, setDescriptoin] = useState("");
  const [MailText, setMailText] = useState("");
  const navigate = useNavigate();

  //編集用のデータを持ってくる
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
    return <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} />;
  }

  const event = Content[0][1][0];
  
  if(!event) {
    return <div>入力されたIDは存在しないかすでに削除されています</div>;
  }

  //スケジュール更新
  const  UpdateEevnts = () => {
    let ConfirmResult = window.confirm("イベントの更新を行いますか？");
    if(ConfirmResult == true){
      const postData = {
        'name':EventName,
        'description':Descriptoin,
        'mail_text':MailText,
        'url':id
      }

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
  }
  return(
    <div>
        {Content === undefined ? "" : 
          <div>
          <header>
            <p>TimeMerge</p>
          </header>
          <section className='EventInputFrom'>
            <form method="put">
              <section>
                <label htmlFor="">イベント名</label>
                <input className='TextInputClass' type="text" id="eventName" defaultValue={EventName} 
                onChange={(e) => setEventNameText(e.target.value)}/>
              </section>
              <section>
                <label htmlFor="" >説明</label>
                <textarea cols="105" rows="15" id="descriptoin" defaultValue={Descriptoin}
                onChange={(e) => setDescriptoin(e.target.value)}></textarea>
              </section>
              <section>
                <label htmlFor="">メール本文</label>
                <textarea cols="105" rows="15" defaultValue={MailText} 
                  onChange={(e) => setMailText(e.target.value)}  />
              </section>
              <session className='SubmitBtnSection'>
                <p><input className='SubmitBtn' type="button" onClick={UpdateEevnts} defaultValue="送信" /></p>
              </session>
            </form>
            </section>    
          </div>
        }
    </div>
  )
}
export default EventEdit;