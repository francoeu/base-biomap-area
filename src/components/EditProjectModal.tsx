// EditProjectModal.tsx

import { Button, Group, Input, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { IProject, ProjectsContext } from '@/contexts/ProjectsContext';
import { useContextSelector } from 'use-context-selector';

interface EditProjectModalProps {
  project: IProject;
  onClose: () => void;
}

export function EditProjectModal({ project, onClose }: EditProjectModalProps) {
  const [editingProject, setEditingProject] = useState<IProject>(project);

  const [opened, { open, close }] = useDisclosure(false);
  const projectUp = useContextSelector(
    ProjectsContext,
    (context) => {
      return context.updateProject
    },
  )
  const handleSave = () => {
    // Chame a função para atualizar o projeto com as alterações feitas
    projectUp(editingProject);
    onClose();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
      <Input


        //   label="Nome do Projeto"
          value={editingProject.name}
          onChange={(event) => setEditingProject({ ...editingProject, name: event.currentTarget.value })}
        />
        <Input
        //   label="Descrição do Projeto"
          value={editingProject.description}
          onChange={(event) =>
            setEditingProject({ ...editingProject, description: event.currentTarget.value })
          }
        />
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}
