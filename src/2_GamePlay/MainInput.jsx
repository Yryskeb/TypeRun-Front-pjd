import "./MainInput.css"

export default function MainInput() {

    return (
        <div className="main-part-input">
            <div className="main-text-part"></div>

            <section className="section-main-input">
                <div className="back-input">SELECT SONG FROM PLAYLIST!</div>

                <input type="text" className="main-input" name="main-input" autoComplete="off" spellCheck="false" />
            </section>

            <button className="start-button">START</button>
        </div>
    )
}