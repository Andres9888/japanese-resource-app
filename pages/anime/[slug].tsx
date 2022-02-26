// @ts-nocheck

import React, { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
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

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';

export const RESOURCES = gql`
  query query($slug: String!) {
    findAnimeBySlug(slug: $slug) {
      titles {
        canonical
      }
      description
    }
  }
`;

export default function AnimeSingle({ viewer, token }) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(RESOURCES, { variables: { slug }, context: { clientName: 'third-party' } });
  const [currentAnimeToken, setCurrentAnimeToken] = React.useState();
  const getFollowing = async actorID => {
    const response = await axios.get(`/api/is-following?currentUser=${viewer.id}&actorID=${actorID}`);
    return response.data;
  };
  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { userToken: currentAnimeToken },
        } = await axios.get(`/api/getToken?id=${slug}`);

        setCurrentAnimeToken(currentAnimeToken);
      } catch (error_) {
        console.log(error_);
      }
    };

    getToken();
  }, []);

  if (!currentAnimeToken || loading) return <div>Loading...</div>;

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      <h1>{data.findAnimeBySlug.titles.canonical}</h1>
      <p>{data.findAnimeBySlug.description.en}</p>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp apiKey={apiKey} appId={appId} token={currentAnimeToken}>
          <div className="wrapper box">
            <h3>React Activity Feed</h3>
            <NotificationDropdown right />
          </div>
          {viewer.id ? (
            <StatusUpdateForm
              emojiI18n={{
                search: 'Type here to search...',
                categories: { recent: 'Recent Emojis' },
              }}
            />
          ) : null}

          <FlatFeed
            notify
            Activity={({ activity, feedGroup, userId }) => (
              <Activity
                Footer={() =>
                  viewer.id ? (
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
                  ) : null
                }
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

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || '' } };
}
