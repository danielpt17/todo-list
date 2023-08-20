import styled from "@emotion/styled";
import { Button } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./App.css";
import EmptyListPlaceholder from "./components/EmptyListPlaceHolder";
import Filters from "./components/Filters";
import TodoFormModal from "./components/TodoFormModal";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorage";
import { Todo } from "./types/Todo";

const priorityOrder = { High: 3, Medium: 2, Low: 1 };

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoItems, setTodoItems] = useLocalStorage("todoItems", [] as Todo[]);
  const [filteredItems, setFilteredItems] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (todoItems) {
      const sortedItems = todoItems.sort((a, b) => {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      setFilteredItems(sortedItems);
    }
  }, [todoItems]);

  const handleDeleteItem = (index: number) => {
    const updatedItems = [
      ...todoItems.slice(0, index),
      ...todoItems.slice(index + 1),
    ];
    setTodoItems(updatedItems);
  };

  const handleFilterChange = (dates: dayjs.Dayjs[]) => {
    if (dates.length === 0) {
      setFilteredItems(todoItems);
      return;
    }
    const filtered = todoItems.filter((todo) => {
      return (
        dayjs(todo.dueDate).isSame(dates[0], "day") ||
        dayjs(todo.dueDate).isSame(dates[1], "day") ||
        (dayjs(todo.dueDate).isAfter(dates[0]) &&
          dayjs(todo.dueDate).isBefore(dates[1]))
      );
    });
    setFilteredItems([...filtered]);
  };

  const handleEditTodo = (selectedTodo: Todo) => {
    setSelectedTodo(selectedTodo);
    setIsModalOpen(true);
  };

  const handleSubmitItem = (submittedTodo: Todo) => {
    if (!selectedTodo) {
      setTodoItems([
        ...todoItems,
        { ...submittedTodo, id: window.crypto.randomUUID() },
      ]);
    } else {
      const updatedTodos = todoItems.map((todo) =>
        todo.id === selectedTodo.id ? submittedTodo : todo
      );
      setTodoItems(updatedTodos);
      setSelectedTodo(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const areToDosExists = todoItems.length > 0;

  return (
    <StyledContainer>
      <h1>#ToDo List</h1>
      {!areToDosExists && <EmptyListPlaceholder onAddItem={handleOpenModal} />}
      {areToDosExists && (
        <>
          <Dashboard>
            <AddButton type="primary" onClick={() => handleOpenModal()}>
              Add Item
            </AddButton>
            <Filters onFilterChange={handleFilterChange} />
          </Dashboard>
          <TodoList
            items={filteredItems}
            onEdit={handleEditTodo}
            onDelete={handleDeleteItem}
          />
          <Total>{`You've got ${filteredItems.length} ${
            filteredItems.length === 1 ? `item` : `items`
          }. Keep going!`}</Total>
        </>
      )}
      <TodoFormModal
        selectedTodo={selectedTodo}
        mode={selectedTodo ? "edit" : "add"}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitItem}
      />
    </StyledContainer>
  );
};

export default App;

const AddButton = styled(Button)`
  margin-right: 4px;
`;

const Dashboard = styled.span`
  display: flex;
  font-size: 16px;
  align-self: flex-end;
`;

const Total = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const StyledContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 750px;
  margin: auto;
`;
