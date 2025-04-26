import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import SideView from '@/svgs/SideView'
import Dropdown from '@/svgs/Dropdown'

interface Props {
  dimensionsList: { id: number; lable: string; key: string }[]
  selectedDimensionValue: { id: number; lable: string; key: string }[]
  numberOfFiltersApplied: number
  setNumberOfFiltersApplied: (value: number) => void
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
  numberOfFiltersApplied,
  setNumberOfFiltersApplied,
  setSelectedDimensionValue,
  handleSetNumberOfFiltersApplied,
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  showOnlySelectDimensionFromDimensionList,
  setShowOnlySelectDimensionFromDimensionList,
}) => {
  return (
    <div className="text-black flex flex-col gap-2">
      <div>
        {dimensionsList.map((dimension) => (
          <button
            onClick={() => {}}
            key={dimension.id}
            className="w-full flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
          >
            <div className="flex justify-center items-center space-x-2">
              <span className="text-sm">{dimension.lable}</span>
            </div>
          </button>
        ))}
      </div>
      <hr />
      {showOnlySelectDimensionFromDimensionList && (
        <div>
          {selectedDimensionValue?.map((item) => (
            <>
              <div className="border-2 rounded-xl mb-2">
                <div
                  key={item.id}
                  className="flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Dimension</span>
                    <SideView />
                    <span className="text-xs">{item.lable}</span>
                    <Dropdown />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border-2 bg-white">
                    <button
                      onClick={() => {
                        // if (numberOfFiltersApplied > 1) {
                        //   handleRemoveMetric(item.id)
                        // } else {
                        //   handleResetNumberOfFiltersApplied()
                        // }
                      }}
                      className="text-gray-600 hover:text-red-600 transition-colors mb-2 mx-1"
                    >
                      <DeleteSweepOutlinedIcon fontSize="medium" />
                    </button>
                  </div>
                </div>
                <div
                  key={`${item.id}-condition`}
                  className="flex items-center justify-between text-gray-900 p-2 rounded-xl text-sm gap-2"
                >
                  <FormControl
                    size="small"
                    sx={{ minWidth: 150 }}
                    className="mr-2"
                  >
                    <Select
                      defaultValue={dimensionsList[0].id}
                      value={item?.id || ''}
                      onChange={(e) =>
                        // handleSelectMetricCondition(
                        //   item.id,
                        //   Number(e.target.value),
                        // )
                        console.log(e.target.value)
                      }
                      className="bg-white rounded-md hover:bg-gray-300"
                      sx={{
                        '& .MuiSelect-select': {
                          padding: '8px',
                          fontSize: '0.875rem',
                        },
                      }}
                    >
                      {/* {matricListCondition.map((c) => (
                        <MenuItem
                          key={c.id}
                          value={c.id}
                          className="text-sm text-gray-900 hover:bg-gray-300"
                        >
                          {c.lable}
                        </MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>
                  <TextField
                    size="small"
                    placeholder="Value"
                    variant="outlined"
                    onChange={(e) =>
                      // handleSetMetricValue(item.id, Number(e.target.value))
                      console.log(e.target.value)
                    }
                    className="rounded-md hover:border-lime-200 transition-colors"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '0.375rem',
                        '&:hover fieldset': {
                          borderColor: '#bef264',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </>
          ))}
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
    </div>
  )
}

export default DimensionsTab
