import { ReactElement, createElement } from "react";

interface TodoItemMetaProps {
    showDueDate: boolean;
    showCreatedDate: boolean;
    showChangedDate: boolean;
    showOwner: boolean;
    children?: (ReactElement | null | false)[];
}

export function TodoItemMeta({
    showDueDate,
    showCreatedDate,
    showChangedDate,
    showOwner,
    children
}: TodoItemMetaProps): ReactElement | null {
    const hasAnyMeta = showDueDate || showCreatedDate || showChangedDate || showOwner;

    if (!hasAnyMeta) {
        return null;
    }

    return (
        <div className="todo-item__meta">
            {children?.filter(child => child !== false && child !== null)}
        </div>
    );
}
