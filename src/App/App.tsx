import React, { FC } from 'react'
import './App.css'
import MapComponent from './Components/MapComponent/MapComponent'
import { CalciteShell, CalciteShellPanel } from '@esri/calcite-components-react'
import '@esri/calcite-components/dist/calcite/calcite.css'
import SidePanel from './Components/SidePanel/SidePanel'
import SearchHere from './Components/SearchHere/SearchHere'
import useAppStore from './Store'

const App: FC = () => {

    const queryExtent = useAppStore(state => state.queryExtent)
    const currentMapExtent = useAppStore(state => state.currentMapExtent)

    return (
        <>
            <CalciteShell>
                <CalciteShellPanel slot="panel-start" position="start" id="contents">
                    <SidePanel />
                </CalciteShellPanel>
                <MapComponent />
            </CalciteShell>
            {
                !currentMapExtent?.equals(queryExtent) && currentMapExtent && queryExtent &&
                <SearchHere></SearchHere>
            }
        </>
    )
}

export default App
