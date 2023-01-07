export default function AboutUs() {

    document.title = "About WallpaperParadise";

    return (
        <div className="content-container">
            <div className="content-title">
                <h1 className="heading">About WallpaperParadise</h1>
            </div>
            <div className="about-us">
                <div>
                    <img src="https://wallpaperaccess.com/wallp.jpg" alt="" />
                </div>
                <div>
                    <h2>Created by and for people who LOVE WALLPAPERS.</h2>
                    <p>
                        We offer thousands of <strong>high quality, bright and beautiful wallpapers.</strong> Whatever theme or topic you are into, we have a wallpaper for you. You can easily navigate through our categories (<a href="/cat/holidays" style={{textDecoration: "none", color: "#4183c4"}}>holidays</a>, <a href="/cat/nature" style={{textDecoration: "none", color: "#4183c4"}}>nature</a>, <a href="/cat/music" style={{textDecoration: "none", color: "#4183c4"}}>music</a>, <a href="/cat/abstract" style={{textDecoration: "none", color: "#4183c4"}}>abstract</a>…) to find the perfect image to customize your device or you can directly search for it.
                        <br />
                        <br />
                        A wallpaper will make your computer or phone more personal, more like you. Custom wallpapers reinforce empathy with the device and reflect your personality, taste and what makes you feel good.
                        <br />
                        <br />
                        If you are thinking of changing your wallpaper, if you are bored with your old wallpaper or your PC and would like to give it to personal touch, at Wallpaperacces we show you our best wallpapers with amazing and original designs that will surely accompany you.
                        <br />
                        <br />
                        Please, feel free to <strong>suggest new wallpapers</strong> for our collection and we will happily add them. We value and welcome any suggestion and contribution, just <a href="/contact" style={{textDecoration: "none", color: "#4183c4"}}>contact us</a>!.
                    </p>
                </div>
            </div>
        </div>
    );
}