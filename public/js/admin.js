$(function() {
  $('.movie-del').on('click', function(e) {
    var $target = $(e.target);
    var _id = $target.attr('data-id');
    var $curTr = $target.parents('tr');
    if(_id) {
      $.ajax({
        url: '/admin/list/remove?id=' + _id,
        type: 'delete'
      }).then(function(data){
        if(data.success && data.code === 0000) {
          alert('删除成功');
          $curTr.remove();
        }
      })
    }
  })
});