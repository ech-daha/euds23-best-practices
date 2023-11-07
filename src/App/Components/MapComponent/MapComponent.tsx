import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import './MapComponent.scss'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Circle from '@arcgis/core/geometry/Circle'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import PlacesQueryParameters from '@arcgis/core/rest/support/PlacesQueryParameters'
import WebStyleSymbol from '@arcgis/core/symbols/WebStyleSymbol'
import * as places from '@arcgis/core/rest/places'


const apiKey = 'AAPK6e2fadae5eb54b6babe8aa25a9a827dbuFUI9n0px060HG0j4Vl9XSufwdWHUv67T37TcRcEAaSM7fCJnNqyevDx_NrW5m5E'

const circleSymbol = {
    type: 'simple-fill',
    style: 'solid',
    color: [3, 140, 255, 0.1],
    outline: {
        width: 3,
        color: [3, 140, 255]
    }
}

// WebStyleSymbols for place features by category
const hospital = new WebStyleSymbol({
    name: 'hospital',
    styleName: 'Esri2DPointSymbolsStyle'
})
const retail = new WebStyleSymbol({
    name: 'shopping-center',
    styleName: 'Esri2DPointSymbolsStyle'
})
const landmark = new WebStyleSymbol({
    name: 'landmark',
    styleName: 'Esri2DPointSymbolsStyle'
})
const arts = new WebStyleSymbol({
    name: 'museum',
    styleName: 'Esri2DPointSymbolsStyle'
})
const business = new WebStyleSymbol({
    name: 'industrial-complex',
    styleName: 'Esri2DPointSymbolsStyle'
})
const community = new WebStyleSymbol({
    name: 'embassy',
    styleName: 'Esri2DPointSymbolsStyle'
})
const dining = new WebStyleSymbol({
    name: 'vineyard',
    styleName: 'Esri2DPointSymbolsStyle'
})
const sports = new WebStyleSymbol({
    name: 'sports-complex',
    styleName: 'Esri2DPointSymbolsStyle'
})
const travel = new WebStyleSymbol({
    name: 'trail',
    styleName: 'Esri2DPointSymbolsStyle'
})


const MapComponent: FC = () => {
    const mapRef = useRef()

    const placesLayer = new GraphicsLayer({
        id: 'graphicsLayer'
    })
    const bufferLayer = new GraphicsLayer({
        id: 'bufferLayer'
    })

    const [map, setMap] = useState(new Map({
        basemap: 'streets-navigation-vector',
        layers: [placesLayer, bufferLayer]
    }))

    const showPlaces = useCallback(async (clickPoint: Point) => {
        // Buffer graphic represents click location and search radius
        const circleGeometry = new Circle({
            center: clickPoint,
            geodesic: true,
            numberOfPoints: 100,
            radius: 500, // set radius to 500 meters
            radiusUnit: 'meters'
        })
        const circleGraphic = new Graphic({
            geometry: circleGeometry,
            symbol: circleSymbol
        })
        // Add buffer graphic to the view
        bufferLayer.graphics.add(circleGraphic)

        // Pass search area, categories, and API Key to places service
        const chicagoPlacesQueryParameters = new PlacesQueryParameters({
            apiKey: apiKey,
            categoryIds: ['10000'],
            radius: 500, // set radius to 500 meters
            point: clickPoint
        })
        // The results variable represents the PlacesQueryResult
        const results = await places.queryPlacesNearPoint(chicagoPlacesQueryParameters)
        console.log(results)
        // Pass the PlacesQueryResult to the tabulatePlaces() function
        // tabulatePlaces(results)
    }, [])


    // Build up view...
    useEffect(() => {
        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [8, 46.5],
            zoom: 7
        })

        view.on('click', (event) => {
            bufferLayer.removeAll() // Remove graphics from GraphicsLayer of previous buffer
            placesLayer.removeAll() // Remove graphics from GraphicsLayer of previous places search
            const clickPoint = new Point()
            clickPoint.longitude = Math.round(event.mapPoint.longitude * 1000) / 1000
            clickPoint.latitude = Math.round(event.mapPoint.latitude * 1000) / 1000
            clickPoint && showPlaces(clickPoint)
        })

        return () => view.container = null // ... and destroy when component unmounts
    }, [])

    return <div className='map' ref={mapRef}></div>
}

export default MapComponent