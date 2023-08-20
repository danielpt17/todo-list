import styled from "@emotion/styled";
import { DatePicker, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { Priority } from "../enums/priority";

interface TodoFormModalProps {
  open: boolean;
  selectedTodo: Todo | null;
  onClose: () => void;
  onSubmit: (todo: Todo) => void;
  mode: "add" | "edit";
}

const priorityOptions = [
  { value: Priority.LOW, label: "Low" },
  { value: Priority.MEDIUM, label: "Medium" },
  { value: Priority.HIGH, label: "High" },
];

const TodoFormModal: React.FC<TodoFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  mode,
  selectedTodo,
}) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(dayjs(new Date()));
  const [priority, setPriority] = useState(Priority.LOW);

  useEffect(() => {
    if (mode === "edit" && selectedTodo) {
      setText(selectedTodo.text);
      setPriority(selectedTodo.priority);
      setDueDate(dayjs(selectedTodo.dueDate));
    }
  }, [mode, selectedTodo]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    setDueDate(value);
  };

  const handlePriorityChange = (value: unknown) => {
    setPriority(value as Priority);
  };

  const handleFormSubmit = () => {
    if (text.trim()) {
      const formData: Todo = {
        ...selectedTodo,
        text,
        priority,
        dueDate: dueDate!.toISOString(),
        creationTime: new Date().toISOString(),
      };

      onSubmit(formData);
      cleanUp();
    }
  };

  const cleanUp = () => {
    setText("");
    setDueDate(dayjs(new Date()));
    setPriority(Priority.LOW);
    onClose();
  };

  return (
    <Modal
      onOk={handleFormSubmit}
      okText={mode === "add" ? "Add Todo" : "Save Todo"}
      open={open}
      title={mode === "add" ? "Add Todo Item" : "Edit Todo Item"}
      onCancel={cleanUp}
    >
      <StyledModal>
        <StyledInput
          placeholder="Set your task"
          onChange={handleTextChange}
          value={text}
        />
        <DatePicker
          value={dueDate}
          onChange={handleDateChange}
          placeholder="Set due date"
        />
        <StyledSelect
          value={priority}
          onChange={handlePriorityChange}
          options={priorityOptions}
        ></StyledSelect>
      </StyledModal>
    </Modal>
  );
};

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const StyledInput = styled(Input)`
  margin: 8px 0;
`;

const StyledSelect = styled(Select)`
  margin: 8px 0;
`;

export default TodoFormModal;
