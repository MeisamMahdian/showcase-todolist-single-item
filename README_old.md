# Todo List Widget for Mendix

A comprehensive and feature-rich todo list widget for Mendix applications that provides a modern, accessible interface
for managing tasks.

## Features

### Core Functionality

-   ✅ **Add new todos** - Simple and intuitive todo creation
-   ✅ **Mark todos as complete/incomplete** - Toggle completion status with visual feedback
-   ✅ **Edit todos inline** - Double-click to edit or use edit button
-   ✅ **Delete todos** - Remove unwanted items
-   ✅ **Smart sorting** - Incomplete items appear first, followed by completed ones

### Advanced Features

-   📊 **Progress tracking** - Visual progress bar and completion statistics
-   📅 **Due date support** - Optional due date display with overdue highlighting
-   🏷️ **Priority levels** - Optional priority badges (High, Medium, Low)
-   🎯 **Compact view** - Space-efficient layout option
-   🔧 **Configurable UI** - Multiple display and behavior options

### User Experience

-   🎨 **Modern design** - Clean, professional interface
-   📱 **Responsive** - Works perfectly on mobile and desktop
-   ♿ **Accessible** - Full keyboard navigation and screen reader support
-   🌟 **Smooth animations** - Polished interactions and transitions
-   🎉 **Celebration feedback** - Special message when all todos are completed

## Configuration

### Data Source Properties

-   **Todo Items Data Source** (required): The data source containing your todo items
-   **Todo Text** (required): String attribute for the todo item text
-   **Completed Status** (required): Boolean attribute for completion status
-   **Priority** (optional): Enum/String attribute for priority levels
-   **Due Date** (optional): DateTime attribute for due dates

### Action Properties

-   **On Add Todo**: Microflow/nanoflow to execute when adding new todos
-   **On Toggle Complete**: Action triggered when marking todos complete/incomplete
-   **On Edit Todo**: Action triggered when editing todo items
-   **On Delete Todo**: Action triggered when deleting todo items

### Appearance Options

-   **Show Add Button**: Display the add new todo interface (default: true)
-   **Show Priority**: Display priority badges (default: false)
-   **Show Due Date**: Display due date information (default: false)
-   **Allow Inline Editing**: Enable double-click inline editing (default: true)
-   **Compact View**: Use space-efficient layout (default: false)

## Usage Instructions

### Basic Setup

1. **Create your domain model** with a Todo entity containing:

    - `Text` (String) - for the todo text
    - `Completed` (Boolean) - for completion status
    - `Priority` (Enumeration, optional) - for priority levels
    - `DueDate` (DateTime, optional) - for due dates

2. **Add the widget** to your page and configure:

    - Set the data source to your Todo entity
    - Map the required attributes (Text, Completed)
    - Configure optional attributes if needed (Priority, DueDate)

3. **Configure actions** (recommended):
    - Create microflows for CRUD operations
    - Wire them to the widget's action properties
    - Ensure proper data refresh after operations

### Advanced Configuration

#### Priority Levels

If using priorities, create an enumeration with values:

-   `High` - Displays as red badge
-   `Medium` - Displays as orange badge
-   `Low` - Displays as green badge

#### Microflow Examples

```
OnAddTodo:
1. Create new Todo object
2. Set default values
3. Commit object
4. Refresh data source

OnToggleComplete:
1. Retrieve current todo from context
2. Toggle Completed attribute
3. Commit object
4. Refresh data source

OnDeleteTodo:
1. Retrieve current todo from context
2. Delete object
3. Refresh data source
```

## Styling Customization

The widget uses CSS custom properties and BEM methodology for easy customization:

```css
/* Customize colors */
.todo-list-widget {
    --primary-color: #3b82f6;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}

/* Customize spacing */
.todo-item {
    padding: 12px 16px; /* Adjust item padding */
}

/* Customize progress bar */
.todo-stats__progress-fill {
    background: linear-gradient(90deg, #custom-start, #custom-end);
}
```

## Browser Support

-   ✅ Chrome 80+
-   ✅ Firefox 75+
-   ✅ Safari 13+
-   ✅ Edge 80+

## Best Practices

### Performance

-   Use appropriate data source limits for large todo lists
-   Implement pagination for extensive datasets
-   Consider using conditional visibility for optional features

### User Experience

-   Provide clear feedback for all actions
-   Use consistent microflow patterns for CRUD operations
-   Consider implementing undo functionality
-   Add confirmation dialogs for destructive actions

### Accessibility

-   Ensure proper heading structure on your page
-   Test with keyboard navigation
-   Verify screen reader compatibility
-   Maintain sufficient color contrast

## Troubleshooting

### Common Issues

**Widget not displaying properly**

-   Verify data source configuration
-   Check attribute mappings
-   Ensure entity access rules allow read/write

**Actions not working**

-   Verify microflow configurations
-   Check entity access rules
-   Ensure proper data refresh after operations

**Styling issues**

-   Clear browser cache
-   Check for CSS conflicts
-   Verify custom styling syntax

### Debug Mode

Enable debug logging in your microflows to trace:

-   Data retrieval operations
-   CRUD action execution
-   Error handling

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing
   `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

## Version History

### v1.0.0

-   Initial release with core todo functionality
-   Add, edit, delete, and complete todos
-   Progress tracking and statistics
-   Priority and due date support
-   Responsive design and accessibility features

## License

This widget is licensed under the Apache License 2.0. See the LICENSE file for details.
