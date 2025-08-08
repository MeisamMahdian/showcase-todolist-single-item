/**
 * This file was generated from TodoListItems.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface TodoListItemsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    todoTextAttribute: EditableValue<string>;
    todoCompletedAttribute: EditableValue<boolean>;
    todoDateAttribute?: EditableValue<Date>;
    todoCreatedDateAttribute?: EditableValue<Date>;
    todoChangedDateAttribute?: EditableValue<Date>;
    todoOwnerAttribute?: EditableValue<string>;
    onChangeAction?: ActionValue;
    onDeleteAction?: ActionValue;
    showDueDate: boolean;
    showCreatedDate: boolean;
    showChangedDate: boolean;
    showOwner: boolean;
    allowInlineEdit: boolean;
    compactView: boolean;
    showActions: boolean;
}

export interface TodoListItemsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    todoTextAttribute: string;
    todoCompletedAttribute: string;
    todoDateAttribute: string;
    todoCreatedDateAttribute: string;
    todoChangedDateAttribute: string;
    todoOwnerAttribute: string;
    onChangeAction: {} | null;
    onDeleteAction: {} | null;
    showDueDate: boolean;
    showCreatedDate: boolean;
    showChangedDate: boolean;
    showOwner: boolean;
    allowInlineEdit: boolean;
    compactView: boolean;
    showActions: boolean;
}
