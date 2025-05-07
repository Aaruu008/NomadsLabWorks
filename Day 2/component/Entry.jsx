export default function Entry(props){
    return(
        <article className="justarticle"><div className="main-image-continer"><img  className="main-image" src={props.img.src} alt={props.entry.img.alt}/></div>
        <div className="info-container">
            <img src="../images/marker.png" alt="marker"/>
            <span>{props.entry.country}</span>
            <a href={props.entry.googlemaplinks}>
            View on Google Maps</a>
            <h2>{props.entry.title}</h2>
            <p>{props.entry.date}</p>
            <p>{props.entry.text}</p>

        </div>
        </article>
    )
}