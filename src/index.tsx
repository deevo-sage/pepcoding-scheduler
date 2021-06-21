import * as React from "react"
import { render } from 'react-dom'
import App from "./app"
const Index = () => {
    return <React.StrictMode>
        <App />
    </React.StrictMode>
}
render(<Index />, document.getElementById('root'))