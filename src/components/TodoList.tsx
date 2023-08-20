import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import styled from '@emotion/styled';

interface TodoListProps {
    items: Todo[];
    onEdit: (selectedTodo: Todo) => void;
    onDelete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onEdit, onDelete }) => {
    return (
        <div>
            <HeaderContainer>
                <HeaderField>Text</HeaderField>
                <HeaderField>Priority</HeaderField>
                <HeaderField>Due Date</HeaderField>
                <HeaderField>Creation Time</HeaderField>
                <Action>Action</Action>
            </HeaderContainer>
            <ScrollableList>
                {items.map((item, index) => (
                    <TodoItem
                        key={index}
                        item={item}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(index)}
                    />
                ))}
            </ScrollableList>
        </div>


    );
};

const ScrollableList = styled.div`
  max-height: 600px;
  overflow: auto;
`;

const HeaderField = styled.span`
  margin: 0 4px;
  min-width:150px;
  font-weight: 600;
`;
const Action = styled.span`
  font-weight: 600;
  font-size:14;
`;

const HeaderContainer = styled.span`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:8px;
`;

export default TodoList;