import { useParams } from "react-router-dom";
import { useReward } from "react-rewards";
import { useEffect } from "react";
import '../App.css';

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
      <header>
          <p>TimeMerge</p>
      </header>
      <div className="parent">
          <div id="leftRewardId">　</div>
          <div id="rightRewardId">　</div>
          <div id="rewardId">　</div>
        </div>
        <section className="EventUrlSection">
          <h1>イベントが作成されました。以下のURLを共有しましょう。</h1>
          <h1>URL：<a>http://localhost:3000/#/show/{id}</a></h1>
          </section>
        
    </div>
  )
  
}
export default EventUrlShow;