import React from "react";
import {
  AppShell,
  Header,
  ActionIcon,
  useMantineColorScheme,
  Group,
  Title,
} from "@mantine/core";
import BoardChild from "./BoardChild";
import { MoonStars, Sun } from "tabler-icons-react";

const Board = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";

  return (
    <AppShell
      fixed
      header={
        <Header height={120} p="xl">
          <Group
            position="apart"
            style={{ width: "100%", color: dark ? "white" : "black" }}
          >
            <Title>Simple Planner</Title>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </Group>
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
