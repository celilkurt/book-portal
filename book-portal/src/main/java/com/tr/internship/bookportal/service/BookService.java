package com.tr.internship.bookportal.service;

import com.tr.internship.bookportal.dao.BookRepository;
import com.tr.internship.bookportal.dao.UserRepository;
import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class BookService  {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;


    public Page<Book> getAll(int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAll(paged);
    }

    public Optional<Book> getById(Long id) {

        return bookRepository.findById(id);
    }

    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    public Book save(Book newRecord) {

        return bookRepository.save(newRecord);

    }

    public Book update(Book newRecord) {
        return bookRepository.save(newRecord);

    }

    public Set<Book> addFavoriteById(Long userId, Long bookId){

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findById(userId);
        if(book.isPresent() && user.isPresent()){
            user.get().getFavorites().add(book.get());
            return userRepository.save(user.get()).getFavorites();
        }else {
            return null;
        }

    }

    public Set<Book> deleteFavoriteById(Long userId, Long bookId){

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findById(userId);
        if(book.isPresent() && user.isPresent()){
            user.get().getFavorites().remove(book.get());
            return userRepository.save(user.get()).getFavorites();
        }else {
            return null;
        }

    }

    public Set<Book> getFavoriteBooksByUserId(Long userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent())
            return user.get().getFavorites();
        else
            return null;
    }

    public Set<Book> addReadBookById(Long userId, Long bookId){

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findById(userId);
        if(book.isPresent() && user.isPresent()){
            user.get().getReadBooks().add(book.get());
            return userRepository.save(user.get()).getReadBooks();
        }else {
            return null;
        }

    }

    public Set<Book> deleteReadBookById(Long userId, Long bookId){

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findById(userId);
        if(book.isPresent() && user.isPresent()){
            user.get().getReadBooks().remove(book.get());
            return userRepository.save(user.get()).getReadBooks();
        }else {
            return null;
        }

    }

    public Set<Book> getReadBooksByUserId(Long userId){

        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent())
            return user.get().getReadBooks();
        else
            return null;
    }

}
