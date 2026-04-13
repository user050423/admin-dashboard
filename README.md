# Admin Dashboard - React + TypeScript + Chakra UI

A modern, production-ready admin dashboard built with React 18, TypeScript, and Chakra UI. Features a responsive design, state management with Zustand, comprehensive component architecture, and real-world API integration patterns.

## ✨ Features

- **React 18** with TypeScript for type-safe development
- **Chakra UI** for accessible, customizable components
- **Zustand** for lightweight state management
- **API Integration Ready** - Request/response patterns with mock data
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Component Architecture** - Reusable, well-organized components
- **Modern Frontend Practices** - Props, state management, clean code
- **Vite** for lightning-fast development and builds
- **Project Detail Viewer** - Modal with comprehensive project information
- **Real-World Data** - Mock data that looks like production APIs

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Documentation

### Main Guides
- [API Integration Guide](API_INTEGRATION.md) - How to integrate with real APIs
- [API Usage Examples](src/examples/apiExamples.ts) - 15+ practical examples

## 🏗️ Project Structure

```
src/
├── components/              # React UI components
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Header.tsx           # Top header with search
│   ├── MainContent.tsx      # Main dashboard content
│   ├── ProjectsSection.tsx  # Projects grid with click-to-detail
│   ├── ProjectDetailModal.tsx # Project details modal viewer
│   ├── ProjectCard.tsx      # Individual project card
│   ├── RightSidebar.tsx     # Right sidebar
│   ├── UpcomingEvent.tsx    # Upcoming event item
│   └── NavItem.tsx          # Navigation menu item
├── services/                # API and business logic
│   ├── api.ts              # Base HTTP service
│   ├── projectService.ts   # Project-specific API calls
│   └── mockData.ts         # Mock data generation
├── store/                   # State management
│   └── dashboardStore.ts   # Zustand store
├── types/                   # TypeScript type definitions
│   ├── index.ts            # Core types
│   ├── api.ts              # API response types
│   └── project.ts          # Project-specific types
├── hooks/                   # Custom React hooks
│   └── index.ts            # usePagination, useForm, useAsync
├── utils/                   # Utility functions
│   └── index.ts            # Formatting, helpers, etc.
├── config/                  # Configuration
│   └── development.ts      # Dev mode settings
├── examples/                # Code examples
│   └── apiExamples.ts      # 15+ API usage examples
├── theme.ts                 # Chakra UI theme
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css               # Global styles
```

## 🎯 Key Technologies

### Frontend Framework
- **React 18**: Modern UI with hooks and concurrent features
- **TypeScript 5**: Static type checking for safer code
- **Vite**: Next-generation build tool with HMR

### UI & Styling
- **Chakra UI 2.8**: Component library with emotion CSS-in-JS
- **Emotion**: CSS-in-JS styling solution
- **Framer Motion**: Animation library (included with Chakra)

### State Management
- **Zustand 4.4**: Simple, scalable state management

### Icons & Utilities
- **React Icons 4.11**: Comprehensive icon library
- **Fetch API**: Modern HTTP requests

## 🏛️ Architecture

### Service Layer Pattern

```
Component → Service Layer → API Service → HTTP
  │           │              │
  │           ├─ projectService    ├─ GET/POST/PUT/DELETE
  │           ├─ userService       ├─ Headers
  │           ├─ analyticsService  ├─ Auth
  │                                └─ Error Handling
```

### API Request/Response Flow

```typescript
// Request
const response = await projectService.getProjectDetail(projectId)

// Response type
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
  statusCode: number
}
```

### State Management

```typescript
// Zustand store with actions
const { projects, setActivePage } = useDashboardStore()
```

## 💡 Key Features

### 1. Project Detail Modal
Click any project card to view comprehensive details:
- Project overview and description
- Team members with roles
- Project milestones and timeline
- Activity history
- Budget information
- Attached files

