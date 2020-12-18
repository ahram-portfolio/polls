package com.example.polls.common.ui;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class PageView<T> {

    private int totalPages = 0;
    private int page = 0;
    private List<T> contents = new ArrayList<>();


    public PageView() {}

    public PageView(Page page) {
        if (page != null) {
            this.totalPages = page.getTotalPages();
            this.page = page.getPageable().getPageNumber();
            this.contents = (List<T>) page.getContent();
        }
    }
}
