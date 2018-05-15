function Programmer(name,title,age,fav_lang) {
    this.name = name,
    this.title = title,
    this.age = age,
    this.fav_lang = fav_lang,
    this.printInfo = function() {
        console.log(this);
        // or, console.log("Name: " + this.name + "\nTitle: " + this.title + "\nAge: " + this.age + "\nLanguage: " + this.language);
    }
    }

    var john = new Programmer("John","Programmer",41,"English");
    john.printInfo();