import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Follower(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [Followed, setFollowed] = useState(false);
  const [isFollowed, setisFollowed] = useState(false);

  const onFollowing = () => {
    let FollowerVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (isFollowed) {
      //when we are already subscribed
      axios
        .post(
          /*localhost123*/ 'https://relay14-server.herokuapp.com/api/follow/unfollowFriend',
          FollowerVariables
        )
        .then((response) => {
          if (response.data.success) {
            setFollowed(!Followed);
            setisFollowed(!isFollowed);
          } else {
            alert('Failed to unfollow');
          }
        });
    } else {
      // when we are not subscribed yet
      axios
        .post(
          /*localhost123*/ 'https://relay14-server.herokuapp.com/api/follow/followFriend',
          FollowerVariables
        )
        .then((response) => {
          if (response.data.success) {
            setFollowed(!Followed);
            setisFollowed(!isFollowed);
            console.log(response.data.doc);
          } else {
            alert('Failed to follow');
          }
        });
    }
  };

  useEffect(() => {
    const isfollowVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post(/*localhost123*/ 'https://relay14-server.herokuapp.com/api/follow/isfollow', isfollowVariables)
      .then((response) => {
        if (response.data.success) {
          setisFollowed(response.data.isfollow.length == 0 ? false : true);
        } else {
          alert('Failed to get isFollowed');
        }
      });
  }, [userFrom, userTo]);

  return (
    <div>
      <button class="plus_button" onClick={onFollowing}>
        {isFollowed ? `♥` : `♡`}
      </button>
    </div>
  );
}

export default Follower;
