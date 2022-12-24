import "./ImageItem.css"

export default function ImageItem(props) {

    const handlePreview = () => {

    }

    return (
        <div id={props.image.id} className="image-item" key={props.image.id}>
            <div className="wrapper" onClick={handlePreview}>
                <img src={props.image.dataSource} alt={props.image.name} />
                <div className="image-resolution">
                    {props.image.resolution} {props.image.name}
                </div>
            </div>
            <div className="button-container">
                <div className="button-share">
                    <div className="fb-share">
                        <a href={"https://www.facebook.com/sharer.php?u=" + window.location.href + "#" + props.image.id} target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </div>

                    <div className="tw-share">
                        <a href="/#">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </div>

                    <div className="pt-share">
                        <a href="/#">
                            <i className="fa fa-pinterest"></i>
                        </a>
                    </div>
                </div>
                <div className="button-download">
                    <a href={props.image.downloadSource} target="_blank" rel="noreferrer">
                        <i className="fa fa-download"></i> Download
                    </a>
                </div>
            </div>
        </div>
    );
}