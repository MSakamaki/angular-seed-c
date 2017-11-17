($ => {
    const ApiListItem = $.ApiListItem;

    class ApiList extends React.Component {
        constructor(props) {
            super(props);
            this.state = { apis: [] };

            $.rx.api.putDebugComplite.subscribe(() => {
                this._apiCall();
            });
        }

        componentDidMount() {
            this._apiCall();
        }

        // componentDidUpdate() {
        //     console.log('componentDidUpdate');
        //     this._apiCall();
        // }

        render() {
            const { apis } = this.state;
            return (
                <ul className="list-group">
                    {apis.map(val => <ApiListItem key={val.api} api={val.api} />)}
                </ul>
            )
        }

        _apiCall() {
            return $.api.debug.apis().then(apis => {
                this.setState({ apis: apis });
            });
        }
    }

    $.ApiList = ApiList;
})(window.Modules);
