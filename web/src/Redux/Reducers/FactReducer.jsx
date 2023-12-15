import {
    FACT_BEGIN,
    FACT_SUCCESS,
    FACT_FAILURE,
    FACTLISTING_BEGIN,
    FACTLISTING_SUCCESS,
    FACTLISTING_FAILURE,
    FACTVIEW_BEGIN,
    FACTVIEW_SUCCESS,
    FACTVIEW_FAILURE,
    FACTDELETE_BEGIN,
    FACTDELETE_SUCCESS,
    FACTDELETE_FAILURE
} from '../Actions/actionConsts'

const factlist = []
const factlistID = null
const initialState = { factlist, factlistID }

export default function (state = initialState, fact) {
    const { type, payload } = fact
    switch (type) {
        case FACT_BEGIN:
            return {
                ...state,
                error: null
            }
        case FACT_SUCCESS:
            let isExist = false
            state.factlist.map((i) => {
                if (i.factId === payload.data.factId) {
                    isExist = true
                    i.factTitle = payload.data.factTitle
                    i.factDescription = payload.data.factDescription
                }
            })
            if (isExist) {
                return {
                    ...state,
                    factlist: state.factlist,
                    loading: false,
                    error: null
                }
            } else {
                return {
                    ...state,
                    factlist: [...state.factlist, payload.data],
                    loading: false,
                    error: null
                }
            }
        case FACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: fact.payload
            }
        case FACTLISTING_BEGIN:
            return {
                ...state,
                error: null,
                loading: true
            }
        case FACTLISTING_SUCCESS:
            return {
                ...state,
                factlist: payload.data,
                loading: false,
                error: null
            }
        case FACTLISTING_FAILURE:
            return {
                ...state,
                loading: false,
                error: fact.payload
            }

        case FACTDELETE_BEGIN:
            return {
                ...state,
                error: null,
                loading: true
            }
        case FACTDELETE_SUCCESS:
            return {
                ...state,
                factlistID: payload,
                loading: false,
                error: null
            }
        case FACTDELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: fact.payload
            }
        default:
            return state
    }
}
