import React, { FC } from 'react'
import './App.scss'
import MapComponent from './Components/MapComponent/MapComponent'
import { CalciteShell, CalciteShellPanel } from '@esri/calcite-components-react'
import '@esri/calcite-components/dist/calcite/calcite.css'
import SidePanel from './Components/SidePanel/SidePanel'

const App: FC = () => {
    return (
        <CalciteShell>
            <CalciteShellPanel slot="panel-start" position="start" id="contents">
                <SidePanel />
            </CalciteShellPanel>
            <MapComponent />
        </CalciteShell>
    )
}

export default App
