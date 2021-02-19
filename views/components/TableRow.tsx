import React from 'react'

interface IProps {
  loading: boolean
  children: string
}

const TableRow = ({ loading = false, children, ...props }: IProps) => (
  <tr {...props}>
    <th>Image</th>
    <th>{console.log(props)}</th>
    <th>Description</th>
    <th>Tags</th>
    <th>Actions</th>
  </tr>
)

export default TableRow
