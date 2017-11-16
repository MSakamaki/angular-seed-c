
class ApiListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { api: props.api, wait: 0, state: 200, json: '', name: '' };
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
      <li onClick={e => this.onClick(e, this.state)}>
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
