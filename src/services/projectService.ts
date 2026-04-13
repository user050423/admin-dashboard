/**
 * Project Service
 * Handles all project-related API calls with realistic request/response patterns
 */

import { apiService } from './api'
import { ApiResponse } from '../types/api'
import {
  ProjectDetail,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectQueryParams,
} from '../types/project'
import { Project } from '../types'

class ProjectService {
  private endpoint = '/projects'

  /**
   * Fetch all projects with pagination and filters
   */
  async getProjects(params?: ProjectQueryParams): Promise<ApiResponse<Project[]>> {
    return apiService.get<Project[]>(`${this.endpoint}`, params)
  }

  /**
   * Fetch a single project with all details
   */
  async getProjectDetail(projectId: string): Promise<ApiResponse<ProjectDetail>> {
    return apiService.get<ProjectDetail>(`${this.endpoint}/${projectId}`)
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectRequest): Promise<ApiResponse<ProjectDetail>> {
    return apiService.post<ProjectDetail>(`${this.endpoint}`, data)
  }

  /**
   * Update an existing project
   */
  async updateProject(
    projectId: string,
    data: UpdateProjectRequest
  ): Promise<ApiResponse<ProjectDetail>> {
    return apiService.put<ProjectDetail>(`${this.endpoint}/${projectId}`, data)
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<ApiResponse<{ id: string }>> {
    return apiService.delete<{ id: string }>(`${this.endpoint}/${projectId}`)
  }

  /**
   * Add team member to project
   */
  async addTeamMember(
    projectId: string,
    userId: string
  ): Promise<ApiResponse<ProjectDetail>> {
    return apiService.post<ProjectDetail>(`${this.endpoint}/${projectId}/team`, {
      userId,
    })
  }

  /**
   * Remove team member from project
   */
  async removeTeamMember(
    projectId: string,
    userId: string
  ): Promise<ApiResponse<ProjectDetail>> {
    return apiService.delete<ProjectDetail>(
      `${this.endpoint}/${projectId}/team/${userId}`
    )
  }

  /**
   * Get project activity/timeline
   */
  async getProjectActivity(
    projectId: string,
    limit: number = 20
  ): Promise<ApiResponse<any[]>> {
    return apiService.get<any[]>(`${this.endpoint}/${projectId}/activity`, { limit })
  }

  /**
   * Add comment to project
   */
  async addComment(
    projectId: string,
    comment: string
  ): Promise<ApiResponse<any>> {
    return apiService.post<any>(`${this.endpoint}/${projectId}/comments`, { comment })
  }

  /**
   * Update project status
   */
  async updateStatus(
    projectId: string,
    status: 'in-progress' | 'review' | 'done'
  ): Promise<ApiResponse<ProjectDetail>> {
    return apiService.patch<ProjectDetail>(`${this.endpoint}/${projectId}`, { status })
  }

  /**
   * Fetch project statistics
   */
  async getProjectStats(projectId: string): Promise<ApiResponse<any>> {
    return apiService.get<any>(`${this.endpoint}/${projectId}/stats`)
  }
}

export const projectService = new ProjectService()
