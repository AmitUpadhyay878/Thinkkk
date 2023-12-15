import React, { Suspense, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import vectorImg from '../../../../../assets/dashboardimg/actionvector.svg'
import { ReactComponent as EditSVGIcon } from '../../../../../assets/images/EditSVGIcon.svg'
import { ReactComponent as DeleteSVGIcon } from '../../../../../assets/images/DeleteSVGIcon.svg'
import congratsImg from '../../../../../assets/dashboardimg/congrats.png'
import gif from '../../../../../assets/dashboardimg/vector.gif'
import { ReactComponent as RightarrowIcon } from '../../../../../assets/images/rightarrow.svg'
import Deletemodal from '../../../../../components/Deletemodal/Deletemodal'
import CreateModal from '../../../../../components/CreateModal/CreateModal'
import { ReactComponent as SearchIcon } from '../../../../../assets/dashboardimg/search.svg'
import {
    actionitemAction,
    actionItemListingAction
} from '../../../../../Redux/Actions/ActionItemActions'
import request from '../../../../../util/request'
import { thoughViewAction } from '../../../../../Redux/Actions/ThoughAction'

//LazyLoaded Component
const Button = React.lazy(() =>
    import('../../../../../components/Button/Button')
)

const ActionItem = ({ isActiveTab ,viewActionADta ,setActionCount}) => {
    const { actionitems, actionitemsID } = useSelector(
        (state) => state.ActionItem
    )
    const dispatch = useDispatch()
    const { thoughtId } = useParams()
    const [currentID, setCurrentID] = useState('')
    const [actionShow, setActionShow] = useState(false)
    const [editId, setEditId] = useState()
    const [editActionShow, setEditActionShow] = useState(false)
    const [isActionCompleted, setIsActionCompleted] = useState(false)
    const [show, setShow] = useState(false)

    const [actionSearch, setActionSearch] = useState()
    const handleChangeSearch = (event) => {
        setActionSearch(event.target.value)
    }

    useEffect(() => {
        if (isActiveTab && !actionShow) {
            dispatch(
                actionItemListingAction({ thoughtId, search: actionSearch })
            )
        }
    }, [
        actionShow,
        thoughtId,
        editActionShow,
        actionitemsID,
        isActionCompleted,
        isActiveTab,
        actionSearch
    ])

    const handleAction = () => {
        setCurrentID(thoughtId)
        setActionShow(true)
    }
    const editActionhandler = (id) => {
        setEditId(id)
        setEditActionShow(true)
    }

    const handleChecked = async (id, name, ev) => {
        dispatch(
            actionitemAction(
                {
                    thoughtId,
                    actionId: id,
                    isCompleted: ev,
                    actionName: name
                },
                () => {}
            )
        ).then((res) => {
            if (ev === true){
                dispatch(thoughViewAction({ thoughtId: thoughtId }))
                setShow(true)
            } else {
                dispatch(thoughViewAction({ thoughtId: thoughtId }))
            }
        })
    }
    const [deleteActionId, setDeleteActionId] = useState(null)
    const [delShow, setDelShow] = useState(false)

    const onHandleClickDeletAction = (id) => {
        setDeleteActionId(id)
        setDelShow(true)
    }
    useEffect(() => {
        if (show) {
            document.querySelector('body').classList.add('active')
        } else {
            document.querySelector('body').classList.remove('active')
        }
    }, [show])

    return (
        <div className="action-wholebox">
            <div className="header-box">
                <div className="title-text">
                    <h2>Action Items</h2>
                </div>
                <div className="head-btnbox">
                    <div className="lang-account-box search-box">
                        <Form.Group
                            className="formbox"
                            controlId="formBasicEmail"
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="icontrol"
                                onChange={(e) => handleChangeSearch(e)}
                            />
                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                        </Form.Group>
                    </div>

                    <Suspense fallback={<div>Loading...</div>}>
                        <Button
                            isLink={false}
                            logoClass="plus"
                            addedClass="quesc"
                            text="Create Action Item"
                            onClick={
                                thoughtId ? handleAction : editActionhandler
                            }
                            // onClick={handleAction}
                        />
                    </Suspense>

                    <CreateModal
                        setEditId={setEditId}
                        editId={editId}
                        show={actionShow || editActionShow}
                        setShow={
                            editActionShow ? setEditActionShow : setActionShow
                        }
                        viewActionADta={viewActionADta}
                        title="Create Action Item"
                        lblTitle="Action Item Title"
                        lblPlaceHolder="I need $10,000 as capital"
                    />
                </div>
            </div>
            {actionitems && actionitems.length === 0 ? (
                <>
                    <div className="actionvector-box">
                        <div className="vector-image">
                            <img
                                src={vectorImg}
                                alt=""
                                className="img-fluid"
                                loading="lazy"
                            />
                            <p>You haven’t added action item over here.</p>
                            <p>
                                <span>
                                    So please create and complete the action
                                    item
                                </span>
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="actioncard">
                        <Form>
                            {actionitems &&
                                actionitems.map((action, i) => {
                                    return (
                                        <div className="card-body" key={i}>
                                            <div className="checkbox-editbox">
                                                <Form.Group
                                                    className="form-checkbox"
                                                    id="formGridCheckbox"
                                                >
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={
                                                            action.actionName
                                                        }
                                                        onChange={(e) =>
                                                            handleChecked(
                                                                action.actionId,
                                                                action.actionName,
                                                                e.target.checked
                                                            )
                                                        }
                                                        checked={
                                                            action.isCompleted 
                                                                ? action.isCompleted
                                                                : false
                                                        }
                                                        disabled={
                                                            isActionCompleted
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </Form.Group>
                                                <div className="action-edit-box">
                                                    <button
                                                        className="edit-btn"
                                                        type="button"
                                                        onClick={() => {
                                                            editActionhandler(
                                                                action.actionId
                                                            )
                                                        }}
                                                    >
                                                        <span>
                                                            <EditSVGIcon />
                                                        </span>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="edit-btn"
                                                        type="button"
                                                        onClick={() =>
                                                            onHandleClickDeletAction(
                                                                action.actionId
                                                            )
                                                        }
                                                    >
                                                        <span>
                                                            <DeleteSVGIcon />
                                                        </span>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Form>
                        <Deletemodal
                            show={delShow}
                            setShow={setDelShow}
                            deleteActionId={deleteActionId}
                            viewActionADta={viewActionADta}
                        />
                    </div>

                    {show ? (
                        <div className="backdrop-card">
                            <div className="card congratulations">
                                <div className="card-body">
                                    <div className="vector-image">
                                        <img
                                            src={congratsImg}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="vector-gif">
                                        <img src={gif} alt="" loading="lazy" />
                                    </div>
                                    <div className="card-content">
                                        <h2>Congratulations</h2>
                                        <p>
                                            You have successfully completed the
                                            action items.
                                        </p>
                                        <button
                                            className="common-btn"
                                            onClick={() => setShow(false)}
                                        >
                                            Continue{' '}
                                            <span className="ms-1">
                                                <RightarrowIcon />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            )}
        </div>
    )
}

export default React.memo(ActionItem)
