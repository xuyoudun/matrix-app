import React from 'react';

class TestLifecycles extends React.Component<any> {

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromProps() {
    //
  }

  count = 1;

  componentDidMount() {
    window.console.log(`${this.props.name}  componentDidMount() finished (${this.count++})`);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    window.console.log(`${this.props.name}  componentDidUpdate() finished (${this.count++})`);
  }

  componentWillUnmount() {
    window.console.log(`${this.props.name}  componentWillUnmount() finished (${this.count++})`);
  }

  render() {
    window.console.log(`${this.props.name}  render() start (${this.count++})`);
    const children = <>{this.props.children}</>;
    window.console.log(`${this.props.name}  render() finished (${this.count++})`);
    return children;
  }


}

export default TestLifecycles;
