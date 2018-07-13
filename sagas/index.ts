import { delay } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

es6promise.polyfill();


// function* runClockSaga() {
//     yield take(startClockActoinType);
//     while (true) {
//         yield put<Actions.Tests.ITickClock>({ type: 'TickClock', light: false, ts: Date.now() });
//         yield call(delay, 1000);
//     }
// }

// function* loadDataSaga() {
//     try {
//         const res = yield fetch('https://jsonplaceholder.typicode.com/users');
//         const data = yield res.json();
//         yield put<Actions.Tests.ILoadDataSuccess>({ type: 'LoadDataSuccess', data });
//     } catch (error) {
//         yield put<Actions.Tests.IFailure>({ type: 'Failure', error });
//     }
// }

function* rootSaga() {
    yield all([
        // call(runClockSaga), 
        // takeLatest(loadDataType, loadDataSaga)
    ]);
}

export default rootSaga;
