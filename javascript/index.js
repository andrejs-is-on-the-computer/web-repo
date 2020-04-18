
function get_date (date) {
  document.getElementById(date).innerHTML = new Date().toDateString();
};

function test_js () {
  console.log('yes');
};

function render_dom(content, destination_element){
  (function () {
        document.getElementById(destination_element).innerHTML = content;
        })();
  try{
  } catch (e) {
    console.error('Render content error');
  }
}

function upload_text (target, display) {
  document.querySelector("#"+target).addEventListener('change', function() {
  	// files that user has chosen
  	var all_files = this.files;
  	if(all_files.length == 0) {
  		alert('Error : No file selected');
  		return;
  	}

  	// first file selected by user
  	var file = all_files[0];
  	// files types allowed
  	var allowed_types = [ 'text/plain' ];
  	if(allowed_types.indexOf(file.type) == -1) {
  		alert('Error : Incorrect file type');
  		return;
  	}

  	// Max 2 MB allowed
  	var max_size_allowed = 2*1024*1024
  	if(file.size > max_size_allowed) {
  		alert('Error : Exceeded size 2MB');
  		return;
  	}

  	// file validation is successfull
  	// we will now read the file

  	var reader = new FileReader();

  	// file reading started
  	// reader.addEventListener('loadstart', function() {
  	//     document.querySelector("#file-input-label").style.display = 'none';
  	// });

  	// file reading finished successfully
  	reader.addEventListener('load', function(e) {
  	    var text = e.target.result;
        console.log(JSON.parse(text));
  	    // contents of the file
  	    document.querySelector("#"+display).innerHTML = text;
  	    document.querySelector("#"+display).style.display = 'block';

  	    document.querySelector("#file-input-label").style.display = 'block';
  	});

  	// file reading failed
  	reader.addEventListener('error', function() {
  	    alert('Error : Failed to read file');
  	});

  	// file read progress
  	reader.addEventListener('progress', function(e) {
  	    if(e.lengthComputable == true) {
  	    	document.querySelector("#file-progress-percent").innerHTML = Math.floor((e.loaded/e.total)*100);
  	    	document.querySelector("#file-progress-percent").style.display = 'block';
  	    }
  	});

  	// read as text file
  	reader.readAsText(file);
  });
};

// GET TABLE INTO JSON FILE ///////////////////////////////////
// var table = document.getElementById("table_data");

function table_to_json(table_data) {
  var headers = [];
  var data = []; // first row needs to be headers var headers = [];
  for (var i=0; i<table_data.rows[0].cells.length; i++) {
      headers[i] = table_data.rows[0].cells[i].innerHTML.toLowerCase().replace(/\W/g, '');
    }
// go through cells
  for (var i=1; i<table_data.rows.length; i++) {
    var tableRow = table_data.rows[i];
    var rowData = {};
    for (var j=0; j<tableRow.cells.length; j++) {
      rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
    }
    data.push(rowData);
  }

  return data;
}
////////////////////////////////////////////////////////////////


function create_selected_table (symptoms) {
  var table_content = `
    <table class="sortable" id="symptoms" style="width: 100%;">
    <thead>
      <tr class="sortable">
        <th>
          Symptom
        </th>
        <th>
          Stealth
        </th>
        <th>
          Resistance
        </th>
        <th>
          Stage speed
        </th>
        <th>
          Transmission
        </th>
        <th>
          Level
        </th>
        <th>
          Required Chemical
        </th>
        <th>
          Effect
        </th>
        <th>
          Threshold
        </th>
      </tr>
    </thead>`;
  symptoms.forEach(function (symptom) {
      table_content += `
      <tr id="${symptom.Symptom}" class="unselected">
        <td>
          ${symptom.Symptom}
        </td>
        <td>
          ${symptom.Stealth}
        </td>
        <td>
          ${symptom.Resistance}
        </td>
        <td>
          ${symptom.Stage_Speed}
        </td>
        <td>
          ${symptom.Transmission}
        </td>
        <td>
          ${symptom.Level}
        </td>
        <td>
          ${symptom.Required_Chemical}
        </td>
        <td>
          ${symptom.Effect}
        </td>
        <td>
          ${symptom.FIELD10}&nbsp;
          ${symptom.FIELD11}&nbsp;
          ${symptom.FIELD12}&nbsp;
          ${symptom.FIELD13}&nbsp;
          ${symptom.FIELD14}
        </td>
      </tr>
      `;

  });
  table_content += `</table>`;
  document.getElementById("table_section").innerHTML = table_content;
}

