import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    settings,
    subscriptionplan,
    thoughts
} from '../../../config/routingConsts'
import request from '../../../util/request'

const DropDownSearch = ({ results }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const thoughtId = useParams()
    console.log('ID', thoughtId)
    const handleClick = (result) => {
        const id = result._id
        const model = result.model
        request(
            'POST',
            '/dashboard/search',
            { search: id, model: model },
            {},
            true
        )
            .then((res) => {
                console.log(model, '------------------response model-------')

                switch (model) {
                    case 'action': {
                        return navigate(`${thoughts}/${thoughtId}`)
                    }
                    case 'facts': {
                        return navigate(settings)
                    }

                    case 'journal': {
                        return navigate(subscriptionplan)
                    }

                    case 'question': {
                        return navigate(settings)
                    }

                    case 'thought': {
                        return navigate(thoughts, { state: 'Challenges' })
                    }
                }
            })
            .catch((e) => console.log(e, 'error'))
    }
    return (
        <div className="dropdown-panel">
            {results.map((result) => (
                <div className="items">
                    {' '}
                    <p key={result._id} onClick={() => handleClick(result)}>
                        {' '}
                        {result.text}
                    </p>{' '}
                </div>
            ))}
        </div>
    )
}
export default DropDownSearch
