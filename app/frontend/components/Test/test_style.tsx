import React from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Chip,
	User,
	Pagination,
} from '@nextui-org/react';
import {SearchIcon} from './SearchIcon';
import {columns, users, statusOptions} from './data';

const statusColorMap = {
	Present: 'success',
	Absent: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['student_name', 'class', 'group', 'email', 'status', 'informations'];


export default function App() {
	const [filterValue, setFilterValue] = React.useState('');
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = React.useState('all');
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: 'student_name',
		direction: 'ascending',
	});
	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === 'all') return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...users];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.student_name.toLowerCase().includes(filterValue.toLowerCase()),
			);
		}
		if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status),
			);
		}

		return filteredUsers;
	}, [users, filterValue, statusFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
		case 'student_name':
			return (
				<User
					description={user.email}
					name={cellValue}
				>
					{user.email}
				</User>
			);
		case 'class':
			return (
				<div className="flex flex-col">
					<p className="text-bold text-small capitalize">{cellValue}</p>
					<p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
				</div>
			);
		case 'group': // Changed from 'role' to 'team'
			return <p className="text-bold text-small capitalize">{cellValue}</p>;
		case 'email':
			return <p>{cellValue}</p>;
		case 'status':
			return (
				<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
					{cellValue}
				</Chip>
			);
		case 'informations':
			return (
				<Chip className="capitalize" color={statusColorMap[user.informations]} size="sm" variant="flat">
					{cellValue}
				</Chip>
			);
		default:
			return cellValue;
		}
	}, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = React.useCallback(()=>{
		setFilterValue('');
		setPage(1);
	},[]);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4 justify-between">
				<label className="flex text-default-400 text-small ml-auto">
					Students per page:
					<select
						className="bg-transparent outline-none text-default-400 text-small"
						onChange={onRowsPerPageChange}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</label>
				<Input
					isClearable
					className="w-full sm:max-w-[44%]"
					placeholder="Search by name..."
					startContent={<SearchIcon />}
					value={filterValue}
					onClear={() => onClear()}
					onValueChange={onSearchChange}
				/>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onRowsPerPageChange,
		users.length,
		onSearchChange,
		hasSearchFilter,
	]);


	const bottomContent = React.useMemo(() => {
		return (
			<div>
				<label className="flex items-center text-default-400 text-small ml-2.5">
					Showing {items.length} data of {filteredItems.length} students

				</label>
				<div className="py-2 px-2  flex items-center justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="primary"
						page={page}
						total={pages}
						onChange={setPage}
					/>
				</div>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	return (
		<Table
			aria-label="Example table with custom cells, pagination and sorting"
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			height= '100%'
			selectedKeys={selectedKeys}
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'No users found'} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
