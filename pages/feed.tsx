// @ts-nocheck

import { useEffect, useState } from 'react';

import axios from 'axios';
import { connect } from 'getstream';
import cookie from 'js-cookie';
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  Notification,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed';

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';

function UserFeed({ token, viewer }) {
  if (!token || !viewer) return <div>Try Login In</div>;

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp apiKey={apiKey} appId={appId} token={token}>
          <div className="wrapper box">
            <h3>React Activity Feed</h3>
            <NotificationDropdown notify />
          </div>
          <StatusUpdateForm
            emojiI18n={{
              search: 'Type here to search...',
              categories: { recent: 'Recent Emojis' },
            }}
            modifyActivityData={data => {
              console.log(data);
            }}
          />
          <FlatFeed
            notify
            Activity={({ activity, feedGroup }) => {
              return (
                <Activity
                  Footer={() => (
                    <>
                      <ActivityFooter activity={activity} feedGroup={feedGroup} userId={viewer.id} />
                      <CommentField activity={activity} />

                      <CommentList
                        CommentItem={({ comment }) => {
                          return (
                            <div className="wrapper">
                              <CommentItem comment={comment} />
                              <LikeButton reaction={comment} />
                            </div>
                          );
                        }}
                        activityId={activity.id}
                      />
                    </>
                  )}
                  activity={activity}
                  feedGroup={feedGroup}
                  userId={viewer.id}
                />
              );
            }}
            Paginator={InfiniteScrollPaginator}
            feedGroup="user"
            options={{ limit: 20, withOwnChildren: true, withRecentReactions: true }}
          />
        </StreamApp>
      </div>
    </>
  );
}
export default UserFeed;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || '' } };
}
