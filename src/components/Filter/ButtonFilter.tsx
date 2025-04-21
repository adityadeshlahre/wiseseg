import Dropdown from '@/svgs/Dropdown'
import FilterIcon from '@/svgs/Filter'
import React from 'react'

interface FilterButtonProps {
  showAddFilter: boolean
  setShowAddFilter: (showAddFilter: boolean) => void
  numberOfFiltersApplied?: number
}

const ButtonFilter: React.FC<FilterButtonProps> = ({
  setShowAddFilter,
  showAddFilter,
  numberOfFiltersApplied,
}) => {
  return (
    <button
      onClick={() => {
        setShowAddFilter(!showAddFilter)
      }}
      className="flex items-center px-4 py-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="mr-2">
        <FilterIcon />
      </div>
      <div className="text-sm font-semibold text-gray-700 mr-2">Filters</div>
      {numberOfFiltersApplied !== undefined && numberOfFiltersApplied > 0 && (
        <div className="bg-lime-200 text-xs font-bold text-gray-800 px-2 py-1 rounded-md mr-2">
          {String(numberOfFiltersApplied).padStart(1, '0')}
        </div>
      )}
      <div>
        <Dropdown />
      </div>
    </button>
  )
}

export default ButtonFilter
