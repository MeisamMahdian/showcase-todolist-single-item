# Todo List Item Widget for Mendix

A flexible and reusable todo item widget designed to be used inside Mendix data list placeholders. This approach provides maximum flexibility by separating data management from item rendering.

## Architecture Approach

This widget follows Mendix best practices by:
- **Single Responsibility**: Each widget instance handles one todo item
- **Data List Integration**: Designed to work within List View or Data Grid widgets
- **Separation of Concerns**: Data source management is handled by native Mendix widgets
- **Reusability**: Can be used in multiple contexts and layouts

## Features

### Core Functionality
- ✅ **Toggle completion** - Mark individual todos as complete/incomplete
- ✅ **Inline editing** - Double-click to edit or use edit button
- ✅ **Delete todos** - Remove individual items
- ✅ **Visual states** - Clear visual feedback for completed, editing, and overdue items

### Advanced Features
- 📅 **Due date display** - Shows due dates with smart formatting (Today, Tomorrow, etc.)
- 🏷️ **Priority badges** - Color-coded priority indicators (High, Medium, Low)  
- 🎯 **Compact mode** - Space-efficient layout option
- 🔧 **Configurable UI** - Show/hide action buttons and metadata
- ⚡ **Overdue highlighting** - Visual indication for overdue items

### User Experience
- 🎨 **Modern design** - Clean, professional interface optimized for data lists
- 📱 **Responsive** - Works perfectly on mobile and desktop
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🌟 **Smooth animations** - Polished interactions and hover effects

## Setup Instructions

### 1. Domain Model
Create a Todo entity with these attributes:
```
Todo Entity:
- Text (String) - The todo item text
- Completed (Boolean) - Completion status
- Priority (Enumeration, optional) - High/Medium/Low
- DueDate (DateTime, optional) - Due date
```

### 2. Page Structure
```
Page
├── Data List (Todo entity as data source)
│   └── List Item Container
│       └── Todo List Item Widget ← Configure this widget
├── Add Todo Form (outside the data list)
└── Optional: Progress/Stats widgets
```

### 3. Widget Configuration

#### Required Properties
- **Todo Text**: Map to your Text attribute
- **Completed Status**: Map to your Completed boolean attribute

#### Optional Properties
- **Priority**: Map to your Priority enumeration (if using priorities)
- **Due Date**: Map to your DueDate DateTime attribute (if using due dates)

#### Actions
- **On Toggle Complete**: Microflow to update completion status
- **On Edit Todo**: Microflow for editing (or leave empty for inline editing only)
- **On Delete Todo**: Microflow to delete the todo item

#### Appearance Options
- **Show Priority**: Display priority badges
- **Show Due Date**: Display due date information
- **Allow Inline Editing**: Enable double-click inline editing
- **Compact View**: Use space-efficient layout
- **Show Action Buttons**: Display edit and delete buttons

## Usage Examples

### Basic List View Setup
1. Add a **List View** widget to your page
2. Set the data source to your Todo entity
3. Inside the list view, add the **Todo List Item** widget
4. Configure the required attributes and actions
5. Add an **Add Todo** form above or below the list view

### With Progress Tracking
1. Add a **Text** widget above the list to show statistics
2. Use expressions like: `'Completed: ' + toString(length($TodoList[Completed = true])) + ' / ' + toString(length($TodoList))`
3. Add conditional formatting for celebration when all are complete

### Advanced Sorting
Configure your List View data source with sorting:
- Primary: `Completed` (ascending) - Shows incomplete items first
- Secondary: `DueDate` (ascending) - Orders by due date
- Tertiary: `CreatedDate` (descending) - Newest first within same status

## Microflow Examples

### OnToggleComplete
```
1. Retrieve $Todo from context
2. Change $Todo/Completed to not($Todo/Completed)  
3. Commit $Todo
4. Refresh in client: Yes
```

### OnDeleteTodo
```
1. Retrieve $Todo from context
2. Show confirmation: "Delete this todo item?"
3. If confirmed: Delete $Todo
4. Refresh in client: Yes
```

### OnEditTodo (if not using inline editing)
```
1. Retrieve $Todo from context
2. Show page: EditTodo with $Todo as parameter
3. Or: Open popup with edit form
```

### AddTodo (separate from widget)  
```
1. Create new Todo object
2. Set Text from input parameter
3. Set Completed to false
4. Set CreatedDate to [%CurrentDateTime%]
5. Commit Todo
6. Refresh in client: Yes
```

## Styling Customization

The widget provides clean, minimal styling that integrates well with Mendix themes:

```css
/* Customize item spacing in your theme */
.mx-listview .todo-item {
    margin-bottom: 8px;
    border-radius: 8px;
}

/* Customize priority colors */
.todo-item__priority--high {
    background: #your-high-priority-color;
    color: #your-high-text-color;
}

/* Customize completion styles */
.todo-item--completed {
    background: #your-completed-background;
}
```

## Benefits of This Architecture

### For Developers
- **Familiar Pattern**: Uses standard Mendix data widgets (List View, Data Grid)
- **Native Features**: Leverage built-in sorting, filtering, paging
- **Flexible Layouts**: Easy to customize list appearance and behavior
- **Maintainable**: Clear separation between data and presentation

### For End Users  
- **Consistent UX**: Integrates seamlessly with other Mendix widgets
- **Performance**: Efficient rendering with native Mendix data handling
- **Extensible**: Easy to add filtering, search, and other list features

### Compared to All-in-One Approach
- ✅ More flexible data source options
- ✅ Better integration with existing pages
- ✅ Easier to add list-level features (search, filter, pagination)
- ✅ Follows Mendix architectural patterns
- ✅ Reusable across different page contexts

## Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+  
- ✅ Safari 13+
- ✅ Edge 80+

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

## Version History

### v2.0.0 (Current)
- **BREAKING**: Refactored to single-item widget for data list integration
- Removed built-in data source management
- Optimized for List View and Data Grid usage
- Improved performance and flexibility
- Enhanced styling for data list contexts

### v1.0.0
- Initial all-in-one todo list widget

## Migration from v1.0.0

If upgrading from the previous all-in-one version:

1. **Replace widget usage**:
   - Remove the old widget from your page
   - Add a List View with your Todo entity
   - Add the new widget inside the List View

2. **Move add functionality**:
   - Create a separate form for adding todos
   - Place it above or below the List View

3. **Update microflows**:
   - Existing OnEdit, OnDelete, OnToggle microflows should work as-is
   - Create new AddTodo microflow for the separate add form

## License

This widget is licensed under the Apache License 2.0. See the LICENSE file for details.
