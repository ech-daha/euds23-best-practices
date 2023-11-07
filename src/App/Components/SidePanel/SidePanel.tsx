import React, { FC, useState } from 'react'
import './SidePanel.scss'
import { CalciteCombobox, CalciteComboboxItem, CalciteFlow, CalciteFlowItem, CalciteList, CalciteNotice, CalcitePanel } from '@esri/calcite-components-react'

const categories = [
    { value: '10000', label: 'Arts and Entertainment' },
    { value: '11000', label: 'Business and Professional Services' },
    { value: '12000', label: 'Community and Government' },
    { value: '13000', label: 'Dining and Drinking' },
    { value: '15000', label: 'Health and Medicine' },
    { value: '16000', label: 'Landmarks and Outdoors' },
    { value: '17000', label: 'Retail' },
    { value: '18000', label: 'Sports and Recreation' },
    { value: '19000', label: 'Travel and Transportation' },
]

const SidePanel: FC = () => {

    const [selectedValue, setSelectedValue] = useState<string>(categories[0].value)

    return <div className='side-panel'>
        <CalciteCombobox
            label='Label'
            id="categorySelect"
            placeholder="Filter by category"
            overlayPositioning="fixed"
            selectionMode="single"
        >
            {
                categories.map(category =>
                    <CalciteComboboxItem
                        key={category.value}
                        selected={category.value === selectedValue}
                        value={category.value}
                        textLabel={category.label}
                        onCalciteComboboxItemChange={(val) => setSelectedValue(val.target.value)}
                    ></CalciteComboboxItem>
                )
            }
        </CalciteCombobox>
        <CalcitePanel class="contents">
            <CalciteFlow id="flow">
                <CalciteFlowItem>
                    <CalciteList id="results">
                        <CalciteNotice open>
                            <div slot="message">
                                Click on the map to search for nearby places
                            </div>
                        </CalciteNotice>
                    </CalciteList>
                </CalciteFlowItem>
            </CalciteFlow>
        </CalcitePanel>
    </div>
}

export default SidePanel