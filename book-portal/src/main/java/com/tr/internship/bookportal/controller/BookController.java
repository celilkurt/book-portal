package com.tr.internship.bookportal.controller;


import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping
    public ResponseEntity<Page<Book>> getAllBooks(@RequestParam(name="pageSize", defaultValue = "2") int pageSize,
                                                  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
        return ResponseEntity.ok(bookService.getAll(pageSize,pageNumber));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){

        Optional<Book> book = bookService.getById(id);
        if(book.isPresent())
            return ResponseEntity.ok(book.get());
        else
            throw new IllegalArgumentException("Kullanıcı bulunamadı.");

    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody @Valid Book book){
        Book book2 = bookService.save(book);

        if(book2 != null)
            return ResponseEntity.ok(book2);
        else
            throw new IllegalArgumentException("Kullanıcı bilgileri geçersiz.");

    }


    @PutMapping
    public ResponseEntity<Book> updateBook(@RequestBody @Valid Book book){
        Book book2 = bookService.save(book);

        if(book2 != null)
            return ResponseEntity.ok(book2);
        else
            throw new IllegalArgumentException("Kullanıcı bilgileri geçersiz.");
    }


    @DeleteMapping("/id/{id}")
    public void deleteBookById(@PathVariable Long id){

        bookService.deleteById(id);

    }

    @PostMapping("/favorite")
    public ResponseEntity<Set<Book>> addFavoriteBook(@RequestParam Long userId, @RequestParam Long bookId){

        Set<Book> favorites = bookService.addFavoriteById(userId,bookId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametreler geçersiz.");
    }

    @DeleteMapping("/favorite")
    public ResponseEntity<Set<Book>> deleteFavoriteBook(@RequestParam Long userId, @RequestParam Long bookId){

        Set<Book> favorites = bookService.deleteFavoriteById(userId,bookId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametreler geçersiz.");
    }


    @GetMapping("/favorite/id/{userId}")
    public ResponseEntity<Set<Book>> getFavoriteBooksByUserId(@PathVariable Long userId){
        Set<Book> favorites = bookService.getFavoriteBooksByUserId(userId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametre geçersiz.");
    }

    @DeleteMapping("/read-list")
    public ResponseEntity<Set<Book>> deleteReadBook(@RequestParam Long userId, @RequestParam Long bookId){

        Set<Book> favorites = bookService.deleteReadBookById(userId,bookId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametreler geçersiz.");
    }

    @PostMapping("/read-list")
    public ResponseEntity<Set<Book>> addReadBook(@RequestParam Long userId, @RequestParam Long bookId){

        Set<Book> favorites = bookService.addReadBookById(userId,bookId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametreler geçersiz.");
    }

    @GetMapping("/read-list/id/{userId}")
    public ResponseEntity<Set<Book>> getReadBooksByUserId(@PathVariable Long userId){
        Set<Book> favorites = bookService.getReadBooksByUserId(userId);
        if(favorites != null)
            return ResponseEntity.ok(favorites);
        else
            throw new IllegalArgumentException("Parametre geçersiz.");
    }


    @GetMapping("/search")
    public ResponseEntity<?>  getAllByKey(@RequestBody Book book, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(bookService.getAllBySearchKeys(book,pageSize,pageNumber));
    }




}
