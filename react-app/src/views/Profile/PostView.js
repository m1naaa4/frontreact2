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
                        <h2 className="Profile-History-Title">Activité récente</h2>
                        <p className="Profile-History-Subtitle">Un flux plus propre et plus lisible, centré sur les publications.</p>
                    </div>
                </div>

                <div className="Profile-History-Grid">
                    <div className="Profile-History-Main">
                        <AddPostView {...props} />
                        <div className="Posts-List Profile-History-Feed">
                            <ListPostsView {...props} />
                        </div>
                    </div>
                    <aside className="Profile-History-Sidebar">
                        <div className="Widget-BOX Profile-History-Card">
                            <h3 className="Widget-Title">Repères</h3>
                            <p className="Profile-History-SideText">Les publications apparaissent dans une timeline plus compacte, avec moins de bruit visuel.</p>
                        </div>
                        <div className="Widget-BOX Profile-History-Card">
                            <h3 className="Widget-Title">Conseil</h3>
                            <p className="Profile-History-SideText">On garde le feed lisible et on évite les blocs qui s’empilent trop verticalement.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
