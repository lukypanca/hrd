function loadContent() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/departments/findAll";

    //Menampilkan semua data (findAll)
    xhr.onloadend = function() {
        clearResult();
        if (this.responseText !== "") {
            // console.log(typeof this.response);
            var result = JSON.parse(this.responseText);
            var ulang = result.data;
            
            var header = document.createElement("tr");
            var h1 = document.createElement("td");
            var h2 = document.createElement("td");
            var h3 = document.createElement("td");
            var h4 = document.createElement("td");
            var h5 = document.createElement("td");
            var h6 = document.createElement("td");
            h1.innerHTML = "DEPARTMENT ID";
            h2.innerHTML = "DEPARTMENT NAME";
            h3.innerHTML = "MANAGER ID";
            h4.innerHTML = "LOCATION ID";
            h5.innerHTML = "DELETE";
            h6.innerHTML = "UPDATE";
            header.append(h1, h2, h3, h4, h5, h6);
            document.getElementById("hasil").append(header);

            for (let i=0; i<ulang.length; i++) {
                const isi = ulang[i]
                var tabel = document.createElement("tr");
                var docId = document.createElement("td");
                var docName = document.createElement("td");
                var manId = document.createElement("td");
                var locId = document.createElement("td");
                var del = document.createElement("td");
                var edit = document.createElement("td");

                docId.innerHTML = isi.departmentId;
                docName.innerHTML = isi.departmentName;
                manId.innerHTML = isi.managerId;
                locId.innerHTML = isi.locationId;
                del.innerHTML = `<a href="#" onclick="delData(${isi.departmentId})">Delete</a>`
                edit.innerHTML = `<a href="update.html?id=${isi.departmentId}">Edit</a>`

                tabel.append(docId, docName, manId, locId, del, edit);
                document.getElementById("hasil").append(tabel);
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
    // clearResult();
};

function clearResult() {
    document.getAnimations("clear").innerHTML;
    document.getElementById("hasil").innerHTML = "";
}

function editData() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/departments/put";
    // console.log()
    var link = window.location.search;
    var x = link.split("=").pop();
    // alert(x);
    var ubah = JSON.stringify({
        departmentId: x,
        departmentName: document.getElementById("departmentName").value,
        managerId: document.getElementById("managerId").value,
        locationId: document.getElementById("locationId").value,
    });
    
    // console.log(ubah);

    if (confirm("yakin ingin merubah data ?")){
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        alert("Berhasil merubah data");
    }
    else {
        alert("Gagal merubah data");
    }

    // xhr.onload = function() {
    //     console.log(this.responseText);
    // };
    // alert(departmentId);
    xhr.send(ubah);
    return false;
}

//Menghapus data (DELETE)
function delData(i) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/departments/" + i;
    if (confirm("yakin ingin menghapus")){
        xhr.open("DELETE", url, true);
        alert("Sukses");
    } else {
        alert("Batal menghapus data");
    }
    
    xhr.send();
    loadContent();
}

//Memasukkan data baru (POST)
function sendData() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/departments/post";

        // clearResult();
        console.log(this.responseText)

    var data = JSON.stringify({
        departmentName: document.getElementById("departmentName").value,
        managerId: document.getElementById("managerId").value,
        locationId: document.getElementById("locationId").value

    });

    console.log(data);
    xhr.onloadend = function(){
    var response = JSON.parse(this.responseText);
    console.log(response);

    var validasiDepName = document.getElementById("departmentName").value;
    var panjangValDepName = validasiDepName.length;

    // Validasi panjang karakter serta erorr 
    if(panjangValDepName > 12) {
        alert("Nama Departemen minimal 12 karakter");

    } else {

        if(response.data !== null){

            departmentName = document.getElementById("departmentName").value = "";
            managerId = document.getElementById("managerId").value = "";
            locationId = document.getElementById("locationId").value = "";
            var succsess = alert("Berhasil Simpan");
        } else {
            var fail = alert("Gagal Simpan");
        }    
        }
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        console.log(this.responseText);
    };

    xhr.send(data);
    return false;
}

// Menampilkan data dengan id tertentu
function getById() {
    console.log("Halo")
    var xhr = new XMLHttpRequest();
    var i = document.getElementById("depName").value;
    var url = `http://localhost:9090/departments/findByDepartmentName?departmentName=${i}&page=0&size=10`;
    xhr.onloadend = function() {
    clearResult();
    console.log(i);
    if (this.responseText !== "") {
    var result = JSON.parse(this.responseText);
    var ulang = result.data;
    // console.log(ulang);

        var header = document.createElement("tr");
        var h1 = document.createElement("td");
        var h2 = document.createElement("td");
        var h3 = document.createElement("td");
        var h4 = document.createElement("td");
        var h5 = document.createElement("td");
        var h6 = document.createElement("td");
        h1.innerHTML = "DEPARTMENT ID";
        h2.innerHTML = "DEPARTMENT NAME";
        h3.innerHTML = "MANAGER ID";
        h4.innerHTML = "LOCATION ID";
        h5.innerHTML = "DELETE";
        h6.innerHTML = "UPDATE";
        header.append(h1, h2, h3, h4, h5, h6);
        document.getElementById("hasil").append(header);

        for (let j=0; j<ulang.length; j++) {
        var tabel = document.createElement("tr");
        var docId = document.createElement("td");
        var docName = document.createElement("td");
        var manId = document.createElement("td");
        var locId = document.createElement("td");
        var del = document.createElement("td");
        var edit = document.createElement("td");

        docId.innerHTML = ulang[j].departmentId;
        docName.innerHTML = ulang[j].departmentName;
        manId.innerHTML = ulang[j].managerId
        locId.innerHTML = ulang[j].locationId;
        del.innerHTML = `<a href="#" onclick="delData(${ulang[j].departmentId})">Delete</a>`
        edit.innerHTML = `<a href="update.html?id=${ulang[j].departmentId}">Edit</a>`
        tabel.append(docId, docName, manId, locId, del, edit);
        document.getElementById("hasil").append(tabel);

        }
    }
};
    xhr.open("GET", url, true);
    xhr.send();
};
