import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
import Resetpassword from "../../../pages/User/Auth/Resetpassword";
import axios from "axios";
import config from "../../../Config";

function ResetPasswordView(props) {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const [fields, setfield] = useFormFields({
    email: "",
  });

  const Resetpassword = () => {
    console.log("reset password");
  };

  return (
    <div>
      <HeaderLogo />

      <div className="Dadupa-Login">
        <div
          className="container"
          style={{
            width: "40%",
            height: "370px",
            border: "10px solid #00CC66",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <div>
            <div>
              <div className="form-wrapper">
                <form
                  id="form-login"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="form-login"
                >
                  <div className="login-link" style={{marginBottom:"20px"}}>
                    <span style={{marginRight:"20px",fontSize:"15px"}}>{t("Vous n'avez pas de compte?")} </span>
                    <NavLink to="/register" style={{textDecoration:"none"}}> 
                       <span style={{ border:"3px solid #00CC66",paddingLeft:"15px",paddingRight:"15px",paddingTop:"5px",paddingBottom:"5px",fontSize: "12px",borderTopRightRadius: "10px",borderBottomLeftRadius:"10px" }}>{t("S'INSCRIRE")}</span> 
                    </NavLink>
                  </div>
                  <h3
                    className="form-title"
                    style={{ fontSize: "20px", paddingBottom: "30px" }}
                  >
                    Réinitialiser le mot de passe
                  </h3>
                  <div
                    className="form-inputs"
                    style={{ paddingLeft: "10px", paddingRight: "10px",marginBottom:"35px" }}
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
                      onClick={Resetpassword}
                      style={{ width: "50%", marginBottom: "50px",borderTopLeftRadius: "0px",borderBottomRightRadius:"0px",borderTopRightRadius: "15px",borderBottomLeftRadius:"15px" }}
                    >
                      {t("RÉINITIALISER")}
                    </button>
                  </div>
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
