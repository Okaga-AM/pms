 let appointments = [
    {
        id: 1,
        "Patient ID": 1,
        doctorID: 3,
        date: "2023-04-05",
        time: "09:30 AM",
        type: "General Checkup"
    },
  
]

const appointmentDate = document.querySelector('#appointment-date')
const appointmentTime = document.querySelector('#appointment-time')
const appointmentDoctor = document.querySelector('#appointment-doctor')
const appointmentType = document.querySelector('#appointment-type')
const appointmentButton = document.querySelector('#appointment-button')

let selectedDoctor
let selectedType

if(appointmentDoctor.value == "1"){
    selectedDoctor = 1
}
if(appointmentDoctor.value == "2"){
    selectedDoctor = 2
}

if(appointmentType.value == "general-checkup"){
    selectedType = "General checkup"
}
if(appointmentType.value == "follow-up"){
    selectedType = "Follow-up"
}

appointmentButton.addEventListener('click', (e) =>{
    e.preventDefault()
    appointments.push({id: appointments.length + 1, doctorID: appointmentDoctor.value, date: appointmentDate.value, time: appointmentTime.value, type: appointmentType.value })
    console.log(appointments)

})


