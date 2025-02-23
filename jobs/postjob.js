document.addEventListener("DOMContentLoaded", loadJobs);

document.getElementById("jobForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let id = document.getElementById("jobId").value;
    let data = new FormData(this);
    data.append("action", id ? "edit" : "add");
    if (id) data.append("id", id);

    fetch("job_handler.php", { method: "POST", body: data })
        .then(response => response.text())
        .then(alert)
        .then(() => { document.getElementById("jobForm").reset(); loadJobs(); });
});

function loadJobs() {
    fetch("job_handler.php")
        .then(response => response.json())
        .then(jobs => {
            let tbody = document.querySelector("#jobsTable tbody");
            tbody.innerHTML = "";
            jobs.forEach(job => {
                let row = `<tr>
                    <td>${job.title}</td>
                    <td>${job.company}</td>
                    <td>${job.location}</td>
                    <td>${job.job_type}</td>
                    <td>${job.salary || "N/A"}</td>
                    <td>
                        <button onclick="editJob(${job.id}, '${job.title}', '${job.company}', '${job.location}', '${job.job_type}', '${job.salary}', '${job.description}')">Edit</button>
                        <button onclick="deleteJob(${job.id})">Delete</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
        });
}

function editJob(id, title, company, location, jobType, salary, description) {
    document.getElementById("jobId").value = id;
    document.getElementById("jobTitle").value = title;
    document.getElementById("companyName").value = company;
    document.getElementById("location").value = location;
    document.getElementById("jobType").value = jobType;
    document.getElementById("salary").value = salary;
    document.getElementById("description").value = description;
}

function deleteJob(id) {
    if (confirm("Are you sure you want to delete this job?")) {
        fetch("job_handler.php", { method: "POST", body: new URLSearchParams({ action: "delete", id }) })
            .then(response => response.text())
            .then(alert)
            .then(loadJobs);
    }
}
