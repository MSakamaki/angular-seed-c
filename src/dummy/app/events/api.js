

($=>{

  $.rx = {
    /** 画面イベント */
    event:{
      apiSelect: new Rx.Subject(),
    },
    /** api call イベント */
    api: {
      putDebug: new Rx.Subject(),
      putDebugComplite: new Rx.Subject(),
    }
  };

  /**
   * 更新クリック => 画面リフレッシュイベント
   */
  $.rx.api.putDebug.subscribe(val=>{
    $.api.debug.put(val)
      .then(()=>{
        $.rx.api.putDebugComplite.next();
      },()=> {
        $.rx.api.putDebugComplite.throw();
      });
  });

})(window.Modules);
