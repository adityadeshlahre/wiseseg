import Search from '@/svgs/Search'
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  styled,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import React from 'react'
import SideView from '@/svgs/SideView'
import Delete from '@/svgs/Delete'
import Dropdown from '@/svgs/Dropdown'
import ToggleButtonWithSmoothTransition from '../Toggle/ToggleButton'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import {
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  handleSetNumberOfFiltersApplied,
  numberOfFiltersAppliedStore,
} from '@/store/store'
import { useStore } from '@tanstack/react-store'
import DimensionsTab from './DimensionsTab'
import TagsTab from './TagsTab'
import MetricsTab from './MetricsTab'
import { processTagListForFiltering } from '@/utils/lib'

interface Props {}

const SearchBarAddFilter: React.FC<Props> = () => {
  const { numberOfFiltersApplied } = useStore(numberOfFiltersAppliedStore)
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const DimensionsList: { id: number; lable: string }[] = [
    { id: 1, lable: 'Country' },
    { id: 2, lable: 'ad_network' },
    { id: 3, lable: 'os' },
    { id: 4, lable: 'campaign' },
    { id: 5, lable: 'ad_group' },
  ]

  const TagsList: { id: number; lable: string }[] = [
    { id: 1, lable: 'Character' },
    { id: 2, lable: 'Background' },
    { id: 3, lable: 'Elements' },
    { id: 4, lable: 'CTA Position' },
    { id: 5, lable: 'CTA Text' },
  ]

  const [selectedTagList, setSelectedTagList] = React.useState<
    {
      id: number
      lable: string
      tagListConditon?: { id: number; lable: string }
    }[]
  >([])

  const tagListCondition: { id: number; lable: string }[] = [
    { id: 1, lable: 'Contains' },
    { id: 2, lable: 'Does not contain' },
    { id: 3, lable: 'is' },
    { id: 4, lable: 'is not' },
  ]

  const [showOnlySelectTagFromTagList, setShowOnlySelectTagFromTagList] =
    React.useState<boolean>(false)

  const CharacterList: { id: number; lable: string }[] = [
    { id: 1, lable: 'Select all' },
    { id: 2, lable: 'Pumpkin' },
    { id: 3, lable: 'Cat' },
    { id: 4, lable: 'Ghost' },
    { id: 5, lable: 'Egg' },
  ]

  const metricsList: { id: number; lable: string }[] = [
    { id: 1, lable: 'IPM' },
    { id: 2, lable: 'CTR' },
    { id: 3, lable: 'SPEND' },
    { id: 4, lable: 'Clicks' },
    { id: 5, lable: 'CPM' },
  ]

  const [selectedMetricValue, setSelectedMetricValue] = React.useState<
    {
      id: number
      lable: string
      matricListCondition?: {
        id: number
        lable: string
      }
    }[]
  >([])

  const matricListCondition: { id: number; lable: string }[] = [
    { id: 1, lable: 'Less than' },
    { id: 2, lable: 'Greater than' },
    { id: 3, lable: 'Equals' },
  ]

  const [
    showOnlySelectMatricsFromMatricList,
    setShowOnlySelectMatricsFromMatricList,
  ] = React.useState<boolean>(false)

  return (
    <>
      {/* <div className="pt-2">
        <SearchBar />
      </div> */}
      <div className="text-black">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit" //check text color to black
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={'Dimensions'} />
          <Tab label={'Tags'} />
          <Tab label={'Metrics'} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          {/* <div className="text-black">
            {DimensionsList.map((dimension) => (
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
          </div> */}
          <DimensionsTab
            dimensionsList={DimensionsList}
            // handleRemoveNumberOfFiltersApplied={
            //   handleRemoveNumberOfFiltersApplied
            // }
            // handleResetNumberOfFiltersApplied={
            //   handleResetNumberOfFiltersApplied
            // }
            // handleSetNumberOfFiltersApplied={handleSetNumberOfFiltersApplied}
            // selectedDimensionValue={''}
            // setSelectedDimensionValue={() => {}}
            // showOnlySelectDimensionFromDimensionList={false}
            // setShowOnlySelectDimensionFromDimensionList={() => {}}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <div className="text-black">
            {TagsList.map((tag) => (
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
                {CharacterList.map((character) => (
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
                  }}
                >
                  Apply <KeyboardReturnIcon />
                </Button>
              </div>
            </div>
          )} */}
          <TagsTab
            characterList={processTagListForFiltering()}
            selectedTagList={selectedTagList}
            setSelectedTagList={setSelectedTagList}
            handleRemoveNumberOfFiltersApplied={
              handleRemoveNumberOfFiltersApplied
            }
            handleResetNumberOfFiltersApplied={
              handleResetNumberOfFiltersApplied
            }
            handleSetNumberOfFiltersApplied={handleSetNumberOfFiltersApplied}
            tagListCondition={tagListCondition}
            showOnlySelectTagFromTagList={showOnlySelectTagFromTagList}
            setShowOnlySelectTagFromTagList={setShowOnlySelectTagFromTagList}
            tagsList={TagsList}
            numberOfFiltersApplied={numberOfFiltersApplied}
            setNumberOfFiltersApplied={function (value: number): void {
              throw new Error('Function not implemented.')
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {/* <div className="text-black flex flex-col gap-2">
            <div>
              {metricsList.map((metric) => (
                <button
                  key={metric.id}
                  className="w-full flex items-center justify-between hover:bg-lime-100 text-gray-900 px-4 py-2 rounded-xl"
                  onClick={() => {
                    if (selectedMetricValue.includes(metric)) {
                      setSelectedMetricValue(
                        selectedMetricValue.filter(
                          (item) => item.id !== metric.id,
                        ),
                      )
                      handleRemoveNumberOfFiltersApplied()
                    } else {
                      setSelectedMetricValue([...selectedMetricValue, metric])
                      handleSetNumberOfFiltersApplied()
                    }
                    setShowOnlySelectMatricsFromMatricList(true)
                  }}
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
                {selectedMetricValue.map((item) => (
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
                            defaultValue={matricListCondition[0].id}
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
                    <div className="flex justify-center items-center p-2 rounded-xl text-sm gap-2">
                      <ToggleButtonWithSmoothTransition />
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
                    onClick={() => {
                      setShowOnlySelectMatricsFromMatricList(false)
                    }}
                  >
                    Apply <KeyboardReturnIcon />
                  </Button>
                </div>
              </div>
            )}
          </div> */}
          <MetricsTab
            metricsList={metricsList}
            selectedMetricValue={selectedMetricValue}
            setSelectedMetricValue={setSelectedMetricValue}
            handleRemoveNumberOfFiltersApplied={
              handleRemoveNumberOfFiltersApplied
            }
            handleResetNumberOfFiltersApplied={
              handleResetNumberOfFiltersApplied
            }
            handleSetNumberOfFiltersApplied={handleSetNumberOfFiltersApplied}
            matricListCondition={matricListCondition}
            showOnlySelectMatricsFromMatricList={
              showOnlySelectMatricsFromMatricList
            }
            setShowOnlySelectMatricsFromMatricList={
              setShowOnlySelectMatricsFromMatricList
            }
            numberOfFiltersApplied={numberOfFiltersApplied}
            setNumberOfFiltersApplied={function (value: number): void {
              throw new Error('Function not implemented.')
            }}
          />
        </CustomTabPanel>
      </div>
    </>
  )
}

export default SearchBarAddFilter

const SearchBar: React.FC = () => {
  return (
    <>
      <div>
        <SearchBarMUI>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchBarMUI>
      </div>
    </>
  )
}

// MUI extended

const SearchBarMUI = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  gap: '0.5rem',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '0.5rem',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
    border: '1px solid #E5E7EB',
  },
}))

// MUI extended

// MUI extended { TABS }

const CustomTabPanel = (
  props: Readonly<{ children?: React.ReactNode; value: number; index: number }>,
) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5, fontSize: '20px' }}>{children}</Box>
      )}
    </div>
  )
}

// MUI extended { TABS }
