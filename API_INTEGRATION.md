# API Integration Guide

This guide demonstrates how to integrate real APIs with the Admin Dashboard project, using the existing request/response patterns and mock data structure.

## Architecture Overview

### Service Layer Pattern

The project uses a clean service layer architecture:

```
API Call Flow:
┌─────────────────┐
│   Component     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Project Service        │  <- Handles project-specific API calls
│  (projectService.ts)    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Base API Service       │  <- Generic HTTP handling
│  (api.ts)               │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  HTTP Request (Fetch)   │
└─────────────────────────┘
```

## Current Implementation

### 1. Base API Service (`src/services/api.ts`)

Provides generic HTTP methods for any API:

```typescript
// GET request
const response = await apiService.get('/projects', {
  page: 1,
  status: 'in-progress'
})

// POST request
const response = await apiService.post('/projects', projectData)

// PUT request
const response = await apiService.put(`/projects/${id}`, updatedData)

// DELETE request
const response = await apiService.delete(`/projects/${id}`)
```

### 2. Project Service (`src/services/projectService.ts`)

Encapsulates project-specific API calls:

```typescript
// Fetch projects with filters
const projects = await projectService.getProjects({
  page: 1,
  status: 'in-progress',
  sortBy: 'dueDate'
})

// Get single project details
const project = await projectService.getProjectDetail('project-id')

// Create new project
const newProject = await projectService.createProject({
  title: 'New Project',
  description: 'Description',
  category: 'Development',
  startDate: '2024-01-01',
  dueDate: '2024-12-31',
  priority: 'high'
})

// Update project
const updated = await projectService.updateProject('project-id', {
  status: 'done'
})
```

### 3. Mock Data (`src/services/mockData.ts`)

Generates realistic project data for development and testing:

```typescript
import { generateMockProjectDetail } from '../services/mockData'

const mockProject = generateMockProjectDetail('project-123')
```

## Switching to Real APIs

### Step 1: Set Environment Variables

Create a `.env` file with your API endpoint:

```env
VITE_API_URL=https://api.yourcompany.com/api
VITE_API_KEY=your-api-key
```

### Step 2: Update API Service

The `ApiService` class in `src/services/api.ts` already supports these features:
- Authentication headers (Bearer tokens)
- Custom headers
- Query parameters
- Error handling

Example with authentication:

```typescript
// Set auth token
apiService.setAuthToken('your-jwt-token')

// Or in headers
const response = await apiService.get('/projects', {}, {
  'Authorization': 'Bearer your-token'
})
```

### Step 3: Update Components

The `ProjectDetailModal` component already accepts the API response pattern:

```typescript
// Current mock implementation
const mockData = generateMockProjectDetail(projectId)
const response = await mockApiCall(mockData, 1500)

// Switch to real API:
const response = await projectService.getProjectDetail(projectId)
```

## Response Format

All API responses follow this standardized format:

```typescript
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
  statusCode: number
}
```

### Real API Response Example

```json
{
  "success": true,
  "data": {
    "id": "proj_123",
    "title": "Admin Dashboard Redesign",
    "description": "...",
    "status": "in-progress",
    "priority": "high",
    "startDate": "2024-01-15T00:00:00Z",
    "dueDate": "2024-03-31T00:00:00Z",
    "teamMembers": [...],
    "milestones": [...],
    "stats": {...}
  },
  "message": "Project loaded successfully",
  "timestamp": "2024-04-13T10:30:00Z",
  "statusCode": 200
}
```

## Error Handling

The API service includes automatic error handling:

```typescript
try {
  const project = await projectService.getProjectDetail('id')
} catch (error) {
  // Error is already typed as ApiErrorResponse
  console.error(error.message)
  // Handle specific error cases
}
```

## Real-World Example: Backend Implementation

### Node.js/Express Example

```typescript
// Backend API endpoint
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('teamMembers')
      .populate('milestones')
    
    res.json({
      success: true,
      data: project,
      message: 'Project loaded successfully',
      timestamp: new Date().toISOString(),
      statusCode: 200
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
      statusCode: 500
    })
  }
})
```

## Testing API Integration

### 1. With Real API

Update your environment and run:

```bash
npm run dev
```

The modal will automatically fetch real data when opened.

### 2. With Mock Data (Current)

The app uses mock data by default. To switch to real API, modify `ProjectDetailModal.tsx`:

```typescript
// Replace this:
const mockData = generateMockProjectDetail(projectId)
const response = await mockApiCall(mockData, 1500)

// With this:
const response = await projectService.getProjectDetail(projectId)
```

### 3. API Debugging

The components log API requests/responses to the console:

```typescript
console.log(`[API REQUEST] GET /projects/${projectId}`)
console.log('[API RESPONSE]', response)
console.error('[API ERROR]', errorMessage)
```

## Advanced Features

### Pagination

```typescript
const response = await projectService.getProjects({
  page: 2,
  pageSize: 10
})

// Response includes pagination metadata
console.log(response.meta.totalPages)
console.log(response.meta.hasMore)
```

### Filters and Sorting

```typescript
const projects = await projectService.getProjects({
  status: 'in-progress',
  priority: 'high',
  sortBy: 'dueDate',
  sortOrder: 'asc',
  search: 'dashboard'
})
```

### Team Management

```typescript
// Add team member
await projectService.addTeamMember('project-123', 'user-456')

// Remove team member
await projectService.removeTeamMember('project-123', 'user-456')
```

### Project Updates

```typescript
// Partial updates
await projectService.updateProject('project-123', {
  status: 'done',
  completedDate: new Date().toISOString()
})

// Status changes
await projectService.updateStatus('project-123', 'review')
```

## Type Safety

All API calls are fully typed with TypeScript:

```typescript
// Request types ensure correct data
const newProject: CreateProjectRequest = {
  title: 'New Project',
  category: 'Development',
  startDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  priority: 'high'
}

// Response types provide intellisense
const project = await projectService.createProject(newProject)
// project is typed as ApiResponse<ProjectDetail>
project.data.teamMembers // ✓ Available
project.data.unknown // ✗ TypeScript error
```

## Migration Checklist

- [ ] Set up backend API endpoints
- [ ] Configure `VITE_API_URL` environment variable
- [ ] Test API responses match expected format
- [ ] Update `ProjectDetailModal` to use real API
- [ ] Set up authentication tokens if required
- [ ] Test error handling with invalid data
- [ ] Update loading/error states as needed
- [ ] Remove mock data utilities when no longer needed

## Support

For issues or questions about API integration:
1. Check the service layer implementation
2. Review TypeScript type definitions
3. Check browser console for API request/response logs
4. Verify response format matches `ApiResponse<T>` interface
