import CardItem from "../CardItem/CardItem";
import "./CardList.css"

export default function CardList(props) {

    return (
        <div className="collection">
            {
                props.list && props.list.length > 0
                ? props.list.map((tagImage, index) => (
                    <CardItem
                        key={index} 
                        tagImage={tagImage}
                    />
                ))
                : null
            }
        </div>
    );
}