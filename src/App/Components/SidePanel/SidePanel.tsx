import React, { FC } from 'react'
import { CalciteFlow, CalciteFlowItem, CalciteList, CalciteNotice, CalcitePanel } from '@esri/calcite-components-react'
import ResultList from './ResultList'
import useAppStore from '../../Store'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'

interface SidePanelProps {
    onSelect: (place: PlaceResult) => void
    selectedPlace: PlaceResult
}

const SidePanel: FC<SidePanelProps> = (props) => {

    const results = useAppStore(state => state.placeResults)

    return <div className='side-panel'>
        <CalcitePanel class="contents">
            <CalciteFlow id="flow">
                <CalciteFlowItem>
                    <CalciteList id="results">
                        {results.length === 0 &&
                            <CalciteNotice open>
                                <div slot="message">
                                    Click on the map to search for nearby places
                                </div>
                            </CalciteNotice>
                        }
                        {
                            results.length > 0 &&
                            <ResultList
                                onSelect={(value) => props.onSelect(value)}
                                selectedPlace={props.selectedPlace}
                            />
                        }
                    </CalciteList>
                </CalciteFlowItem>
            </CalciteFlow>
        </CalcitePanel>
    </div>
}

export default SidePanel