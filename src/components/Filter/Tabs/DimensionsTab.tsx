import { Button, Checkbox } from '@mui/material'
import React from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'

interface Props {
  dimensionsList: { id: number; lable: string; key: string }[]
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
    <>
      <div className="text-black">
        {dimensionsList.map((dimension) => (
          <div
            key={dimension.id}
            className="flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 rounded-xl"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm">{dimension.lable}</span>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {dimensionsList && (
        <div>
          <div>
            <Button
              variant="contained"
              color="inherit"
              className="bg-gray-900 text-white rounded-xl mt-2 w-full"
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
              }}
              onClick={() => {}}
            >
              Apply <KeyboardReturnIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default DimensionsTab
