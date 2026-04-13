/**
 * Extended Project Types for Detail View
 */

import { Project } from './index'

/**
 * Team member interface
 */
export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  joinedDate: string
}

/**
 * Project milestone interface
 */
export interface Milestone {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  completedDate?: string
}

/**
 * Project activity interface
 */
export interface ProjectActivity {
  id: string
  userId: string
  userName: string
  action: 'created' | 'updated' | 'commented' | 'completed' | 'assigned'
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

/**
 * Project statistics interface
 */
export interface ProjectStats {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueTasks: number
  teamMembers: number
  productivity: number // percentage
}

/**
 * Detailed Project Interface (extends base Project)
 */
export interface ProjectDetail extends Project {
  id: string
  overview: string
  startDate: string
  dueDate: string
  completedDate?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  budget?: {
    allocated: number
    spent: number
    currency: string
  }
  visibility: 'private' | 'public' | 'team'
  tags: string[]
  teamMembers: TeamMember[]
  milestones: Milestone[]
  activity: ProjectActivity[]
  stats: ProjectStats
  attachments: Array<{
    id: string
    name: string
    size: number
    type: string
    uploadedAt: string
    uploadedBy: string
  }>
}

/**
 * Create/Update Project Request
 */
export interface CreateProjectRequest {
  title: string
  description: string
  category: string
  startDate: string
  dueDate: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  teamMemberIds?: string[]
  tags?: string[]
}

/**
 * Update Project Request (partial)
 */
export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  status?: 'in-progress' | 'review' | 'done'
}

/**
 * Project List Query Params
 */
export interface ProjectQueryParams {
  page?: number
  pageSize?: number
  status?: 'in-progress' | 'review' | 'done'
  category?: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
  sortBy?: 'created' | 'updated' | 'dueDate' | 'priority'
  sortOrder?: 'asc' | 'desc'
  search?: string
}
