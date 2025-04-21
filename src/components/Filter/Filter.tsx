import React, { useState } from 'react'
import AddFilter from './AddFilter'
import ButtonFilter from './ButtonFilter'

interface Props {
  showFilter: boolean
  numberOfFiltersApplied: number
  setNumberOfFiltersApplied: () => void
}

const Filter: React.FC<Props> = ({ showFilter, numberOfFiltersApplied }) => {
  const [showAddFilter, setShowAddFilter] = useState<boolean>(false)

  return (
    <>
      {showFilter && (
        <div className="w-full flex justify-center border-dashed border-2 p-8 rounded-md">
          <div className="w-[60%] flex items-start px-4 py-5 bg-gray-100 rounded-2xl shadow-sm relative">
            <ButtonFilter
              setShowAddFilter={setShowAddFilter}
              showAddFilter={showAddFilter}
              numberOfFiltersApplied={numberOfFiltersApplied}
            />
            {showAddFilter && <AddFilter />}
          </div>
        </div>
      )}
    </>
  )
}

export default Filter
