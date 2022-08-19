import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FavoritesSkeleton from '../../skeleton/profile/FavoritesSkeleton';
import { ListFavoritesAction } from '../../store/actions/Favorite/FavoritesAction';
import NoContent from '../../utils/NoContent';
import FavoriteGrid from './FavoriteGrid';


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

  if (!loading && favorites?.length > 0) {
    return (
      <div className="Favoris-List">
        <div className="button-group filter-button-group">
          <button className="button" data-filter="*">Tous</button>
          <button className="button" data-filter=".historiques">Historiques</button>
          <button className="button" data-filter=".offres">Offres</button>
        </div>
        <div className="row">
          {
            favorites &&
            favorites?.map((favorite, index) => {

              return (
                <div className="col-4" key={index + 1}>
                  <FavoriteGrid favorite={favorite} key={index} />
                </div>
              )

            })
          }
          <div className="grid-sizer col-1"></div>
        </div>
      </div>
    )
  } else if (favorites?.length > 0) {
    return <NoContent />
  }

  return <FavoritesSkeleton />
}
