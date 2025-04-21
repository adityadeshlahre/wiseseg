import React, { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'

import styles from './DocList.module.css'
import Table from '@/components/Table/Table'
import Filter from '@/components/Filter/Filter'
import { Data } from '@/Data/Data'
import { useStore } from '@tanstack/react-store'
import {
  dataStore,
  handleSetNumberOfFiltersApplied,
  handleSetReportsList,
  numberOfFiltersAppliedStore,
} from '@/store/store'
interface Props {}

const ReportsList: React.FC<Props> = () => {
  // const [reportsList, setReportsList] = useState<ReportsListData>([])
  const { reportsList } = useStore(dataStore)
  const { numberOfFiltersApplied } = useStore(numberOfFiltersAppliedStore)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      fetch('/api/reportslist')
        .then(async (res) => res.json())
        .then((data) => handleSetReportsList(data))
    } else {
      handleSetReportsList(Data)
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
