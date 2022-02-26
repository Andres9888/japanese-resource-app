// @ts-nocheck
import { useState } from 'react';

import { Form, Input, Button, Comment, Avatar, List } from 'antd';
import axios from 'axios';
import { connect } from 'getstream';
import {
  StreamApp,
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
import Nav from '~views/components/Nav';

import 'react-activity-feed/dist/index.css';

const apiKey = 'ezcjh4aax2cv';
const appId = '1163661';
const globalUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ2xvYmFsIn0.uZ2GFyvVgOa1vj47sTex8rPXrbvRBt6I6WaSXoDw7tw';

const getFollowing = async actorID => {
  const response = await axios.get(`/api/is-following?currentUser=112016378414675480907&actorID=${actorID}`);
  return response.data;
};

const { TextArea } = Input;

function GlobalFeed({ getStreamToken, viewer }) {
  if (!getStreamToken || !viewer) return <div>Try loging in again</div>;
  const client = connect(apiKey, getStreamToken, appId);
  const currentUserClient = client.feed('user', viewer.id);
  const [post, setPost] = useState();
  const onChange = e => {
    setPost(e.target.value);
  };
  const onSubmit = async () => {
    const activity = { actor: `SU:${viewer.id}`, verb: 'pin', object: post };
    await currentUserClient.addActivity(activity);
  };

  const likePost = async () => {
    console.log('liked');
    // await client.reactions.add('like', 'e63f12ee-9595-11ec-a252-0a4186173f45', { userId: '112016378414675480907' });
    await client.reactions.add('comment', 'e63f12ee-9595-11ec-a252-0a4186173f45', { text: 'awesome post!' });
  };

  return (
    <>
      <Nav viewer={viewer} />

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Comment
          avatar={<Avatar src={viewer.avatar} alt="Han Solo" />}
          content={
            <>
              <Form.Item>
                <TextArea rows={4} onChange={onChange} value={post} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" onClick={onSubmit} type="primary">
                  Add Comment
                </Button>
              </Form.Item>
            </>
          }
        />

        <StreamApp apiKey={apiKey} appId={appId} token={globalUserToken}>
          <div className="wrapper box">
            <h3>React Activity Feed</h3>
            <NotificationDropdown right />
          </div>

          <FlatFeed
            notify
            Activity={({ activity, feedGroup }) => (
              <Activity
                Footer={() => (
                  <>
                    <ActivityFooter activity={activity} feedGroup={feedGroup} userId={viewer.id} />
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
                )}
                activity={activity}
                feedGroup={feedGroup}
                userId={viewer.id}
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
export default GlobalFeed;

export function getServerSideProps({ req }) {
  return { props: { getStreamToken: req.cookies.token || '' } };
}
