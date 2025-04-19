import React, { memo, Suspense } from 'react'

import Box from '../../components/Box'
import Spinner from '../../components/Spinner'
import ReportsList from './ReportList'
import SegwiseLogo from '@/svgs/SegwiseLogo'

interface Props {}

const Index: React.FC<Props> = memo(() => {
  return (
    <>
      <header className="w-full flex sm:px-10">
        <div className="flex-1">
          <SegwiseLogo />
        </div>
      </header>
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
