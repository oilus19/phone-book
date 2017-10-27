if (!window.contactList) { //check if we already have a contact list
  window.contactList = $ab();
}

var form = document.getElementById('contact');
form.addEventListener('submit', function() {
  try {
    contactList.add(form.person.value, form.phone.value, form.email.value);

    form.person.value = '';
    form.phone.value = '';
    form.email.value = '';
  }
  catch (err) {
    alert(err);
  }

  event.preventDefault();
});

var searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function() {
  search();
  event.preventDefault();
});

document.getElementById('js-show-all').addEventListener('click', function() {
  // TODO: Show paginated result
  showAll();
  document.getElementById('show-panel').style.display = 'block';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
  document.getElementById('js-show-all').className = 'tab-link active';
  document.getElementById('js-search').className = 'tab-link';
  document.getElementById('js-add-new').className = 'tab-link';
});

document.getElementById('js-search').addEventListener('click', function() {
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'block';
  document.getElementById('contact-panel').style.display = 'none';
  document.getElementById('js-show-all').className = 'tab-link';
  document.getElementById('js-search').className = 'tab-link active';
  document.getElementById('js-add-new').className = 'tab-link';
});

document.getElementById('js-add-new').addEventListener('click', function() {
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'block';
  document.getElementById('js-show-all').className = 'tab-link';
  document.getElementById('js-search').className = 'tab-link';
  document.getElementById('js-add-new').className = 'tab-link active';
});

function showAll() {
  if (window.contactList) { //check if we already have a contact list
    document.getElementById('show-panel').innerHTML = '';
    var contacts = contactList.list(10, 0);
    if (contacts.length > 0) {
      for (var i = 0; i < contacts.length; i++) {
        document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:' + contacts[i].name + '<br>Phone:' + contacts[i].phone + '<br>Email:' + contacts[i].email + '<a class="delete link" onclick="deleteContact(' + contacts[i].id + ')">Remove</a></div><hr>';
      }
    } else {
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
    }
  }
}

function search() {
  var results;
  if (results !== undefined) {
    results = null;
  }
  if (!window.contactList) {
    window.contactList = $ab();
  } else {
    results = contactList.search(searchForm.search.value);
  }
  document.getElementById('results').innerHTML = '';
  if (results.length > 0) {
    for (var i = 0; i < results.length; i++) {
      document.getElementById('results').innerHTML += '<div class="contact-item">Name:' + results[i].name + '<br>Phone:' + results[i].phone + '<br>Email:' + results[i].email + '<a class="delete link" onclick="deleteContact(' + results[i].id + ')">Remove</a></div><hr>';
    }
  } else {
    document.getElementById('results').innerHTML += '<div class="contact-item">There are no results for this name or phone number</div><hr>';
  }
}

function deleteContact(index) {
  contactList.remove(index);
  if (document.getElementById('show-panel').style.display === 'block') {
    showAll();
  }
  if (document.getElementById('search-panel').style.display === 'block') {
    search();
  }
}