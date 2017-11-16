

($=>{

  $.rx = {
    event:{
      apiSelect: new Rx.Subject(),
    },
    api: {
      putDebug: new Rx.Subject(),
      putDebugComplite: new Rx.Subject(),
    }
  };

  $.rx.api.putDebug.subscribe(val=>{
    api.debug.put(val.url, val.wait, val.state, val.json)
      .then(()=>{
        $.rx.api.putDebugComplite.next();
      },()=> {
        $.rx.api.putDebugComplite.throw();
      });
  });

})(window);
