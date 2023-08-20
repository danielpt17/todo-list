import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';

interface EmptyListPlaceholderProps {
    onAddItem: () => void;
}

const EmptyListPlaceholder: React.FC<EmptyListPlaceholderProps> = ({ onAddItem }) => {
    return (
        <PlaceholderContainer>
            <p>Your to-do list is empty. Add some tasks!</p>
            <Button type="primary" onClick={onAddItem}>Add Item</Button>
        </PlaceholderContainer>
    );
};


const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default EmptyListPlaceholder;