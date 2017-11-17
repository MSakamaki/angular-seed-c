($ => {

    const ApiList = $.ApiList;
    const ApiCtrl = $.ApiCtrl;

    class App extends React.Component {

        style = {
            container: {
                marginTop: '30px'
            },
            row: {
                width: '100%',
            }
        }

        constructor() {
            super();
        }

        render() {
            return (
                <div className="container" style={this.style.container}>
                    <div className="row" style={this.style.row}>
                        <div className="col-8">
                            <ApiList />
                        </div>
                        <div className="col-4">
                            <ApiCtrl />
                        </div>
                    </div>
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
})(window.Modules);