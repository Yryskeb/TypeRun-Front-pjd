import GamePlayAnimation from "../6_AnimationPlay/Animation.jsx"
import SideburLeft from "../1_Account/SideburLeft.jsx"
import PlayList from "../4_PlayList/PlayList.jsx"
import Frequency from "../5_FrequencyBar/Frequency.jsx"



export default function App() {

  return (
    <>
      <SideburLeft />

      <PlayList />

      <GamePlayAnimation />

      <Frequency song="/src/audio/Advace.mp3"/>
    </>
  )
}


