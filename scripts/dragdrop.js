// getElementById
function $id(id) {
    return document.getElementById(id);
}
var dropbox, fileselect, submitbutton, img, files, count;

$(document).ready(function() {
    dropbox = $id("dropbox");
    fileselect = $id("fileselect");
    submitbutton = $id("submitbutton");
    img = $id("preview");
    files = "";
    count = "";

    // file select
    fileselect.addEventListener("change", FileSelectHandler, false);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        // init event handlers
        dropbox.addEventListener("dragenter", dragEnter, false);
        dropbox.addEventListener("dragexit", dragExit, false);
        dropbox.addEventListener("dragleave", dragExit, false);
        dropbox.addEventListener("dragover", dragOver, false);
        dropbox.addEventListener("drop", drop, false);
        img.style.display = "none";
        dropbox.style.display = "block";
    } else {
        dropbox.style.display = "none";
    }

    $("#submitbutton").click(function(evt) {
        evt.preventDefault();
        handleOrUploadFiles(files, "upload");
    });
});


function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $id("droplabel").innerHTML = "Drop file to add.";
}

function dragExit(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $id("droplabel").innerHTML = "Drag and drop image here to upload...";
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $id("droplabel").innerHTML = "Drop file to add.";
}

function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    $id("droplabel").innerHTML = "Processing file...";

    files = evt.dataTransfer.files;
    handleOrUploadFiles(files, "handle");
}

function FileSelectHandler(evt){
    files = evt.target.files;
    handleOrUploadFiles(files, "handle");
}

function handleOrUploadFiles(files, type) {
    count = files.length;

    // Only call the handler if 1 or more files was dropped.
    if (count > 0) {
        //just load the first file if multiple are uploaded with "files[0]"
        if (type == "handle"){
            handleFiles(files[0]);
        } else if (type == "upload"){
            uploadFiles(files[0]);
        }
    } else {
        //no files selected
        console.log('no files selected');
    }
}

function handleFiles(file) {
    if (file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/png" && file.type != "image/gif"){
        $id("droplabel").innerHTML = "Bad file format, please ensure the file is an image.";
        return;
    }
    var reader = new FileReader();

    // init the reader event handlers
    reader.onload = handleReaderLoad;

    // begin the read operation
    reader.readAsDataURL(file);
}

function handleReaderLoad(evt) {
    img.style.display = "block";
    img.src = evt.target.result;
    $id("droplabel").innerHTML = "Preview below. Press upload or drop a new image here.";
}

function uploadFiles(file){
    var xhr = new XMLHttpRequest();

    // we probably need to verify file type too : (file.type == "image/jpeg")
    if (xhr.upload && file.size <= $id("MAX_FILE_SIZE").value) {
        if (file.type != "image/jpeg" && file.type != "image/jpg" && file.type != "image/png" && file.type != "image/gif"){
            $id("droplabel").innerHTML = "Bad file format, please ensure the file is an image.";
            return;
        }
        // create progress bar
        var o = $id("progress");
        var progress = o.appendChild(document.createElement("p"));
        progress.appendChild(document.createTextNode("upload " + file.name));

        // progress bar
        xhr.upload.addEventListener("progress", function(e) {
            var pc = parseInt(100 - (e.loaded / e.total * 100));
            progress.style.backgroundPosition = pc + "% 0";
            $id("droplabel").innerHTML = "Uploading...";
        }, false);

        // file received/failed
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
                if(xhr.status == 200){
                    $id("droplabel").innerHTML = "Upload successful.";
                } else {
                    $id("droplabel").innerHTML = "Upload failed.";
                }
                progress.className = (xhr.status == 200 ? "success" : "failure");
            }
        };

        // start upload
        xhr.open("POST", $id("upload").action + '/' + window.getLocationIdFromUrl(), true);
        xhr.setRequestHeader("X_FILENAME", file.name);
        xhr.send(file);
    } else {
        $id("droplabel").innerHTML = "Image too large, max file size is "+$id("MAX_FILE_SIZE").value+" please try another file.";
    }
}
