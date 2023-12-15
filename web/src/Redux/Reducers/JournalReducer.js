import {
    JOURNAL_ADDEDIT_BEGIN,
    JOURNAL_ADDEDIT_SUCCESS,
    JOURNAL_ADDEDIT_FAILURE,
    JOURNALS_LIST_FAILURE,
    JOURNALS_LIST_SUCCESS,
    JOURNALS_LIST_BEGIN,
    JOURNAL_DELETE_BEGIN,
    JOURNAL_DELETE_SUCCESS,
    JOURNAL_DELETE_FAILURE
} from '../Actions/actionConsts'

const initialState = { journals: [], loading: false, error: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case JOURNAL_ADDEDIT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case JOURNAL_ADDEDIT_SUCCESS: {
            let alreadyExist = false
            state?.journals?.map((j) => {
                if (j.journalId === payload.data.journalId) {
                    alreadyExist = true
                    j.journalTitle = payload.data.journalTitle
                    j.journalDescription = payload.data.journalDescription
                }
            })

            if (alreadyExist) {
                return {
                    ...state,
                    loading: false,
                    error: null
                }
            } else {
                return {
                    ...state,
                    journals: [...state.journals, payload.data],
                    loading: false,
                    error: null
                }
            }
        }

        case JOURNAL_ADDEDIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case JOURNALS_LIST_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case JOURNALS_LIST_SUCCESS:
            return {
                ...state,
                journals: payload.data,
                loading: false,
                error: null
            }
        case JOURNALS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case JOURNAL_DELETE_BEGIN:
            return {
                ...state,
                loading: true,
                error: false
            }
        case JOURNAL_DELETE_SUCCESS:
            const removeDeleted = state.journals?.filter(
                (j) => j.journalId !== payload.journalId
            )
            return {
                ...state,
                journals: removeDeleted,
                loading: false,
                error: null
            }
        case JOURNAL_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}
