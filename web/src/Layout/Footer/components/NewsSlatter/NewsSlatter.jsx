import React from 'react'
import { Form } from 'react-bootstrap'
import Button from '../../../../components/Button'
import { useForm } from 'react-hook-form'
const NewsSlatter = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (email) => {
        reset()
    }

    return (
        <div className="fourth-part">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="footer-links">
                    <div className="links-title">Subscribe Newsletter</div>
                    <Form.Group className="mb-3 form-box" controlId="formBasicEmail">
                        <Form.Control className="icontrol" type="email" placeholder="Enter your email here" name="email"    {...register("email", {
                            pattern: {
                                value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter Valid Email",
                            },
                            required: true
                        })}
                        />
                        <div className="submit-btn">
                            <Button isLink={true} type="submit" text="" />
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </div>
    )
}

export default NewsSlatter