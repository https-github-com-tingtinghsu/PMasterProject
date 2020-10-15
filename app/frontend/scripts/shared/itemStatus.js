document.addEventListener('turbolinks:load', () => {
  const statusOptions = document.querySelectorAll('.item-status-option')
  
    
  
    function changeBackgroundColorFinish(){
        
      statusOptions.forEach( (option) => {        
        if(option.querySelector('option:checked').value == "卡關中"){
          option.classList.add('red')
        }else if(option.querySelector('option:checked').value == "進行中"){
          option.classList.add('blue')
        }else if(option.querySelector('option:checked').value == "待修改"){
          option.classList.add('pink')
        }else if(option.querySelector('option:checked').value == "待指派"){
          option.classList.add('yellow')
        }else if(option.querySelector('option:checked').value == "已完成"){
          option.classList.add('gray')
        }
      })
    }
  
    // function changeBackgroundColor(e){
    //   let optionClass = Array.from(e.target.classList)
    //   if(optionClass.indexOf("item-status-option") !== -1){
    //     e.target.classList.remove(e.target.classList[1])
    //   }
      
    // }

  
    statusOptions.forEach((option)=>{
      option.addEventListener('change',changeBackgroundColorFinish)
    })

    $('select').on("change", function(e){ 
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