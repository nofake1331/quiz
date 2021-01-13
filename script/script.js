document.addEventListener('DOMContentLoaded',function(){
 const btnOpenModal = document.querySelector('#btnOpenModal')
 const modalBlock = document.querySelector('#modalBlock')
 const closeModal = document.querySelector('#closeModal')
 const questTitle = document.querySelector('#question')
 const formAnswers = document.querySelector('#formAnswers')

 const burger1img = "./image/burger.png"
 const burger1name = "Стандарт"
 btnOpenModal.addEventListener('click',()=>{
    modalBlock.classList.add('d-block');
    playTest();
 })
 closeModal.addEventListener('click',()=>{
    modalBlock.classList.remove('d-block')
 })


 
const playTest = () =>{
     const renderQest = ()=>{
        questTitle.textContent = 'Какого цвета бургер вы хотите?' 
        formAnswers.innerHTML = `     
        <div class="answers-item d-flex flex-column">
            <input type="radio" id="answerItem1" name="answer" class="d-none">
            <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src=${burger1img} alt="burger">
            <span>${burger1name}</span>
        </label>
      </div>`
     }
     renderQest();
}
})