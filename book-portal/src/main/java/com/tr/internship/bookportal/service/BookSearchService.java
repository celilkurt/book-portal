package com.tr.internship.bookportal.service;

import com.tr.internship.bookportal.dao.BookRepository;
import com.tr.internship.bookportal.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookSearchService {

    @Autowired
    BookRepository bookRepository;

    public Page<List<Book>> getAllByAny(String key, int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAllByAuthorContainsOrAuthorContainingIgnoreCaseOrBookNameContainsOrBookNameContainingIgnoreCaseOrCategoryContainingOrCategoryContainsIgnoreCase(key,key,key,key,key,key,paged);
    }

    public Page<List<Book>> getAllByBookname(String key, int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAllByBookNameContainsOrBookNameContainingIgnoreCase(key,key,paged);
    }

    public Page<List<Book>> getAllByAuthor(String key, int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAllByAuthorContainsOrAuthorContainingIgnoreCase(key,key,paged);
    }

    public Page<List<Book>> getAllByCategory(String key, int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return bookRepository.findAllByCategoryContainingOrCategoryContainsIgnoreCase(key,key,paged);
    }

}
