$(function(){
  var buildHTML = function(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 5000);
    }
});
});