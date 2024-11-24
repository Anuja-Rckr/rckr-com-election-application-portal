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
import { FlatTablePropsInterface } from "../../interfaces/common.interface";
import { useNavigate } from "react-router-dom";

type ThProps = {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
};

const FlatTable = (props: FlatTablePropsInterface) => {
  const { colData, rowData } = props;
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const navigate = useNavigate();

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
        {colData.map((col, index) => (
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
      {rowData.map((row: any, rowIndex: number) => (
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
                  {row[col.field]}
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
                colData.length > 5 ? "table-styles-max" : "table-styles"
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
