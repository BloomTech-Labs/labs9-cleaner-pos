import { number } from 'yup';

export interface AssistantsEnum extends Array<Assistant> {}
export interface ListProps {
    list: List[];
    type: string;
    list_id?: number;
    submitNew: any;
    deletetasks: any;
    deleteList?: any;
}

export interface Assistant {
    id?: number;
    name: string;
    address: string;
    manager?: string;
    checkList?: any;
}

export interface Lists {
    before: List[];
    during: List[];
    after: AfterLists[];
    before_id: number;
    during_id: number;
    after_id?: number;
}

interface AfterLists {
    time: string;
    afterLists: List[];
    after_id: number;
}

export interface List {
    task: string;
    items_id: number;
}
