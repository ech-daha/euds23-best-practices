import { create } from 'zustand'

interface Store {
    basemap: 'streets-navigation-vector' | 'topo-vector',
    toggleBasemap: () => void
}

const useStore = create<Store>((set) => ({
    basemap: 'topo-vector',
    toggleBasemap: () => set((state) => ({ basemap: state.basemap === 'topo-vector' ? 'streets-navigation-vector' : 'topo-vector' }))
}))

export default useStore