import { useEffect } from 'react'
import { LikeAction } from "../store/actions/Like/LikeAction";
import { useDispatch } from 'react-redux';

  
export const likeHelper = (provider, provider_id, like) => {
        const dispatch = useDispatch();

        useEffect(() => 
        {
          const data = {
            provider_id: provider_id,
            provider: provider,
            type: like ? 'dislike' : 'like',
          };
    
          return dispatch(LikeAction(data, '/like'));
        },
        [provider, provider_id, like]
      );
}