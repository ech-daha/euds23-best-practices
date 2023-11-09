import React, { FC } from 'react'
import { CalciteFlow, CalciteFlowItem, CalciteList, CalciteNotice, CalcitePanel } from '@esri/calcite-components-react'
import ResultList from './ResultList'
import useAppStore from '../../Store'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'

interface SidePanelProps {
    placeResults: PlaceResult[]
}

const SidePanel: FC<SidePanelProps> = (props) => {

    return <div className='side-panel' style={{ margin: 5 }}>
        <CalcitePanel class="contents">
            <CalciteFlow id="flow">
                <CalciteFlowItem>
                    <CalciteList id="results" selectionAppearance='border' selectionMode='single-persist'>
                        {props.placeResults.length === 0 &&
                            <CalciteNotice open>
                                <div slot="message">
                                    Click on the map to search for nearby places
                                </div>
                            </CalciteNotice>
                        }
                        {
                            props.placeResults.length > 0 &&
                            <ResultList placeResults={props.placeResults} />
                        }
                    </CalciteList>
                </CalciteFlowItem>
            </CalciteFlow>
        </CalcitePanel>
    </div>
}

export default SidePanel