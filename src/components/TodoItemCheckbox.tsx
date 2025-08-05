import { ReactElement, createElement } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";

interface TodoItemCheckboxProps {
  isCompleted: boolean;
  todoCompletedAttribute: EditableValue<boolean>;
  onToggle: () => void;
}

export function TodoItemCheckbox({
  isCompleted,
  todoCompletedAttribute,
  onToggle
}: TodoItemCheckboxProps): ReactElement {
  return (
    <button
      className={classNames("todo-item__checkbox", {
        "todo-item__checkbox--checked": isCompleted
      })}
      onClick={onToggle}
      disabled={todoCompletedAttribute.readOnly}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
    >
      {isCompleted && (
        <svg className="todo-item__check-icon" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
    </button>
  );
}
