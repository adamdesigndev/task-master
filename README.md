<!-- @format -->

# Task Management App

This Vue 3 task management app provides a simple interface for managing tasks, filtering them by status (active or completed), and persisting tasks using browser local storage. The app is designed with a clean and responsive user interface, including a loading screen, header, task list, and modals for creating, editing, and deleting tasks.

## Key Features

- **Task Creation and Editing:** Users can add new tasks and edit existing ones using a modal interface.
- **Task Completion and Filtering:** Tasks can be marked as completed or active, and users can filter tasks based on their status.
- **Responsive User Interface:** The app is designed to be responsive and includes device-specific styling for touch and non-touch devices.
- **State Management:** Utilizes Vue's Composition API and reactive state management for handling task data and UI states.

## Overview of Key Components

### 1. `App.vue`

- The root component of the application.
- Manages global states like loading and task filtering.
- Integrates core components such as `AppHeader`, `TaskList`, and `LoadingScreen`.
- Handles loading logic and manages the visibility of key UI elements.

### 2. `AppHeader.vue`

- Contains the application's header with a logo and a menu button.
- Provides a dropdown menu (`DropdownMenu.vue`) to filter tasks by active or completed status.
- Handles device-specific interactions, like closing the menu when clicking outside.

### 3. `TaskList.vue`

- Displays a list of tasks, allowing users to add, edit, delete, and mark tasks as completed.
- Uses the `TaskContainer` component to render each task.
- Supports task filtering based on the status (active or completed).
- Persists task data to local storage.

### 4. `TaskContainer.vue`

- Represents individual tasks in the list.
- Provides controls for marking tasks as complete or incomplete and toggling task markers.
- Emits events to the parent `TaskList` component for editing or deleting tasks.

### 5. `TaskModal.vue`

- A modal component for creating and editing tasks.
- Contains form inputs (`FormInput.vue`) for task name and details.
- Emits events for saving or deleting tasks.
- Includes logic to detect changes and confirm deletion via a secondary modal (`DeleteModal.vue`).

### 6. `LoadingScreen.vue`

- Displays a loading screen when the app starts.
- Fades out after a brief delay, indicating the app is ready.
- Emits an event to notify when the loading is complete.

### 7. `DropdownMenu.vue`

- Provides a dropdown menu for filtering tasks.
- Includes buttons to switch between active and completed task views.
- Emits events to the `AppHeader` to manage the task filter state.

### 8. `FormInput.vue`

- A reusable input component used in `TaskModal.vue`.
- Supports both text input and textarea modes.
- Manages input focus and change detection.

### 9. `DeleteModal.vue`

- A modal component to confirm task deletion.
- Provides options to cancel or confirm the deletion.

### 10. `ModalAnimation.vue`

- A wrapper component that provides animations for modals.
- Manages the entrance and exit transitions of modals.

### 11. `eventBus.js`

- A simple event bus using Vue's `ref` to manage the state of the currently active menu.
- Helps in handling UI interactions between the header and menu components.
