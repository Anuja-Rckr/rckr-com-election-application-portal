import {
  AppShell,
  Group,
  Stack,
  ActionIcon,
  Avatar,
  NavLink,
  Text,
  Menu,
  Tooltip,
  Button,
} from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
  IconMoon,
  IconSettings,
  IconSun,
  IconLogout,
} from "@tabler/icons-react";
import {
  DARK,
  DARK_6,
  DARK_8,
  FILLED,
  GRAY_1,
  LIGHT,
  menuItems,
  VIOLET,
  WHITE,
} from "../../common/constants";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../index.css";
import { generateRandomColor } from "../../common/utils";

const Main = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(LIGHT);
  const location = useLocation();

  const renderProfile = () => {
    return (
      <Menu width={200}>
        <Menu.Target>
          <Tooltip label="View Profile">
            <Avatar
              radius="xl"
              size="md"
              color={VIOLET}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Group justify="center" align="center">
              <Avatar color={generateRandomColor("Anuja")} radius="xl">
                AA
              </Avatar>
              <div>
                <Text c="dimmed" className="text-center">
                  Anuja Aliveli
                </Text>
                <Text className="text-center">demo.email@gmail.com</Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Item>
            <Button
              color={VIOLET}
              variant={FILLED}
              leftSection={<IconLogout size={20} />}
              fullWidth
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm" }}
      bg={computedColorScheme === DARK ? DARK_8 : GRAY_1}
    >
      <AppShell.Header
        withBorder={true}
        bg={computedColorScheme === DARK ? DARK_6 : WHITE}
      >
        <div className="flex-between">
          <Group p="md">
            <Avatar radius="xl" size="md" color={VIOLET} />
            <Text c={VIOLET} fw={700}>
              LOGO
            </Text>
          </Group>
          <Group p="md">
            <ActionIcon
              onClick={() =>
                setColorScheme(computedColorScheme === LIGHT ? DARK : LIGHT)
              }
              variant={LIGHT}
              size="lg"
            >
              {computedColorScheme === LIGHT ? <IconMoon /> : <IconSun />}
            </ActionIcon>
            {renderProfile()}
          </Group>
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        withBorder={false}
        bg={computedColorScheme === DARK ? DARK_6 : WHITE}
      >
        <Stack>
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              leftSection={item.icon}
              component={Link}
              to={item.path}
              active={location.pathname === item.path}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="main-padding">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Main;
