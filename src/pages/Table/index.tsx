import React, { memo, Suspense } from 'react'

import Box, { Box2 } from '../../components/Box'
import Spinner from '../../components/Spinner'
import logo from '../../logo.svg'
import styles from './index.module.css'
import ReportsList from './ReportList'

interface Props {}

const Index: React.FC<Props> = memo(() => {
  return (
    <>
      <Box2></Box2>
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
