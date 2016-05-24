import shallowEqual from 'shallowequal';

export default function PureRender(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context, nextContext);
}
