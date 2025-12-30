"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteUser } from "@/server/admin/edit-user-actions";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountBalance: number;
  accountVerified: boolean;
}

const columnHelper = createColumnHelper<IUser>();

export default function Admin({ initialData }: { initialData: IUser[] }) {
  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const handleDeleteUser = async (email: string) => {
    setDeletingUser(email);
    try {
      const result = await deleteUser(email);
      if (result.success) {
        toast.success("User successfully deleted");
        setData(data.filter((user) => user.email !== email));
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user");
    } finally {
      setDeletingUser(null);
    }
  };

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: "Last Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: "Phone",
    }),
    columnHelper.accessor("accountBalance", {
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      header: "Account Balance",
    }),
    columnHelper.accessor("accountVerified", {
      cell: (info) => (info.getValue() ? "Yes" : "No"),
      header: "Verified",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 dark:bg-neutral-800 dark:border-neutral-800">
            <div className="title dark:text-neutral-400  text-base font-medium mb-4">
              Actions
            </div>

            <div className="action-navs grid gap-y-2">
              <Link
                href={`/admin/edit/${info.row.original.email}`}
                className="dark:hover:bg-neutral-700/40 text-sm py-2 px-3 rounded-md transition-all hover:bg-neutral-50"
              >
                Edit user info
              </Link>
              <Link
                href={`/admin/fixed/${info.row.original.email}`}
                className="dark:hover:bg-neutral-700/40 text-sm py-2 px-3 rounded-md transition-all hover:bg-neutral-50"
              >
                View fixeds
              </Link>
              <Link
                href={`/admin/transfers/${info.row.original.email}`}
                className="dark:hover:bg-neutral-700/40 text-sm py-2 px-3 rounded-md transition-all hover:bg-neutral-50"
              >
                View transfers
              </Link>
              <Link
                href={`/admin/payments/${info.row.original.email}`}
                className="dark:hover:bg-neutral-700/40 text-sm py-2 px-3 rounded-md transition-all hover:bg-neutral-50"
              >
                View payments
              </Link>
              <Button
                className="dark:hover:bg-red-/500/10 cursor-pointer  text-sm py-2 px-3 rounded-md transition-all hov/er:bg-red-50"
                onClick={() => handleDeleteUser(info.row.original.email)}
                disabled={deletingUser === info.row.original.email}
              >
                {deletingUser === info.row.original.email ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Delete User
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="bg-white dark:bg-neutral-900 w-full h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search users..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          className="max-w-sm"
        />
        <Button
          asChild
          className="dark:bg-neutral-800 text-sm dark:border-neutral-700 dark:text-white text-neutral-600 bg-neutral-50"
        >
          <Link href={"/admin/address"}>Edit address</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground dark:text-neutral-400">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-neutral-800 "
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-neutral-800 "
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
