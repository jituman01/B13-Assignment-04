// console.log('clicked');
let interviewList = [];
let rejectedList = [];
let currentFilter = 'all';

// -----------------------------//
let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
let jobStatusCount = document.getElementById('job-status-count');
// console.log(total);

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('all-cards');
const filterSection = document.getElementById('filtered-section');
const emptySection = document.getElementById('empty-section');
const mainContainer = document.querySelector('main');
// console.log(mainContainer);

//----------------------calculate total count--------------------//
function calculateCount() {
    const totalCount = allCardSection.querySelectorAll('.application-card').length;
    
     total.innerText = totalCount;
     interviewCount.innerText = interviewList.length;
     rejectedCount.innerText = rejectedList.length;

 if (currentFilter === 'all') {
        jobStatusCount.innerText = `${totalCount} jobs`;
    
  //  --no available card show or not--//
    if (!(totalCount > 0)) {
            emptySection.classList.remove('hidden');
    }
    else {
            emptySection.classList.add('hidden');
        }
 }
  //--when click interview or rejected then show--//
    else {  
    let listLength;
    if (currentFilter === 'interview') {
        listLength = interviewList.length;
    }
     else {
        listLength = rejectedList.length;
    }

   jobStatusCount.innerText = `${listLength} out of 8 jobs`;
   
    //emty filtered section show or not--// 
  if (!(listLength > 0)) {   
  emptySection.classList.remove('hidden');
    filterSection.classList.add('hidden');
 }
  else {
     emptySection.classList.add('hidden');
      filterSection.classList.remove('hidden');
  }
  } 
    
}
calculateCount();
        

// -------------------step:-01 toggle btn-------------//
function toggleStyle(id) {

  // ------adding gray bg for all-----------//
  allFilterBtn.classList.remove('bg-blue-500','text-white')
  interviewFilterBtn.classList.remove('bg-blue-500','text-white')
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')
  
  //---- if any button has blue then remove----//
    allFilterBtn.classList.add('bg-white','text-black')
  interviewFilterBtn.classList.add('bg-white','text-black')
  rejectedFilterBtn.classList.add('bg-white', 'text-black')
  console.log(id);

  const selected = document.getElementById(id);
  // console.log(selected);

  //----- adding blue bg for current button------//
  selected.classList.remove('bg-white', 'text-black');
  selected.classList.add('bg-blue-500', 'text-white');

  

    if (id === 'all-filter-btn') {
        currentFilter = 'all';
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else {
      allCardSection.classList.add('hidden');
      
        if (id === 'interview-filter-btn') {
            currentFilter = 'interview';
            renderInterview();
        } else {
            currentFilter = 'rejected';
          renderRejected();
        }
      }
      calculateCount();
}


//---------------step:2 delegation-------------------//
mainContainer.addEventListener('click', function (event) {
  
  //--===  interview filter btn list ==== -//
  if (event.target.classList.contains('interview-btn')) {
    
    const parentNode = event.target.parentNode.parentNode;

    //--collect data--// 
    const companyName = parentNode.querySelector('.companyName').innerText;
    // console.log(companyName);
    
    const position = parentNode.querySelector('.position').innerText;
    const description = parentNode.querySelector('.description').innerText;
    
  // -----interview status bg change --//
   const allCards = allCardSection.querySelectorAll('.application-card');
    allCards.forEach(card => {
      if (card.querySelector('.companyName').innerText === companyName) {
        const label = card.querySelector('.status');
        label.innerText = 'INTERVIEW';
        label.className = 'status bg-green-100 text-green-600 px-2 py-2 w-[110px] font-medium text-[14px] text-center';
      }
    });
    

    const cardInfo = {
      companyName,
      position,
      description,
      status: 'INTERVIEW'
    }

    // console.log(cardInfo);

    // --check job already has this file or not?--//
    const jobExist = interviewList.find(iteam => iteam.companyName == cardInfo.companyName);

    if (!jobExist) {
    
      interviewList.push(cardInfo);
      rejectedList = rejectedList.filter(iteam => iteam.companyName !== companyName);
    }

    calculateCount();
     renderInterview()

    if (currentFilter === 'interview') renderFiltered(interviewList, 'Interview');
    if (currentFilter === 'rejected') renderFiltered(rejectedList, 'Rejected');
  }

 

  // ===rejected filter btn list====//
  else if (event.target.classList.contains('rejected-btn')) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText;
    const position = parentNode.querySelector('.position').innerText;
    const description = parentNode.querySelector('.description').innerText;

    // -----rejected status bg change --//
   const allCards = allCardSection.querySelectorAll('.application-card');
    allCards.forEach(card => {
      if (card.querySelector('.companyName').innerText === companyName) {
        const label = card.querySelector('.status');
        label.innerText = 'REJECTED';
        label.className = 'status bg-red-100 text-red-500 px-2 py-2 w-[110px] font-medium text-[14px] text-center';
      }
    });

    const cardInfo = {
      companyName,
      position,
      description,
      status: 'REJECTED'
    }

    const jobExist = rejectedList.find(iteam => iteam.companyName == cardInfo.companyName);

    if (!jobExist) {
      rejectedList.push(cardInfo);
      interviewList = interviewList.filter(iteam => iteam.companyName !== companyName);
    }

    calculateCount();
     renderRejected()
    if (currentFilter === 'interview') renderFiltered(interviewList, 'Interview');
    if (currentFilter === 'rejected') renderFiltered(rejectedList, 'Rejected');
  }

 
    //==== delete btn add ===//

  else if (event.target.closest('.delete-btn')) {
    const card = event.target.closest('.application-card');
    const companyName = card.querySelector('.companyName').innerText;

    interviewList = interviewList.filter(iteam => iteam.companyName !== companyName);
    rejectedList = rejectedList.filter(iteam => iteam.companyName !== companyName);



    if (currentFilter === 'all') {
      card.remove(); 
    }
    else {
      const allCards = allCardSection.querySelectorAll('.application-card');
      
      allCards.forEach(card => {
        if (card.querySelector('.companyName').innerText === companyName) {
          const label = card.querySelector('.status');
          label.innerText = 'NOT APPLIED';
          label.className = 'status bg-gray-100 text-gray-600 px-2 py-2 w-[110px] font-medium text-[14px] text-center';
        }
      });
    }

 
    if (currentFilter === 'interview') renderInterview();
    if (currentFilter === 'rejected') renderRejected();
    
  
    calculateCount();
  }
});



