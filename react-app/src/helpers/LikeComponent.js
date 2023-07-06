import React from 'react';
import { LikeAction } from '../store/actions/Like/LikeAction';

export const LikeComponent = (provider, provider_id, like) => {

  const likeAction = () => {
    setLike(!like);
    setInitial(false);

    const data = {
        provider_id: provider,
        provider: provider_id,
        type: like ? 'dislike' : 'like',
      };

      return dispatch(LikeAction(data, '/like'));

    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
}

  

  return (
    <button className={like ? 'reaction-button reaction-like post-liked' : 'reaction-button reaction-like'}
        onClick={likeAction} toggle="#password-field" type="button" name="button">
        <img src={like ? "/assets/images/icons/dadupa-clap-green.svg" : "/assets/images/icons/dadupa-clap.svg"} alt="" />
        {like ? "Dislike" : "Like"}
    </button>
  );
}

export default LikeComponent;