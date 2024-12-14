import React, { useState } from "react";
import {
  Group,
  Input,
  Paper,
  Table,
  UnstyledButton,
  Text,
  Center,
  Anchor,
  Badge,
  Pagination,
  ScrollArea,
  Box,
  Stack,
  Card,
  Flex,
} from "@mantine/core";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconSearch,
} from "@tabler/icons-react";
import { DATA, DATETIME, LIGHT, LINK, STATUS } from "../../common/constants";
import {
  formatDate,
  getColorForStatus,
  getElectionStatus,
} from "../../common/utils";
import { FlatTablePropsInterface } from "../../interfaces/common.interface";
import { useNavigate } from "react-router-dom";

type ThProps = {
  children: React.ReactNode;
  sorted?: boolean;
  reversed?: boolean;
  onSort?: () => void;
};

const FlatTable = (props: FlatTablePropsInterface) => {
  const {
    colData,
    rowData,
    totalRows = 0,
    showSearch = false,
    showSort = false,
    handleSearch,
    handlePagination,
    handleSort,
  } = props;
  const rowsPerPage: number = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = rowData.slice(startIndex, endIndex);

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
    if (handleSearch) {
      handleSearch(event.target.value);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    if (handlePagination) {
      handlePagination(page);
    }
  };

  const onSort = (field: string) => {
    setSortBy(field);
    setReverseSortDirection((prev) => !prev);
    if (handleSort) {
      handleSort(field, !reverseSortDirection);
    }
  };

  const renderSearch = () => (
    <Group
      justify="flex-end"
      pr={{ base: "none", md: "lg" }}
      mb={{ base: "md", md: "none" }}
    >
      <Input
        placeholder="Search..."
        leftSection={<IconSearch size={16} />}
        value={searchInput}
        disabled={rowData.length === 0}
        onChange={handleSearchChange}
      />
    </Group>
  );

  const Th = ({ children, reversed, sorted, onSort }: ThProps) => {
    const Icon = sorted
      ? reversed
        ? IconChevronUp
        : IconChevronDown
      : IconSelector;
    return (
      <Table.Th className="text-center wrap-text">
        <UnstyledButton onClick={onSort}>
          <Group justify="space-between">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center>
              <Icon size={20} />
            </Center>
          </Group>
        </UnstyledButton>
      </Table.Th>
    );
  };

  const renderTableColumn = () => (
    <Table.Thead>
      <Table.Tr>
        {colData.map((col, index) =>
          showSort ? (
            <Th
              key={`sortable-${index}`}
              sorted={sortBy === col.field}
              reversed={reverseSortDirection}
              onSort={() => onSort(col.field)}
            >
              {col.title}
            </Th>
          ) : (
            <Table.Th
              key={`nonsortable-${index}`}
              className="text-center wrap-text"
            >
              <Text fw={500} fz="sm">
                {col.title}
              </Text>
            </Table.Th>
          )
        )}
      </Table.Tr>
    </Table.Thead>
  );

  const renderMobileView = () => (
    <Stack gap="md">
      {currentData.map((row: any, rowIndex: number) => (
        <Card key={rowIndex} withBorder radius="md" p="md">
          {colData.map((col, colIndex) => (
            <Group key={colIndex} justify="space-between" mb="xs">
              <Text fw={500} size="sm">
                {col.title}:
              </Text>
              <div>
                {col.type === LINK && (
                  <Anchor
                    fz="sm"
                    onClick={() =>
                      navigate(
                        `/${col.path}${row[col.field]}`.replace(/^\/+/, "/")
                      )
                    }
                  >
                    {col.name}
                  </Anchor>
                )}
                {col.type === STATUS && (
                  <Badge
                    variant={LIGHT}
                    color={getColorForStatus(getElectionStatus(row[col.field]))}
                    size="sm"
                  >
                    {getElectionStatus(row[col.field])}
                  </Badge>
                )}
                {col.type === DATETIME && formatDate(row[col.field])}
                {col.type === DATA && row[col.field]}
              </div>
            </Group>
          ))}
        </Card>
      ))}
    </Stack>
  );

  const renderTableRow = () => {
    if (currentData.length === 0) {
      return (
        <Table.Tbody className="no-data-available">
          <Table.Tr>
            <Table.Td colSpan={colData.length} className="text-center">
              <Text fw={500} color="dimmed">
                No data available
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      );
    }

    return (
      <Table.Tbody>
        {currentData.map((row: any, rowIndex: number) => (
          <Table.Tr key={rowIndex}>
            {colData.map((col, colIndex) => (
              <Table.Td key={colIndex} className="text-center wrap-text">
                {col.type === LINK && (
                  <Anchor
                    fz="sm"
                    onClick={() =>
                      navigate(
                        `/${col.path}${row[col.field]}`.replace(/^\/+/, "/")
                      )
                    }
                  >
                    View Profile
                  </Anchor>
                )}
                {col.type === STATUS && (
                  <Badge
                    variant={LIGHT}
                    color={getColorForStatus(row[col.field])}
                    size="md"
                  >
                    {row[col.field]}
                  </Badge>
                )}
                {col.type === DATETIME && formatDate(row[col.field])}
                {col.type === DATA && row[col.field]}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    );
  };

  return (
    <div>
      <Box hiddenFrom="md" mt="md">
        {showSearch && renderSearch()}
        {renderMobileView()}
      </Box>
      <Box visibleFrom="md">
        <Paper mt="lg" pt="lg" className="container-styles">
          {showSearch && renderSearch()}
          <ScrollArea>
            <Flex direction="row">
              <Table
                mt="lg"
                stickyHeaderOffset={60}
                verticalSpacing="sm"
                highlightOnHover
                withTableBorder
                className={
                  colData.length > 5 ? "table-styles-max" : "table-styles"
                }
              >
                {renderTableColumn()}
                {renderTableRow()}
              </Table>
            </Flex>
          </ScrollArea>
        </Paper>
      </Box>

      <Group justify="flex-end" p="lg">
        <Pagination
          total={Math.ceil(totalRows / rowsPerPage)}
          value={currentPage}
          onChange={onPageChange}
          withEdges
          disabled={totalRows <= rowsPerPage || totalRows === 0}
        />
      </Group>
    </div>
  );
};

export default FlatTable;
