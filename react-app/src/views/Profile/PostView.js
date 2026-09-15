import React from 'react';
import AddPostView from './Post/AddPostView';
import ListPostsView from './Post/ListPostsView';

export default function PostView(props) {
    return (
        <div className="col-12">
            <div className="Center-Side Profile-History-Layout">
                <div className="Profile-History-Hero">
                    <div>
                        <p className="Profile-History-Kicker">History</p>
                        <h2 className="Profile-History-Title">Publications du profil</h2>
                        <p className="Profile-History-Subtitle">Retrouvez ici les actualités, idées et réalisations partagées sur ce profil.</p>
                    </div>
                </div>

                <div className="Profile-History-Grid">
                    <div className="Profile-History-Main">
                        <AddPostView {...props} />
                        <div className="Posts-List Profile-History-Feed">
                            <ListPostsView {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
