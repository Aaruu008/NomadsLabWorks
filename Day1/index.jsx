import { createRoot } from "react-dom/client"
import App from "./App.jsx"
const root= createRoot(document.getElementById("root"))

/**
 * Challenge:
 * 
 * - Add a `nav` > `ul` > `li` (x3). The 3 items should say:
 *   "Pricing", "About", and "Contact"
 *

function Header() {//className are defined in index.css file and are used to style the elements
    return (
        <header className="header">
            <img src="react-logo.png" width="40px" alt="React logo" />
            <nav><ul classNAme="nav-list"><li classNmae="nav-list-items">Pricing</li><li classNmae="nav-list-items">About</li><li classNmae="nav-list-items">Contact</li></ul>
                </nav>
        </header>
    )
}
function Footer(){// these are called functions and 
    return(
        <footer>
                <small>© 2024 Ziroll development. All rights reserved.</small>
            </footer>

    )
} 
function MainContent() {
    return(
        <main>
                <h1>Reason I am excited to learn React</h1>
                <ol>
                    <li>React is a popular library, so I will be able to fit in with all the coolest devs out there! 😎</li>
                    <li>I am more likely to get a job as a front end developer if I know React</li>
                </ol>
            </main>

    )
}
function Page() {
    return (
        <> // these are called fragments and they are used to group multiple elements without adding extra nodes to the DOM
            <Header />
            <MainContent />
            <Footer />
            
        </>
    )
}*/
/**
Challenge: Project setup

- Create an App component in a separate App.jsx file which is a sibling
  to this index.jsx file.
- Create a `components` folder
- Create the following components in separate files inside
  the components folder. In each one, just render an `h1` 
  with the name of the component (e.g. return <h1>Navbar goes here</h1>):
    - Navbar
    - Main
- Have App component import and render the Navbar and Main components
- Import and render the App component inside of index.jsx using ReactDOM
    - At this point you should have your "Navbar goes here" etc. showing up
      in the mini-browser.
- Go to Google fonts and get the "Inter" font with weights 400, 600, and 700.
  Put the `<links />` to those fonts ABOVE the style.css link in index.html.
  You may need to do some extra research to figure out how this 
  works if you haven't done it before.
*/


root.render(
    <App />)