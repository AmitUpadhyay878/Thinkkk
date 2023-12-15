import React from 'react'
import { Table } from 'react-bootstrap'
import { flexRender } from '@tanstack/react-table'

const TableListing = ({ table }) => {

  return (
    <div>
      <Table hover striped bordered responsive style={{
        width: '100%',
        overflow: 'auto',
      }}>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup, i) =>
            (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (

                    <th key={header.id} align="center" colSpan={header.colSpan}>
                      {
                        header.isPlaceholder ? null :
                        <div onClick={header.column.getToggleSortingHandler()}>
                          {
                          flexRender(header.column.columnDef.header, header.getContext())
                          }
                           {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                        </div>
                      }
                    </th>

                  ))
                }
              </tr>
            )
            )
          }
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, i) => {
                  return (
                    <td key={cell.id} align="center" >
                      {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default TableListing