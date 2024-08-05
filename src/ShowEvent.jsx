import './App.css';
import { React, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { PropagateLoader } from 'react-spinners';
import maru from './maru.png';
import batu from './batu.png';

 function ShowEvent() {
  const { id } = useParams();
  const [Content,SetContent] = useState();
  const [update,setUpdata]=useState(false);//強制レンダリング用ステート
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  useEffect(()=>{
    fetchEventData(); //呼び出し
  }, [update]);
  
  if (!Content) {
    return <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} />;
  }

  const event = Content[0][1][0];
  
  if(!event) {
    return <div>入力されたIDは存在しないかすでに削除されています</div>;
  }


  //JSONデータを分割代入
  const {event_name, description, join_user, event_date} = event; 

  const SubmitEevnts = () => {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let remarks = document.getElementById('remarks').value;

    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('remarks').value = "";

    console.log("username："+username)
    console.log("email"+email)
    console.log("remarks"+remarks)
    setIsLoading(true);
    var dateArray = [];

    for(let i = 0;i < event_date.length;i++){
      let elements = document.getElementsByName('r'+i);
      let len = elements.length;
      let checkValue = '';
      
      for (let i = 0; i < len; i++){
          if (elements.item(i).checked){
              checkValue = elements.item(i).value;
              console.log(checkValue);
              dateArray.push(checkValue);
          }
      }
    }
    
    const postData = {
      'url':id,
      'username':username,
      'email':email,
      'remarks':remarks,
      'flags':dateArray,
    }
    
    fetch("http://127.0.0.1:8000/api/addSchedule",{
      method: 'POST',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },

    }) .then((response) => {
      setUpdata(update?false:true)//強制レンダリング用ステート      
    })
  }

  const eventEdit = () => {
    navigate('/EventEdit/' + id);
  }

  const eventDelete = () => {
    const postData = {
      'url':id
    }
    console.log(postData);
    console.log(JSON.stringify(postData));

    fetch("http://127.0.0.1:8000/api/delete",{
      method: 'delete',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },

    }) .then((response) => {
      navigate('/');
    })
  }

  const DicicsionEvent = () =>{

    const postData = {
      'url':id
    }

    fetch("http://127.0.0.1:8000/api/sendMali",{
      method: 'post',
      body:JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    }) .then((response) => {
      console.log(response.json())
    })
  }

  return (
    <div>
     URL：http://localhost:3000/show/{id}
       { isLoading ? <PropagateLoader className='PropagateLoader' color="#36d7b7" size={40} /> :
         <div>
           <h1>{event_name}</h1>
           <p>{description}</p>           
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
              {
              event_date.map((event_date,index1) => (
                <div className='selectArea'>
                  {event_date.date}
                  <input type="radio" id={"r"+index1 + "L"} name={"r"+index1}  value="1" />
                  <label htmlFor={"r"+index1 + "L"}><img src={maru} with="40" height="40" /></label>
                  <input type="radio" id={"r"+index1 +"R"} name={"r"+index1} value="0" checked/>
                  <label htmlFor={"r"+index1 + "R"}><img src={batu} with="40" height="40" /></label>
                </div>
              ))
              }
              <div className=''>
                <label htmlFor="">名前</label>
                <input type="text" name='username' id='username' required/>
              </div>
              <div>
              <label htmlFor="">メールアドレス</label>
                <input type="email" name='email' id='email' />
              </div>
              <div>
              <label htmlFor="">備考</label>
                <textarea name="remarks" id="remarks"></textarea>
              </div>
              <div>
                <button type='button' onClick={DicicsionEvent}>メール送信</button>
                <button type="button" onClick={SubmitEevnts}>送信</button>
                <button type='button' onClick={eventEdit}>編集</button>
                <button type='button' onClick={eventDelete}>削除</button>
              </div>
          </form>
         </div>
        }
    </div>    
  );
}

export default ShowEvent;