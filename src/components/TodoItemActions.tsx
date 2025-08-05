import { ReactElement, createElement } from "react";
import { EditableValue } from "mendix";

interface TodoItemActionsProps {
  showActions: boolean;
  isEditing: boolean;
  todoTextAttribute: EditableValue<string>;
  onStartEdit: () => void;
  onDelete: () => void;
}

export function TodoItemActions({
  showActions,
  isEditing,
  todoTextAttribute,
  onStartEdit,
  onDelete
}: TodoItemActionsProps): ReactElement | null {
  if (!showActions || isEditing) {
    return null;
  }

  return (
    <div className="todo-item__actions">
      <button
        className="todo-item__action-btn todo-item__edit-btn"
        onClick={onStartEdit}
        disabled={todoTextAttribute.readOnly}
        aria-label="Edit todo"
        title="Edit todo"
      >
        ✏️
      </button>
      <button
        className="todo-item__action-btn todo-item__delete-btn"
        onClick={onDelete}
        aria-label="Delete todo"
        title="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}
