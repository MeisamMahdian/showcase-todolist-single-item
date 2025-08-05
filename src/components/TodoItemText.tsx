import { ReactElement, createElement, useRef, useEffect } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";

interface TodoItemTextProps {
  todoText: string;
  isCompleted: boolean;
  isEditing: boolean;
  editText: string;
  allowInlineEdit: boolean;
  todoTextAttribute: EditableValue<string>;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
}

export function TodoItemText({
  todoText,
  isCompleted,
  isEditing,
  editText,
  allowInlineEdit,
  todoTextAttribute,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}: TodoItemTextProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSaveEdit();
    } else if (e.key === "Escape") {
      onCancelEdit();
    }
  };

  const handleStartEdit = () => {
    if (allowInlineEdit && todoTextAttribute.status === "available") {
      onStartEdit();
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      className="todo-item__edit-input"
      value={editText}
      onChange={(e) => onEditTextChange(e.target.value)}
      onKeyDown={handleKeyPress}
      onBlur={onSaveEdit}
    />
  ) : (
    <span
      className={classNames("todo-item__text", {
        "todo-item__text--completed": isCompleted
      })}
      onDoubleClick={handleStartEdit}
    >
      {todoText}
    </span>
  );
}
