import React, { FC, useEffect, useRef, useState } from 'react'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import PlacesQueryParameters from '@arcgis/core/rest/support/PlacesQueryParameters'
import * as places from '@arcgis/core/rest/places'
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils'
import getWebSymbolByCategory from '../../util/getWebSymbolByCategory'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'
import { Extent } from '@arcgis/core/geometry'
import useAppStore from '../../Store'

const apiKey = 'AAPKab50a0839364493cbfe5c885e8fed915t8pSHX0PmBL2OPluDgiTVFsi4AZPI_AaXeAix3W744GNJVMlIJ_S6MyzkZ_cW6FA'

const MapComponent: FC = () => {

    // 0. Setting up Map and MapView
    const mapRef = useRef<HTMLDivElement>(null)

    const [map, setMap] = useState(new Map({
        basemap: 'streets-navigation-vector'
    }))

    const [mapView, setMapView] = useState<MapView>(null)

    useEffect(() => {
        const mv = new MapView({
            container: mapRef.current,
            map: map,
            center: [8.5, 47.4],
            zoom: 12
        })
        setMapView(mv)
        return () => mv.destroy()
    }, [])

    // 1 Add Places on Map on Clicking -----------------------------------------------------
    // 1.0 Setting up the variables
    // const [queryExtent, setQueryExtent] = useState<Extent>()
    const [queryExtent, setQueryExtent] = useAppStore(state => [state.queryExtent, state.setQueryExtent])
    // const [placeResults, setPlaceResults] = useState<PlaceResult[]>()
    const [placeResults, setPlaceResults] = useAppStore(state => [state.placeResults, state.setPlaceResults])
    const [placesLayer, setPlacesLayer] = useState(new GraphicsLayer({
        id: 'places-layer'
    }))

    // 1.1 Add onClick Listener
    useEffect(() => {
        if (!mapView) return
        map.add(placesLayer)
        const clickHandle = mapView.on('click', (event) => {
            mapView.goTo({ target: event.mapPoint, zoom: 15 })
                .then(() => {
                    setQueryExtent(mapView.extent)
                })
        })
        return () => clickHandle.remove()
    }, [mapView])

    // 1.2 Query when Extent Changes
    useEffect(() => {
        if (!queryExtent) return
        const radius = Math.min(queryExtent.height, queryExtent.width, 10000) // Make sure radius is <= 10km

        const placesQueryParameters = new PlacesQueryParameters({
            apiKey: apiKey,
            radius: Math.round(radius),
            point: queryExtent.center
        })
        places.queryPlacesNearPoint(placesQueryParameters)
            .then((res) => setPlaceResults(res.results))
    }, [queryExtent])

    // 1.3 Add places to the map
    useEffect(() => {
        if (!mapView || !mapView.map || !placesLayer) return
        placesLayer.removeAll()

        const graphics = placeResults.map((place) => {
            return new Graphic({
                geometry: place.location,
                attributes: {
                    placeId: place.placeId
                },
                symbol: getWebSymbolByCategory(place.categories[0].categoryId)
            })
        })
        placesLayer.graphics.addMany(graphics)
    }, [placeResults])

    // 2. Show Results in SidePanel
    // Put placeResults above to AppStore
    // const [placeResults, setPlaceResults] = useAppStore(state => [state.placeResults, state.setPlaceResults])

    // 3. Highlight feature when selected in SidePanel
    const selectedPlace = useAppStore(state => state.selectedPlace)
    const [highlightSelect, setHighlightSelect] = useState<__esri.Handle>(null)
    useEffect(() => {
        highlightSelect?.remove()
        setHighlightSelect(null)
        if (!selectedPlace) return
        mapView.whenLayerView(placesLayer).then((layerView) => {
            const graphic = placesLayer.graphics.toArray().find(gr => gr.getAttribute('placeId') === selectedPlace.placeId)
            const highlight = layerView.highlight(graphic)
            setHighlightSelect(highlight)
            mapView.goTo(graphic)
        })
    }, [selectedPlace])

    // 4. Watch Map Extent
    // 4.1 Put queryExtent to AppStore
    // const [queryExtent, setQueryExtent] = useAppStore(state => [state.queryExtent, state.setQueryExtent])
    // 4.2 Put currentExtent to AppStore
    const setCurrentMapExtent = useAppStore(state => state.setCurrentMapExtent)
    useEffect(() => {
        if (!mapView) return
        const watchHandle = reactiveUtils.watch(
            () => mapView.extent,
            extent => setCurrentMapExtent(extent)
        )
        return () => watchHandle.remove()
    }, [mapView])

    return <div className='map' ref={mapRef}></div>
}

export default MapComponent