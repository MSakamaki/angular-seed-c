

($ => {
  class DebugApi {

    apis() {
      return fetch('/apis').then(res => res.json());
    }

    get(url) {
      return fetch(`/debug/${url}`).then(res => res.json());
    }

    put(url, wait, state, json) {

      if (typeof json === 'string') json = JSON.parse(json);

      console.log('json', json);
      return fetch(`/debug/${url}`, {
        method: 'PUT',
        body: JSON.stringify({
          wait: wait,
          status: state,
          data: json,
        }),
      }).then(res => res.json());
    }
  }


  $.api = {
    debug: new DebugApi()
  }

})(window);
