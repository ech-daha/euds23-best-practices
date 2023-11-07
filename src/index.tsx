import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App'
import { setAssetPath } from '@esri/calcite-components/dist/components'
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets')

const root = createRoot(document.getElementById('root'))

root.render(<App></App>)

