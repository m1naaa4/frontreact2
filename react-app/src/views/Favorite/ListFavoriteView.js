import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListFavoritesAction } from '../../store/actions/Favorite/FavoritesAction';
import FavoriteGrid from './FavoriteGrid';
import { useHistory } from 'react-router';


export default function ListFavoriteView(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      'url': 'favorite/getFavorites'
    }
    dispatch(ListFavoritesAction(data));
  }, [])
  const history = useHistory();

  const favorites = useSelector(state => state.userProfile.favorites);

  if (favorites?.length > 0) {
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
                <div  className="col-4"   key={index +1}>
                    <FavoriteGrid favorite={favorite} key={index} />
               </div>
              )
              
            })
          }
          <div className="grid-sizer col-1"></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='single-header mt-5'>
        <h3 style={{ fontSize: "16px !important" }} className="single-offer-name">No content available</h3>

        <img style={{ height: '50vh' }} src="/assets/images/no-data.png" alt="No content available" />

        <button onClick={history.goBack} style={{ width: '200px' }} name="previous" className="previous action-button">
          <i className="uil uil-arrow-left  "></i> Previous
        </button>
      </div>
    )
  }

}
