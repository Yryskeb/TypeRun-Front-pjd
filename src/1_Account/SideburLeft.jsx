import "./SideburLeft.css"
import ArrowIcon from "/left_arrow_icon.svg"

const sidevarLeftHTML = (
    <section className="sidebar-left hide-left">
        <button className="left-slide-button"><span>PIECE of STAR</span><img className="left-slide-img"
            src={ArrowIcon} alt="slide" /></button>
        <ul className="left-ul">
            <li className="left-li rating"><a className="rating-a" id="left-a" href="#">Rating</a></li>
            <li className="left-li stat"><a className="stat-a" id="left-a" href="#">Stat</a></li>
            <li className="left-li advice"><a className="advice-a" id="left-a" href="#">Advice</a></li>
            <li className="left-li support"><a className="support-a" id="left-a" href="#">Support</a></li>
            <li className="left-li contact"><a className="contact-a" id="left-a" href="#">Contact</a></li>
            <li className="left-li hunter"><a className="hunter-a" id="left-a" href="#">Hunter</a></li>
        </ul>
        <div className="left-add-part">for add</div>
    </section>
)

export default function SideburLeft() {
    
    function hideLeftSidebar() {
        document.querySelector(".sidebar-left").classList.toggle("hide-left")
        document.querySelector(".left-slide-button").classList.toggle("hide-left-button")

        let slideImgLeft = document.querySelector(".left-slide-img");
        let images = ['/right_arrow_icon.svg', '/left_arrow_icon.svg'];
        let currentImageIndex = 0;
        currentImageIndex = (currentImageIndex + 1) % images.length;
        slideImgLeft.src = images[currentImageIndex];
    }

    return (
        <section className="sidebar-left hide-left">
            <button className="left-slide-button" onClick={hideLeftSidebar}><span>PIECE of STAR</span><img className="left-slide-img"
                src={ArrowIcon} alt="slide" /></button>
            <ul className="left-ul">
                <li className="left-li rating"><a className="rating-a" id="left-a" href="#">Rating</a></li>
                <li className="left-li stat"><a className="stat-a" id="left-a" href="#">Stat</a></li>
                <li className="left-li advice"><a className="advice-a" id="left-a" href="#">Advice</a></li>
                <li className="left-li support"><a className="support-a" id="left-a" href="#">Support</a></li>
                <li className="left-li contact"><a className="contact-a" id="left-a" href="#">Contact</a></li>
                <li className="left-li hunter"><a className="hunter-a" id="left-a" href="#">Hunter</a></li>
            </ul>
            <div className="left-add-part">for add</div>
        </section>
    )
}

