import {
  AppShell,
  Group,
  Stack,
  ActionIcon,
  Avatar,
  NavLink,
  Text,
} from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import {
  DARK,
  DARK_6,
  DARK_8,
  GRAY_1,
  LIGHT,
  menuItems,
  VIOLET,
  WHITE,
} from "../../common/constants";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../index.css";

const Main = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(LIGHT);
  const location = useLocation();

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
            <Avatar radius="xl" size="md" color={VIOLET} />
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
