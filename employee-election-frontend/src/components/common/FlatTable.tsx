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
} from "@mantine/core";
import {
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconSearch,
} from "@tabler/icons-react";
import { DATA, DATETIME, LIGHT, LINK, STATUS } from "../../common/constants";
import { formatDate, getColorForStatus } from "../../common/utils";
import {
  ColumnData,
  ElectionInterface,
} from "../../interfaces/common.interface";

type ThProps = {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
};

const FlatTable = () => {
  const columnData: ColumnData[] = [
    {
      title: "Election ID",
      field: "election_id",
      type: "link",
    },
    {
      title: "Election Title",
      field: "election_title",
      type: "data",
    },
    {
      title: "Created By Name",
      field: "created_by_name",
      type: "data",
    },
    {
      title: "Status",
      field: "election_status",
      type: "status",
    },
    {
      title: "Created At",
      field: "created_at",
      type: "datetime",
    },
    {
      title: "Nomination Start Date",
      field: "nomination_start_date",
      type: "datetime",
    },
    {
      title: "Nomination End Date",
      field: "nomination_end_date",
      type: "datetime",
    },
    {
      title: "Voting Start Date",
      field: "voting_start_date",
      type: "datetime",
    },
    {
      title: "Voting End Date",
      field: "voting_end_date",
      type: "datetime",
    },
  ];

  const rowData: ElectionInterface[] = [
    {
      election_id: "1",
      election_title: "Employee of the Quarter",
      nomination_start_date: "2024-11-01T09:00:00Z",
      nomination_end_date: "2024-11-15T17:00:00Z",
      voting_start_date: "2024-11-16T09:00:00Z",
      voting_end_date: "2024-11-30T17:00:00Z",
      created_by_name: "John Doe",
      election_status: "Declared",
      created_at: "2024-10-15T08:00:00Z",
    },
    {
      election_id: "2",
      election_title: "Best Team Award",
      nomination_start_date: "2024-12-01T09:00:00Z",
      nomination_end_date: "2024-12-15T17:00:00Z",
      voting_start_date: "2024-12-16T09:00:00Z",
      voting_end_date: "2024-12-31T17:00:00Z",
      created_by_name: "Jane Smith",
      election_status: "Nominations",
      created_at: "2024-11-01T10:00:00Z",
    },
    {
      election_id: "3",
      election_title: "Innovation Award",
      nomination_start_date: "2024-10-01T09:00:00Z",
      nomination_end_date: "2024-10-15T17:00:00Z",
      voting_start_date: "2024-10-16T09:00:00Z",
      voting_end_date: "2024-10-31T17:00:00Z",
      created_by_name: "Mark Brown",
      election_status: "Live",
      created_at: "2024-09-20T07:00:00Z",
    },
    {
      election_id: "4",
      election_title: "Employee of the Year",
      nomination_start_date: "2024-09-01T09:00:00Z",
      nomination_end_date: "2024-09-15T17:00:00Z",
      voting_start_date: "2024-09-16T09:00:00Z",
      voting_end_date: "2024-09-30T17:00:00Z",
      created_by_name: "Sarah Lee",
      election_status: "Completed",
      created_at: "2024-08-10T12:00:00Z",
    },
    {
      election_id: "5",
      election_title: "Leadership Excellence",
      nomination_start_date: "2024-08-01T09:00:00Z",
      nomination_end_date: "2024-08-15T17:00:00Z",
      voting_start_date: "2024-08-16T09:00:00Z",
      voting_end_date: "2024-08-31T17:00:00Z",
      created_by_name: "David King",
      election_status: "CLosed",
      created_at: "2024-07-25T14:00:00Z",
    },
  ];

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const renderSearch = () => (
    <Group justify="flex-end" pr="lg">
      <Input placeholder="Search..." leftSection={<IconSearch size={16} />} />
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
        {columnData.map((col, index) => (
          <Th
            key={index}
            sorted={sortBy === col.field}
            reversed={reverseSortDirection}
            onSort={() => {
              setSortBy(col.field);
              setReverseSortDirection((prev) => !prev);
            }}
          >
            {col.title}
          </Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );

  const renderTableRow = () => (
    <Table.Tbody>
      {rowData.map((row, rowIndex) => (
        <Table.Tr key={rowIndex}>
          {columnData.map((col, colIndex) => (
            <Table.Td key={colIndex} className="text-center wrap-text">
              {col.type === LINK && (
                <Anchor component="button" fz="sm">
                  {row[col.field as keyof ElectionInterface]}
                </Anchor>
              )}
              {col.type === STATUS && (
                <Badge
                  variant={LIGHT}
                  color={getColorForStatus(
                    row[col.field as keyof ElectionInterface]
                  )}
                  size="md"
                >
                  {row[col.field as keyof ElectionInterface]}
                </Badge>
              )}
              {col.type === DATETIME &&
                formatDate(row[col.field as keyof ElectionInterface])}
              {col.type === DATA && row[col.field as keyof ElectionInterface]}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </Table.Tbody>
  );

  const scrollAreaStyles = {
    width: "100%",
  };

  return (
    <div>
      <Paper mt="lg" pt="lg" className="container-styles">
        {renderSearch()}
        <ScrollArea style={scrollAreaStyles}>
          <Box className="w-100">
            <Table
              mt="lg"
              stickyHeaderOffset={60}
              verticalSpacing="sm"
              highlightOnHover
              withTableBorder
              className={
                columnData.length > 5 ? "table-styles-max" : "table-styles"
              }
            >
              {renderTableColumn()}
              {renderTableRow()}
            </Table>
          </Box>
        </ScrollArea>

        <Group justify="flex-end" p="lg">
          <Pagination total={10} withEdges disabled />
        </Group>
      </Paper>
    </div>
  );
};

export default FlatTable;
