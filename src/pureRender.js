import shallowCompare from 'react-addons-shallow-compare';

export default function PureRender(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState)
}
