import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderProfile from "../layout/Header/HeaderProfile";
import ArticlesList from '../pages/Admin/articles/ArticlesList';
import ArticleDetails from '../pages/Admin/articles/ArticleDetails';
import ArticleAuthor from '../pages/Admin/articles/ArticleAuthor';
import Footer from "../layout/footer/footer";
import { useDispatch } from 'react-redux';
import { getPopulareArticles, getSuggrestionArticles } from '../store/actions/Articles/ArticlesActions';


export default function ArticlePrivateRoutes(props) {

    const dispatch = useDispatch();
    dispatch(getPopulareArticles());
    dispatch(getSuggrestionArticles());

    return (
        <div>
            <HeaderProfile props={props} />
            <div className="Dadupa-Page">
                <Switch>
                    <Route exact path={`${props.match.path}/`} component={ArticlesList} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/` }} />
                    )} />

                    <Route exact path={`${props.match.path}/:id`} component={ArticleDetails} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/:id` }} />
                    )} />

                    <Route exact path={`${props.match.path}/author/:id`} component={ArticleAuthor} />
                    <Route exact path={props.match.path} render={props => (
                        <Redirect to={{ pathname: `${props.match.path}/author/:id` }} />
                    )} />
                </Switch>
            </div>
            <Footer />

        </div>
    )
}
