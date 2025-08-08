import { ReactElement, createElement } from "react";
import { formatUserInfo } from "../utils/dateUtils";

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
        <span className="todo-item__owner" title={`Created${formatUserInfo(owner)}`}>
            {showLabel && <span className="todo-item__owner-label">Owner:</span>}{" "}
            <span className="todo-item__owner-value">{owner}</span>
        </span>
    );
}
