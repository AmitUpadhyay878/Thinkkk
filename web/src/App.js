// import Routing from "./config/routing"

// const App = () => {
//     return (
//         <>
//             <Routing/>         
//         </>
//     )
// }

// export default App

import { useEffect } from 'react'
import Routing from './config/routing'
import i18n from './Local/i18n'

const App = () => {
    useEffect(() => {
        const ln = localStorage.getItem('language')
        if (ln) {
            i18n.changeLanguage(ln)
        } else {
            i18n.changeLanguage('en')
        }
    }, [])
    return (
        <>
            <Routing />
        </>
    )
}

export default App
