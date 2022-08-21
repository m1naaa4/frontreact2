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

function ResetPasswordView() {
  const [t, i18n] = useTranslation();

  const [fields, setfield] = useFormFields({
    email: "",
  });

  return (
    <div>
      <HeaderLogo />

      <div className="Dadupa-Login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8 d-none d-sm-block d-md-none d-lg-block">
              <div className="page-image">
                <img
                  src="/assets/images/Reset-password.svg"
                  alt="Dadupa Connect"
                />
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="form-wrapper">
                <form
                  id="form-login"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="form-login"
                >
                  <h3 className="form-title" style={{ fontSize: "30px" }}>
                    Reset Password!
                  </h3>
                  <div className="form-inputs">
                    <div className="input-row">
                      <ItemForm
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={setfield}
                        placeholder="Type your email addresse"
                        margin="normal"
                        variant="outlined"
                        id="email"
                        className="wizard-required"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-submit">
                    <button type="submit" name="submit">
                      {t(" Click to reset")}
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
