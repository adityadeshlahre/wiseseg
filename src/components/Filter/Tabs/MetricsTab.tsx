import Dropdown from '@/svgs/Dropdown'
import SideView from '@/svgs/SideView'
import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React from 'react'
import ToggleButtonWithSmoothTransition from '../Toggle/ToggleButton'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { filterReportsListBasedOnSelectedMetricAndConditions } from '@/utils/lib'
import { useStore } from '@tanstack/react-store'
import { dataStore } from '@/store/store'

interface Props {
  characterList: {
    ipm: { id: number; lable: string; key: string }[]
    ctr: { id: number; lable: string; key: string }[]
    spend: { id: number; lable: string; key: string }[]
    clicks: { id: number; lable: string; key: string }[]
    cpm: { id: number; lable: string; key: string }[]
  }
  metricsList: { id: number; lable: string; key: string }[]
  matricListCondition: { id: number; lable: string }[]
  numberOfFiltersApplied: number
  setNumberOfFiltersApplied: (value: number) => void
  selectedMetricValue: {
    id: number
    lable: string
    key: string
    matricListCondition?: {
      id: number
      lable: string
    }
  }[]
  setSelectedMetricValue: (value: any[]) => void
  handleSetNumberOfFiltersApplied: () => void
  handleRemoveNumberOfFiltersApplied: () => void
  handleResetNumberOfFiltersApplied: () => void
  showOnlySelectMatricsFromMatricList: boolean
  setShowOnlySelectMatricsFromMatricList: (value: boolean) => void
}

const MetricsTab: React.FC<Props> = ({
  characterList,
  metricsList,
  matricListCondition,
  selectedMetricValue,
  numberOfFiltersApplied,
  setSelectedMetricValue,
  handleSetNumberOfFiltersApplied,
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  showOnlySelectMatricsFromMatricList,
  setShowOnlySelectMatricsFromMatricList,
}) => {
  const { reportsList } = useStore(dataStore)
  const [activeDimensionKey, setActiveDimensionKey] = React.useState<string>('')
  const [selectedCharacters, setSelectedCharacters] = React.useState<number[]>(
    [],
  )

  const handleSelectMetricCondition = (
    metricId: number,
    conditionId: number,
  ) => {
    const updatedMetrics = selectedMetricValue.map((item) =>
      item.id === metricId
        ? {
            ...item,
            metricListCondition: matricListCondition.find(
              (c) => c.id === conditionId,
            ),
          }
        : item,
    )
    setSelectedMetricValue(updatedMetrics)
  }

  const handleSetMetricValue = (metricId: number, value: number) => {
    const updatedMetrics = selectedMetricValue.map((item) =>
      item.id === metricId ? { ...item, value } : item,
    )
    setSelectedMetricValue(updatedMetrics)
  }

  const handleRemoveMetric = (metricId: number) => {
    const updatedMetrics = selectedMetricValue.filter(
      (item) => item.id !== metricId,
    )
    setSelectedMetricValue(updatedMetrics)
    handleRemoveNumberOfFiltersApplied()
  }

  const handleMetricClick = (metric: {
    id: number
    lable: string
    key: string
  }) => {
    const isAlreadySelected = selectedMetricValue.some(
      (item) => item.id === metric.id,
    )
    if (isAlreadySelected) {
      setSelectedMetricValue(
        selectedMetricValue.filter((item) => item.id !== metric.id),
      )
      handleRemoveNumberOfFiltersApplied()
    } else {
      setSelectedMetricValue([...selectedMetricValue, metric])
      handleSetNumberOfFiltersApplied()
    }
    setActiveDimensionKey(metric.key)
    setShowOnlySelectMatricsFromMatricList(true)
  }

  return (
    <div className="text-black flex flex-col gap-2">
      <div>
        {metricsList.map((metric) => (
          <button
            key={`${metric.id}-metric`}
            className="w-full flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
            onClick={() => handleMetricClick(metric)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm">{metric.lable}</span>
            </div>
          </button>
        ))}
      </div>
      <hr />
      {showOnlySelectMatricsFromMatricList && (
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
            {selectedMetricValue.map((item, index) => (
              <>
                <div className="border-2 rounded-xl mb-2">
                  <div
                    key={item.id}
                    className="flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">Metrics</span>
                      <SideView />
                      <span className="text-xs">{item.lable}</span>
                      <Dropdown />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border-2 bg-white">
                      <button
                        onClick={() => {
                          if (numberOfFiltersApplied > 1) {
                            handleRemoveMetric(item.id)
                          } else {
                            handleResetNumberOfFiltersApplied()
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
                        defaultValue={matricListCondition[0].id}
                        value={
                          item.matricListCondition?.id ||
                          matricListCondition[0].id
                        }
                        onChange={(e) =>
                          handleSelectMetricCondition(
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
                        {matricListCondition.map((c) => (
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
                        handleSetMetricValue(item.id, Number(e.target.value))
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
                  {index < selectedMetricValue.length - 1 && (
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
                setShowOnlySelectMatricsFromMatricList(false)
                filterReportsListBasedOnSelectedMetricAndConditions(
                  selectedMetricValue,
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

export default MetricsTab
