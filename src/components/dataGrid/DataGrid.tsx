import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { palette } from '../../tokens.ts';

// Exact values transcribed from the mockup's styles.css (.table, .card, .elev-sm rules).
const cellSx = { padding: '7px', fontSize: 14, borderBottom: '1px solid rgba(29,31,32,0.08)' };
const headCellSx = { ...cellSx, fontWeight: 600, fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.08em', borderBottom: '1px solid rgba(29,31,32,0.16)' };
const rowHoverSx = { '&:hover': { bgcolor: 'rgba(29,31,32,0.07)' } };

interface DataGridProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
}

// Shared paginated, sortable table used by every master-data/order list view (Sites, Workcentres,
// Products, Customers, Sales orders) — only the data and columns differ per view.
export default function DataGrid<T>({ data, columns, onRowClick }: DataGridProps<T>) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const { pageIndex, pageSize } = pagination;
  const total = data.length;
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);
  const rows = table.getRowModel().rows;

  return (
    <Box>
      <Box sx={{ border: '1px solid rgba(29,31,32,0.16)', borderRadius: 1, bgcolor: 'transparent', p: '20px', boxShadow: '0 1px 2px rgba(43,43,45,0.14)' }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} sx={{ bgcolor: palette.navActiveBg }}>
                {hg.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ ...headCellSx, cursor: 'pointer', userSelect: 'none' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <Box component="span" sx={{ display: 'inline-block', width: 11, textAlign: 'center', fontSize: 10 }}>
                      {{ asc: '▲', desc: '▼' }[header.column.getIsSorted() as string] ?? ''}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.id}
                sx={{ cursor: onRowClick ? 'pointer' : 'default', bgcolor: i % 2 === 1 ? palette.zebra : undefined, ...rowHoverSx }}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} sx={cellSx}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
            {/* Filler rows keep the table at a constant height, matching the page size regardless of how much data exists. */}
            {Array.from({ length: Math.max(0, pageSize - rows.length) }).map((_, i) => {
              const rowIndex = rows.length + i;
              return (
                <TableRow key={`filler-${i}`} sx={{ bgcolor: rowIndex % 2 === 1 ? palette.zebra : undefined, ...rowHoverSx }}>
                  {columns.map((_col, colIndex) => (
                    <TableCell key={colIndex} sx={cellSx}>&nbsp;</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '14px', px: '14px', py: '7px', border: '1px solid', borderColor: palette.border, bgcolor: palette.zebra, fontSize: 14 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <span>Showing {start}–{end} of {total}</span>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>Rows per page</span>
            <Select size="small" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button size="small" variant="outlined" sx={{ borderColor: palette.border, color: 'text.primary' }} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous</Button>
          <span>Page {pageIndex + 1} of {table.getPageCount() || 1}</span>
          <Button size="small" variant="outlined" sx={{ borderColor: palette.border, color: 'text.primary' }} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
}
