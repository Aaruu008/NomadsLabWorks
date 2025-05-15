export default function Contacts(props) {//props are the properties passed to the component and are used to pass data from the parent component to the child component
    return(
        <article className="contacts">
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <div className="info-card">
                <img src="./images/phone-icon.png"
                    alt="phone icon"
                />"
                <p>{props.phone}</p>
            </div>
            <div className="info group"><img src="./images/mail-icon.png"
                    alt="mail icon"/>
                    <p>{props.emil}</p></div>
                
                </article>
    )
}