import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import LoadingState from '../components/LoadingState';
import { getParticipants } from '../lib/api';
import { Participant } from '../types';

const ParticipantTable = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getParticipants();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  // Define columns to prevent any re-renders
  const columns = useMemo(
    () => [
      {
        header: 'ID', // Study Id header
        accessorKey: 'studyId', // Key to access the data
        // cell: (info) => <span className="font-mono">{info.getValue()}</span>, // Custom cell rendering
      },
      {
        header: 'Name', // Name column
        accessorFn: (row) => `${row.firstName} ${row.lastName}`, // Custom accessor function to combine first and last name// Unique identifier for the column
      },
      {
        header: 'Status', // Status column
        accessorKey: 'status',
        // Custom cell rendering for status
        cell: (info) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue() === 'active' ? 'bg-green-100 text-green-800' :
            info.getValue() === 'screening' ? 'bg-blue-100 text-blue-800' :
            info.getValue() === 'completed' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {info.getValue()}
          </span>
        ),
      },
      {
        header: 'Actions',
        cell: (info) => (
          <Button asChild variant="ghost" size="sm">
            <Link to={`/participants/${info.row.original.id}`}>View</Link>
          </Button>
        ),
      }
    ],
    []
  );

  // Create table object using TanStack Table
  const table = useReactTable({
    data: participants,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter, // Update global filter state
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    filterFns: {
      customStatusFilter: (row, columnId, value) => {
        if (value === 'all') return true;
        return row.getValue(columnId) === value;
      },
    },
  });

  // Apply status filter manually (TanStack Table has a different approach for filtering)
  useEffect(() => {
    if (statusFilter !== 'all') {
      table.getColumn('status')?.setFilterValue(statusFilter);
    } else {
      table.getColumn('status')?.setFilterValue(undefined);
    }
  }, [statusFilter, table]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-1">Participants</h1>
              <p className="text-muted-foreground">
                {isLoading 
                  ? 'Loading participants...' 
                  /* Display the number of participants */
                  : `${table.getFilteredRowModel().rows.length} participant${table.getFilteredRowModel().rows.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
            
            <Button asChild>
              <Link to="/participants/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Participant
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-9"
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 sm:w-60">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingState variant="dots" text="Loading participants..." />
            </div>
          ) : table.getFilteredRowModel().rows.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No participants found</p>
              <Button asChild variant="outline">
                <Link to="/participants/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Participant
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th 
                          key={header.id}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Page{' '}
                    <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>{' '}
                    of{' '}
                    <span className="font-medium">{table.getPageCount()}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParticipantTable;
