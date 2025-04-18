import React, { useEffect, useMemo, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const fallbackData: any = []
interface Props {
  data: ReportList
}

const Table: React.FC<Props> = ({ data }) => {
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
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto">
      <div className="flex items-center justify-between bg-gray-900 p-4 border-2 border-dashed border-gray-300 rounded-t-md">
        <div>
          <text className="font-bold text-2xl">Filter</text>
        </div>
      </div>
      <br />
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2 bg-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
