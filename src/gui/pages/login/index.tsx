import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import useLogin from "../../../hooks/useLogin";
import { LoginCredentials } from "../../../services/api/loginService";
import { FormikForm } from "../../components/formikForm/FormikForm";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  })
  const { username, password } = credentials
  const { loginSuccess, loginError } = useLogin(username, password)
  const history = useHistory()

  useEffect(() => {
    if (loginSuccess) {
      history.push(`/dashboard`)
    }
    // eslint-disable-next-line
  }, [loginSuccess])


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <FormikForm handleLogin={setCredentials} errorMessage={loginError} />
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default LoginForm;
