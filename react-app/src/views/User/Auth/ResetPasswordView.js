import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import $ from "jquery";
import "jquery-validation";
import { useTranslation } from "react-i18next";
import ItemForm from "./ItemForm";
import { useFormFields } from "../../../helpers/hooksFormInput";
import { ResetpasswordAction } from '../../../store/actions/User/Auth/AuthActions';
import Spinner from 'react-bootstrap/Spinner';

function ResetPasswordView(props) {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const [clicked,setClicked] = useState(false)
  const authResponse = useSelector(state => state.userAuth.authResponse);
  const [fields, setfield] = useFormFields({
    email: "",
  });

 
  const HandleReset = ()=>{

    if($("#form-login").valid()){
        dispatch(ResetpasswordAction(fields, props.props));
        setClicked(true)
    };
  }

  return (
    <div>
      <HeaderLogo />

      <div className="Dadupa-Login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 d-none d-sm-block d-md-none d-lg-block">
              <div className="page-image">
                <img
                  src="/assets/images/Forgotpassword_Illustration.svg"
                  alt="Dadupa Connect"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div
                className="form-wrapper"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
              >
                {authResponse === 'false' && (
                  <div className="alert alert-danger">
                     Please verify if the email is correct and try again!
                  </div>
                )}
                <form
                  id="form-login"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="form-login"
                >
                  <div className="login-link" style={{ marginBottom: "20px" }}>
                    <span style={{ marginRight: "20px", fontSize: "15px" }}>
                      {t("Vous n'avez pas de compte?")}{" "}
                    </span>
                    <NavLink to="/register" style={{ textDecoration: "none" }}>
                      <span
                        style={{
                          border: "3px solid #00CC66",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          fontSize: "12px",
                          borderRadius:"30px"
                        }}
                      >
                        {t("S'INSCRIRE")}
                      </span>
                    </NavLink>
                  </div>

                  { (authResponse !== 'true') && (<><h3
                    className="form-title"
                    style={{ fontSize: "20px", paddingBottom: "30px" }}
                  >
                    Réinitialiser le mot de passe
                  </h3>
                  <div
                    className="form-inputs"
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      marginBottom: "35px",
                    }}
                  >
                    <div className="input-row">
                      <ItemForm
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={setfield}
                        placeholder={t("Adresse électronique")}
                        margin="normal"
                        variant="outlined"
                        id="email"
                        className="wizard-required"
                        required
                      />
                    </div>
                  </div>
                  <div
                    className="form-submit"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="submit"
                      name="submit"
                      onClick={HandleReset}
                      style={{
                        width: "50%",
                        marginBottom: "50px",
                        borderRadius: "30px"
                      }}
                    >
                      {t("RÉINITIALISER")}
                      {(clicked) &&  <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />}
                    </button>
                  </div></>)}

                  {
                    (authResponse ==='true' ) && (
                      <div className="alert alert-success">
                         Please Check Your Inbox to reset your Password!
                      </div>
                    )
                  }
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPasswordView;
