package com.tr.internship.bookportal.controller;

import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.service.BookSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book/search")
public class BookSearchController {

    @Autowired
    BookSearchService bookSearchService;

    @GetMapping("/author/{key}")
    public ResponseEntity<Page<List<Book>>>  getAllByAuthor(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(bookSearchService.getAllByAuthor(key,pageSize,pageNumber));
    }

    @GetMapping("/bookname/{key}")
    public ResponseEntity<Page<List<Book>>>  getAllByBookname(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(bookSearchService.getAllByBookname(key,pageSize,pageNumber));
    }

    @GetMapping("/category/{key}")
    public ResponseEntity<Page<List<Book>>>  getAllByCategory(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(bookSearchService.getAllByCategory(key,pageSize,pageNumber));
    }

    @GetMapping("/any/{key}")
    public ResponseEntity<Page<List<Book>>>  getAllByAny(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                            @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(bookSearchService.getAllByAny(key,pageSize,pageNumber));
    }



}
