import MainInput from "../2_GamePlay/MainInput.jsx"
import SideburLeft from "../1_Account/SideburLeft.jsx"
import PlayList from "../4_PlayList/PlayList.jsx"
import Frequency from "../5_FrequencyBar/Frequency.jsx"



export default function App() {

  return (
    <>
      <SideburLeft />

      <PlayList />

      <MainInput />

      <Frequency song="/src/audio/Advace.mp3"/>
    </>
  )
}


