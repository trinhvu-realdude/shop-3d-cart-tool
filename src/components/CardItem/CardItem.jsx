import "./CardItem.css"

function CardItem(props) {
    return (
        <div className="card-item">
            <a href={props.tagImage.category + props.tagImage.url + `/${props.tagImage.folderName}`} title={props.tagImage.title}>
                <img 
                    src={props.tagImage.thumbSource}
                    alt={props.tagImage.title} 
                    style={{
                        borderRadius: "10px",
                        width: "400px"
                    }}
                />
                
                <div className="card-title">
                    <span>{props.tagImage.name} </span>
                    <span 
                        className="quantity" 
                        style={{
                            fontWeight: "lighter",
                            color: "#999",
                            fontSize: "14px"
                        }}
                    >
                        <i className="fa fa-image"></i> {props.tagImage.quantity}
                    </span>
                </div>
            </a>
        </div>
    );
}

export default CardItem;