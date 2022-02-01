// @ts-nocheck
import { useEffect, useState } from 'react';

import axios from 'axios';
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed';

import { FollowButton } from '~views/components/FollowButton';
import NavBlank from '~views/components/NavBlank';

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';
const globalUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2xvYmFsIn0.uZ2GFyvVgOa1vj47sTex8rPXrbvRBt6I6WaSXoDw7tw';

const getFollowing = async actorID => {
  const response = await axios.get(`/api/is-following?currentUser=112016378414675480907&actorID=${actorID}`);
  return response.data;
};

function App({ token, viewer }) {
  if (!token || !viewer) return <div>Try loging in again</div>;

  return (
    <>
      <NavBlank viewer={viewer} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp apiKey={apiKey} appId={appId} token={globalUserToken}>
          <div className="wrapper box">
            <h3>React Activity Feed</h3>
            <NotificationDropdown right />
          </div>
          <StatusUpdateForm
            emojiI18n={{
              search: 'Type here to search...',
              categories: { recent: 'Recent Emojis' },
            }}
          />
          <FlatFeed
            notify
            Activity={({ activity, feedGroup, userId }) => (
              <Activity
                Footer={() => (
                  <>
                    <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
                    <CommentField activity={activity} />
                    <FollowButton actorID={activity.actor.id} getFollowing={getFollowing} />
                    <CommentList
                      CommentItem={({ comment }) => (
                        <div className="wrapper">
                          <CommentItem comment={comment} />
                          <LikeButton reaction={comment} />
                        </div>
                      )}
                      activityId={activity.id}
                    />
                  </>
                )}
                activity={activity}
                feedGroup={feedGroup}
                userId={userId}
              />
            )}
            Paginator={InfiniteScrollPaginator}
            feedGroup="user"
            options={{ limit: 20, withOwnChildren: true, withRecentReactions: true }}
          />
        </StreamApp>
      </div>
    </>
  );
}
export default App;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || '' } };
}
