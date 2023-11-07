import React, { FC } from 'react'
import './SearchHere.css'
import { CalciteFab } from '@esri/calcite-components-react'

interface SearchHereProps {
    onClicked: () => void
}

const SearchHere: FC<SearchHereProps> = (props) => {

    return <div className='search-here'>
        <CalciteFab
            text='Search in this area'
            label='Search in this area'
            textEnabled={true}
            icon={null}
            onClick={props.onClicked}
        ></CalciteFab>
    </div>
}

export default SearchHere