//---------step:3 render function and create html file div -----------//

function renderInterview() {
  filterSection.innerHTML = '';

  for (let interview of interviewList) {

    // console.log(interview);
    
    let div = document.createElement('div');
    div.className = 'application-card bg-white border p-8 rounded-xl shadow relative';
    
    div.innerHTML = `
        <div class="space-y-4">
          <div>
            <h2 class="companyName text-[18px] font-semibold text-[#002C5C] mb-1">${interview.companyName}</h2>
            <p class="position text-[#64748B]">${interview.position}</p>
          </div>

          <p class="status bg-green-100 text-green-600 px-2 py-2 w-[110px] font-medium text-[14px] text-center">
            ${interview.status}
          </p>

          <p class="description text-slate-600 max-w-3xl">${interview.description}</p>

          <div class="flex gap-4">
            <button class="interview-btn border border-green-400 text-green-400 px-3 py-2 rounded font-semibold">INTERVIEW</button>
            <button class="rejected-btn border border-red-500 text-rose-500 px-3 py-2 rounded font-semibold">REJECTED</button>
          </div>
        </div>

        <button class="delete-btn p-2 top-8 right-8 text-gray-400 hover:text-red-500 border border-gray-200 rounded-full absolute">
          <span><i class="fa-regular fa-trash-can"></i></span>
        </button>
    `;
    filterSection.appendChild(div);
  }
}


function renderRejected() {
  filterSection.innerHTML = '';

  for (let reject of rejectedList) {

    // console.log(reject);
    
    let div = document.createElement('div');
    div.className = 'application-card bg-white border p-8 rounded-xl shadow relative';
    
    div.innerHTML = `
        <div class="space-y-4">
          <div>
            <h2 class="companyName text-[18px] font-semibold text-[#002C5C] mb-1">${reject.companyName}</h2>
            <p class="position text-[#64748B]">${reject.position}</p>
          </div>

          <p class="status bg-red-100 text-red-600 px-2 py-2 w-[110px] font-medium text-[14px] text-center">
            ${reject.status}
          </p>

          <p class="description text-slate-600 max-w-3xl">${reject.description}</p>

          <div class="flex gap-4">
            <button class="interview-btn border border-green-400 text-green-400 px-3 py-2 rounded font-semibold">INTERVIEW</button>
            <button class="rejected-btn border border-red-500 text-rose-500 px-3 py-2 rounded font-semibold">REJECTED</button>
          </div>
        </div>

        <button class="delete-btn p-2 top-8 right-8 text-gray-400 hover:text-red-500 border border-gray-200 rounded-full absolute">
          <span><i class="fa-regular fa-trash-can"></i></span>
        </button>
    `;
    filterSection.appendChild(div);
  }
}



