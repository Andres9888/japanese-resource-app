// @ts-nocheck
/* eslint-disable */

import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Form, Input, Button, Comment, Avatar, List } from 'antd';
import axios from 'axios';
import { connect } from 'getstream';
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
const { TextArea } = Input;
export default function AnimeSingle({ viewer, token }) {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery(RESOURCES, { variables: { slug }, context: { clientName: 'third-party' } });
  const [currentAnimeToken, setCurrentAnimeToken] = React.useState();
  const [post, setPost] = useState();
  // const getFollowing = async actorID => {
  //   const response = await axios.get(`/api/is-following?currentUser=${viewer.id}&actorID=${actorID}`);
  //   return response.data;
  // };
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
  const client = connect(apiKey, token, appId);
  const currentUserClient = client.feed('user', client.userId);

  const onChange = e => {
    setPost(e.target.value);
  };
  const onSubmit = async () => {
    const activity = {
      object: 'test',
      text: 'test',
      verb: 'post',
      to: ['user:kimetsu-no-yaiba-yuukaku-hen'],
    };
    await currentUserClient.addActivity(activity);
  };
  return (
    <>
      <h1>{data.findAnimeBySlug.titles.canonical}</h1>
      <p>{data.findAnimeBySlug.description.en}</p>
      <Comment
        avatar={<Avatar alt="Han Solo" src={viewer.avatar} />}
        content={
          <>
            <Form.Item>
              <TextArea rows={4} value={post} onChange={onChange} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" onClick={onSubmit}>
                Add Comment
              </Button>
            </Form.Item>
          </>
        }
      />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <StreamApp apiKey={apiKey} appId={appId} token={currentAnimeToken}>
          <div className="wrapper box">
            <h3>React Activity Feed</h3>
            <NotificationDropdown right />
          </div>

          <FlatFeed
            notify
            Activity={({ activity, feedGroup, userId }) => (
              <Activity
                Footer={() =>
                  viewer.id ? (
                    <>
                      <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
                      <CommentField activity={activity} />
                      {/* <FollowButton actorID={activity.actor.id} getFollowing={getFollowing} /> */}
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