function create_symptoms_table () {
  var symptoms = return_symptoms();
  var table_content = `
    <table class="sortable" id="symptoms" style="width: 100%;">
    <thead>
      <tr class="sortable">
        <th>
          Symptom
        </th>
        <th>
          Stealth
        </th>
        <th>
          Resistance
        </th>
        <th>
          Stage speed
        </th>
        <th>
          Transmission
        </th>
        <th>
          Level
        </th>
        <th>
          Required Chemical
        </th>
        <th>
          Effect
        </th>
        <th>
          Threshold
        </th>
      </tr>
    </thead>`;
  symptoms.forEach(function (symptom) {
      table_content += `
      <tr id="${symptom.Symptom}" class="unselected" onClick="add_symptom(${symptom.Symptom})">
        <td>
          ${symptom.Symptom}
        </td>
        <td>
          ${symptom.Stealth}
        </td>
        <td>
          ${symptom.Resistance}
        </td>
        <td>
          ${symptom.Stage_Speed}
        </td>
        <td>
          ${symptom.Transmission}
        </td>
        <td>
          ${symptom.Level}
        </td>
        <td>
          ${symptom.Required_Chemical}
        </td>
        <td>
          ${symptom.Effect}
        </td>
        <td>
          ${symptom.FIELD10}&nbsp;
          ${symptom.FIELD11}&nbsp;
          ${symptom.FIELD12}&nbsp;
          ${symptom.FIELD13}&nbsp;
          ${symptom.FIELD14}
        </td>
      </tr>
      `;

  });
  table_content += `</table>`;
  document.getElementById("table_section").innerHTML = table_content;
};

function add_symptom_obj(passed_id) {
  var that = this;
  this.symptom_keys.forEach(function (symptom_key) {
    if (symptom_key.Symptom === passed_id){
      that.display_symptoms.push(symptom_key);
    }
  });
};

function remove_symptom_obj (index) {
  if (index > -1) {
    this.display_symptoms.splice(index, 1);
  }
};


function add_symptom(clicked_id) {
    var that = this;
    var found = false;
    var index = '';
    var symptom_key_to_push = '';
    if (display_symptoms.length > 0){
      display_symptoms.forEach(function (selected_symptom){
        if (selected_symptom.Symptom === clicked_id) {
          index = that.display_symptoms.indexOf(selected_symptom);
          found = true;
        }
      });
      if (!found) {
        that.add_symptom_obj(clicked_id);
      } else {
        if (index > -1) {
          that.remove_symptom_obj(index);
        }
      }
    } else {
      that.add_symptom_obj(clicked_id);
    }
    update_selected_table();
};

function update_selected_table () {
  var table_content = ``;
  console.log('update display sympts');
  console.log(display_symptoms);
  if (display_symptoms.length > 0){
    // create table info
    display_symptoms.forEach(function (symptom) {
      console.log(symptom);
      table_content += `${symptom.Symptom}<br>`;
    });
  } else {
    table_content = `No symptoms selected`;
  }
  render_dom(table_content, 'selected_table');
};


// File reader that doesn't work because browsers are gay
// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }



// EXPORT JSON TO TEXT FILE ////////////////////////////////
// var json = tableToJson(table);
//
// var data  = "text/json;charset=utf-8," + encodeURIComponent(json);
//
// var a       = document.createElement('a');
// a.href      = 'data:' + data;
// a.download  = 'data.txt';
// a.innerHTML = 'download .txt file of json';
//
// document.getElementById('container').appendChild(a);
///////////////////////////////////////////////////////////
