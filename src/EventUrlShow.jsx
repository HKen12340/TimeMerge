import { useParams } from "react-router-dom";
import { useReward } from "react-rewards";
import { useEffect } from "react";

function EventUrlShow(){
  const { id } = useParams();
  const{ reward:leftReward, isAnimating:leftIsAnimating } = useReward("leftRewardId","confetti",{
    angle: 55,
    position: "absolute",
  });

  const{ reward:rightReward, isAnimating:rightIsAnimating } = useReward("rightRewardId","confetti",{
    angle: 135,
    position: "absolute",
  });

  const { reward: Areward, isAnimating: isAnimating } = useReward("rewardId", "confetti");

  useEffect(() => {
      leftReward();
      rightReward();      
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.webkitHidden == false && !isAnimating) {
        leftReward();
        rightReward();
      }
    }, 3000);
    return () => clearInterval(interval);    
  }, [leftReward,rightReward]);

  return(
    <div>
        <h1>イベントが作成されました。以下のURLを共有しましょう。</h1>
        <h1>URL：<a>http://localhost:3000/show/{id}</a></h1>
        <div className="parent">
          <span id="leftRewardId">　</span>
          <span id="rightRewardId">　</span>
          <span id="rewardId">　</span>
        </div>
    </div>
  )
  
}
export default EventUrlShow;