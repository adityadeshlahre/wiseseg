import React, { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'

import styles from './DocList.module.css'
import Table from '@/components/Table/Table'
import Filter from '@/components/Filter/Filter'
import { Data } from '@/Data/Data'
interface Props {}

const ReportsList: React.FC<Props> = () => {
  const [reportsList, setReportsList] = useState<ReportsList>([])
  const [numberOfFiltersApplied, setNumberOfFiltersApplied] =
    useState<number>(0)

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
        setNumberOfFiltersApplied={(value: number) =>
          setNumberOfFiltersApplied(value)
        }
      />
      <br />
      {reportsList?.length === 0 ? <Spinner /> : <Table data={reportsList} />}
    </>
  )
}

ReportsList.displayName = 'ReportsList'

export default ReportsList
