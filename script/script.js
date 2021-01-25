document.addEventListener('DOMContentLoaded', function () {
   const btnOpenModal = document.querySelector('#btnOpenModal')
   const modalBlock = document.querySelector('#modalBlock')
   const closeModal = document.querySelector('#closeModal')
   const questTitle = document.querySelector('#question')
   const formAnswers = document.querySelector('#formAnswers')
   const prevButton = document.querySelector('#prev')
   const nextButton = document.querySelector('#next')
   const sendButton = document.querySelector('#send')
   const firebaseConfig = {
    apiKey: "AIzaSyC23VG0GLRa8jLuQPoK6hgfjoVVVzWBXqk",
    authDomain: "quiz-5004c.firebaseapp.com",
    databaseURL: "https://quiz-5004c-default-rtdb.firebaseio.com",
    projectId: "quiz-5004c",
    storageBucket: "quiz-5004c.appspot.com",
    messagingSenderId: "954767026474",
    appId: "1:954767026474:web:0da017d49e4cc3816b9653"
  };

  firebase.initializeApp(firebaseConfig);




   const getdata = () =>{
       formAnswers.textContent = 'LOAD';
 
       nextButton.classList.add('d-none');
       prevButton.classList.add('d-none');
       setTimeout(() => {

      firebase.database().ref().child('questions').once('value')
      .then(snap => playTest(snap.val()))
   
        .catch(err =>{ 
            formAnswers.textContent = 'Ошибка загрузки данных'
            console.error(err)})
       }, 500);
   } 

  
   btnOpenModal.addEventListener('click', () => {
      modalBlock.classList.add('d-block');
      getdata();
   })
   closeModal.addEventListener('click', () => {
      modalBlock.classList.remove('d-block')
   })



   const playTest = (questions  ) => {
    prevButton.classList.remove('d-none');
    nextButton.classList.remove('d-none');
  let numberQuestion = 0;
   const finalAnswers = [];
      const renderAnswers = (index) => {
         questions[index].answers.forEach((answrs) => {
            const answerItem = document.createElement('div')
            answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
            answerItem.innerHTML = `
         <input type="${questions[index].type}" id="${answrs.title}" name="answer" class="d-none" value="${answrs.title}">
         <label for="${answrs.title}" class="d-flex flex-column justify-content-between">
         <img class="answerImg" src=${answrs.url} alt="burger">
         <span>${answrs.title}</span>
     </label>`
            formAnswers.appendChild(answerItem);

         })

      }

      const renderQest = (indexQuestion) => {
          switch(true){

     
            case (numberQuestion >0 && numberQuestion <= questions.length -1):
                formAnswers.innerHTML = '';
                questTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                prevButton.classList.remove('d-none');
                nextButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
                break;
            case(numberQuestion == 0):  
            formAnswers.innerHTML = '';
            questTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnswers(indexQuestion);
                prevButton.classList.add('d-none');
            break;
          
            
            case(numberQuestion === questions.length):
              formAnswers.textContent = "Спасибо"
            nextButton.classList.add('d-none');
            prevButton.classList.add('d-none');
            sendButton.classList.remove('d-none');

            formAnswers.innerHTML = ` <div class="form-group">
            <label for="numberPhone">Enter you number</label>
            <input type="phone" class="form-control" id="numberPhone" placeholder="numberPhone">
          </div>`
            break;

            case(numberQuestion === questions.length + 1):
              formAnswers.textContent = 'Спасибо за пройденый тест';
              setTimeout(()=>{
                  modalBlock.classList.remove('d-block');
              },2000)
            break;
          }         

       
        
    }

    const checkAnswer = () =>{
        const obj = {};
        const inputs = [...formAnswers.elements].filter((input)=> input.checked || input.id ==='numberPhone');
        
        inputs.forEach((input,index)=>{
            if (numberQuestion >=0 && numberQuestion <= questions.length -1) {
            obj[`${index}_${questions[numberQuestion].question}`]= input.value
            }

            if(numberQuestion === questions.length){
                obj['Номер телефона']= input.value
            }
        })
        finalAnswers.push(obj)
    }
      renderQest(numberQuestion);
      nextButton.onclick = ()=>{
          checkAnswer();
         numberQuestion++
         renderQest(numberQuestion)
      }
      prevButton.onclick =()=>{
         numberQuestion--
         renderQest(numberQuestion)
      }

      sendButton.onclick = ()=> {
        checkAnswer();
        numberQuestion++
        renderQest(numberQuestion)
        firebase.database().ref().child('contacts').push(finalAnswers)
        
        
      }
   }
})