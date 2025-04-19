import React, { useEffect, useMemo, useState } from 'react'
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

const fallbackData: any = []
interface Props {
  data: ReportList
}

const Table: React.FC<Props> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Report>[]>(
    () => [
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
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === 'asc' ? (
                    <ArrowUpwardIcon />
                  ) : (
                    ''
                  )}
                  {header.column.getIsSorted() === 'desc' ? (
                    <ArrowDownwardIcon />
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="rounded-b-lg overflow-hidden">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
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
  )
}

export default Table
