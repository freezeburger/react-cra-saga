import createSagaMiddleware from 'redux-saga';
import { put, all, take, call, delay } from 'redux-saga/effects'

// Saga Glossary : https://redux-saga.js.org/docs/Glossary.html

const TIME = 'http://worldclockapi.com/api/json/utc/now';
const fetchTime = () => {
    console.warn('API CALL')
    return fetch(TIME).then(res => res.json())
}

/* Worker Function */
function* updateTime() {

    while (true) {   
        yield put({type: '@@POLING_TIME_START' });
        const data = yield call(fetchTime);
        yield put({type: '@@POLING_TIME_END', data });
        yield delay(5000)
        yield put({type: '@@POLING_TIME_RETRY' });
    }
}

function* rootSagaWatcher() {

    yield take('INIT_SAGA_WORKERS');

    yield all([
        // Other watchers (or Workers)...
        updateTime()
    ]);
}

const timeSagaMiddleware = createSagaMiddleware();
const timeSagaRun = () => timeSagaMiddleware.run(rootSagaWatcher);

export {timeSagaMiddleware,timeSagaRun};