import { Extent } from '@arcgis/core/geometry'
import PlaceResult from '@arcgis/core/rest/support/PlaceResult'
import { create } from 'zustand'

interface AppStore {
    placeResults: PlaceResult[]
    setPlaceResults: (results: PlaceResult[]) => void
    currentMapExtent: Extent
    setCurrentMapExtent: (value: Extent) => void
    queryExtent: Extent
    setQueryExtent: (extent: Extent) => void
    selectedPlace: PlaceResult
    setSelectedPlace: (placeResult: PlaceResult) => void
}

const useAppStore = create<AppStore>((set, get) => ({
    placeResults: [],
    setPlaceResults: (results) => set(() => ({ placeResults: results })),
    currentMapExtent: null,
    setCurrentMapExtent: (value) => set(() => ({ currentMapExtent: value })),
    queryExtent: null,
    setQueryExtent: (extent) => set(() => ({ queryExtent: extent })),
    selectedPlace: null,
    setSelectedPlace: selectedPlace => set(() => ({ selectedPlace: selectedPlace }))
}))

export default useAppStore