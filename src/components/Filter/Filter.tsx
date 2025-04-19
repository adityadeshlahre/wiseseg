import Dropdown from '@/svgs/Dropdown'
import FilterIcon from '@/svgs/Filter'
import React from 'react'

interface Props {
  showFilter: boolean
  numberOfFiltersApplied?: number
}

const Filter: React.FC<Props> = ({ showFilter, numberOfFiltersApplied }) => {
  return (
    <>
      {showFilter && (
        <div className="w-full flex items-start px-4 py-5 bg-gray-100 rounded-2xl shadow-sm">
          <button
            onClick={() => {}}
            className="flex items-center px-4 py-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="mr-2">
              <FilterIcon />
            </div>
            <div className="text-sm font-semibold text-gray-700 mr-2">
              Filters
            </div>
            {numberOfFiltersApplied !== undefined &&
              numberOfFiltersApplied > 0 && (
                <div className="bg-lime-200 text-xs font-bold text-gray-800 px-2 py-1 rounded-md mr-2">
                  {String(numberOfFiltersApplied).padStart(1, '0')}
                </div>
              )}
            <div>
              <Dropdown />
            </div>
          </button>
        </div>
      )}
    </>
  )
}

export default Filter
