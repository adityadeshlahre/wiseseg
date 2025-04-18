import React, { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'

import styles from './DocList.module.css'
import Table from '@/components/Table/Table'
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
        {reportsList?.length === 0 ? (
          <Spinner />
        ) : (
          // reportsList?.map((r, i) => (
          //   <a key={i} className={styles.button} target="_blank">
          //     {r.creative_name}
          //   </a>
          // ))
          <Table data={reportsList} />
        )}
      </section>
    </>
  )
}

ReportsList.displayName = 'ReportsList'

export default ReportsList
