document.addEventListener('DOMContentLoaded', function () {
   const btnOpenModal = document.querySelector('#btnOpenModal')
   const modalBlock = document.querySelector('#modalBlock')
   const closeModal = document.querySelector('#closeModal')
   const questTitle = document.querySelector('#question')
   const formAnswers = document.querySelector('#formAnswers')
   const prevButton = document.querySelector('#prev')
   const nextButton = document.querySelector('#next')



   const questions = [
      {
          question: "Какого цвета бургер?",
          answers: [
              {
                  title: 'Стандарт',
                  url: './image/burger.png'
              },
              {
                  title: 'Черный',
                  url: './image/burgerBlack.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Из какого мяса котлета?",
          answers: [
              {
                  title: 'Курица',
                  url: './image/chickenMeat.png'
              },
              {
                  title: 'Говядина',
                  url: './image/beefMeat.png'
              },
              {
                  title: 'Свинина',
                  url: './image/porkMeat.png'
              }
          ],
          type: 'radio'
      },
      {
          question: "Дополнительные ингредиенты?",
          answers: [
              {
                  title: 'Помидор',
                  url: './image/tomato.png'
              },
              {
                  title: 'Огурец',
                  url: './image/cucumber.png'
              },
              {
                  title: 'Салат',
                  url: './image/salad.png'
              },
              {
                  title: 'Лук',
                  url: './image/onion.png'
              }
          ],
          type: 'checkbox'
      },
      {
          question: "Добавить соус?",
          answers: [
              {
                  title: 'Чесночный',
                  url: './image/sauce1.png'
              },
              {
                  title: 'Томатный',
                  url: './image/sauce2.png'
              },
              {
                  title: 'Горчичный',
                  url: './image/sauce3.png'
              }
          ],
          type: 'radio'
      }
  ];

   btnOpenModal.addEventListener('click', () => {
      modalBlock.classList.add('d-block');
      playTest();
   })
   closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block')
   })



   const playTest = () => {
  let numberQuestion = 0;

      const renderAnswers = (index) => {
         questions[index].answers.forEach((answrs) => {
            const answerItem = document.createElement('div')
            answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
            answerItem.innerHTML = `
         <input type="${questions[index].type}" id="${answrs.title}" name="answer" class="d-none">
         <label for="${answrs.title}" class="d-flex flex-column justify-content-between">
         <img class="answerImg" src=${answrs.url} alt="burger">
         <span>${answrs.title}</span>
     </label>`
            formAnswers.appendChild(answerItem);

         })

      }

      const renderQest = (indexQuestion) => {
        if (indexQuestion ==0){
          prevButton.hidden = true;
        }
        else if (indexQuestion == questions.length -1){
         nextButton.hidden = true;
        }
        else{
         prevButton.hidden = false;
         nextButton.hidden = false;
        }
         formAnswers.innerHTML = '';
         questTitle.textContent = `${questions[indexQuestion].question}`;
         renderAnswers(indexQuestion);
      }

      renderQest(numberQuestion);
      nextButton.onclick = ()=>{
         numberQuestion++
         renderQest(numberQuestion)
      }
      prevButton.onclick =()=>{
         numberQuestion--
         renderQest(numberQuestion)
      }
   }
})