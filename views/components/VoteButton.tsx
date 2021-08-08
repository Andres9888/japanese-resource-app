import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CHECK_USER_VOTE } from '~graphql/queries/queries'
import { INCREMENT_COUNT } from '~graphql/mutations/mutations'
import { initializeApollo } from '~lib/apolloClient'

const VoteButton = ({ resource, viewer, refetch }) => {
    const [incrementCount] = useMutation(INCREMENT_COUNT)
    const [disabled, setDisabled] = useState(false);

    const handleIncrementCount = async resource => {
        if (viewer.id) {
            const client = initializeApollo()
            const {
                data: { checkUserVote: didVote }
            } = await client.query({
                query: CHECK_USER_VOTE,
                variables: {
                    id: viewer.id,
                    resource: resource.id,
                },
            })

            if (didVote.length === 0) {
                await incrementCount({
                    variables: {
                        id: resource.id,
                        viewer: viewer.id,
                        resource: resource.id,
                    },
                })
                setDisabled(!disabled);
                refetch()
            } else {
                alert('already voted on this resource')
            }
        } else {
            alert('most login to vote')
        }
    }
    return (
    <button disabled={disabled} onClick={() => {handleIncrementCount(resource)}}>
        👍
    </button>)
}

export default VoteButton