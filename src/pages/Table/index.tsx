import React, { memo, Suspense } from 'react'

import Box from '../../components/Box'
import Spinner from '../../components/Spinner'
import ReportsList from './ReportList'

interface Props {}

const Index: React.FC<Props> = memo(() => {
  return (
    <>
      <Box>
        <Suspense fallback={<Spinner size="xl" />}>
          <ReportsList />
        </Suspense>
      </Box>
    </>
  )
})
Index.displayName = 'Index'

export default Index
