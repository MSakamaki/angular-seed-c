

($ => {
  class DebugApi {

    apis() {
      return fetch('/apis').then(res => res.json());
    }

    get(url) {
      return fetch(`/debug/${url}`).then(res => res.json());
    }

    put(api) {

      return fetch(`/debug/${api.url}`, {
        method: 'PUT',
        body: JSON.stringify({
          wait: api.wait,
          status: api.status,
          data: api.json,
        }),
      }).then(res => res.json());
    }
  }


  $.api = {
    debug: new DebugApi()
  }

})(window.Modules);
