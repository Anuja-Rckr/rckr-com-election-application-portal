import React, { useState } from "react";
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
  Image,
  Paper,
  Burger,
  Button,
} from "@mantine/core";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun, IconLogout } from "@tabler/icons-react";
import {
  DARK,
  DARK_6,
  DARK_8,
  GRAY_1,
  LIGHT,
  LOGIN,
  menuItems,
  ORANGE,
  RED,
  WHITE,
} from "../../common/constants";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import {
  fetchUserDetails,
  generateRandomColor,
  getInitials,
  getPageName,
} from "../../common/utils";
import Logo from "../../assets/rckr-logo.svg";
import { onLogoutApi } from "../../services/ApiService";
const Main = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(LIGHT);
  const location = useLocation();

  const [mobileNavOpened, setMobileNavOpened] = useState(false);

  const userDetails = fetchUserDetails();

  const navigate = useNavigate();

  const onLogout = () => {
    // sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userDetails");
    onLogoutApi();
    navigate(LOGIN);
  };

  const renderProfile = () => {
    return (
      <Menu width={200} position="bottom-end" offset={10}>
        <Menu.Target>
          <Tooltip label="View Profile">
            <Avatar
              radius="xl"
              size="md"
              color={ORANGE}
              className="cursor-pointer"
            />
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Group justify="center" align="center">
              <Avatar
                color={generateRandomColor("Anuja")}
                radius="xl"
                size="lg"
              >
                {getInitials("Anuja Aliveli")}
              </Avatar>
              <Stack gap={0}>
                <Text fw={500} className="text-center">
                  {userDetails.user_name}
                </Text>
                <Text c="dimmed" size="sm" className="text-center">
                  {userDetails.email}
                </Text>
              </Stack>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item>
            <Button
              onClick={onLogout}
              color={RED}
              leftSection={<IconLogout size={20} />}
              className="w-100"
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
      header={{ height: { base: 60, md: 60 } }}
      navbar={{
        width: { base: 250, md: 250 },
        breakpoint: "md",
        collapsed: { mobile: !mobileNavOpened },
      }}
      bg={computedColorScheme === DARK ? DARK_8 : GRAY_1}
    >
      <AppShell.Header
        withBorder={false}
        bg={computedColorScheme === DARK ? DARK_6 : WHITE}
      >
        <Group h="100%" px="md" justify="space-between" align="center">
          <Group>
            <Burger
              opened={mobileNavOpened}
              onClick={() => setMobileNavOpened((o) => !o)}
              hiddenFrom="md"
              size="sm"
            />
            <Image
              src={Logo}
              alt="Logo"
              height={30}
              width="auto"
              fit="contain"
            />
          </Group>

          <Group>
            <ActionIcon
              onClick={() =>
                setColorScheme(computedColorScheme === LIGHT ? DARK : LIGHT)
              }
              variant="default"
              size="lg"
            >
              {computedColorScheme === LIGHT ? <IconMoon /> : <IconSun />}
            </ActionIcon>
            {renderProfile()}
          </Group>
        </Group>
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
              onClick={() => setMobileNavOpened(false)}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="main-padding">
          <Paper p={{ base: "md", md: "lg" }} mb={{ base: "md", md: "lg" }}>
            <Text fw={700}>{getPageName(location.pathname)}</Text>
          </Paper>
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Main;
