import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { IconFilePencil, IconTrashFilled } from "@tabler/icons-react";
import { TUser } from "../../../../types";
import { useUserDataContext } from "../../../../context/userData";

interface ITableMember {
	columns: MRT_ColumnDef<TUser>[];
	data: TUser[];
	editAction: (data: TUser) => void;
	deleteAction: (id: number) => void;
}

function TableComponent({
	columns,
	data,
	editAction,
	deleteAction,
}: ITableMember) {
	const { userData } = useUserDataContext();
	return (
		<Box mt="xl" sx={{ overflowY: "scroll" }}>
			<MantineReactTable
				columns={columns}
				data={data}
				enableEditing
				positionActionsColumn="last"
				enableColumnFilters={false}
				enablePagination
				enableSorting={false}
				enableColumnActions={false}
				enableTopToolbar={false}
				renderRowActions={({ row }) => (
					<Box sx={{ display: "flex", gap: "16px" }}>
						<Tooltip position="left" label="Edit">
							<ActionIcon onClick={() => editAction(row.original)}>
								<IconFilePencil />
							</ActionIcon>
						</Tooltip>
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
