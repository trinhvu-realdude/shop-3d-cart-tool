import "./CardItem.css"

function CardItem(props) {
    return (
        <div className="card-item">
            <a href={props.tag.category + props.tag.url + `/${props.tag.folderName}`} title={props.tag.title}>
                <img 
                    src={props.tag.thumbSource}
                    alt={props.tag.title} 
                    style={{
                        borderRadius: "10px",
                        width: "400px"
                    }}
                />
                
                <div className="card-title">
                    <span>{props.tag.name} </span>
                    <span 
                        className="quantity" 
                        style={{
                            fontWeight: "lighter",
                            color: "#999",
                            fontSize: "14px"
                        }}
                    >
                        <i className="fa fa-image"></i> {props.tag.quantity}
                    </span>
                </div>
            </a>
        </div>
    );
}

export default CardItem;