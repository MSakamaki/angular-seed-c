($ => {
  class ApiListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        api: new $.model.Api(props.api),
        isSelect: false };

      $.rx.api.putDebugComplite.subscribe(() => {
        this._setApiDetail();
      });

      this.apiSelectSubscription = $.rx.event.apiSelect.subscribe(param => {
        const { api } = this.state;
        this.setState({
          isSelect: param.url === api.url
        });
      });
    }

    styleSelectActive(className) {
      const { isSelect } = this.state;
      return isSelect ? `${className} active` : className;
    }

    componentDidMount() {
      this._setApiDetail();
    }

    onClick(event, api) {
      $.rx.event.apiSelect.next(api);
    }

    render() {
      const { api } = this.state;
      return (
        <li className={this.styleSelectActive('list-group-item')} onClick={e => this.onClick(e, api)}>
          {api.name} {api.url}, {api.wait}, {api.status}
        </li>
      )
    }

    _setApiDetail() {
      const { api } = this.state;
      return $.api.debug.get(api.url).then(res => {
        this.setState({
          api: api
            .setName(res.name)
            .setWait(res.wait)
            .setStatus(res.status)
            .setJson(res.data),
        });
      });
    }
  }

  $.ApiListItem = ApiListItem;
})(window.Modules);

