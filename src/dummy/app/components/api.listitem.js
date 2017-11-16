
class ApiListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { api: props.api, wait: 0, state: 200, json: '', name: '', isSelect: false };

    rx.api.putDebugComplite.subscribe(() => {
      this._setApiDetail();
    });

    this.apiSelectSubscription = rx.event.apiSelect.subscribe(param => {
      const { api } = this.state;
      this.setState({
        isSelect: param.api === api
      });
    });
  }

  styleSelectActive(className) {
    const { isSelect } = this.state;
    return isSelect ? `${className} active` :className;
  }

  componentDidMount() {
    this._setApiDetail();
  }

  onClick(event, res) {
    rx.event.apiSelect.next(res);
  }

  render() {
    const { name, api, wait, state } = this.state;
    return (
      <li className={this.styleSelectActive('list-group-item')} onClick={e => this.onClick(e, this.state)}>
        {name} {api}, {wait}, {state}
            </li>
    )
  }

  _setApiDetail() {
    return api.debug.get(this.state.api).then(res=>{
      this.setState({
        name: res.name,
        wait: res.wait,
        state: res.status,
        json: res.data
      });
    });
  }
}
