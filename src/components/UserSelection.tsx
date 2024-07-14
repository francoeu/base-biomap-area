import { MultiSelect } from '@mantine/core';
import React from 'react';
import { ICustomer } from './UsersList';

interface UserSelectionProps {
  users: ICustomer[];
  selectedUserIds: string[];
  onSelectUsers: (selectedUserIds: string[]) => void;
}



const UserSelection: React.FC<UserSelectionProps> = ({
  users,
  selectedUserIds,
  onSelectUsers,
}) => {

    // console.log('UserSelection/selectedUserIds', selectedUserIds)
  return (
    <MultiSelect
      data={users.map((user) => ({ value: user.id, label: user.name }))}
      label="Conceder acesso à outros usuários"
      placeholder="Selecione os usuários"
      value={selectedUserIds}
      onChange={onSelectUsers}
    />

    

  
  );
};

export default UserSelection;
