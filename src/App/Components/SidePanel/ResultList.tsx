import React, { FC, useEffect } from 'react'
import { CalciteListItem } from '@esri/calcite-components-react'
import useAppStore from '../../Store'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'

interface ResultListProps {
    onSelect: (place: PlaceResult) => void
    selectedPlace: PlaceResult
}

const ResultList: FC<ResultListProps> = (props) => {

    const places = useAppStore(state => state.placeResults)

    useEffect(() => console.log(props.selectedPlace), [props.selectedPlace])
    useEffect(() => console.log(places), [places])

    return <div>
        <div style={{ padding: '10px', fontSize: 15 }}>Results</div>
        {
            places.map(place =>
                <CalciteListItem
                    key={place.placeId}
                    description={`${place.categories[0].label} - ${Number((place.distance / 1000).toFixed(1))} km`}
                    label={place.name}
                    selected={props.selectedPlace?.placeId === place.placeId}
                    onCalciteListItemSelect={() => props.onSelect(place)}
                ></CalciteListItem>
            )
        }
    </div>
}

export default ResultList