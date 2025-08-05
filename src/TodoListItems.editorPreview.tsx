import { ReactElement, createElement } from "react";

export function preview(): ReactElement {
    return (
        <div className="todo-item todo-item--preview">
            <div className="todo-item__main">
                <button
                    className="todo-item__checkbox"
                    disabled
                    aria-label="Mark as complete"
                />
                <div className="todo-item__content">
                    <span className="todo-item__text">
                        Sample Todo Item - Ready for Data List
                    </span>
                    <div className="todo-item__meta">
                        <span className="todo-item__priority todo-item__priority--medium">
                            Medium
                        </span>
                        <span className="todo-item__date todo-item__date--due">
                            <span className="todo-item__date-label">Due:</span>{" "}
                            <span className="todo-item__date-value">Today</span>
                        </span>
                        <span className="todo-item__date todo-item__date--created">
                            <span className="todo-item__date-label">Created:</span>{" "}
                            <span className="todo-item__date-value">2 days ago</span>
                        </span>
                        <span className="todo-item__date todo-item__date--changed">
                            <span className="todo-item__date-label">Modified:</span>{" "}
                            <span className="todo-item__date-value">Yesterday</span>
                        </span>
                        <span className="todo-item__owner">
                            <span className="todo-item__owner-label">Owner:</span>{" "}
                            <span className="todo-item__owner-value">John Doe</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="todo-item__actions">
                <button className="todo-item__action-btn todo-item__edit-btn" disabled>
                    ✏️
                </button>
                <button className="todo-item__action-btn todo-item__delete-btn" disabled>
                    🗑️
                </button>
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/TodoListItems.css");
}
