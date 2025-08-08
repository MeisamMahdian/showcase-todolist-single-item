import { ReactElement, createElement, useRef, useEffect } from "react";
import { EditableValue } from "mendix";
import classNames from "classnames";
import { formatRelativeDate, formatTooltipDate } from "../utils/dateUtils";

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

    const formatDate = (date: Date) => {
        // Use the enhanced date formatter for all date types
        return formatRelativeDate(date);
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
            title={date ? formatTooltipDate(date) : (isEditable ? `Click to set ${dateType} date` : undefined)}
        >
            <span className="todo-item__date-label">{getDateLabel(dateType)}:</span>{" "}
            <span className="todo-item__date-value">
                {date ? formatDate(date) : getEmptyText(dateType)}
            </span>
        </span>
    );
}
