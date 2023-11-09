import React, { FC } from 'react'
import { CalciteFlow, CalciteFlowItem, CalciteList, CalciteNotice, CalcitePanel } from '@esri/calcite-components-react'
import ResultList from './ResultList'
import useAppStore from '../../Store'

const SidePanel: FC = () => {

    const placeResults = useAppStore(state => state.placeResults)

    return <div className='side-panel' style={{ margin: 5 }}>
        <CalcitePanel class="contents">
            <CalciteFlow id="flow">
                <CalciteFlowItem>
                    <CalciteList id="results" selectionAppearance='border' selectionMode='single-persist'>
                        {placeResults.length === 0 &&
                            <CalciteNotice open>
                                <div slot="message">
                                    Click on the map to search for nearby places
                                </div>
                            </CalciteNotice>
                        }
                        {
                            placeResults.length > 0 &&
                            <ResultList />
                        }
                    </CalciteList>
                </CalciteFlowItem>
            </CalciteFlow>
        </CalcitePanel>
    </div>
}

export default SidePanel