import React, { FC, useState } from 'react'
import './App.css'
import MapComponent from './Components/MapComponent/MapComponent'
import { CalciteShell, CalciteShellPanel } from '@esri/calcite-components-react'
import '@esri/calcite-components/dist/calcite/calcite.css'
import SidePanel from './Components/SidePanel/SidePanel'
import SearchHere from './Components/SearchHere/SearchHere'
import useAppStore from './Store'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'
import { Extent } from '@arcgis/core/geometry'

const App: FC = () => {

    const queryExtent = useAppStore(state => state.queryExtent)
    const currentMapExtent = useAppStore(state => state.currentMapExtent)
    const [placeResults, setPlaceResults] = useState<PlaceResult[]>([])

    return (
        <>
            <CalciteShell>
                <CalciteShellPanel slot="panel-start" position="start" id="contents">
                    <SidePanel placeResults={placeResults} />
                </CalciteShellPanel>
                <MapComponent onPlaceResults={setPlaceResults} placeResults={placeResults} />
            </CalciteShell>
            {
                !currentMapExtent?.equals(queryExtent) &&
                <SearchHere></SearchHere>
            }
        </>
    )
}

export default App
