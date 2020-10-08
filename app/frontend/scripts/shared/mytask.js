document.addEventListener('turbolinks:load', () => {
  let mytaskBtn = document.querySelector('.mytask-btn-for-status')
  if (mytaskBtn){
    let btns= document.querySelectorAll('button')
    let divOfMytasks = document.querySelectorAll('.mytask-type')
    btns.forEach((btn)=>{
      btn.addEventListener('click',function(){
        let selectedStatus = btn.getAttribute('status')
        divOfMytasks.forEach((divOfMytask)=>{
          let divStatus = divOfMytask.getAttribute('status')
          if (divStatus == selectedStatus){
            document.querySelector('.' + divStatus).classList.remove('is-removed-for-mytask')
            document.querySelector('.' + divStatus).classList.add('is-active-for-mytask')
          }else{
            document.querySelector('.' + divStatus).classList.add('is-removed-for-mytask')
            document.querySelector('.' + divStatus).classList.remove('is-active-for-mytask')
          }
        })
      })
    })
  }
});