import { useParams } from "react-router-dom";

function EventUrlShow(){
  const { id } = useParams();

  return(
    <div>
        <p>イベントが作成されました。以下のURLを共有しましょう。</p>
        <p>URL：http://localhost:3000/show/{id}</p>
    </div>
  )
  
}
export default EventUrlShow;