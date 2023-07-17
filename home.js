const modalAddCons = document.getElementById("modal-add-cons");
const modalEditCons = document.getElementById("modal-edit-cons");
const modelEditProfile = document.getElementById("modal-edit-profile");
const overlay = document.querySelector(".overlay");
const openModalAddConsBtn = document.getElementById("btn-open-model-add-cons");
const closeModalBtn = document.querySelector(".btn-close");

const listConsTbody = document.getElementById("list-cons-tbody");

// DOM Add construction modal
const nameConsAdd = document.getElementById("name-cons-add");
const startDateConsAdd = document.getElementById("startdate-cons-add");
const finishDateConsAdd = document.getElementById("finishdate-cons-add");
const statusConsAdd = document.getElementById("status-cons-add");
const detailedDescriptionConsAdd = document.getElementById("detailDescription-cons-add");
const memberConsAdd = document.getElementById("member-cons-add");
const listMemberConsAdd = document.getElementById("listMember-cons-add");
const jobNameConsAdd = document.getElementById("jobName-cons-add");
const jobDescriptionConsAdd = document.getElementById("jobDescription-cons-add");
const executorConsAdd = document.getElementById("executor-cons-add");
const listJobsConsAdd = document.getElementById("listJobs-cons-add");


const statusConstruction = [
  {
    id: 1,
    name: "Đang thực hiện",
    textColor: "#ffa127"
  },
  {
    id: 2,
    name: "Hoàn thành",
    textColor: "#00b14f"
  },
  {
    id: 3,
    name: "Tạm ngưng",
    textColor: "#555555"
  },
  {
    id: 4,
    name: "Đã huỷ",
    textColor: "red"
  }
]

let listConstruction = [
  {
    id: 1,
    name: "abc",
    startDate: "2014-01-02T11:42",
    finishDate: "2014-01-02T11:42",
    status: 1,
    detailedDescription: "",
    members: [],
    jobs: [
      {
        jobName: "",
        description: "",
        progress: 0,
        executor: ""
      },
      {
        jobName: "",
        description: "",
        progress: 5,
        executor: ""
      }
    ]
  }
]

const openModalAddCons = () => {
  modalAddCons.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openModalEditCons = (id) => {
  modalEditCons.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const openModalEditProfile = () => {
  modelEditProfile.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

openModalAddConsBtn.addEventListener("click", openModalAddCons);

const closeModal = () => {
  modelEditProfile.classList.add("hidden");
  modalEditCons.classList.add("hidden");
  modalAddCons.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const deleteItem = (id) => {
  let text = "Bạn có chắc chắn muốn xoá không?";
  if (confirm(text) == true) {
    
  } else {

  }
}

let listNewMembers = []
const handleAddNewMember = () => {
  let name = memberConsAdd.value
  memberConsAdd.value = ""
  memberConsAdd.focus()
  listNewMembers = [...listNewMembers, name]

  const newItem = `<li>${name} <span style="margin-left: 5px; cursor: pointer;" onclick="handleDeleteMember(${listNewMembers.length})">&times;</span></li>`;
  listMemberConsAdd.innerHTML += newItem;
}
memberConsAdd.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      handleAddNewMember();
  }
});

const handleDeleteMember = (i) => {
  let newList = listNewMembers.filter((val,index) => index != i)
  listNewMembers = [...newList]

  listMemberConsAdd.innerHTML = ""

  listNewMembers.map((val,index) => {
    listMemberConsAdd.innerHTML += `<li>${val} <span style="margin-left: 5px; cursor: pointer;" onclick="handleDeleteMember(${index})">&times;</span></li>`;
  })
}


// Handle List Jobs
let lisNewJobs = []
const handleAddNewJob = () => {
  let jobName = jobNameConsAdd.value
  let description = jobDescriptionConsAdd.value
  let executor = executorConsAdd.value

  jobNameConsAdd.value = ""
  jobDescriptionConsAdd.value = ""
  executorConsAdd.value = ""

  lisNewJobs = [
    ...lisNewJobs,
    {
      jobName,
      description,
      executor
    }
  ]

  const newItem = `
    <div>
      <h4>${lisNewJobs.length}. ${jobName} <span style="margin-left: 5px; cursor: pointer;" onclick="handleDeleteJob(${lisNewJobs.length-1})">&times;</span></h4>
      <p>- Mô tả: ${description}</p>
      <p>- Người thực hiện: ${executor}</p>
    </div>
  `
  listJobsConsAdd.innerHTML += newItem
}

const handleDeleteJob = (i) => {
  let newList = lisNewJobs.filter((val,index) => index != i)
  lisNewJobs = [...newList]

  listJobsConsAdd.innerHTML = ""

  lisNewJobs.map((val,index) => {
    listJobsConsAdd.innerHTML += `
      <div>
        <h4>${index+1}. ${val.jobName} <span style="margin-left: 5px; cursor: pointer;" onclick="handleDeleteJob(${index})">&times;</span></h4>
        <p>- Mô tả: ${val.description}</p>
        <p>- Người thực hiện: ${val.executor}</p>
      </div>
    `;
  })
}

const handleAddConstruction = () => {
  let id = generateUniqueId()
  let name = nameConsAdd.value
  let startDate = startDateConsAdd.value
  let finishDate = finishDateConsAdd.value
  let status = statusConsAdd.value
  let detailedDescription = detailedDescriptionConsAdd.value
  let members = [...listNewMembers]
  let jobs = [...lisNewJobs]
  let newConstruction = {
    id,
    name,
    startDate,
    finishDate,
    status,
    detailedDescription,
    members,
    jobs
  }

  listConstruction = [...listConstruction, newConstruction]

  let newItem = `
    <tr>
      <td>${listConstruction.length}</td>
      <td style="text-align: left; padding: 5px 15px; text-align: justify;">${name}</td>
      <td>${formatDate(startDate)}</td>
      <td style="color: ${statusConstruction.find(val => val.id == status).textColor}; font-weight: 500;">${statusConstruction.find(val => val.id == status).name}</td>
      <td class="features-col">
          <button onclick="openModalEditCons(1)"><i class="fa-solid fa-eye"></i></button>
          <button onclick="deleteItem(1)"><i class="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>
  `
  listConsTbody.innerHTML += newItem
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDate;
}


const generateUniqueId = () => {
  const randomString = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now();
  return `${randomString}${timestamp}`;
}