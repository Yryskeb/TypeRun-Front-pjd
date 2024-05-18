
import "./PlayList.css"
import SettingsIcon from "/settings_icon.svg"
import ArrowIcon from "/folder_arrow_up_icon.svg"
import AudioPlay from "../3_AudioPlay/AudioPlay.jsx"
import audio from "../audio/Advace.mp3"


export default function PlayList() {

    function HideRightSidebur() {
        document.querySelector(".right-slide-button").classList.toggle("hide-right-button")
        document.querySelector(".sidebar-right").classList.toggle("hide-right")
        
    }

    return (
        <section className="sidebar-right hide-right">
            <button className="right-slide-button" onClick={HideRightSidebur}>
                <img className="right-slide-img" src={SettingsIcon} alt="slide" />
                <span>PLAY LIST</span>
            </button>

            <ul className="right-ul">
                <button className="add-new-song">
                    <img className="arrow-up-icon" src={ArrowIcon} alt="folder" />
                </button>

                <form className="add-new-song-form hide-song-form" action="audio-player.js" method="post">
                    <label htmlFor="song-name" className="song-name">Song Name</label>
                    <input className="new-song-name" type="text" name="song-name" required />
                    <label htmlFor="song">Upload Song</label>
                    <input className="new-song" type="file" name="song" accept="audio/*" required />
                    <button className="add-new-song-button" type="submit">Add</button>
                </form>

                <AudioPlay song="/src/audio/Advace.mp3"/>
                
            </ul>

            <div className="right-add-part">for add</div>
        </section>
    );
}

