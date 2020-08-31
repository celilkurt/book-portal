package com.tr.internship.bookportal.dao;

import com.tr.internship.bookportal.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {

    Page<List<Book>> findAllByAuthorContainsOrAuthorContainingIgnoreCase(String author,String author2,Pageable paged);
    Page<List<Book>> findAllByBookNameContainsOrBookNameContainingIgnoreCase (String bookname,String bookname2,Pageable paged);
    Page<List<Book>> findAllByCategoryContainingOrCategoryContainsIgnoreCase(String category,String category2,Pageable paged);
    Page<List<Book>> findAllByAuthorContainsOrAuthorContainingIgnoreCaseOrBookNameContainsOrBookNameContainingIgnoreCaseOrCategoryContainingOrCategoryContainsIgnoreCase (
            String key,String key2,String key3,String key4,String key5,String key6,Pageable paged);

}
