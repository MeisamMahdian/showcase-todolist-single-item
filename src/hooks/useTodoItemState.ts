import { useState } from "react";
import { EditableValue, ActionValue } from "mendix";

interface UseTodoItemStateReturn {
  isEditing: boolean;
  isEditingDate: boolean;
  editText: string;
  editDate: string;
  setIsEditing: (editing: boolean) => void;
  setIsEditingDate: (editing: boolean) => void;
  setEditText: (text: string) => void;
  setEditDate: (date: string) => void;
}

export function useTodoItemState(): UseTodoItemStateReturn {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  return {
    isEditing,
    isEditingDate,
    editText,
    editDate,
    setIsEditing,
    setIsEditingDate,
    setEditText,
    setEditDate
  };
}

interface UseTodoItemActionsProps {
  todoTextAttribute: EditableValue<string>;
  todoCompletedAttribute: EditableValue<boolean>;
  todoDateAttribute?: EditableValue<Date>;
  onChangeAction?: ActionValue;
  onDeleteAction?: ActionValue;
  allowInlineEdit: boolean;
  state: UseTodoItemStateReturn;
}

export function useTodoItemActions({
  todoTextAttribute,
  todoCompletedAttribute,
  todoDateAttribute,
  onChangeAction,
  onDeleteAction,
  allowInlineEdit,
  state
}: UseTodoItemActionsProps) {
  const {
    editText,
    editDate,
    setIsEditing,
    setIsEditingDate,
    setEditText,
    setEditDate
  } = state;

  const todoText = todoTextAttribute.value || "";
  const isCompleted = todoCompletedAttribute.value || false;

  const handleToggleComplete = () => {
    if (todoCompletedAttribute.status === "available") {
      todoCompletedAttribute.setValue(!isCompleted);
      if (onChangeAction && onChangeAction.canExecute) {
        onChangeAction.execute();
      }
    }
  };

  const handleStartEdit = () => {
    if (allowInlineEdit && todoTextAttribute.status === "available") {
      setEditText(todoText);
      setIsEditing(true);
    } else if (onChangeAction && onChangeAction.canExecute) {
      onChangeAction.execute();
    }
  };

  const handleSaveEdit = () => {
    if (todoTextAttribute.status === "available") {
      todoTextAttribute.setValue(editText.trim());
      setIsEditing(false);
      if (onChangeAction && onChangeAction.canExecute) {
        onChangeAction.execute();
      }
    }
  }; const handleCancelEdit = () => {
    setEditText(todoText);
    setIsEditing(false);
  };

  const handleStartEditDate = () => {
    if (todoDateAttribute && todoDateAttribute.status === "available") {
      const currentDate = todoDateAttribute.value;
      const dateString = currentDate ? currentDate.toISOString().split('T')[0] : "";
      setEditDate(dateString);
      setIsEditingDate(true);
    }
  };

  const handleSaveDate = () => {
    if (todoDateAttribute && todoDateAttribute.status === "available") {
      if (editDate) {
        const newDate = new Date(editDate);
        todoDateAttribute.setValue(newDate);
      } else {
        todoDateAttribute.setValue(undefined);
      }
      setIsEditingDate(false);
      if (onChangeAction && onChangeAction.canExecute) {
        onChangeAction.execute();
      }
    }
  }; const handleCancelDateEdit = () => {
    const currentDate = todoDateAttribute?.value;
    const dateString = currentDate ? currentDate.toISOString().split('T')[0] : "";
    setEditDate(dateString);
    setIsEditingDate(false);
  };

  const handleDelete = () => {
    if (onDeleteAction && onDeleteAction.canExecute) {
      onDeleteAction.execute();
    }
  };

  return {
    handleToggleComplete,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleStartEditDate,
    handleSaveDate,
    handleCancelDateEdit,
    handleDelete
  };
}
