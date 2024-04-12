import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Checkbox, Text, Flex, Heading, Fade } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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
          setTimeout(() => {
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
          }, 400);
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Todo App</Heading>
      <Flex mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button ml={2} onClick={handleAddTask} colorScheme="blue">
          <FaPlus />
        </Button>
      </Flex>
      <List spacing={3}>
        {tasks.map((task) => (
          <Fade in={true} key={task.id}>
            <ListItem display="flex" alignItems="center" onClick={() => handleToggleComplete(task.id)} cursor="pointer">
              <Checkbox isChecked={task.isCompleted} mr={2} />
              <Text flex={1} as={task.isCompleted ? "del" : undefined} textDecoration={task.isCompleted ? "line-through" : "none"}>
                {task.text}
              </Text>
              <IconButton
                icon={<FaTrash />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTask(task.id);
                }}
                colorScheme="red"
                aria-label="Delete task"
              />
            </ListItem>
          </Fade>
        ))}
      </List>
    </Box>
  );
};

export default Index;
