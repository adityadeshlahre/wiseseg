import Search from '@/svgs/Search'
import { alpha, Box, InputBase, styled, Tab, Tabs } from '@mui/material'
import React from 'react'
import {
  handleRemoveNumberOfFiltersApplied,
  handleResetNumberOfFiltersApplied,
  handleSetNumberOfFiltersApplied,
  handleUpdateNumberOfFiltersApplied,
  numberOfFiltersAppliedStore,
} from '@/store/store'
import { useStore } from '@tanstack/react-store'
import DimensionsTab from './Tabs/DimensionsTab'
import TagsTab from './Tabs/TagsTab'
import MetricsTab from './Tabs/MetricsTab'
import { processTagListForFiltering } from '@/utils/lib'

interface Props {}

const FilterTabControl: React.FC<Props> = () => {
  const { numberOfFiltersApplied } = useStore(numberOfFiltersAppliedStore)
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const DimensionsList: { id: number; lable: string; key: string }[] = [
    { id: 1, lable: 'Country', key: 'country' },
    { id: 2, lable: 'Ad Netwrok', key: 'ad_network' },
    { id: 3, lable: 'Opertation System', key: 'os' },
    { id: 4, lable: 'Campaign', key: 'campaign' },
    { id: 5, lable: 'Ad Group', key: 'ad_group' },
  ]

  const [selectedDimensionValue, setSelectedDimensionValue] = React.useState<
    {
      id: number
      lable: string
      key: string
    }[]
  >()

  const [
    showOnlySelectDimensionFromDimensionList,
    setShowOnlySelectDimensionFromDimensionList,
  ] = React.useState<boolean>(false)

  const TagsList: { id: number; lable: string; key: string }[] = [
    { id: 1, lable: 'Character', key: 'Concept' },
    { id: 2, lable: 'Background', key: 'Background' },
    { id: 3, lable: 'Elements', key: 'Objects' },
    { id: 4, lable: 'CTA Text', key: 'CTA_Text' },
    { id: 5, lable: 'CTA Position', key: 'CTA_Position' },
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

  const metricsList: { id: number; lable: string; key: string }[] = [
    { id: 1, lable: 'IPM', key: 'ipm' },
    { id: 2, lable: 'CTR', key: 'ctr' },
    { id: 3, lable: 'SPEND', key: 'spend' },
    { id: 4, lable: 'Clicks', key: 'clicks' },
    { id: 5, lable: 'CPM', key: 'cpm' },
  ]

  const [selectedMetricValue, setSelectedMetricValue] = React.useState<
    {
      id: number
      lable: string
      key: string
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
          <DimensionsTab
            dimensionsList={DimensionsList}
            numberOfFiltersApplied={numberOfFiltersApplied}
            selectedDimensionValue={[]}
            setNumberOfFiltersApplied={function (value: number): void {
              handleUpdateNumberOfFiltersApplied(value)
            }}
            // setSelectedDimensionValue={() => {}}
            handleRemoveNumberOfFiltersApplied={
              handleRemoveNumberOfFiltersApplied
            }
            handleResetNumberOfFiltersApplied={
              handleResetNumberOfFiltersApplied
            }
            handleSetNumberOfFiltersApplied={handleSetNumberOfFiltersApplied}
            showOnlySelectDimensionFromDimensionList={false}
            setShowOnlySelectDimensionFromDimensionList={function (
              value: boolean,
            ): void {
              setShowOnlySelectDimensionFromDimensionList(value)
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
            setShowOnlySelectTagFromTagList={function (value: boolean): void {
              setShowOnlySelectTagFromTagList(value)
            }}
            tagsList={TagsList}
            numberOfFiltersApplied={numberOfFiltersApplied}
            setNumberOfFiltersApplied={function (value: number): void {
              handleUpdateNumberOfFiltersApplied(value)
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
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
            setShowOnlySelectMatricsFromMatricList={function (
              value: boolean,
            ): void {
              setShowOnlySelectMatricsFromMatricList(value)
            }}
            numberOfFiltersApplied={numberOfFiltersApplied}
            setNumberOfFiltersApplied={function (value: number): void {
              handleUpdateNumberOfFiltersApplied(value)
            }}
          />
        </CustomTabPanel>
      </div>
    </>
  )
}

export default FilterTabControl

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
