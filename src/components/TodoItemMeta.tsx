import { ReactElement, createElement } from "react";
import classNames from "classnames";

interface TodoItemMetaProps {
    showPriority: boolean;
    showDueDate: boolean;
    showCreatedDate: boolean;
    showChangedDate: boolean;
    showOwner: boolean;
    priority?: string;
    children?: (ReactElement | null | false)[];
}

export function TodoItemMeta({
    showPriority,
    showDueDate,
    showCreatedDate,
    showChangedDate,
    showOwner,
    priority,
    children
}: TodoItemMetaProps): ReactElement | null {
    const hasAnyMeta = showPriority || showDueDate || showCreatedDate || showChangedDate || showOwner;
    
    if (!hasAnyMeta) {
        return null;
    }

    return (
        <div className="todo-item__meta">
            {showPriority && priority && (
                <span className={classNames("todo-item__priority", `todo-item__priority--${priority.toLowerCase()}`)}>
                    {priority}
                </span>
            )}
            {children?.filter(child => child !== false && child !== null)}
        </div>
    );
}
