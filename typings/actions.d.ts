declare namespace Actions {
    interface IAction {
        type: any;
    }

    type ActionType<T extends IAction> = T['type'];
}

