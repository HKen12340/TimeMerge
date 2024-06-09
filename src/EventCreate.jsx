import './App.css';
import React,{useState} from 'react';

function EventCreate() {
  const[dateInputList,SetdateInputList] = useState([
    <input type='date' name='date[]' id='dates'></input>
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
      console.log(response)
    })
}

  return (
    <div>
      <header>
        <h1>ヘッダー</h1>
      </header>
      <form action="" method='post' id='form1'> 
        <input type='text' name='name' id='eventName'></input>
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
        <textarea cols="50" rows="6" name='mailText' id='mailText'></textarea>
        <button type="button" onClick={SubmitEevnts}>送信</button>
        </form>
      
    </div>
  );

}

export default EventCreate;
