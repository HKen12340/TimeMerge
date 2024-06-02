import './App.css';
import React,{useState} from 'react';

function App() {
  const[dateInputList,SetdateInputList] = useState([
    <input type='date' name='date[]'></input>
  ]);

  const addDateInput = (index) => {
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

 let test = <input type='date'></input>
  return (
    <div>
      <header>
        <h1>ヘッダー</h1>
      </header>
      
        <input type='text' name='name'></input>
        <textarea cols="50" rows="6" name='descriptoin'></textarea>
        <ul>
        {
          Object.values(dateInputList).map((item,index) => (         
           <div>
             <li key={index}>{item}<button onClick={() => deleteDateInput(index)}>削除</button></li>
            </div>
          ))
        }
        </ul>
        
      <button onClick={addDateInput}>日程追加</button>
    </div>
  );


}

export default App;
