import React from 'react'
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material'

const ToggleContainer = styled('div')`
  background-color: #d1d5db; /* gray-400 */
  border-radius: 8px; /* Rounded container */
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 2px;
  position: relative;
  width: 100px; /* Adjust the width as per your requirement */
  height: 40px; /* Adjust the height as per your requirement */
`

const AnimatedToggleButtonGroup = styled(ToggleButtonGroup)`
  position: relative;
  width: 100%;
  height: 100%;
`

const CustomToggleButton = styled(ToggleButton)`
  background-color: #e5e7eb; /* gray-200 */
  border-radius: 0px;
  width: 50%; /* To split the width of the container into two buttons */
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  &.Mui-selected {
    background-color: white;
    color: black;
    transform: scale(1.05); /* Slight scale on the active button */
  }
  &:not(.Mui-selected):hover {
    background-color: #e5e7eb; /* Light gray on hover */
  }
  height: 100%;
`

const ToggleButtonWithSmoothTransition = () => {
  const [alignment, setAlignment] = React.useState('AND')

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleContainer>
      <AnimatedToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <CustomToggleButton value="web">AND</CustomToggleButton>
        <CustomToggleButton value="android">OR</CustomToggleButton>
      </AnimatedToggleButtonGroup>
    </ToggleContainer>
  )
}

export default ToggleButtonWithSmoothTransition
