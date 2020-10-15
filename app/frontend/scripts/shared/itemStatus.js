document.addEventListener('turbolinks:load', () => {
  const statusOptions = document.querySelectorAll('.item-status-option')

    $('.item-status-select').on("change", function(e){ 
      let id = e.target.id
      var status = $(this).find(":selected").text();
      $.ajax({ 
      url: "/item/statusupdate", 
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: "PATCH", 
      data: {
        "id": id,
        "status": status
      }, 
      success: () =>{
        let id = e.target.id
        var status = $(this).find(":selected").text();
        console.log(status)
        $(e.target).removeClass()
        switch(status){
          case "已完成":
            $(e.target).addClass('item-status-option gray')
          break;
            case "卡關中":
              $(e.target).addClass('item-status-option red')
          break;
            case "進行中":
              $(e.target).addClass('item-status-option blue')
          break;
            case "待修改":
              $(e.target).addClass('item-status-option pink')
          break;
            case "待指派":
              $(e.target).addClass('item-status-option yellow')
          break;
        }
      }
      }) 
    }); 

    $('.item-status-mytask').on("change", function(e){ 
      console.log('aaa')
      let id = e.target.id
      var status = $(this).find(":selected").text();
      $.ajax({ 
      url: "/item/statusupdate", 
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: "PATCH", 
      data: {
        "id": id,
        "status": status
      }, 
      success: () =>{
         let optionClass = Array.from(e.target.classList)
         if(optionClass.indexOf("item-status-option") !== -1){
           e.target.classList.remove(e.target.classList[1])
         }
        location.reload()
      }
      }) 
    }); 
});  