import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListFavoritesAction } from '../../store/actions/Favorite/FavoritesAction';
import FavoriteGrid from './FavoriteGrid';





export default function ListFavoriteView(props) { 
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      'url' : 'favorites'
    }
    dispatch(ListFavoritesAction(data));
  },[])

  const favorites = useSelector(state => state.userProfile.favorites);
    return (
        <>  
        <div className="Favoris-List">
          <div className="button-group filter-button-group">
            <button className="button" data-filter="*">Tous</button>
            <button className="button" data-filter=".historiques">Historiques</button>
            <button className="button" data-filter=".offres">Offres</button>
          </div>

          <div className="grid">
            {
              favorites &&
                favorites?.map((favorite, index) => (
                <FavoriteGrid favorite={favorite} key={index}/>
              ))
            }
            <div className="grid-sizer col-1"></div>
          </div>
        </div>
        </>
    
           
        
    )
}
