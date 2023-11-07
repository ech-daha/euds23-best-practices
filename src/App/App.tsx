import React, { FC, useState } from 'react'
import './App.css'
import MapComponent from './Components/MapComponent/MapComponent'
import { CalciteShell, CalciteShellPanel } from '@esri/calcite-components-react'
import '@esri/calcite-components/dist/calcite/calcite.css'
import SidePanel from './Components/SidePanel/SidePanel'
import SearchHere from './Components/SearchHere/SearchHere'
import useAppStore from './Store'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'

const App: FC = () => {

    const [queryExtent, setQueryExtent] = useAppStore(state => [state.queryExtent, state.setQueryExtent])
    const currentMapExtent = useAppStore(state => state.currentMapExtent)
    const [selectedPlace, setSelectedPlace] = useState<PlaceResult>(null)

    return (
        <>
            <CalciteShell>
                <CalciteShellPanel slot="panel-start" position="start" id="contents">
                    <SidePanel onSelect={setSelectedPlace} selectedPlace={selectedPlace} />
                </CalciteShellPanel>
                <MapComponent selectedPlace={selectedPlace} />
            </CalciteShell>
            {
                !currentMapExtent?.equals(queryExtent) &&
                <SearchHere onClicked={setQueryExtent}></SearchHere>
            }
        </>
    )
}

export default App
