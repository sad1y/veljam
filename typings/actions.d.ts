declare namespace Actions {
    interface IAction {
        type: any;
    }

    type ActionType<T extends IAction> = T['type'];
}

declare namespace Actions.Tests {
    interface IFailure {
        type: 'Failure';
        error: string;
    }

    interface IIncrement {
        type: 'Increment';
    }

    interface IDecrement {
        type: 'Decrement';
    }

    interface IReset {
        type: 'Reset';
    }

    interface ILoadData {
        type: 'LoadData';
    }

    interface ILoadDataSuccess {
        type: 'LoadDataSuccess';
        data: any;
    }

    interface IStartClock {
        type: 'StartClock';
    }

    interface ITickClock {
        type: 'TickClock';
        light: boolean;
        ts: number;
    }
}
