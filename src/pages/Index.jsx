import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Checkbox, Text, Flex, Heading, Fade } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  const filteredTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.isCompleted);
      case "completed":
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  };

  return (
    <Box p={5} maxW="xl" w="90%" mx="auto">
      <Heading mb={4}>Todo App</Heading>
      <Flex mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button ml={2} onClick={handleAddTask} colorScheme="blue">
          <FaPlus />
        </Button>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <Button mr={2} onClick={() => setFilter("all")} colorScheme={filter === "all" ? "blue" : "teal"}>
          All
        </Button>
        <Button mr={2} onClick={() => setFilter("active")} colorScheme={filter === "active" ? "blue" : "teal"}>
          Active
        </Button>
        <Button onClick={() => setFilter("completed")} colorScheme={filter === "completed" ? "blue" : "teal"}>
          Completed
        </Button>
      </Flex>
      <List spacing={3}>
        {filteredTasks().map((task) => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} mr={2} />
            <Text flex={1} as={task.isCompleted ? "s" : ""}>
              {task.text}
            </Text>
            <IconButton icon={<FaTrash />} onClick={() => handleRemoveTask(task.id)} colorScheme="red" aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
