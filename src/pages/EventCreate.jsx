import { useNavigate } from "react-router-dom";
import '../App.css';
import { React, useEffect, useState } from "react";
import { PropagateLoader } from 'react-spinners';

function EventCreate() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMegs, setErrorMsgs] = useState();

  //DateTimeInputタグ管理ステート
  const[dateInputList,SetdateInputList] = useState([
    <input type='datetime-local' name='date[]' className="DateTimeInputClass" id='dates'></input>
  ]);

  //DateTimeInputタグ追加
  const addDateInput = () => {
    SetdateInputList([...dateInputList,
        <input type='datetime-local' name='date[]' className="DateTimeInputClass"></input>
    ])
    console.log(...dateInputList)
  }

  //DateTimeInputタグ削除
  const deleteDateInput = (i) => {
    SetdateInputList(
      dateInputList.filter((dateInputList, index) => (index !== i))
    )
}

//Event作成
const SubmitEevnts = () => {
  
  let form1 = document.getElementById('form1');
  let eventName = document.getElementById('eventName').value;
  let descriptoin = document.getElementById('descriptoin').value;
  let mailText = document.getElementById('mailText').value;

  const fd = new FormData(form1);
  
  var dateArray = [];

  //htmlのname属性がdate[]の要素の値をdateArray配列に追加する
  fd.getAll("date[]").forEach(function(value) {
    dateArray.push(value);
  });

  //送信用データ
  const postData = {
    'name':eventName,
    'description':descriptoin,
    'date':dateArray,
    'MailText':mailText
  }
  
    fetch("http://127.0.0.1:8000/api/create",{
      method: 'POST',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },

    }) .then((response) => {
      let jsonData = response.json();
      console.log(jsonData);

      //PromiseResultから値を取り出す
      jsonData.then(response => { 
        
        console.log(response.errors)
        //laravelのFormRequestのバリデーション結果にエラーが含まれていないか
        if(response.errors == null){
          navigate("/EventUrlShow/"+ response.EventUrl);
        }else{
          //laravelのFormRequestのCreateEventRequestクラスからエラーメッセージをErrorMsgsステートに代入する
          setErrorMsgs(response.errors);          
        }
      })
    })
}

  return (
    
    <div>
      { isLoading ? <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} /> :
      <div>
        <header>
          <p>TimeMerge</p>
        </header>
        <section className="EventInputFrom">           
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
        <form action="" method='post' id='form1'> 
          <section>
            <p><label htmlFor="">イベント名</label></p>
            <input type='text' name='name' id='eventName' className="TextInputClass"></input>
          </section>
          <section>
            <p><label htmlFor="">説明</label></p>
            <textarea cols="105" rows="15" name='descriptoin' id='descriptoin'></textarea>
          </section>
          <section>
            <ul className="DateList">
            {
              Object.values(dateInputList).map((item,index) => (         
              <div>
                <li className="Dateli" key={index}>{item}<button type='button' className="DeleteBtn" 
                onClick={() => deleteDateInput(index)}>削除</button></li>
                </div>
              ))
            }
            </ul>
            <button type='button' onClick={addDateInput} className="AddDateTimeBtn">日程追加</button>
          </section>
          <section>
            <p><label htmlFor="">メール本文</label></p>
            <textarea cols="105" rows="15" name='mailText' id='mailText'></textarea>
          </section>
          <section className="SubmitBtnSection">
            <button type="button" onClick={SubmitEevnts} className="SubmitBtn">送信</button>
          </section>
        </form>      
        </section>
      </div>
    }
    
    </div>    
  );

}

export default EventCreate;
