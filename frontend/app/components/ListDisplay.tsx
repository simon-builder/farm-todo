import React from 'react';

interface ListItem {
    id: string;
    name: string;
}

interface ListDisplayProps {
    lists: ListItem[];
}

const ListDisplay: React.FC<ListDisplayProps> = ({ lists }) => {
    return (
        <div>
            <h1>To-Do Lists</h1>
            <ul>
                {lists.map(list => (
                    <li key={list.id}>{list.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListDisplay;
