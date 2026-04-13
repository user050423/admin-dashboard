/**
 * API Usage Examples
 * 
 * Practical examples demonstrating how to use the API service
 * and project service in your components
 */

import { projectService } from '../services/projectService'
import { ProjectQueryParams, CreateProjectRequest, UpdateProjectRequest } from '../types/project'

/**
 * EXAMPLE 1: Fetch Projects with Filters
 * 
 * Demonstrates how to fetch multiple projects with pagination, filtering, and sorting
 */
export async function exampleFetchProjects() {
  try {
    const params: ProjectQueryParams = {
      page: 1,
      pageSize: 10,
      status: 'in-progress',
      priority: 'high',
      sortBy: 'dueDate',
      sortOrder: 'desc',
      search: 'dashboard'
    }

    const response = await projectService.getProjects(params)

    console.log('Projects:', response.data)
    console.log('Response:', response)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

/**
 * EXAMPLE 2: Get Single Project Details
 * 
 * Load full project details including team, milestones, and activities
 */
export async function exampleGetProjectDetail(projectId: string) {
  try {
    const response = await projectService.getProjectDetail(projectId)
    const project = response.data

    console.log('Project title:', project.title)
    console.log('Team members:', project.teamMembers.length)
    console.log('Completion percentage:', project.stats.productivity)
    console.log('Budget spent:', `$${project.budget?.spent || 0}`)

    // Access nested data
    project.milestones.forEach(milestone => {
      console.log(`Milestone: ${milestone.title} - ${milestone.status}`)
    })

    project.activity.forEach(activity => {
      console.log(`${activity.userName} ${activity.action}: ${activity.description}`)
    })
  } catch (error) {
    console.error('Error fetching project details:', error)
  }
}

/**
 * EXAMPLE 3: Create New Project
 * 
 * Create a new project with required fields
 */
export async function exampleCreateProject() {
  try {
    const newProject: CreateProjectRequest = {
      title: 'Mobile App Redesign',
      description: 'Complete redesign of the mobile application with new features',
      category: 'Mobile',
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
      priority: 'high',
      teamMemberIds: ['user_1', 'user_2', 'user_3'],
      tags: ['mobile', 'urgent', 'ui-design']
    }

    const response = await projectService.createProject(newProject)

    console.log('Created project:', response.data.id)
    console.log('Status:', response.message)
  } catch (error) {
    console.error('Error creating project:', error)
  }
}

/**
 * EXAMPLE 4: Update Project
 * 
 * Partial update - only send fields you want to change
 */
export async function exampleUpdateProject(projectId: string) {
  try {
    const updates: UpdateProjectRequest = {
      status: 'done',
      priority: 'medium',
      tags: ['completed', 'archived']
    }

    const response = await projectService.updateProject(projectId, updates)

    console.log('Updated project:', response.data.id)
    console.log('New status:', response.data.status)
  } catch (error) {
    console.error('Error updating project:', error)
  }
}

/**
 * EXAMPLE 5: Manage Team Members
 * 
 * Add and remove team members from a project
 */
export async function exampleManageTeam(projectId: string) {
  try {
    // Add team member
    const addResponse = await projectService.addTeamMember(projectId, 'user_123')
    console.log('Team member added:', addResponse.data.teamMembers.length)

    // Remove team member
    const removeResponse = await projectService.removeTeamMember(projectId, 'user_123')
    console.log('Team member removed:', removeResponse.data.teamMembers.length)
  } catch (error) {
    console.error('Error managing team:', error)
  }
}

/**
 * EXAMPLE 6: Update Project Status
 * 
 * Simple status update
 */
export async function exampleUpdateStatus(projectId: string) {
  try {
    const response = await projectService.updateStatus(projectId, 'review')
    console.log('Status updated to:', response.data.status)
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

/**
 * EXAMPLE 7: Get Project Activity/Timeline
 * 
 * Fetch project activity with a limit
 */
export async function exampleGetActivity(projectId: string) {
  try {
    const response = await projectService.getProjectActivity(projectId, 20)

    response.data.forEach(activity => {
      console.log(`${activity.timestamp}: ${activity.userName} - ${activity.description}`)
    })
  } catch (error) {
    console.error('Error fetching activity:', error)
  }
}

/**
 * EXAMPLE 8: Add Comment
 * 
 * Add a comment to a project
 */
export async function exampleAddComment(projectId: string) {
  try {
    const response = await projectService.addComment(
      projectId,
      'Great progress on the dashboard redesign! Keep up the excellent work.'
    )

    console.log('Comment added:', response.data)
  } catch (error) {
    console.error('Error adding comment:', error)
  }
}

/**
 * EXAMPLE 9: Get Project Statistics
 * 
 * Fetch detailed project statistics
 */
export async function exampleGetStats(projectId: string) {
  try {
    const response = await projectService.getProjectStats(projectId)
    const stats = response.data

    console.log('Total tasks:', stats.totalTasks)
    console.log('Completed tasks:', stats.completedTasks)
    console.log('In progress:', stats.inProgressTasks)
    console.log('Overdue:', stats.overdueTasks)
    console.log('Productivity %:', stats.productivity)
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

/**
 * EXAMPLE 10: Delete Project
 * 
 * Delete a project (be careful!)
 */
export async function exampleDeleteProject(projectId: string) {
  try {
    const response = await projectService.deleteProject(projectId)
    console.log('Project deleted:', response.data.id)
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}

/**
 * EXAMPLE 11: Using API Service Directly
 * 
 * For custom endpoints not covered by projectService
 */
import { apiService } from '../services/api'

export async function exampleCustomApiCall() {
  try {
    // GET request with query params
    const getResponse = await apiService.get('/custom-endpoint', {
      filter: 'active',
      limit: 50
    })

    console.log('GET Response:', getResponse.data)

    // POST request
    const postData = {
      name: 'John Doe',
      role: 'Manager'
    }

    const postResponse = await apiService.post('/team', postData)
    console.log('POST Response:', postResponse.data)

    // With custom headers
    const customResponse = await apiService.get('/protected-resource', {}, {
      'X-Custom-Header': 'custom-value'
    })

    console.log('Custom Response:', customResponse.data)
  } catch (error) {
    console.error('API Error:', error)
  }
}

/**
 * EXAMPLE 12: Error Handling Pattern
 * 
 * Proper error handling with API responses
 */
export async function exampleErrorHandling(projectId: string) {
  try {
    const response = await projectService.getProjectDetail(projectId)

    // Check if request was successful
    if (response.success) {
      console.log('Project loaded:', response.data.title)
    } else {
      console.log('Request failed:', response.message)
    }
  } catch (error) {
    // Handle network or parsing errors
    if (error instanceof Error) {
      console.error('Network error:', error.message)
    } else {
      console.error('Unknown error:', error)
    }
  }
}

/**
 * EXAMPLE 13: Real-World Component Pattern
 * 
 * How to use API calls in a React component
 */
export async function exampleComponentPattern() {
  try {
    // Fetch projects
    const response = await projectService.getProjects({
      page: 1,
      pageSize: 10
    })

    // Process the data
    const projects = response.data
    console.log('Projects loaded:', projects.length)

    // You would then set this in state:
    // setData(response.data)
    // setLoading(false)

    return projects
  } catch (error) {
    console.error('Error in component:', error instanceof Error ? error.message : 'Unknown error')
    // You would then set error state:
    // setError(err instanceof Error ? err.message : 'An error occurred')
    // setLoading(false)
  }
}

/**
 * EXAMPLE 14: Using with Zustand Store
 * 
 * Integrating API calls with state management
 */
import { useDashboardStore } from '../store/dashboardStore'

export async function exampleWithStore() {
  const { setActivePage } = useDashboardStore()

  try {
    // Fetch data from API
    const response = await projectService.getProjects()

    // Update store or perform other actions
    console.log('Projects loaded:', response.data.length)

    // Could also dispatch store actions
    setActivePage('projects')
  } catch (error) {
    console.error('Error:', error)
  }
}

/**
 * EXAMPLE 15: Batch Operations
 * 
 * Multiple API calls with Promise.all
 */
export async function exampleBatchOperations() {
  try {
    const projectIds = ['proj_1', 'proj_2', 'proj_3']

    // Fetch multiple projects in parallel
    const promises = projectIds.map(id =>
      projectService.getProjectDetail(id)
    )

    const responses = await Promise.all(promises)

    responses.forEach(response => {
      console.log(`Loaded: ${response.data.title}`)
    })
  } catch (error) {
    console.error('Batch operation failed:', error)
  }
}
