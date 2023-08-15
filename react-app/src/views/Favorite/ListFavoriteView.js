import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FavoritesSkeleton from '../../skeleton/profile/FavoritesSkeleton';
import { ListFavoritesAction } from '../../store/actions/Favorite/FavoritesAction';
import NoContent from '../../utils/NoContent';
import FavoriteGrid from './FavoriteGrid';
import ProjectGridView from '../Projects/ProjectGridView';
import ListingItemFunder from '../Funder/ListingItemFunder';
import ListingItemMentor from '../Mentor/ListingItemMentor';


export default function ListFavoriteView(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      'url': 'favorite/getFavorites'
    }
    dispatch(ListFavoritesAction(data));
  }, [])

  const loading = useSelector(state => state.userProfile.loading);
  const favorites = useSelector(state => state.userProfile.favorites);

  if (loading) {
    return <FavoritesSkeleton />
  }
  return (
    <div className="Favoris-List">
      <div className="button-group filter-button-group">
        {/* <button className="button" data-filter="*">Tous</button>
        <button className="button" data-filter=".historiques">Historiques</button>
        <button className="button" data-filter=".offres">Offres</button> */}
        <div style={{marginLeft:"20px"}}><span style={{fontWeight:"bold",fontSize:"20px",color:"#00b601"}}>Favorites Page</span></div>
      </div>
      <div className="row">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <div className="col-4" key={index + 1}>
              {/* <FavoriteGrid favorite={favorite} key={index} /> */}
              {(function() {
                                            
                switch (favorite.provider) {
                    case "project":
                        return <ProjectGridView project={favorite}/>;
                    case "funder":
                        return <ListingItemFunder project={favorite}/>;
                    case "mentor":
                        return <ListingItemMentor project={favorite}/>;
                    default:
                        return null;
                }
            })()}
            </div>
          ))
        ) : (
          <NoContent/>
        )}
        <div className="grid-sizer col-1"></div>
      </div>
    </div>
  )
}
