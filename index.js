class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class BookList {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
        this.bookListSection = document.getElementById('list');
        this.bookListElement = document.querySelector('.head-card');
        this.titleInput = document.getElementById('title');
        this.authorInput = document.getElementById('author');
        this.addForm = document.getElementById('add-book-form');
        this.navItems = document.querySelectorAll('.nav-item li a');

        this.addForm.addEventListener('submit', this.addBook.bind(this));
        this.bookListElement.addEventListener('click', this.removeBook.bind(this));
        this.navItems.forEach(item => item.addEventListener('click', this.navigate.bind(this)));

        this.displayBooks();
    }

    addBook(e) {
        e.preventDefault();
        const title = this.titleInput.value.trim();
        const author = this.authorInput.value.trim();

        if (title && author) {
            const newBook = new Book(title, author);
            this.books.push(newBook);
            this.saveBooks();
            this.displayBooks();
            this.titleInput.value = '';
            this.authorInput.value = '';
        }
    }

    removeBook(e) {
        if (e.target.tagName === 'BUTTON') {
            const bookElement = e.target.closest('.book-entry');
            const index = Array.from(this.bookListElement.children).indexOf(bookElement);
            this.books.splice(index, 1);
            this.saveBooks();
            this.displayBooks();
        }
    }

    displayBooks() {
        if (this.books.length === 0) {
            this.bookListSection.style.display = 'none';
        } else {
            this.bookListSection.style.display = 'block';
            this.bookListElement.innerHTML = this.books.map((book, index) => `
        <div class="book-entry">
          <div class="book-info">
            <p>"${book.title}" by ${book.author}</p>
          </div>
          <button type="button" aria-label="Remove ${book.title}">Remove</button>
        </div>
        ${index < this.books.length - 1 ? '<hr>' : ''}
      `).join('');
        }
    }

    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    navigate(e) {
        e.preventDefault();
        const section = e.target.getAttribute('href').substring(1);
        document.querySelectorAll('main > section').forEach(div => {
            div.style.display = 'none';
        });

        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        if (section === 'list') {
            this.displayBooks();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookList();
});

// document.addEventListener('DOMContentLoaded', () => {
//     new BookList();
// });
