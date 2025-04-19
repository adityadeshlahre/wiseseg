import React, { useMemo, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CropFreeIcon from '@mui/icons-material/CropFree'
import CloseIcon from '@mui/icons-material/Close'
import { Modal, Box } from '@mui/material'

const fallbackData: any = []
interface Props {
  data: ReportList
}

const Table: React.FC<Props> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal2 = () => {
    setOpenModal2(true)
  }
  const handleCloseModal2 = () => {
    setOpenModal2(false)
  }

  const [selectedRowData, setSelectedRowData] = useState<Report | null>(null)

  const columns = useMemo<ColumnDef<Report>[]>(
    () => [
      {
        id: 'select',
        header: 'Select',
        cell: ({ row }) => {
          const creativeId = row.original.creative_id
          return (
            <button
              onClick={() => {
                setSelectedRowData(row.original)
                handleOpenModal()
              }}
              className="px-2 py-1 bg-lime-200 rounded hover:bg-lime-300"
            >
              <OpenInNewIcon />
            </button>
          )
        },
      },
      {
        header: 'Creative ID',
        accessorKey: 'creative_id',
      },
      {
        header: 'Creative Name',
        accessorKey: 'creative_name',
      },
      {
        header: 'Tags',
        accessorKey: 'tags',
        cell: ({ getValue }) => {
          const tags = getValue() as string
          const tagList = tags.split(',')
          return (
            <div className="flex flex-wrap">
              {tagList.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 truncate max-w-[100px] cursor-pointer"
                  title={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )
        },
      },
      {
        header: 'Country',
        accessorKey: 'country',
      },
      {
        header: 'Ad Network',
        accessorKey: 'ad_network',
      },
      {
        header: 'OS',
        accessorKey: 'os',
      },
      {
        header: 'Campaign',
        accessorKey: 'campaign',
      },
      {
        header: 'Ad Group',
        accessorKey: 'ad_group',
      },
      {
        header: 'IPM',
        accessorKey: 'ipm',
      },
      {
        header: 'CTR',
        accessorKey: 'ctr',
      },
      {
        header: 'Spend',
        accessorKey: 'spend',
      },
      {
        header: 'Impressions',
        accessorKey: 'impressions',
      },
      {
        header: 'Clicks',
        accessorKey: 'clicks',
      },
      {
        header: 'CPM',
        accessorKey: 'cpm',
      },
      {
        header: 'Cost Per Click',
        accessorKey: 'cost_per_click',
      },
      {
        header: 'Cost Per Install',
        accessorKey: 'cost_per_install',
      },
      {
        header: 'Installs',
        accessorKey: 'installs',
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  })

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm rounded-2xl overflow-hidden shadow-sm">
          <thead className="bg-lime-100 rounded-t-lg overflow-hidden">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border p-2 text-left text-black"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <span>
                        {header.column.getIsSorted() === 'asc' && (
                          <ArrowUpwardIcon fontSize="small" />
                        )}
                        {header.column.getIsSorted() === 'desc' && (
                          <ArrowDownwardIcon fontSize="small" />
                        )}
                        {!header.column.getIsSorted() && (
                          <SwapVertIcon fontSize="small" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="rounded-b-lg overflow-hidden">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id + '-' + row.original.creative_id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border p-2 text-black">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center text-sm text-black">
          <div className="px-2 py-1 border-2 rounded disabled:opacity-50">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border-2 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div className="flex justify-between">
            <button
              onClick={() => {
                handleOpenModal2()
                handleCloseModal()
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md hover:bg-lime-300">
                <CropFreeIcon />
              </div>
            </button>
            <button onClick={handleCloseModal}>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md hover:bg-lime-300">
                <CloseIcon />{' '}
              </div>
            </button>
          </div>
          <br />
          <hr />
          <br />
          {selectedRowData ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Creative Name</span>
                <span>{selectedRowData.creative_name}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Spend</span>
                <span>{selectedRowData.spend}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Impressions</span>
                <span>{selectedRowData.impressions}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Clicks</span>
                <span>{selectedRowData.clicks}</span>
              </div>

              <button
                onClick={() => {
                  handleOpenModal2()
                  handleCloseModal()
                }}
                className="mt-4 px-4 py-2 bg-lime-200 hover:bg-lime-300 rounded text-sm font-medium"
              >
                Show More Details
              </button>
            </div>
          ) : (
            <div>No data selected</div>
          )}
        </Box>
      </Modal>

      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-end">
            <button onClick={handleCloseModal2}>
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md hover:bg-lime-300">
                <CloseIcon />
              </div>
            </button>
          </div>
          <br />
          <hr />
          <br />
          {selectedRowData ? (
            <div className="grid grid-cols-2 gap-4 text-sm mt-4 max-h-[60vh] overflow-y-auto pr-2">
              {Object.entries(selectedRowData).map(([key, value]) => (
                <React.Fragment key={key}>
                  <div className="font-semibold capitalize truncate">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="truncate" title={String(value)}>
                    {String(value)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div>No data available</div>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default Table
