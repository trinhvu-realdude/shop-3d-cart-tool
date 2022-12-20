export default function ContentTitle(props) {

    const title = props.title + " Wallpapers";

    document.title = title + " - Awesome Free HD Wallpapers Paradise";

    return (
        <div className="content-title">
            <h1 className="heading">
                {
                    props.title != null 
                    ? title
                    : "Access to Thousands of Wallpaper"
                }
            </h1>
            <p className="description">Only the best wallpapers. Daily additions of new, awesome, HD wallpapers for desktop and phones.</p>
        </div>
    );
}