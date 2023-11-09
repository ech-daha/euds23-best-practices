import React, { FC } from 'react'
import { CalciteListItem } from '@esri/calcite-components-react'
import useAppStore from '../../Store'

const ResultList: FC = () => {

    const placeResults = useAppStore(state => state.placeResults)
    const [selectedPlace, setSelectedPlace] = useAppStore(state => [state.selectedPlace, state.setSelectedPlace])

    return <div>
        <div style={{ padding: '10px', fontSize: 15 }}>Results</div>
        {
            placeResults.map(place =>
                <CalciteListItem
                    key={place.placeId}
                    description={`${place.categories[0].label} - ${Number((place.distance / 1000).toFixed(1))} km`}
                    label={place.name}
                    selected={selectedPlace?.placeId === place.placeId}
                    onCalciteListItemSelect={() => setSelectedPlace(place)}
                ></CalciteListItem>
            )
        }
    </div>
}

export default ResultList