let employees = [];

  

  // capitalizes the first word of Strings 
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// Builds each objext in the employee arra putting the (name, email, city) to employee-directory div
function addEmployeesToDirectory(employees) {
  var galleryHTML = "<ul class='directory'>";
  $.each(employees, function(i, employee) {
      var firstName = capitalize(employee.name.first);
      var lastName = capitalize(employee.name.last);
      var city = capitalize(employee.location.city);
      galleryHTML += '<li id="' + i + '">';
      galleryHTML += '<a> <img src="' + employee.picture.large + '"></a>';
      galleryHTML += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
      galleryHTML += employee.email + '<br>';
      galleryHTML += city + '</p></li>';
  });
  galleryHTML += '</ul>'
  $('.employee-directory').html(galleryHTML);
}

//Adding the information to the modal (email, number, adress, bday, username)
function employeeClickEventListener() {
  $('li').click(function() {
    var id = $(this).attr('id');
    var idNumber = parseInt(id, 10);
    employeeModal(idNumber);
  })
}

//Brings out the modal and blocks away the background
function employeeModal(index) {
  var employee = employees[index];
  var firstName = capitalize(employee.name.first);
  var lastName = capitalize(employee.name.last);
  var dateOfBirth = formatDateOfBirth(employee.dob);
  var modalContent = '<div class="modal-content">';
  let address = formatAddress(employee);
  modalContent += '<span class="close">&times;</span>';
  modalContent += '<img src=" ' + employee.picture.large + '">';
  modalContent += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
  modalContent += '<br>' + employee.login.username + '<br>' + employee.email + '<br>';
  modalContent += '<br><hr><br>' + employee.cell + '<br><br>';
  modalContent += address + '<br>';
  modalContent += 'Birthday: ' + dateOfBirth + '</p>';
  modalContent += '<span class="buttons">';
  modalContent += '<button class="back">Back</button>';
  modalContent += '<button class="next">Next Employee</button></span>';
  modalContent += '</div>';
  $('#employee-modal').append(modalContent);
  $('.modal').css('display', 'block');
  addEventListenerToModal(index);
}

//puts a date into the DOB
function formatDateOfBirth(string) {
  var date = new Date(Date.parse(string));
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getYear();
  var dateOfBirth = month + '-' + day + "-" + year;
  return dateOfBirth;
}

//puts adress into modal
function formatAddress(employee) {
  var city = capitalize(employee.location.city);
  var state = capitalize(employee.location.state);
  var address = employee.location.street + '<br>'
  address += city + ', ' + state;
  address += ' ' + employee.location.postcode + ', ';
  address += employee.nat + '<br>';
  return address;
}

//Adding the 'x', next, and back button in modal
function addEventListenerToModal(idNumber) {
  $('.close').click(function() {
    $('.modal').css('display', 'none');
    $('.modal-content').remove();
  })

  $('.back').click(function() {
    var last = idNumber - 1;
    if (idNumber > 0) {
      $('.modal-content').remove();
      employeeModal(last);
    }
  })

  $('.next').click(function() {
    var next = idNumber + 1;
    if (idNumber <11) {
      $('.modal-content').remove();
      employeeModal(next);
    }
  })
}

//shows the employess that matched with what is put in the searh input
function searchEmployees(input) {
  var searchTerm = input.toLowerCase();
  var $employees = $('p:contains(' + searchTerm + ')').closest('li');
  $('li').hide();
  $employees.show();
}

$('#search').keyup(function() {
  var searchTerm = $('#search').val()
  searchEmployees(searchTerm);
})

//Gets the 12 employees from the API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    addEmployeesToDirectory(employees);
    employeeClickEventListener();
  }
});