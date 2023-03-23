import './index.css'

import ReactDOM from 'react-dom/client'

import { AppContainer } from './components/AppContainer'

const mainRoot = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

mainRoot.render(<AppContainer />)
