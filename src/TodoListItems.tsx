import { ReactElement, createElement } from "react";
import { TodoListItemsContainerProps } from "../typings/TodoListItemsProps";
import classNames from "classnames";

import "./ui/TodoListItems.css";

// Components
import { TodoItemCheckbox } from "./components/TodoItemCheckbox";
import { TodoItemText } from "./components/TodoItemText";
import { TodoItemDate } from "./components/TodoItemDate";
import { TodoItemMeta } from "./components/TodoItemMeta";
import { TodoItemActions } from "./components/TodoItemActions";
import { TodoItemOwner } from "./components/TodoItemOwner";

// Hooks
import { useTodoItemState, useTodoItemActions } from "./hooks/useTodoItemState";

export function TodoListItems({
    todoTextAttribute,
    todoCompletedAttribute,
    todoDateAttribute,
    todoCreatedDateAttribute,
    todoChangedDateAttribute,
    todoOwnerAttribute,
    onChangeAction,
    onDeleteAction,
    showDueDate,
    showCreatedDate,
    showChangedDate,
    showOwner,
    allowInlineEdit,
    compactView,
    showActions
}: TodoListItemsContainerProps): ReactElement {
    const state = useTodoItemState();
    const {
        isEditing,
        isEditingDate,
        editText,
        editDate,
        setEditText,
        setEditDate
    } = state;

    const actions = useTodoItemActions({
        todoTextAttribute,
        todoCompletedAttribute,
        todoDateAttribute,
        onChangeAction,
        onDeleteAction,
        allowInlineEdit,
        state
    });

    const isCompleted = todoCompletedAttribute.value || false;
    const todoText = todoTextAttribute.value || "";
    const dueDate = todoDateAttribute?.value;
    const createdDate = todoCreatedDateAttribute?.value;
    const changedDate = todoChangedDateAttribute?.value;
    const owner = todoOwnerAttribute?.value || "";
    const isOverdue = !!(dueDate && dueDate < new Date() && !isCompleted);

    return (
        <div className={classNames("todo-item", {
            "todo-item--completed": isCompleted,
            "todo-item--editing": isEditing,
            "todo-item--compact": compactView,
            "todo-item--overdue": isOverdue
        })}>
            <div className="todo-item__main">
                <TodoItemCheckbox
                    isCompleted={isCompleted}
                    todoCompletedAttribute={todoCompletedAttribute}
                    onToggle={actions.handleToggleComplete}
                />

                <div className="todo-item__content">
                    <TodoItemText
                        todoText={todoText}
                        isCompleted={isCompleted}
                        isEditing={isEditing}
                        editText={editText}
                        allowInlineEdit={allowInlineEdit}
                        todoTextAttribute={todoTextAttribute}
                        onStartEdit={actions.handleStartEdit}
                        onSaveEdit={actions.handleSaveEdit}
                        onCancelEdit={actions.handleCancelEdit}
                        onEditTextChange={setEditText}
                    />

                    <TodoItemMeta
                        showDueDate={showDueDate}
                        showCreatedDate={showCreatedDate}
                        showChangedDate={showChangedDate}
                        showOwner={showOwner}
                    >
                        {[
                            showDueDate && (
                                <TodoItemDate
                                    key="due"
                                    date={dueDate}
                                    dateType="due"
                                    isOverdue={isOverdue}
                                    isEditing={isEditingDate}
                                    editDate={editDate}
                                    dateAttribute={todoDateAttribute}
                                    onStartEdit={actions.handleStartEditDate}
                                    onSave={actions.handleSaveDate}
                                    onCancel={actions.handleCancelDateEdit}
                                    onEditChange={setEditDate}
                                    isEditable={true}
                                />
                            ),
                            (showCreatedDate && createdDate) ? (
                                <TodoItemDate
                                    key="created"
                                    date={createdDate}
                                    dateType="created"
                                    isEditable={false}
                                />
                            ) : null,
                            (showChangedDate && changedDate) ? (
                                <TodoItemDate
                                    key="changed"
                                    date={changedDate}
                                    dateType="changed"
                                    isEditable={false}
                                />
                            ) : null,
                            showOwner && (
                                <TodoItemOwner key="owner" owner={owner} />
                            )
                        ]}
                    </TodoItemMeta>
                </div>
            </div>

            <TodoItemActions
                showActions={showActions}
                isEditing={isEditing}
                todoTextAttribute={todoTextAttribute}
                onStartEdit={actions.handleStartEdit}
                onDelete={actions.handleDelete}
            />
        </div>
    );
}
