;(function(global) {
  var PhoneBook = function() {
    // constructor code
    return new PhoneBook.init();
  };

  PhoneBook.prototype = {
    data: [],
    lastIndex: 0,
    add: function(name, phone, email) {
      if (name.length === 0) {
        throw("Please enter name.")
      }
      if (name.length > 100) {
        throw("Name should be less than 100 characters.");
      }
      if (!/^\d{2}\-\d{3}\-\d{4}$/.test(phone)) {
        throw("You have entered an invalid phone number.")
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw("You have entered an invalid email address.")
      }
      this.data.push({
        id: this.lastIndex + 1,   // Let's add unique index
        name: name,
        phone: phone,
        email: email
      });
      this.lastIndex ++;
      return this;
    },
    remove: function(index) {
      this.data = this.data.filter(function(contactInfo) {
        return contactInfo.id != index;
      })
      return this;
    },
    search: function(searchTerm) {
      var searchResults = [];
      if (this.data.length) {
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].name.toLowerCase() == searchTerm.toLowerCase() || this.data[i].phone == searchTerm) {
            searchResults.push(this.data[i]);
          }
        }
      } else {
        console.log("There are no results");
      }
      return searchResults;
    },
    list: function(perPage, page) {
      // Page number starts from zero
      var start = page * perPage;
      return this.data.slice(start, start + perPage);
    }
  }

  PhoneBook.init = function() {}

  PhoneBook.init.prototype = PhoneBook.prototype;

  global.PhoneBook = $ab = PhoneBook;
})(window);