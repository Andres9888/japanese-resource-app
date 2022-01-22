// @ts-nocheck

import React, { useEffect } from 'react';

import axios from 'axios';
import cookie from 'js-cookie';
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

import NavBlank from '~views/components/NavBlank';

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';

function App({ token, viewer }) {
  const [currentUserToken, setCurrentUserToken] = React.useState();

  useEffect(() => {
    const getToken = async () => {
      if (!token) {
        try {
          const { userToken } = await axios.get(`/api/stream?user=${viewer.id}`);

          setCurrentUserToken(userToken);
        } catch (error_) {
          console.log(error_);
        }
      } else {
        setCurrentUserToken(token);
      }
    };

    getToken();
  }, []);

  if (!currentUserToken) return <div>Loading...</div>;
  return (
    <>
      <NavBlank viewer={viewer} />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp apiKey={apiKey} appId={appId} token={currentUserToken}>
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
            feedGroup="timeline"
            options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
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
