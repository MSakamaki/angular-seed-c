($=>{

    class Api {

      get url() {
        return this._url;
      }
      get name() {
        return this._name;
      }
      get wait() {
        return this._wait;
      }
      get status() {
        return this._status;
      }
      get json() {
        return this._json;
      }

      constructor(url){
        this._url = url ? url : '';
        this._name = '';
        this._wait = 0;
        this._status = 200;
        this._json = {};
      }

      setUrl(url) {
        this._url = url;
        return this;
      }

      setName(name) {
        this._name = name;
        return this;
      }

      setWait(wait) {
        this._wait = wait;
        return this;
      }
      
      setStatus(status) {
        this._status = status;
        return this;
      }

      setJson(json) {
        this._json = json;
        return this;
      }
    }

    $.model = {
      Api: Api,
    };

  })(window.Modules);
