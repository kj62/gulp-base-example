let headline = document.querySelector('.h1-class');
headline.addEventListener('click', function() {
    if(this.classList.contains('hello-class')) {
        this.classList.remove('hello-class');
        this.innerHTML = 'Hello man!';
    }
    else {
        this.classList.add('hello-class');
        this.innerHTML = 'My first heading';
    }
});