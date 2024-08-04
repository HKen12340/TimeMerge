import { useNavigate } from "react-router-dom";
import './App.css';
import React,{useState} from 'react';


function EventCreate() {
  const navigate = useNavigate();

  const[dateInputList,SetdateInputList] = useState([
    <input type='datetime-local' name='date[]' id='dates'></input>
  ]);

  const addDateInput = () => {
    SetdateInputList([...dateInputList,
        <input type='date' name='date[]'></input>
    ])
    console.log(...dateInputList)
  }

  const deleteDateInput = (i) => {
    SetdateInputList(
      dateInputList.filter((dateInputList, index) => (index !== i))
    )
}

const SubmitEevnts = () => {
  
  let form1 = document.getElementById('form1');
  let eventName = document.getElementById('eventName').value;
  let descriptoin = document.getElementById('descriptoin').value;
  let mailText = document.getElementById('mailText').value;

  const fd = new FormData(form1);
  
  var dateArray = [];

  fd.getAll("date[]").forEach(function(value) {
    dateArray.push(value);
  });


  const postData = {
    'name':eventName,
    'description':descriptoin,
    'date':dateArray,
    'MailText':mailText
  }

  console.log(postData);
  console.log(JSON.stringify(postData));
  
    fetch("http://127.0.0.1:8000/api/create",{
      method: 'POST',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },

    }) .then((response) => {
      let jsonData = response.json();
      
      //PromiseResultから値を取り出す
      jsonData.then(response => { 
        navigate("/EventUrlShow/"+ response.EventUrl);
      })
    })
}


  return (
    <div>
      <header>
        <h1>ヘッダー</h1>
      </header>
      <form action="" method='post' id='form1'> 
        <label htmlFor="">イベント名</label>
        <input type='text' name='name' id='eventName'></input>
        <label htmlFor="">説明</label>
        <textarea cols="50" rows="6" name='descriptoin' id='descriptoin'></textarea>
        <ul>
        {
          Object.values(dateInputList).map((item,index) => (         
           <div>
             <li key={index}>{item}<button type='button' 
             onClick={() => deleteDateInput(index)}>削除</button></li>
            </div>
          ))
        }
        </ul>
        <button type='button' onClick={addDateInput}>日程追加</button>
        <label htmlFor="">メール本文</label>
        <textarea cols="50" rows="6" name='mailText' id='mailText'></textarea>
        <button type="button" onClick={SubmitEevnts}>送信</button>
      </form>      
    </div>
    
  );

}

export default EventCreate;
