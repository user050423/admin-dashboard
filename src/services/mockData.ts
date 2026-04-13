/**
 * Mock API Service for Development
 * Simulates real API responses with realistic data
 */

import { ProjectDetail, Milestone, ProjectActivity, TeamMember } from '../types/project'

/**
 * Generate mock project detail data
 */
export const generateMockProjectDetail = (projectId: string): ProjectDetail => {
  const now = new Date()
  const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

  const teamMembers: TeamMember[] = [
    {
      id: 'tm_1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Product Manager',
      avatar: 'SJ',
      joinedDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tm_2',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      role: 'Lead Developer',
      avatar: 'MC',
      joinedDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tm_3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      role: 'UI/UX Designer',
      avatar: 'ER',
      joinedDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'tm_4',
      name: 'Alex Williams',
      email: 'alex.williams@example.com',
      role: 'QA Engineer',
      avatar: 'AW',
      joinedDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const milestones: Milestone[] = [
    {
      id: 'ms_1',
      title: 'Project Kickoff',
      dueDate: startDate.toISOString(),
      status: 'completed',
      completedDate: startDate.toISOString(),
    },
    {
      id: 'ms_2',
      title: 'Requirements & Design',
      dueDate: new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      completedDate: new Date(startDate.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ms_3',
      title: 'Development Phase 1',
      dueDate: new Date(startDate.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in-progress',
    },
    {
      id: 'ms_4',
      title: 'Testing & QA',
      dueDate: new Date(startDate.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
    },
    {
      id: 'ms_5',
      title: 'Deployment',
      dueDate: dueDate.toISOString(),
      status: 'pending',
    },
  ]

  const activities: ProjectActivity[] = [
    {
      id: 'act_1',
      userId: 'tm_1',
      userName: 'Sarah Johnson',
      action: 'created',
      description: 'Created the project',
      timestamp: startDate.toISOString(),
    },
    {
      id: 'act_2',
      userId: 'tm_2',
      userName: 'Mike Chen',
      action: 'assigned',
      description: 'Assigned to project',
      timestamp: new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act_3',
      userId: 'tm_1',
      userName: 'Sarah Johnson',
      action: 'updated',
      description: 'Updated project description',
      timestamp: new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { field: 'description', changes: { from: '', to: 'New project description' } },
    },
    {
      id: 'act_4',
      userId: 'tm_3',
      userName: 'Emily Rodriguez',
      action: 'assigned',
      description: 'Assigned to project',
      timestamp: new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act_5',
      userId: 'tm_2',
      userName: 'Mike Chen',
      action: 'commented',
      description: 'Added comment: Starting development on core features',
      timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act_6',
      userId: 'tm_1',
      userName: 'Sarah Johnson',
      action: 'updated',
      description: 'Updated project status to In Progress',
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { field: 'status', changes: { from: 'pending', to: 'in-progress' } },
    },
  ]

  const colors = ['pink', 'green', 'blue', 'yellow']
  const categories = ['UI Design', 'Marketing', 'Mobile', 'Analytics', 'Backend', 'DevOps']
  const tags = ['frontend', 'responsive', 'urgent', 'client-project', 'high-priority']

  return {
    id: projectId,
    title: 'Admin Dashboard Redesign',
    description:
      'Complete redesign of the admin dashboard UI with improved user experience, modern components, and enhanced accessibility. This project includes migration to React with TypeScript and Chakra UI for better maintainability and scalability.',
    category: categories[Math.floor(Math.random() * categories.length)],
    status: 'in-progress' as const,
    avatars: ['SJ', 'MC', 'ER'],
    color: colors[Math.floor(Math.random() * colors.length)] as
      | 'pink'
      | 'green'
      | 'blue'
      | 'yellow',
    priority: 'high' as const,
    startDate: startDate.toISOString(),
    dueDate: dueDate.toISOString(),
    visibility: 'team' as const,
    tags: tags.slice(0, 4),
    overview:
      'This project encompasses a comprehensive redesign of the admin dashboard platform. The goal is to modernize the interface, improve user workflows, and implement best practices in responsive design and accessibility.',
    budget: {
      allocated: 45000,
      spent: 28500,
      currency: 'USD',
    },
    teamMembers,
    milestones,
    activity: activities,
    stats: {
      totalTasks: 48,
      completedTasks: 18,
      inProgressTasks: 22,
      overdueTasks: 3,
      teamMembers: teamMembers.length,
      productivity: 62,
    },
    attachments: [
      {
        id: 'att_1',
        name: 'Design Mockups.figma',
        size: 12500000,
        type: 'figma',
        uploadedAt: new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'Emily Rodriguez',
      },
      {
        id: 'att_2',
        name: 'Project Requirements.pdf',
        size: 2500000,
        type: 'pdf',
        uploadedAt: new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'Sarah Johnson',
      },
      {
        id: 'att_3',
        name: 'Technical Specification.docx',
        size: 1800000,
        type: 'docx',
        uploadedAt: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'Mike Chen',
      },
    ],
  }
}

/**
 * Mock API call simulator
 */
export const mockApiCall = async <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

/**
 * Mock error response
 */
export const mockApiError = async (message: string = 'An error occurred', delay: number = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}
