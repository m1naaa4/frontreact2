import React, { Component } from "react";
import PropTypes from "prop-types";
import UilLinkedin from "@iconscout/react-unicons/icons/uil-linkedin-alt";
import config from "../../../../../Config";

class LinkedIn extends Component {
    componentDidMount() {
        this.restart();
    }
    getURL = (clientId, state, scope) => {
        var url = config.urls.front;
        const current = encodeURIComponent(url+'/login');
        const base =
            "https://www.linkedin.com/oauth/v2/authorization?response_type=code&";

        const fullScope =
            scope && scope.length
                ? `&scope=${encodeURIComponent(scope.join(" "))}`
                : "";

        return `${base}client_id=${clientId}&redirect_uri=${current}&state=${state}${fullScope}`;
    };
    restart = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUri = localStorage.linkedInReactRedirectUri;
        const previousState = localStorage.linkedInReactState;

        localStorage.linkedInReactState = "";
        localStorage.linkedInReactRedirectUri = "";

        const newState = urlParams.get("state");
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        let newURL = window.location.pathname;
        urlParams.delete("state");
        urlParams.delete("error");
        urlParams.delete("error_description");
        urlParams.delete("code");
        if (urlParams.toString()) {
            newURL = newURL + "?" + urlParams.toString();
        }

        window.history.replaceState(null, null, newURL);

        if (error) {
            this.props.callback(error, null, null);
        } else if (redirectUri && code && previousState === newState) {
            this.props.callback(null, code, redirectUri);
        }
    };

    start = () => {
        const { clientId, scope } = this.props;
        const state = Math.random()
            .toString(36)
            .substring(7);
        localStorage.linkedInReactState = state;
        localStorage.linkedInReactRedirectUri = window.location.href;
        window.location.href = this.getURL(clientId, state, scope); // build url out of clientid, scope and state
    };
    render() {
        return (
            <a href="#!"
               data-toggle="tooltip"
               data-placement="bottom"
               title="Sign up with Facebook"
               onClick={this.start}
            >
                <UilLinkedin/>
            </a>
        );
    }
}

LinkedIn.propTypes = {
    clientId: PropTypes.string,
    callback: PropTypes.func.isRequired,
    className: PropTypes.string,
    text: PropTypes.node,
    scope: PropTypes.arrayOf(PropTypes.string)
};

export default LinkedIn;