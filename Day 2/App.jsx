import Header from "./components/Header"
import Entry from "./components/Entry"
import Contacts from "./contacts"
import data from "./data"
export default function App() {
    const entryelements= data.map(entry =>{
        returb(
            <Entry 
            /*img={entry.img}
            title={entry.title}
            coutnry={entry.country}
            date={entry.date}
            googleMapsLink={entry.googleMapsLink}
            text={entry.text}*/
            //instead what we can do is to use the spread operator to pass all the properties of the object as props to the component
            key={entry.id}
            entry={entry}//and where we have write props we can add one more element called entry and we can use it to access the properties of the object
            />



            )
    })
    return (
       <> <Header />
        {/*<Entry img={{ 
                        src: "https://scrimba.com/links/travel-journal-japan-image-url",
                        alt: "Mount Fuji" 
                    }}
                country="Japan"
                Title="MountFuji"
                googleMapsLink="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu"
                date="12 Jan, 2021 - 24 Jan, 2021"
                text="Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists."

        />
       
       <Contacts img="./images/mr-whiskerson.png"
                name="Mr. Whiskerson"
                phone="(212) 555-1234"
                email="mr.whiskaz@catnap.meow" />
        
        <Contacts img="./images/fluffykins.png"
                name="Fluffykins"
                phone="(212) 555-2345"
                email="fluff@me.com"
            />
        <Contact
                img="./images/felix.png"
                name="Felix"
                phone="(212) 555-4567"
                email="thecat@hotmail.com"
            />
            <Contact 
                img="./images/pumpkin.png"
                name="Pumpkin"
                phone="(0800) CAT KING"
                email="pumpkin@scrimba.com"
            />*/}
             {entryelements} /// this is the map function that will return the array of elements
       

        </>
    )
        
}