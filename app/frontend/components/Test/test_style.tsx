import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardBody,
    Chip,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    User,
} from '@nextui-org/react';
import {SearchIcon} from './SearchIcon';
import {columns, data, statusOptions} from './data';

const statusColorMap = {
    Present: 'success',
    Absent: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = ['student_name', 'class', 'group', 'email', 'status', 'informations'];

const FullScreenComponent = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [fullScreenAttemptCount, setFullScreenAttemptCount] = useState(0);
    const [visibleAttemptCount, setVisibleAttemptCount] = useState(0);
    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [informations, setInformations] = useState(data.users[0].informations);

    // Introduce refreshSignal state
    const [refreshSignal, setRefreshSignal] = useState(0);

    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'student_name',
        direction: 'ascending',
    });
    const [page, setPage] = useState(1);

    const updateUserData = (userId, newData) => {
        setData((prevData) => ({
            ...prevData,
            users: prevData.users.map((user) =>
                user.id === userId ? {...user, ...newData} : user
            ),
        }));
    };

    const setData = (newData) => {
        setRefreshSignal((prevSignal) => prevSignal + 1);
    };

    useEffect(() => {
        const checkFullScreen = () => {
            console.log('window.innerHeight:', window.innerHeight);
            console.log('window.screen.height:', window.screen.height);
            setIsFullScreen(window.innerHeight === window.screen.height && window.innerWidth === window.screen.width);
        };

        const handleResize = () => {
            if (!isFullScreen) {
                setFullScreenAttemptCount((prevCount) => {
                    const newCount = prevCount + 1;

                    // Update the 'informations' state
                    setInformations((prevInformations) => {
                        const updatedUsers = [...data.users];
                        updatedUsers[0].informations = newCount;
                        console.log('updatedUsers[0].informations:', updatedUsers[0].informations);
                        console.log('informations:', prevInformations);
                        return updatedUsers[0].informations;
                    });

                    return newCount;
                });
            }
            checkFullScreen();
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setVisibleAttemptCount((prevCount) => prevCount + 1);
            }
        };

        const handleCopyPaste = (event) => {
            event.preventDefault();

            const newCard = document.createElement('div');
            newCard.style.position = 'fixed';
            newCard.style.top = String(0);
            newCard.style.left = String(0);
            newCard.style.width = '100%';
            newCard.style.height = '100%';
            newCard.style.background = 'rgba(255, 255, 255, 0.8)';
            newCard.style.display = 'flex';
            newCard.style.justifyContent = 'center';
            newCard.style.alignItems = 'center';
            newCard.style.zIndex = String(999);

            const newCardBody = document.createElement('div');
            newCardBody.className = 'text-center mt-4 mb-4';

            const message = document.createElement('p');
            message.textContent = 'Oupss.. Sorry no copy-pasting allowed on this page 🚫';

            newCardBody.appendChild(message);
            newCard.appendChild(newCardBody);

            document.body.appendChild(newCard);

            setTimeout(() => {
                document.body.removeChild(newCard);
            }, 2000);
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const componentRootElement = document.getElementById('fullScreenComponentRoot');
        if (componentRootElement) {
            componentRootElement.addEventListener('copy', handleCopyPaste);
            componentRootElement.addEventListener('paste', handleCopyPaste);
        }

        checkFullScreen();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (componentRootElement) {
                componentRootElement.removeEventListener('copy', handleCopyPaste);
                componentRootElement.removeEventListener('paste', handleCopyPaste);
            }
        };
    }, [isFullScreen, fullScreenAttemptCount, visibleAttemptCount, refreshSignal]);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...data.users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.student_name.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status));
        }

        return filteredUsers;
    }, [data, filterValue, statusFilter]);

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
                    <User description={user.email} name={cellValue}>
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
            case 'group':
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
                console.log('user.informations:', user.informations);
                console.log('informations:', informations);
                return (
                    <Chip className="capitalize" color={statusColorMap[user.informations]} size="sm" variant="flat">
                        page change count: {informations}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, [informations, refreshSignal]);

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

    const onClear = React.useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

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
                    startContent={<SearchIcon/>}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
            </div>
        );
    }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, data.users.length, onSearchChange, hasSearchFilter]);

    const bottomContent = React.useMemo(() => {
        return (
            <div>
                <label className="flex items-center text-default-400 text-small ml-2.5">
                    Showing {items.length} data of {filteredItems.length} students
                </label>
                <div className="py-2 px-2 flex items-center justify-center">
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
        <div id="fullScreenComponentRoot">
            {!isFullScreen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <Card>
                        <CardBody className="text-center mt-4 mb-4">
                            <p>Please open the app in full screen for the best experience.</p>
                            <br/>
                            <Tooltip
                                content={`The full size is ${window.innerWidth} * ${window.innerHeight}, but it needs to be 1080 * 1720`}
                            >
                                <Button>More info</Button>
                            </Tooltip>
                            <p>Number of attempts to reduce window size: {fullScreenAttemptCount}</p>
                            <p>Number of attempts to change window visibility: {visibleAttemptCount}</p>
                            <p>{data.users[0].informations}</p>
                        </CardBody>
                    </Card>
                </div>
            )}
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                height="100%"
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
        </div>
    );
};

export default FullScreenComponent;
