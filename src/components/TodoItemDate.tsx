import { ReactElement, createElement, useRef, useEffect } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";

interface TodoItemDateProps {
    date?: Date;
    dateType: "due" | "created" | "changed";
    isOverdue?: boolean;
    isEditing?: boolean;
    editDate?: string;
    dateAttribute?: EditableValue<Date>;
    onStartEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    onEditChange?: (date: string) => void;
    isEditable?: boolean;
}

export function TodoItemDate({
    date,
    dateType,
    isOverdue = false,
    isEditing = false,
    editDate = "",
    dateAttribute,
    onStartEdit,
    onSave,
    onCancel,
    onEditChange,
    isEditable = false
}: TodoItemDateProps): ReactElement {
    const dateInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && dateInputRef.current) {
            dateInputRef.current.focus();
        }
    }, [isEditing]);

    const handleDateKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && onSave) {
            onSave();
        } else if (e.key === "Escape" && onCancel) {
            onCancel();
        }
    };

    const formatDate = (date: Date, type: "due" | "created" | "changed") => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // For due dates, show relative formatting
        if (type === "due") {
            if (date.toDateString() === today.toDateString()) {
                return "Today";
            } else if (date.toDateString() === tomorrow.toDateString()) {
                return "Tomorrow";
            } else if (date.toDateString() === yesterday.toDateString()) {
                return "Yesterday";
            }
        }

        // For created/changed dates, show relative time if recent
        if (type === "created" || type === "changed") {
            const diffTime = Math.abs(today.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                return date.toDateString() === today.toDateString() ? "Today" : "Yesterday";
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            }
        }

        return date.toLocaleDateString();
    };

    const getDateLabel = (type: "due" | "created" | "changed") => {
        switch (type) {
            case "due": return "Due";
            case "created": return "Created";
            case "changed": return "Modified";
        }
    };

    const getEmptyText = (type: "due" | "created" | "changed") => {
        switch (type) {
            case "due": return "No due date";
            case "created": return "No creation date";
            case "changed": return "No modification date";
        }
    };

    return isEditing && isEditable ? (
        <input
            ref={dateInputRef}
            type="date"
            className="todo-item__date-input"
            value={editDate}
            onChange={(e) => onEditChange?.(e.target.value)}
            onKeyDown={handleDateKeyPress}
            onBlur={onSave}
        />
    ) : (
        <span
            className={classNames("todo-item__date", `todo-item__date--${dateType}`, {
                "todo-item__date--overdue": isOverdue && dateType === "due",
                "todo-item__date--clickable": isEditable && dateAttribute?.status === "available"
            })}
            onClick={isEditable ? onStartEdit : undefined}
            title={isEditable && date ? `Click to edit ${dateType} date` : undefined}
        >
            <span className="todo-item__date-label">{getDateLabel(dateType)}:</span>{" "}
            <span className="todo-item__date-value">
                {date ? formatDate(date, dateType) : getEmptyText(dateType)}
            </span>
        </span>
    );
}
