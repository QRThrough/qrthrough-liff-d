import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { IconTrashFilled } from "@tabler/icons-react";
import { TLog } from "../../../../types";
import { useUserDataContext } from "../../../../context/userData";

interface ITableMember {
	columns: MRT_ColumnDef<TLog>[];
	data: TLog[];
	deleteAction: (id: number) => void;
}

function TableComponent({ columns, data, deleteAction }: ITableMember) {
	const { userData } = useUserDataContext();
	return (
		<Box mt="xl" sx={{ height: "100%", overflowY: "scroll" }}>
			<MantineReactTable
				columns={columns}
				data={data}
				enableEditing
				positionActionsColumn="last"
				enableColumnFilters={false}
				enablePagination
				enableSorting
				enableColumnActions={false}
				enableTopToolbar={false}
				renderRowActions={({ row }) => (
					<Box sx={{ display: "flex", gap: "16px" }}>
						{userData && userData.role === "ADMIN" && (
							<Tooltip position="right" label="Delete">
								<ActionIcon
									color="red"
									onClick={() => deleteAction(row.original.id)}
								>
									<IconTrashFilled />
								</ActionIcon>
							</Tooltip>
						)}
					</Box>
				)}
				mantineTableProps={{
					highlightOnHover: false,
					withColumnBorders: true,
					withBorder: false,
				}}
			/>
		</Box>
	);
}

export default TableComponent;
