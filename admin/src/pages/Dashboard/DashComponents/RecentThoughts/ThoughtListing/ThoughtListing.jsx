import React from 'react'
import { Table } from 'react-bootstrap'
import { flexRender } from '@tanstack/react-table'

const ThoughtListing = ({ table }) => {

  return (
    <div>
      <Table striped hover responsive>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup, i) =>
            (
              <tr key={i}>
                {
                  headerGroup.headers.map((header) => (

                    <th key={i} align="center" colSpan={header.colSpan}>
                      {
                        header.isPlaceholder ? null :
                          flexRender(header.column.columnDef.header, header.getContext())
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
              <tr key={i}>
                {row.getVisibleCells().map((cell, i) => {
                  return (
                    <td key={i} align="center">
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

export default ThoughtListing