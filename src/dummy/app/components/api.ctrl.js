
class ApiCtrl extends React.Component {

  WAIT_TIME = [0, 1000, 5000, 10000];
  API_STATE = [200,400,401,404,500];

  constructor(props) {
    super(props);
    this.state = { url: '', wait: 0, state:200, json: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.subscription = rx.event.apiSelect.subscribe(api=>{
      this.setState({
        url: api.api,
        wait: api.wait,
        state: api.state,
        json: api.json,
       });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    rx.api.putDebug.next({
      url: this.state.url,
      wait: parseInt(this.state.wait),
      state: parseInt(this.state.state),
      json: JSON.stringify(this.state.json),
    });
    event.preventDefault();
  }

  render() {
    return this.renderForm();
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="wait">WAIT TIME</label>
          <select class="form-control" name="wait" id="wait" value={this.state.wait} onChange={this.handleChange}>
            {this.WAIT_TIME.map(wait => <option value={wait}>{wait/1000}秒</option>)}
          </select>
        </div>
        <div class="form-group">
          <label for="state">HTTP STATE</label>
          <select class="form-control" name="state" id="state" value={this.state.state} onChange={this.handleChange}>
            {this.API_STATE.map(state => <option value={state}>{state}</option>)}
          </select>
        </div>
        <div class="form-group">
          <label for="json">JSON</label>
          <textarea class="form-control" name="json" id="json" rows="10" cols="30"
            value={this.bitfyJSON(this.state.json)} onChange={this.handleChange}></textarea>
        </div>
        <button type="submit" class="btn btn-primary">設定</button>
    </form>);
  }

  bitfyJSON(json) {
    console.log(json);
    return JSON.stringify(json);
  }
}
