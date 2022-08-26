import React, { useEffect, useState } from "react";
import { NavLink, useParams , useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogo from "../../../layout/Header/HeaderLogo";
import Footer from "../../../layout/footer/footer";
import $ from "jquery";
import "jquery-validation";
import { useTranslation } from "react-i18next";
import ItemForm from "./ItemForm";
import { Text } from "../../../containers/Language";
import { useFormFields } from "../../../helpers/hooksFormInput";
import { resetWarningCache } from "prop-types";
import axios from "axios";
import config from "../../../Config";
import { ResetpasswordAction } from "../../../store/actions/User/Auth/AuthActions";

function ResetPasswordWithToken(props) {
  const [t, i18n] = useTranslation();
  const history = useHistory();
  const [valid, setValid] = useState();
  const [tokenData,setTokenData] = useState({})
  const [redirect,setRedirect] = useState('');
  let { token } = useParams();
  const [data,setData] = useState(false)
  const dispatch = useDispatch();
  const authResponse = useSelector((state) => state.userAuth.authResponse);
  const [fields, setfield] = useFormFields({
    password: ""
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const TogglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const verifToken = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/password/find/${token}`
    );
    if (res.status === 200) {
      setTokenData(res.data);
      setValid(true);
    } else {
      setValid(false);
    }
    setData(true);
  };

  const ChangePass = async ()=>{
      let datachange = {email: tokenData.email,token: tokenData.token, password: fields.password };
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/password/reset`,datachange);
      if(res.status === 200){
        setRedirect('true');
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }else{
          setRedirect('false');
      }
  }

  useEffect(() => {
    if(!data){
      verifToken();
    }
  });

  const HandlePassword = ()=>{

    if($("#form-login").valid()){
      if(fields.password.length>6){
        ChangePass();
      }else{
        setRedirect('false');
      }
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
                  src="/assets/images/passwordReset.svg"
                  alt="Dadupa Connect"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              {valid && (
                <div
                  className="form-wrapper"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "10px solid #00CC66",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    padding: "10px",
                  }}
                >

                {redirect === 'true'  && (
                  <div className="alert alert-success">
                     Password Changed Successfully! Redirection in progress ....
                  </div>
                )}

                {redirect === 'false'  && (
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
                      <button
                        type="submit"
                        name="submit"
                        onClick={HandlePassword}
                        style={{
                          width: "50%",
                          marginBottom: "50px",
                          borderTopLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                          borderTopRightRadius: "15px",
                          borderBottomLeftRadius: "15px",
                        }}
                      >
                        {t("CHANGER MOT DE PASSE")}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!valid && (
                <span
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "#00CC66",
                  }}
                >
                  This password reset token is invalid
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPasswordWithToken;
