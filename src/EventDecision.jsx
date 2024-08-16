import './App.css';
import { React, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { PropagateLoader } from 'react-spinners';
import maru from './maru.png';
import batu from './batu.png';

 function EventDecision() {
  const { id } = useParams();
  const [Content,SetContent] = useState();
  const [update,setUpdata]=useState(false);//強制レンダリング用ステート
  const [isLoading, setIsLoading] = useState(false);//ロード判定ステート
  const [errorMegs, setErrorMsgs] = useState();

  const navigate = useNavigate();

  //データ引っ張る用
  const fetchEventData = async () => {
    const url = 'http://127.0.0.1:8000/api/show?id='+id;
    try {      
      const res = await fetch(url);
      const json = await res.json();
      SetContent(Object.entries(json));
    } catch (e) {
      console.log("error", e);
    }
    setIsLoading(false);
}

  //強制レンダリング用
  useEffect(()=>{
    fetchEventData(); //呼び出し
  }, [update]);
  
  //ContentステートがNullあればロードアニメーションを表示する
  if (!Content) {
    return <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} />;
  }

  const event = Content[0][1][0];
  
  if(!event) {
    return <div>入力されたIDは存在しないかすでに削除されています</div>;
  }

  //JSONデータを分割代入
  const {event_name, description, join_user, event_date} = event; 

  //日時確定メールを送る
  const DicicsionEvent = () =>{
    let ConfirmResult = window.confirm("日程の確定メールを送信しますか？");
    if(ConfirmResult == true){

      const selectedValues = [];
      const checkboxes = document.querySelectorAll('input[name="CheackDate"]:checked');
    
      for (let i = 0; i < checkboxes.length; i++) {
        selectedValues.push(checkboxes[i].value);
      }

      const postData = {
        'id':id,
        'DecesionDates':selectedValues
      }

      fetch("http://127.0.0.1:8000/api/sendMali",{
        method: 'post',
        body:JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      }) .then((response) => {
        setUpdata(update?false:true)//強制レンダリング用ステート
        let jsonData = response.json();
        jsonData.then(response => { 
          if(response.errors != null){
            //laravelのFormRequestからエラーメッセージをErrorMsgsステートに代入する
            setErrorMsgs(response.errors);          
          }else{
            //navigate('/EmailSubmitAfter');
          }
        })
      })
    }
  }

  return (
    <div>
       { isLoading ? <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} /> :
         <div>
          <header>
            <p>TimeMerge</p>            
          </header>          
          <section className='TitleSection'>
          { errorMegs == null ? "" :
                  <section className="errorMsgCom">
                    <p>以下のエラーが発生しました。</p>
                    <ul className="ErrorMsgList">
                    {
                      Object.values(errorMegs).map((errormsg,index) => (
                        <li>{errormsg}</li>
                      ))
                    }
                    </ul>
                  </section>            
                }
            <h1>{event_name}</h1>
            <p>{description}</p>        
           </section>      
           <div className="table-wrap">
           <table className='table'>            
           <tr>
            <th>日程</th>
            {join_user.map((user,index) => (
                  <th>{user.name}</th>
              ))
            }
            </tr>
           {event_date.map((event_date,index1) => (
              <tr className='table'>
                <td>{event_date.date}</td>
                {
                    join_user.map((user,index2) => (
                      <td key={index2}>
                        {user.join_flag[index1].join_flag === 1 ? "〇" : "✕"}
                      </td>
                    ))
                }
              </tr>              
            ))
           }
           </table>
           
          </div>
           <form action="" method='POST' name='form1'>            
           <section className='ScheduleInputArea'>                        
              {
              event_date.map((event_date,index1) => (
                <div className='ScheduleSelect'>
                  <input type="checkbox" name="CheackDate" value={event_date.date}/>
                  <div className='ScheduleDate'>{event_date.date}</div>
                </div>
              ))
              }
              </section>
              <section className='EventInputFrom'>        
                
                <section className="SubmitBtnSection">
                  <button className='SubmitBtn' type="button" onClick={DicicsionEvent}>日程確定メールを送信</button>
                </section>
              </section>
          </form>
         </div>
        }
    </div>    
  );
}

export default EventDecision;