import { ReactElement, createElement } from "react";

interface TodoItemOwnerProps {
    owner?: string;
    showLabel?: boolean;
}

export function TodoItemOwner({
    owner,
    showLabel = true
}: TodoItemOwnerProps): ReactElement | null {
    if (!owner) {
        return null;
    }

    return (
        <span className="todo-item__owner">
            {showLabel && <span className="todo-item__owner-label">Owner:</span>}{" "}
            <span className="todo-item__owner-value">{owner}</span>
        </span>
    );
}