### 2. Real-World Data Patterns
- Mock API responses matching production format
- Request logging and debugging
- Error handling patterns
- Authentication integration ready

### 3. API Services
- **Base API Service**: Generic HTTP handling
- **Project Service**: Project-specific endpoints
- **Mock Data**: Realistic development data

### 4. Type Safety
- TypeScript strict mode enabled
- Full type coverage for all APIs
- Interfaces for request/response data

## 🔧 API Integration

### Using Mock Data (Development)

The app comes pre-configured with realistic mock data:

```typescript
// In config/development.ts
USE_MOCK_DATA = true        // Toggle mock/real API
MOCK_API_DELAY = 1500       // Simulate network latency
LOG_API_REQUESTS = true     // Debug logging
```

### Switching to Real API

1. Set environment variable:
```env
VITE_API_URL=https://api.yourcompany.com/api
```

2. Update component:
```typescript
// Replace mock data call with real API
const response = await projectService.getProjectDetail(projectId)
```

3. Check [API Integration Guide](API_INTEGRATION.md) for detailed instructions

## 📖 Components

### Sidebar
- Navigation with icon support
- Grouped menu items
- User profile section
- Sticky positioning

### Header
- Search bar with filter tags
- Notification bell with badge
- Action buttons
- Responsive design

### MainContent
- Greeting section
- Projects section with click-to-detail
- Upcoming events list
- Status badges and avatars

### ProjectDetailModal
- **Overview** - Project description and summary
- **Milestones** - Tracks project phases
- **Team** - Team member management
- **Activity** - Timeline of changes
- **Attachments** - File management

### RightSidebar
- Announcements with highlights
- Featured articles
- Recent uploads
- Responsive collapsible

## 📊 Example Data Structure

The app includes comprehensive mock data:

```typescript
{
  id: 'proj_123',
  title: 'Admin Dashboard Redesign',
  description: '...',
  status: 'in-progress',
  priority: 'high',
  startDate: '2024-01-15',
  dueDate: '2024-03-31',
  budget: {
    allocated: 45000,
    spent: 28500,
    currency: 'USD'
  },
  teamMembers: [
    {
      id: 'tm_1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Product Manager',
      avatar: 'SJ'
    },
    // ... more members
  ],
  milestones: [
    {
      id: 'ms_1',
      title: 'Project Kickoff',
      dueDate: '2024-01-15',
      status: 'completed'
    },
    // ... more milestones
  ],
  stats: {
    totalTasks: 48,
    completedTasks: 18,
    inProgressTasks: 22,
    overdueTasks: 3,
    productivity: 62
  }
}
```

## 🎨 Customization

### Colors
Edit `src/theme.ts`:
```typescript
colors: {
  brand: {
    500: '#7d31ff', // Primary color
  }
}
```

### Data
Update `src/store/dashboardStore.ts` to change initial data

### Components
Each component is self-contained with clear props interfaces

## 📱 Responsive Design

- **Mobile**: Base styles
- **Tablet**: `md` breakpoint (768px)
- **Desktop**: `lg` breakpoint (1024px)

## 🔐 Security Features (Built-in)

- Authentication token management
- Secure header handling
- CORS-ready
- Timeout protection

## 📝 Best Practices Implemented

✅ TypeScript strict mode
✅ Component composition
✅ Props validation
✅ State management patterns
✅ API request/response handling
✅ Error handling
✅ Loading states
✅ Responsive design
✅ Accessibility (Chakra UI)
✅ Production-ready structure

## 🚢 Deployment

```bash
# Build for production
npm run build

# Deploy the 'dist' folder to your hosting service
```

## 📄 License

Open source and available for educational and commercial use.

## 🤝 Contributing

Contributions welcome! Feel free to fork and submit pull requests.

---

**Built with ❤️ using modern React, TypeScript, and Chakra UI**

**API Integration Ready** | **Type Safe** | **Production Ready**
