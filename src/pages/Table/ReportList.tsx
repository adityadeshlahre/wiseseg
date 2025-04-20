import React, { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'

import styles from './DocList.module.css'
import Table from '@/components/Table/Table'
import Filter from '@/components/Filter/Filter'
import { Data } from '@/Data/Data'
import { Store, useStore } from '@tanstack/react-store'
interface Props {}

export const numberOfFiltersAppliedStore = new Store({
  numberOfFiltersApplied: 0,
})

export const handleSetNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState((prev) => ({
    numberOfFiltersApplied: prev.numberOfFiltersApplied + 1,
  }))
}

export const handleRemoveNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState((prev) => ({
    numberOfFiltersApplied: prev.numberOfFiltersApplied - 1,
  }))
}

export const handleResetNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState(() => ({
    numberOfFiltersApplied: 0,
  }))
}

const ReportsList: React.FC<Props> = () => {
  const [reportsList, setReportsList] = useState<ReportsList>([])
  const { numberOfFiltersApplied } = useStore(numberOfFiltersAppliedStore)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      fetch('/api/reportslist')
        .then(async (res) => res.json())
        .then((data) => setReportsList(data))
    } else {
      setReportsList(Data)
    }
  }, [])

  return (
    <>
      <Filter
        showFilter={reportsList?.length > 0}
        numberOfFiltersApplied={numberOfFiltersApplied}
        setNumberOfFiltersApplied={handleSetNumberOfFiltersApplied}
      />
      <br />
      {reportsList?.length === 0 ? <Spinner /> : <Table data={reportsList} />}
    </>
  )
}

ReportsList.displayName = 'ReportsList'

export default ReportsList
