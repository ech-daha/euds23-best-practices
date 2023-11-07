import React, { FC, useEffect, useRef, useState } from 'react'
import './MapComponent.css'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import PlacesQueryParameters from '@arcgis/core/rest/support/PlacesQueryParameters'
import * as places from '@arcgis/core/rest/places'
import useAppStore from '../../Store'
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils'
import getWebSymbolByCategory from './getWebSymbolByCategory'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'

const apiKey = 'AAPKab50a0839364493cbfe5c885e8fed915t8pSHX0PmBL2OPluDgiTVFsi4AZPI_AaXeAix3W744GNJVMlIJ_S6MyzkZ_cW6FA'

interface MapComponentProps {
    selectedPlace: PlaceResult
}

const MapComponent: FC<MapComponentProps> = (props) => {

    // Setting up Map and MapView
    const mapRef = useRef()

    const placesLayer = new GraphicsLayer({
        id: 'places-layer'
    })

    const [map, setMap] = useState(new Map({
        basemap: 'streets-navigation-vector',
        layers: [placesLayer]
    }))

    const [mapView, setMapView] = useState<MapView>(null)

    useEffect(() => {
        setMapView(new MapView({
            container: mapRef.current,
            map: map,
            center: [8.5, 47.4],
            zoom: 12
        }))
        return () => {
            mapView.destroy()
            map.destroy()
        }
    }, [])

    // Add onClick Listener
    const [queryExtent, setQueryExtent] = useAppStore(state => [state.queryExtent, state.setQueryExtent])
    const [results, setResults] = useAppStore(state => [state.placeResults, state.setPlaceResults])

    useEffect(() => {
        if (!queryExtent) return
        if (mapView.zoom < 15) mapView.goTo({ target: mapView.center, zoom: 15 })
        let radius = queryExtent.height
        if (queryExtent.width < radius) radius = queryExtent.width
        if (radius > 10000) radius = 10000

        const placesQueryParameters = new PlacesQueryParameters({
            apiKey: apiKey,
            radius: Math.round(radius),
            point: queryExtent.center,
            pageSize: 10
        })
        places.queryPlacesNearPoint(placesQueryParameters).then((res) => {
            setResults(res.results)
        })
    }, [queryExtent])

    useEffect(() => {
        if (!mapView) return
        mapView.on('click', (event) => {
            mapView.goTo({ target: event.mapPoint, zoom: 15 }).then(() => {
                setQueryExtent()
            })
        })
    }, [mapView])

    useEffect(() => {
        if (!mapView || !mapView.map) return
        const placesLayer = mapView.map.findLayerById('places-layer') as GraphicsLayer
        placesLayer.removeAll()

        results.forEach((place) => {
            const placeGraphic = new Graphic({
                geometry: place.location,
                attributes: {
                    placeId: place.placeId
                }
            })
            placeGraphic.symbol = getWebSymbolByCategory(place.categories[0].categoryId)
            placesLayer.graphics.add(placeGraphic)
        })
    }, [results])


    // Highlight feature when clicked
    const [highlightSelect, setHighlightSelect] = useState<__esri.Handle>(null)
    useEffect(() => {
        highlightSelect?.remove()
        setHighlightSelect(null)
        if (!props.selectedPlace) return
        const plLayer = mapView.map.findLayerById('places-layer') as GraphicsLayer
        mapView.whenLayerView(plLayer).then((layerView) => {
            const graphic = plLayer.graphics.toArray().find(gr => gr.getAttribute('placeId') === props.selectedPlace.placeId)
            const highlight = layerView.highlight(graphic)
            setHighlightSelect(highlight)
            mapView.goTo(graphic)
        })

    }, [props.selectedPlace])



    // Watch MapView property
    const [currentMapExtent, setCurrentMapExtent] = useAppStore(state => [state.currentMapExtent, state.setCurrentMapExtent])

    useEffect(() => {
        if (!mapView) return
        reactiveUtils.watch(
            () => mapView.extent,
            extent => setCurrentMapExtent(extent)
        )
    }, [mapView])




    return <div className='map' ref={mapRef}></div>
}

export default MapComponent