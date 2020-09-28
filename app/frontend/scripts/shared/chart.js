window.addEventListener('turbolinks:load', () => {
  $("#pieChart").hide() 
  $("#barChart").hide() 
  $(".click-tab").click(function(){
    $("li.is-active").removeClass("is-active")
    chartClassName = $(this).data("chart-name") + "-chart-tab"
    $("li."+chartClassName).addClass("is-active")

    switch($(this).data("chart-name")){
      case "burn":
        $("#burnChart").show()
        $("#pieChart").hide() 
        $("#barChart").hide()        
        break;

      case "pie":
        $("#burnChart").hide()        
        $("#pieChart").show()
        $("#barChart").hide()                   
        break;

      case "bar":
        $("#burnChart").hide()
        $("#pieChart").hide()                
        $("#barChart").show()       
        break;
    }
  })
})