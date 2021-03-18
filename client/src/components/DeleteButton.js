import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    variables: {
      postId,
      commentId
    },
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        proxy.modify({
          fields: {
            getPosts(existingPosts = [], { readField }) {
              return existingPosts.filter(
                (postRef) => postId !== readField('id', postRef)
              );
            },
          },
        });
      }
      if (callback) callback();
    },
  });
  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }}></Icon>
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      ></Confirm>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    id
    comments{
      id
      username
      createAt
      body
    }
    commentCount
  }
}
`;

export default DeleteButton;
