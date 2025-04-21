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
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { Store, useStore } from '@tanstack/react-store'
import { dataStore } from '@/store/store'
import { filterReportsListBasedOnSelectedTags } from '@/utils/lib'

interface Props {
  tagsList: { id: number; lable: string }[]
  tagListCondition: { id: number; lable: string }[]
  characterList: { id: number; lable: string }[]
  numberOfFiltersApplied: number
  setNumberOfFiltersApplied: (value: number) => void
  selectedTagList: {
    id: number
    lable: string
    tagListConditon?: { id: number; lable: string }
  }[]
  setSelectedTagList: (value: any[]) => void
  handleSetNumberOfFiltersApplied: () => void
  handleRemoveNumberOfFiltersApplied: () => void
  handleResetNumberOfFiltersApplied: () => void
  showOnlySelectTagFromTagList: boolean
  setShowOnlySelectTagFromTagList: (value: boolean) => void
}

const TagsTab: React.FC<Props> = ({
  tagsList,
  tagListCondition,
  characterList,
  selectedTagList,
  numberOfFiltersApplied,
  setNumberOfFiltersApplied,
  setSelectedTagList,
  handleSetNumberOfFiltersApplied,
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  showOnlySelectTagFromTagList,
  setShowOnlySelectTagFromTagList,
}) => {
  return (
    <>
      <div className="text-black">
        {tagsList.map((tag) => (
          <button
            onClick={() => {
              if (selectedTagList.includes(tag)) {
                setSelectedTagList(
                  selectedTagList.filter((item) => item.id !== tag.id),
                )
                handleRemoveNumberOfFiltersApplied()
              } else {
                setSelectedTagList([...selectedTagList, tag])
                handleSetNumberOfFiltersApplied()
              }
              setShowOnlySelectTagFromTagList(true)
            }}
            key={tag.id}
            className="w-full flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
          >
            <div className="flex justify-center items-center space-x-2">
              <span className="text-sm">{tag.lable}</span>
            </div>
          </button>
        ))}
      </div>
      <hr />
      {showOnlySelectTagFromTagList && (
        <div className="text-black flex flex-col gap-2">
          <div>
            {characterList.map((character) => (
              <div
                key={character.id}
                className="flex items-center justify-between hover:bg-lime-100 text-neutral-900 px-4 rounded-xl"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">{character.lable}</span>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div>
            {selectedTagList.map((item) => (
              <div className="border-2 rounded-xl mb-2">
                <div
                  key={item.id}
                  className="flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Tag</span>
                    <SideView />
                    <span className="text-xs">{item.lable}</span>
                    <Dropdown />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border-2 bg-white">
                    <button
                      onClick={() => {
                        if (numberOfFiltersApplied > 1) {
                          handleRemoveNumberOfFiltersApplied()
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
                  key={item.id}
                  className="flex items-center justify-between text-gray-900 p-2 rounded-xl text-sm gap-2"
                >
                  <FormControl
                    size="small"
                    sx={{ minWidth: 150 }}
                    className="mr-2"
                  >
                    <Select
                      defaultValue={tagListCondition[0].id}
                      className="bg-white rounded-md hover:bg-gray-300"
                      sx={{
                        '& .MuiSelect-select': {
                          padding: '8px',
                          fontSize: '0.875rem',
                        },
                      }}
                    >
                      {tagListCondition.map((c) => (
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
                setShowOnlySelectTagFromTagList(false)
                filterReportsListBasedOnSelectedTags(selectedTagList)
              }}
            >
              Apply <KeyboardReturnIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default TagsTab
