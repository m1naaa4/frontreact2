import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import $ from "jquery";
import "jquery-validation";
import { useTranslation } from "react-i18next";
import ItemForm from "./ItemForm";
import { useFormFields } from "../../../helpers/hooksFormInput";
import axios from "axios";
import HeaderProfileSkeleton from "../../../skeleton/profile/HeaderProfileSkeleton";
import { toast, ToastContainer } from "react-toastify";


function ResetPasswordWithToken(props) {
  const [t, i18n] = useTranslation();
  const history = useHistory();
  const [valid, setValid] = useState();
  const [tokenData, setTokenData] = useState({});
  const [redirect, setRedirect] = useState("");
  let { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [messageStatus,setMessageStatus] = useState();
  const [hiddButton,setHiddeButton] = useState(false);
  const toastId = useRef(null);
  const [fields, setfield] = useFormFields({
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const TogglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const verifToken = async () => {
    setLoading(false);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/password/find/${token}`
    );
    if (res.status === 200) {
      setLoading(false);
      setTokenData(res.data);
      setValid(true);
    } else {
      setLoading(false);
      setValid(false);
    }
    setData(true);
  };

  const ChangePass = async () => {
    let datachange = {
      email: tokenData.email,
      token: tokenData.token,
      password: fields.password,
    };
    await axios.post(
      `${process.env.REACT_APP_API_URL}/password/reset`,
      datachange
    ).then(res => {
      setMessageStatus();
      setHiddeButton(true);
      setRedirect("true");
      toastId.current = toast("Password Changed! Redirection in Progress....", 90);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }).catch(err => {if(err.response.status === 401){
      console.log("hereeee")
      setMessageStatus("new password can not be the old password!");
      setRedirect("false");
    }else{setRedirect("false");}});



  };

  useEffect(() => {
    if (!data) {
      setLoading(true)
      verifToken();
    }
  }, []);

  const HandlePassword = () => {
    if ($("#form-login").valid()) {
      if (fields.password.length >= 6) {
        ChangePass();
      } else {
        setMessageStatus("Minimum 6 characters in password!");
      }
    }
  };

  return (
    <div>
      <HeaderLogo />

      <div className="Dadupa-Login">
        <div className="container">
          <div className="row">
                <div className="col-md-6 col-lg-7 d-none d-sm-block d-md-none d-lg-block">
                  <div className="page-image">
                    <img
                      src="/assets/images/passwordReset.svg"
                      alt="Dadupa Connect"
                    />
                  </div>
                </div>
            {(loading) ? (
              // <ProjectSkeleton />
              <div className="col-md-6 col-lg-5"> <HeaderProfileSkeleton /> </div>
            ) : (
              <>
                <div className="col-md-6 col-lg-5">
                  {(valid) && (
                    <div
                      className="form-wrapper"
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "10px",
                      }}
                    >
                      {(redirect === "true") && (
                        // <div className="alert alert-success" style={{fontWeight:"bold"}}>
                        //   Password Changed Successfully! Redirection in progress
                        //   ....
                        // </div>
                        <ToastContainer position="bottom-left" hideProgressBar={false} />
                      )}

                      {(redirect === "false" && !messageStatus ) && (
                        <div className="alert alert-danger">
                          Error while changing password, Please try again!
                        </div>
                      )}

                      <form
                        id="form-login"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        className="form-login"
                      >
                        <h3
                          className="form-title"
                          style={{
                            fontSize: "20px",
                            paddingBottom: "30px",
                            paddingTop: "20px",
                          }}
                        >
                          Veuillez changer votre mot de passe!
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
                              id="password"
                              name="password"
                              placeholder={t("password")}
                              className="input-password"
                              type={passwordShown ? "text" : "password"}
                              onChange={setfield}
                              required
                            />
                            <br/>
                            {messageStatus && (
                        <div className="alert alert-danger" style={{fontWeight:"bold"}}>
                          {messageStatus}
                        </div>
                      )}
                            <span
                              toggle="#password-field"
                              onClick={TogglePasswordVisiblity}
                              className="uil uil-eye field-icon toggle-password"
                            ></span>
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
                          

                        {(!hiddButton) && (<button
                            type="submit"
                            name="submit"
                            onClick={HandlePassword}
                            style={{
                              width: "50%",
                              marginBottom: "50px",
                              borderRadius: "30px"
                            }}
                          >
                            {t("CHANGER MOT DE PASSE")}
                          </button>)}
                          
                        </div>
                      </form>
                    </div>
                  )}

                  {(!valid) && (
                    <>
                    
                      <NavLink
                        to="/resetPassword"
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          style={{
                            color:"#00CC66",
                            fontWeight: "bold",
                            border: "3px solid #00CC66",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            fontSize: "15px",
                            borderRadius:"30px"
                          }}
                        >
                          {t("Go to reset password page")}
                        </span>
                      </NavLink>
                      <br/><br/>
                      <span
                        style={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          color: "#00CC66",
                        }}
                      >
                        This password reset token is invalid
                      </span>{" "}
                    </>
                  )}

                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPasswordWithToken;
