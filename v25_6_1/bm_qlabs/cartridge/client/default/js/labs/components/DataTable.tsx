import React from "react";
import {
    DataTable as SLDSDataTable,
    DataTableCell,
    DataTableColumn,
} from "@salesforce/design-system-react";

interface DataTableCellProps<T> {
    /** The data item that will be rendered in the cell */
    item: T;
    children: React.ReactNode;
}

export interface DataTableColumnSpec<T> extends React.ComponentPropsWithoutRef<DataTableColumn> {
    cell?: React.ComponentType<DataTableCellProps<T>>;
}

interface DataTableProps<T> {
    /** array of object that will represent the data table rows */
    items: T[];
    columns: DataTableColumnSpec<T>[]
    striped?: boolean;
}

/**
 * A data table that wraps SLDS DataTable implementation and
 * provides a common interface for project functions and removes some of the friction
 * in using the HOCs in the SLDS library
 *
 * Most SLDS props work as expected. Extras are described in the stories
 */
export function DataTable<T>({ items, columns, ...props }: DataTableProps<T>) {
    return (
        <SLDSDataTable {...props} items={items}>
            {columns.map(({ cell, ...column }, index) => {
                const CellComponent = cell
                    ? (props) => (
                          <DataTableCell>
                              {React.createElement(cell, props)}
                          </DataTableCell>
                      )
                    : DataTableCell;
                CellComponent.displayName = DataTableCell.displayName;
                return (
                    <DataTableColumn key={index} {...column}>
                        <CellComponent />
                    </DataTableColumn>
                );
            })}
        </SLDSDataTable>
    );
}
