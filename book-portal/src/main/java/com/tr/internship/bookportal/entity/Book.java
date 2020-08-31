package com.tr.internship.bookportal.entity;

import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "book_name")
    @NonNull
    @Size(min=2)
    private String bookName;
    @NonNull
    @Size(min=2)
    private String author;
    @NonNull
    @Size(min=2)
    private String category;

    public Book() {
    }

    public Book(String bookName, String author, String category) {
        this.bookName = bookName;
        this.author = author;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return id.equals(book.id) &&
                bookName.equals(book.bookName) &&
                author.equals(book.author) &&
                category.equals(book.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, bookName, author, category);
    }
}

