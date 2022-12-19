function ImageItem(props) {
    return (
        <div className="image-item">
            <a href={props.tagImage.url} title={props.tagImage.title}>
                <img src={props.tagImage.thumbSource} alt={props.tagImage.title} />
                <div>
                    <span>{props.tagImage.name}</span>
                    <span>{props.tagImage.quantity}</span>
                </div>
            </a>
            
        </div>
    );
}

export default ImageItem;