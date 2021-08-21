import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../textField/TextField';
import { LoginCredentials } from '../../../services/api/loginService';
import { Button, Card, CardBody, CardTitle, FormGroup } from 'reactstrap';
import './css/FormikForm.css'

type FormikFormProps = {
    handleLogin: (credentials: LoginCredentials) => void,
    errorMessage: string
}

export const FormikForm = (props: FormikFormProps) => {

    const { handleLogin, errorMessage } = props

    const validationSchema = Yup.object({
        username: Yup.string()
            .max(5, 'Must be 5 characters or less.')
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters .')
            .required('Password is required')
    })

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={(values) => {
                handleLogin(values)
            }}
            validationSchema={validationSchema}
        >
            {formik =>
                <div>
                    <Card className="loginCard">
                        <CardBody>
                            <CardTitle className="loginTitle" tag="h3">Login</CardTitle>
                            {errorMessage !== ''
                                ? <FormGroup className="loginLabelErrorGroup"><label className="loginLabelError">{errorMessage}</label> </FormGroup>
                                : <></>
                            }
                            <Form>
                                <FormGroup>
                                    <TextField
                                        label="Username"
                                        name="username"
                                        placeholder="johndoe"
                                        type="text"
                                        value={formik.values.username}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        placeholder="********"
                                        type="password"
                                        value={formik.values.password}
                                    />
                                </FormGroup>
                                <FormGroup className="loginButtonGroup">
                                    <Button data-testid="loginButton" className="loginButton" type="submit" color="primary">Login</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </div>

            }
        </Formik>
    )
}