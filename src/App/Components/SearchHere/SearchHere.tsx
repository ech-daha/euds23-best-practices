import React, { FC } from 'react'
import './SearchHere.css'
import { CalciteFab } from '@esri/calcite-components-react'
import useAppStore from '../../Store'

const SearchHere: FC = (props) => {

    const currentMapExtent = useAppStore(state => state.currentMapExtent)
    const [queryExtent, setQueryExtent] = useAppStore(state => [state.queryExtent, state.setQueryExtent])

    return <div className='search-here'>
        <CalciteFab
            text='Search in this area'
            textEnabled={true}
            icon={null}
            onClick={() => setQueryExtent(currentMapExtent)}
        ></CalciteFab>
    </div>
}

export default SearchHere