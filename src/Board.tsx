import React from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Burger,
  MediaQuery,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import BoardChild from "./BoardChild";
import { MoonStars, Sun } from "tabler-icons-react";

const Board = () => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = React.useState(false);

  const dark = colorScheme === "dark";

  return (
    <AppShell
      padding="md"
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          p="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 100, lg: 220 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group position="apart" style={{ width: "100%" }}>
              <Text>Application header</Text>
              <ActionIcon
                variant="outline"
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
              </ActionIcon>
            </Group>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <BoardChild />
    </AppShell>
  );
};

export default Board;
