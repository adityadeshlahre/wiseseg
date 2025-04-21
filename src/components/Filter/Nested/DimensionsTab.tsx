import { Checkbox } from '@mui/material'
import React from 'react'

interface Props {
  dimensionsList: { id: number; lable: string }[]
  selectedDimensionValue?: string
  setSelectedDimensionValue?: (value: string) => void
  handleSetNumberOfFiltersApplied?: (value: number) => void
  handleRemoveNumberOfFiltersApplied?: (value: number) => void
  handleResetNumberOfFiltersApplied?: () => void
  showOnlySelectDimensionFromDimensionList?: boolean
  setShowOnlySelectDimensionFromDimensionList?: (value: boolean) => void
}

const DimensionsTab: React.FC<Props> = ({
  dimensionsList,
  selectedDimensionValue,
  setSelectedDimensionValue,
  handleSetNumberOfFiltersApplied,
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  showOnlySelectDimensionFromDimensionList,
  setShowOnlySelectDimensionFromDimensionList,
}) => {
  return (
    <div className="text-black">
      {dimensionsList.map((dimension) => (
        <div
          key={dimension.id}
          className="flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-sm">{dimension.lable}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DimensionsTab
