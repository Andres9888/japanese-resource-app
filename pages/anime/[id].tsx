import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import gql from 'graphql-tag';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
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

import { getResources } from '~graphql/queries/__generated__/getResources';
import { initializeApollo } from '~lib/apolloClient';
import { Viewer } from '~types/globalTypes';
import { FollowButton } from '~views/components/FollowButton';
import Nav from '~views/components/Nav';
import NavBlank from '~views/components/NavBlank';
import Table from '~views/components/Table';

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';
const globalUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2xvYmFsIn0.uZ2GFyvVgOa1vj47sTex8rPXrbvRBt6I6WaSXoDw7tw';

declare global {
  interface Window {
    sakura: any;
  }
}
interface Props {
  viewer: Viewer;
}

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
const getFollowing = async actorID => {
  const response = await axios.get(`/api/is-following?currentUser=112016378414675480907&actorID=${actorID}`);
  return response.data;
};
export default function Home({ viewer, token }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useQuery<getResources>(RESOURCES, { variables: { slug: id }, context: { clientName: 'third-party' } });
  const [currentUserToken, setCurrentUserToken] = React.useState();

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { userToken: feedToken },
        } = await axios.get(`/api/getToken?id=${id}`);

        setCurrentUserToken(feedToken);
      } catch (error_) {
        console.log(error_);
      }
    };

    getToken();
  }, []);

  if (!currentUserToken || loading) return <div>Loading...</div>;

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      <h1>{data.findAnimeBySlug.titles.canonical}</h1>
      <p>{data.findAnimeBySlug.description.en}</p>

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

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || '' } };
}
