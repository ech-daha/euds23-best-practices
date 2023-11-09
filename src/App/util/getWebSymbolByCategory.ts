import WebStyleSymbol from '@arcgis/core/symbols/WebStyleSymbol'

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


const getWebSymbolByCategory = (categoryId: number) => {
    if (Math.floor(categoryId / 1000) === 10)
        return arts
    if (Math.floor(categoryId / 1000) === 11)
        return business
    if (Math.floor(categoryId / 1000) === 12)
        return community
    if (Math.floor(categoryId / 1000) === 13)
        return dining
    if (Math.floor(categoryId / 1000) === 15)
        return hospital
    if (Math.floor(categoryId / 1000) === 16)
        return landmark
    if (Math.floor(categoryId / 1000) === 17)
        return retail
    if (Math.floor(categoryId / 1000) === 18)
        return sports
    if (Math.floor(categoryId / 1000) === 19)
        return travel
    else return arts
}

export default getWebSymbolByCategory