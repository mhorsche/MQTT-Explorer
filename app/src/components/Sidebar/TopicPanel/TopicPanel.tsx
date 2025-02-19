import * as q from '../../../../../backend/src/Model'
import Copy from '../../helper/Copy'
import Panel from '../Panel'
import React, { useMemo, useCallback } from 'react'
import Topic from './Topic'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RecursiveTopicDeleteButton } from './RecursiveTopicDeleteButton'
import { TopicDeleteButton } from './TopicDeleteButton'
import { TopicTypeButton } from './TopicTypeButton'
import { sidebarActions } from '../../../actions'

const TopicPanel = (props: { node?: q.TreeNode<any>; actions: typeof sidebarActions }) => {
  const { node } = props
  console.log(node && node.path())

  const copyTopic = node ? <Copy value={node.path()} /> : null

  const deleteTopic = useCallback((topic?: q.TreeNode<any>, recursive: boolean = false) => {
    if (!topic) {
      return
    }
    props.actions.clearTopic(topic, recursive)
  }, [])

  const setTopicType = useCallback((node?: q.TreeNode<any>, type: q.TopicDataType = 'string') => {
    if (!node) {
      return
    }
    node.type = type
  }, [])

  return useMemo(
    () => (
      <Panel disabled={!Boolean(node)}>
        <span>
          Topic {copyTopic}
          <TopicDeleteButton node={node} deleteTopicAction={deleteTopic} />
          <RecursiveTopicDeleteButton node={node} deleteTopicAction={deleteTopic} />
          <TopicTypeButton node={node} setTopicType={setTopicType} />
        </span>
        <Topic node={node} />
      </Panel>
    ),
    [node, node && node.childTopicCount()]
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(sidebarActions, dispatch),
  }
}

export default connect(undefined, mapDispatchToProps)(TopicPanel)
