import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { Box } from "@mantine/core";
import { TLog } from "../../../../types";
import { useUserDataContext } from "../../../../context/userData";

interface ITableMember {
	columns: MRT_ColumnDef<TLog>[];
	data: TLog[];
	// deleteAction: (id: number) => void;
}

function TableComponent({ columns, data }: ITableMember) {
	const { userData } = useUserDataContext();
	return (
		<Box mt="xl" sx={{ overflowY: "scroll" }}>
			<MantineReactTable
				columns={columns}
				data={data}
				enableEditing={userData?.role === "ADMIN"}
				positionActionsColumn="last"
				enableColumnFilters={false}
				enablePagination
				enableSorting={false}
				enableColumnActions={false}
				enableTopToolbar={false}
				// renderRowActions={({ row }) => (
				// 	<Box sx={{ display: "flex", gap: "16px" }}>
				// 		<Tooltip position="right" label="Delete">
				// 			<ActionIcon
				// 				color="red"
				// 				onClick={() => deleteAction(row.original.id)}
				// 			>
				// 				<IconTrashFilled />
				// 			</ActionIcon>
				// 		</Tooltip>
				// 	</Box>
				// )}
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
