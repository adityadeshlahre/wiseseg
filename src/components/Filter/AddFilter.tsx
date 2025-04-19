import Plus from '@/svgs/Plus'
import React from 'react'
import SearchBarAddFilter from './Nested/SearchBarAddFilter'

interface Props {}

const AddFilter: React.FC<Props> = () => {
  const [showSearchFilter, setShowSearchFilter] = React.useState<boolean>(false)

  return (
    <div className="absolute top-full mt-2 w-96 bg-white rounded-2xl shadow-xl p-4 z-50">
      <button
        className="w-full flex items-center hover:bg-lime-100 text-gray-800 font-medium px-4 py-2 rounded-xl shadow"
        onClick={() => {
          setShowSearchFilter(!showSearchFilter)
        }}
      >
        <span className="text-xl mr-2">
          <Plus />
        </span>
        <span className="text-sm">Add Filter</span>
      </button>
      {showSearchFilter && <SearchBarAddFilter />}
    </div>
  )
}

export default AddFilter
