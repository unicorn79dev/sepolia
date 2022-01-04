import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { LoadingSpinner } from 'app/components/LoadingSpinner'
import { useLegacyTransactions } from 'app/services/graph/hooks/transactions/legacy'
import { useTridentTransactions } from 'app/services/graph/hooks/transactions/trident'
import React, { FC } from 'react'
import { useFlexLayout, usePagination, useSortBy, useTable } from 'react-table'

import Typography from '../../components/Typography'
import { TablePageToggler } from './TablePageToggler'
import { TableInstance, TransactionFetcherState } from './types'
import { useTableConfig } from './useTableConfig'

export const LegacyTransactions: FC<{ pairs: string[] }> = ({ pairs }) => {
  const { transactions, error, loading } = useLegacyTransactions(pairs)
  return <_Transactions transactions={transactions} error={error} loading={loading} />
}

export const TridentTransactions: FC<{ poolAddress?: string }> = ({ poolAddress }) => {
  const { transactions, error, loading } = useTridentTransactions(poolAddress)
  return <_Transactions transactions={transactions} error={error} loading={loading} />
}

const _Transactions: FC<TransactionFetcherState> = ({ transactions, error, loading }) => {
  const { i18n } = useLingui()
  const { config } = useTableConfig(transactions)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex, pageSize },
  }: TableInstance = useTable(config, useSortBy, usePagination, useFlexLayout)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <Typography variant="h3" className="text-high-emphesis" weight={700}>
          {i18n._(t`Transactions`)}
        </Typography>
        <LoadingSpinner active={loading} />
        {error && <span className="-ml-2 text-sm italic text-red">{i18n._(t`⚠️ Loading Error`)}</span>}
      </div>

      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`text-secondary text-sm pt-1 pb-3 ${i === 0 ? 'text-left' : 'text-right'}`}
                  >
                    {column.render('Header')}
                    <span className="inline-block ml-1 align-middle">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownIcon width={12} />
                        ) : (
                          <ArrowUpIcon width={12} />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className={`py-3 border-t border-dark-800 ${i !== 0 && 'text-right'}`}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <TablePageToggler
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalItems={transactions ? transactions.length : 0}
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        loading={loading}
      />
    </div>
  )
}
