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
import { dataStore } from '@/store/store'
import { useStore } from '@tanstack/react-store'
import ToggleButtonWithSmoothTransition from '../Toggle/ToggleButton'
import { filterReportsListBasedOnSelectedDimensionAndConditions } from '@/utils/lib'

interface Props {
  characterList: {
    country: { id: number; lable: string; key: string }[]
    ad_network: { id: number; lable: string; key: string }[]
    os: { id: number; lable: string; key: string }[]
    campaign: { id: number; lable: string; key: string }[]
    ad_group: { id: number; lable: string; key: string }[]
  }
  dimensionsList: { id: number; lable: string; key: string }[]
  dimensionsListCondition: { id: number; lable: string }[]
  selectedDimensionList: { id: number; lable: string; key: string }[]
  numberOfFiltersApplied: number
  setNumberOfFiltersApplied: (value: number) => void
  setSelectedDimensionList: (
    value: { id: number; lable: string; key: string }[],
  ) => void
  handleSetNumberOfFiltersApplied: () => void
  handleRemoveNumberOfFiltersApplied: () => void
  handleResetNumberOfFiltersApplied: () => void
  showOnlySelectDimensionFromDimensionList?: boolean
  setShowOnlySelectDimensionFromDimensionList: (value: boolean) => void
}

const DimensionsTab: React.FC<Props> = ({
  characterList,
  dimensionsList,
  dimensionsListCondition,
  selectedDimensionList,
  numberOfFiltersApplied,
  setNumberOfFiltersApplied,
  setSelectedDimensionList,
  handleSetNumberOfFiltersApplied,
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  showOnlySelectDimensionFromDimensionList,
  setShowOnlySelectDimensionFromDimensionList,
}) => {
  const { reportsList } = useStore(dataStore)
  const [activeDimensionKey, setActiveDimensionKey] = React.useState<string>('')
  const [selectedCharacters, setSelectedCharacters] = React.useState<number[]>(
    [],
  )

  const handleSelectDimensionCondition = (
    dimensionId: number,
    conditionId: number,
  ) => {
    const updatedDimensions = selectedDimensionList?.map((item) =>
      item.id === dimensionId
        ? {
            ...item,
            dimensionListCondition: dimensionsListCondition.find(
              (c) => c.id === conditionId,
            ),
          }
        : item,
    )
    setSelectedDimensionList(updatedDimensions)
  }

  const handleSetDimensionValue = (dimensionId: number, value: number) => {
    const updatedDimensions = selectedDimensionList?.map((item) =>
      item.id === dimensionId ? { ...item, value } : item,
    )
    setSelectedDimensionList(updatedDimensions)
  }

  const handleRemoveDimension = (dimensionId: number) => {
    const updatedDimensions = selectedDimensionList.filter(
      (item) => item.id !== dimensionId,
    )
    setSelectedDimensionList(updatedDimensions)
    handleRemoveNumberOfFiltersApplied()
  }

  const handleDimensionClick = (dimension: {
    id: number
    lable: string
    key: string
  }) => {
    const isAlreadySelected = selectedDimensionList.some(
      (item) => item.id === dimension.id,
    )

    if (isAlreadySelected) {
      setSelectedDimensionList(
        selectedDimensionList.filter((item) => item.id !== dimension.id),
      )
      handleRemoveNumberOfFiltersApplied()
    } else {
      setSelectedDimensionList([...selectedDimensionList, dimension])
      handleSetNumberOfFiltersApplied()
    }
    setActiveDimensionKey(dimension.key)
    setShowOnlySelectDimensionFromDimensionList(true)
  }

  return (
    <div className="text-black flex flex-col gap-2">
      <div>
        {dimensionsList.map((dimension) => (
          <button
            onClick={() => {
              handleDimensionClick(dimension)
            }}
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
          {activeDimensionKey && (
            <div className="border-2 rounded-xl mb-2">
              <div>
                {characterList[
                  activeDimensionKey as keyof typeof characterList
                ]?.map((character) => (
                  <div
                    key={character.id}
                    className="flex items-center justify-between hover:bg-lime-100 text-neutral-900 px-4 rounded-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCharacters.includes(character.id)}
                        onChange={() => {
                          if (selectedCharacters.includes(character.id)) {
                            setSelectedCharacters(
                              selectedCharacters.filter(
                                (id) => id !== character.id,
                              ),
                            )
                          } else {
                            setSelectedCharacters([
                              ...selectedCharacters,
                              character.id,
                            ])
                          }
                        }}
                      />
                      <span className="text-sm">{character.lable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            {selectedDimensionList?.map((item, index) => (
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
                          if (numberOfFiltersApplied > 1) {
                            handleRemoveDimension(item.id)
                            setSelectedDimensionList(
                              selectedDimensionList.filter(
                                (dimension) => dimension.id !== item.id,
                              ),
                            )
                            handleRemoveNumberOfFiltersApplied()
                          } else {
                            handleResetNumberOfFiltersApplied()
                            setSelectedDimensionList([])
                          }
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
                        defaultValue={dimensionsListCondition[0].id}
                        value={item.id || dimensionsListCondition[0].id}
                        onChange={(e) =>
                          handleSelectDimensionCondition(
                            item.id,
                            Number(e.target.value),
                          )
                        }
                        className="bg-white rounded-md hover:bg-gray-300"
                        sx={{
                          '& .MuiSelect-select': {
                            padding: '8px',
                            fontSize: '0.875rem',
                          },
                        }}
                      >
                        {dimensionsListCondition.map((c) => (
                          <MenuItem
                            key={c.id}
                            value={c.id}
                            className="text-sm text-gray-900 hover:bg-gray-300"
                          >
                            {c.lable}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      size="small"
                      placeholder="Value"
                      variant="outlined"
                      onChange={(e) =>
                        handleSetDimensionValue(item.id, Number(e.target.value))
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
                <div>
                  {index < selectedDimensionList.length - 1 && (
                    <ToggleButtonWithSmoothTransition />
                  )}
                </div>
              </>
            ))}
          </div>
          <div>
            <Button
              variant="contained"
              color="inherit"
              className="bg-gray-900 text-white rounded-xl mt-2 w-full"
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
              }}
              onClick={() => {
                setShowOnlySelectDimensionFromDimensionList(false)
                filterReportsListBasedOnSelectedDimensionAndConditions(
                  selectedDimensionList,
                  reportsList,
                )
              }}
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
