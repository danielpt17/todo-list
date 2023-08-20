import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Tag } from "antd";
import React from "react";
import { Todo } from "../types/Todo";
import dayjs from "dayjs";
import { Priority } from "../enums/priority";

interface TodoItemProps {
  item: Todo;
  onDelete: () => void;
  onEdit: () => void;
}

const PriorityTag: React.FC<{ priority: Priority }> = ({ priority }) => {
  switch (priority) {
    case Priority.LOW:
      return <Tag color="processing">Low</Tag>;
    case Priority.MEDIUM:
      return <Tag color="warning">Medium</Tag>;
    case Priority.HIGH:
    default:
      return <Tag color="error">High</Tag>;
  }
};

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete, onEdit }) => {
  return (
    <StyledTodoItem>
      <Field>{item.text}</Field>
      <Field>{PriorityTag({ priority: item.priority })}</Field>
      <Field>{dayjs(item.dueDate).format("MMM D, YYYY")}</Field>
      <Field>{dayjs(item.creationTime).format("MMM D, YYYY h:mm")}</Field>
      <span>
        <DeleteButton
          title="delete"
          icon={<DeleteOutlined />}
          onClick={onDelete}
          aria-label="delete"
        />
        <EditButton
          title="edit"
          icon={<EditOutlined />}
          onClick={onEdit}
          aria-label="edit"
        />
      </span>
    </StyledTodoItem>
  );
};

const EditButton = styled(Button)`
  background-color: #1677ff;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: red;
  color: white;
  margin: 0 4px;
`;

const Field = styled.span`
  margin: 0 4px;
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledTodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: rgb(229 231 235/1);
  border-radius: 4px;
  border-width: 1px;
  padding: 8px;
  margin: 8px 0;
  background-color: white;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
`;

export default TodoItem;
