import React, { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'

import styles from './DocList.module.css'
import Table from '@/components/Table/Table'
import Filter from '@/components/Filter/Filter'
interface Props {}

const ReportsList: React.FC<Props> = () => {
  const [reportsList, setReportsList] = useState<ReportsList>([])

  useEffect(() => {
    fetch('/api/reportslist')
      .then(async (res) => res.json())
      .then((data) => setReportsList(data))
  }, [])

  return (
    <>
      <section className={styles.documentList}>
        <Filter
          showFilter={reportsList?.length > 0}
          numberOfFiltersApplied={0}
        />
        {reportsList?.length === 0 ? <Spinner /> : <Table data={reportsList} />}
      </section>
    </>
  )
}

ReportsList.displayName = 'ReportsList'

export default ReportsList
