import Search from '@/svgs/Search'
import {
  alpha,
  Box,
  Button,
  Checkbox,
  InputBase,
  MenuItem,
  styled,
  Tab,
  Tabs,
} from '@mui/material'
import React from 'react'

interface Props {}

const SearchBarAddFilter: React.FC<Props> = () => {
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
    { id: number; lable: string }[]
  >([])
  const [showSelectValueList, setShowSelectValueList] = React.useState(false)

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

  return (
    <>
      <div className="pt-2">
        <SearchBar />
      </div>
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
      </div>
      <CustomTabPanel value={value} index={0}>
        <div className="text-black">
          {DimensionsList.map((dimension) => (
            <div
              key={dimension.id}
              className="flex items-center justify-between hover:bg-lime-100 text-gray-800 px-4 rounded-xl"
            >
              <div className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm">{dimension.lable}</span>
              </div>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="text-black">
          {TagsList.map((tag) => (
            <button
              onClick={() => {
                if (selectedTagList.includes(tag)) {
                  setSelectedTagList(
                    selectedTagList.filter((item) => item.id !== tag.id),
                  )
                } else {
                  setSelectedTagList([...selectedTagList, tag])
                }
                setShowSelectValueList(!showSelectValueList)
              }}
              key={tag.id}
              className="w-full flex items-center justify-between hover:bg-lime-100 text-gray-800 px-4 rounded-xl"
            >
              <div className="flex justify-center items-center space-x-2">
                <MenuItem>
                  <span className="text-sm text-center">{tag.lable}</span>
                </MenuItem>
              </div>
            </button>
          ))}
        </div>
        {showSelectValueList && (
          <div className="text-black">
            {CharacterList.map((character) => (
              <div
                key={character.id}
                className="flex items-center justify-between hover:bg-lime-100 text-gray-800 px-4 rounded-xl"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">{character.lable}</span>
                </div>
              </div>
            ))}
            <Button
              variant="contained"
              color="inherit"
              className="bg-gray-900 text-white rounded-xl mt-2 w-full"
              onClick={() => {
                setShowSelectValueList(false)
              }}
            >
              Apply
            </Button>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="text-black">Metrics</div>
      </CustomTabPanel>
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
