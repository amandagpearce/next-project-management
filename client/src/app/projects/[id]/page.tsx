'use client';

import React from 'react';
import ProjectHeader from '@/app/projects/ProjectHeader';

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState('Board');
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal new task */}
      <ProjectHeader activeTab={activeTab} setActivateTab={setActiveTab} />
    </div>
  );
};

export default Project;
